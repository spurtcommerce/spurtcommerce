import { Request } from 'express';
import { Container } from 'typedi';
import { GraphQLError } from 'graphql';
import { AuthService } from '../../auth/AuthService';

export interface VendorGraphQLContext {
    req: Request;
    isAuthenticated: boolean;
    isApiKeyAuthenticated: boolean;
    vendorId: number;
    userId: number;
    user: any;
    vendor: any;
    isSuperVendor: boolean;
    groupSlug: string;
    rolePermissions: Record<string, any>;
    userPermissions: Record<string, any>;
    authError?: string;
}

/**
 * Builds the Vendor-only GraphQL execution context from the incoming Express request.
 * Reuses existing AuthService JWT / x-api-key authentication and Vendor RBAC group permissions.
 * Strictly rejects non-vendor (customer / admin / guest) requests.
 */
export async function buildVendorGraphQLContext(req: Request): Promise<VendorGraphQLContext> {
    const authService = Container.get<AuthService>(AuthService);

    const baseContext: VendorGraphQLContext = {
        req,
        isAuthenticated: false,
        isApiKeyAuthenticated: false,
        vendorId: 0,
        userId: 0,
        user: null,
        vendor: null,
        isSuperVendor: false,
        groupSlug: '',
        rolePermissions: {},
        userPermissions: {},
    };

    try {
        const apiKey = req.header('x-api-key');

        // 1. Vendor API Key Authentication
        if (apiKey) {
            const apiKeyData = await authService.validateApiKey(apiKey);
            if (!apiKeyData) {
                baseContext.authError = 'Invalid API Key.';
                return baseContext;
            }
            const vendorUserOrTenant = await authService.validateTenant(apiKeyData.tenantId);
            if (!vendorUserOrTenant) {
                baseContext.authError = 'Invalid or unapproved Vendor Tenant.';
                return baseContext;
            }

            const resolvedVendorId = Number(vendorUserOrTenant.tenantId || vendorUserOrTenant.vendorId || apiKeyData.tenantId);
            baseContext.isAuthenticated = true;
            baseContext.isApiKeyAuthenticated = true;
            baseContext.vendorId = resolvedVendorId;
            baseContext.userId = Number(vendorUserOrTenant.id || resolvedVendorId);
            baseContext.user = vendorUserOrTenant;
            baseContext.vendor = vendorUserOrTenant.vendor || vendorUserOrTenant;
            baseContext.isSuperVendor = true;
            return baseContext;
        }

        // 2. Vendor JWT Bearer Token Authentication
        const tokenPayload = await authService.parseBasicAuthFromRequest(req);
        if (!tokenPayload) {
            baseContext.authError = 'Authentication required. Please provide a valid Vendor Bearer token or x-api-key.';
            return baseContext;
        }

        // Strictly reject non-vendor tokens (Storefront customer or Admin tokens)
        if (tokenPayload.role && tokenPayload.role !== 'vendor') {
            baseContext.authError = 'Forbidden: GraphQL API is strictly restricted to Vendor accounts only.';
            return baseContext;
        }

        const tokenValid = await authService.checkTokenExist(req);
        if (!tokenValid) {
            baseContext.authError = 'Invalid or expired token.';
            return baseContext;
        }

        const vendorUser = await authService.validateVendor(tokenPayload.id);
        if (!vendorUser) {
            baseContext.authError = 'Invalid or unapproved Vendor credentials.';
            return baseContext;
        }

        const vendorId = Number(vendorUser.tenantId || vendorUser.vendor?.vendorId || 0);
        if (!vendorId) {
            baseContext.authError = 'Vendor tenant could not be resolved.';
            return baseContext;
        }

        let groupSlug = '';
        let rolePermissions: Record<string, any> = {};
        let userPermissions: Record<string, any> = {};

        try {
            userPermissions = vendorUser.permission ? JSON.parse(vendorUser.permission) : {};
        } catch {
            userPermissions = {};
        }

        if (vendorUser.userGroupId) {
            const userGroup = await authService.validateVendorUserGroup(vendorUser.userGroupId);
            if (userGroup) {
                groupSlug = userGroup.slug || '';
                try {
                    rolePermissions = userGroup.permission ? JSON.parse(userGroup.permission) : {};
                } catch {
                    rolePermissions = {};
                }
            }
        }

        baseContext.isAuthenticated = true;
        baseContext.vendorId = vendorId;
        baseContext.userId = Number(vendorUser.id);
        baseContext.user = vendorUser;
        baseContext.vendor = vendorUser.vendor || null;
        baseContext.isSuperVendor = vendorUser.isSuperVendor === 1 || groupSlug === 'admin';
        baseContext.groupSlug = groupSlug;
        baseContext.rolePermissions = rolePermissions;
        baseContext.userPermissions = userPermissions;
        return baseContext;
    } catch (error: any) {
        baseContext.authError = error?.message || 'Authentication failed.';
        return baseContext;
    }
}

/**
 * Enforces Vendor authentication and optional RBAC permission inside any GraphQL resolver.
 * Returns the authenticated vendorId (tenantId) guaranteed to come from token/API key only.
 */
export function requireVendorAuth(context: VendorGraphQLContext, requiredPermission?: string): VendorGraphQLContext {
    if (!context || !context.isAuthenticated || !context.vendorId) {
        const err: any = new GraphQLError(context?.authError || 'Unauthorized: Valid Vendor authentication is required.');
        err.extensions = { code: 'UNAUTHENTICATED', http: { status: 401 } };
        throw err;
    }

    if (requiredPermission && !context.isApiKeyAuthenticated && !context.isSuperVendor) {
        const hasRolePerm = Boolean(context.rolePermissions?.[requiredPermission]);
        const hasUserPerm = Boolean(context.userPermissions?.[requiredPermission]);
        if (!hasRolePerm && !hasUserPerm) {
            const err: any = new GraphQLError(`Forbidden: Missing required vendor permission "${requiredPermission}".`);
            err.extensions = { code: 'FORBIDDEN', http: { status: 403 } };
            throw err;
        }
    }

    return context;
}
