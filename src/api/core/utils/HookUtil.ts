import path from 'path';
import fs from 'fs';

export type HookHandler = (payload: any) => Promise<any> | any;

export type PaymentListFilter = (list: any[], context: { tenantId?: number; request?: any }) => Promise<any[]> | any[];

export interface PaymentValidateParams {
    pluginName: string;
    customerId: number;
    amount: number;
    tenantId?: number;
    pluginModule?: string[];
}

export interface PaymentProcessParams {
    pluginName: string;
    customerId: number;
    amount: number;
    tenantId?: number;
    orderId: number;
    orderData?: any;
    pluginModule?: string[];
}

export interface PaymentPluginHandler {
    pluginName?: string;
    validate?: (params: PaymentValidateParams) => Promise<{ valid: boolean; message?: string }> | { valid: boolean; message?: string };
    process?: (params: PaymentProcessParams) => Promise<{ success: boolean; message?: string }> | { success: boolean; message?: string };
}

export class HookUtil {
    /**
     * Register an in-process hook handler for an event
     */
    public static on(event: string, handler: HookHandler): void {
        const list = this.listeners.get(event) || [];
        list.push(handler);
        this.listeners.set(event, list);
    }

    /**
     * Remove an in-process hook handler
     */
    public static off(event: string, handler: HookHandler): void {
        const list = this.listeners.get(event);
        if (list) {
            this.listeners.set(event, list.filter(h => h !== handler));
        }
    }

    /**
     * Safely require a module path without throwing MODULE_NOT_FOUND
     */
    public static safeRequire(modulePath: string): any {
        try {
            return require(modulePath);
        } catch (err: any) {
            if (err.code !== 'MODULE_NOT_FOUND') {
                console.warn(`[HookUtil] Failed loading module "${modulePath}":`, err.message);
            }
            return null;
        }
    }

    /**
     * Register an internal / add-on payment plugin handler
     */
    public static registerPaymentHandler(pluginName: string, handler: PaymentPluginHandler): void {
        if (!pluginName) {
            return;
        }
        handler.pluginName = pluginName;
        this.paymentHandlers.set(pluginName.toLowerCase(), handler);
    }

    /**
     * Checks if an internal payment handler is registered for a plugin
     */
    public static hasPaymentHandler(pluginName: string): boolean {
        if (!pluginName) {
            return false;
        }
        return this.paymentHandlers.has(pluginName.toLowerCase());
    }

    /**
     * Validates an internal / add-on payment (pre-flight check)
     */
    public static async validatePayment(params: PaymentValidateParams): Promise<{ valid: boolean; message?: string }> {
        const handler = this.paymentHandlers.get(params.pluginName.toLowerCase());
        if (handler && typeof handler.validate === 'function') {
            return await handler.validate(params);
        }
        return { valid: true };
    }

    /**
     * Processes an internal / add-on payment (order deduction / execution)
     */
    public static async processPayment(params: PaymentProcessParams): Promise<{ success: boolean; message?: string }> {
        const handler = this.paymentHandlers.get(params.pluginName.toLowerCase());
        if (handler && typeof handler.process === 'function') {
            return await handler.process(params);
        }
        return { success: false, message: `No payment processor registered for ${params.pluginName}` };
    }

    /**
     * Register a payment list filter for a plugin
     */
    public static registerPaymentListFilter(pluginName: string, filter: PaymentListFilter): void {
        if (!pluginName) {
            return;
        }
        this.paymentListFilters.set(pluginName.toLowerCase(), filter);
    }

    /**
     * Filter payment settings list using registered plugin filters and appends
     * any registered payment plugins that are not in the primary list (e.g. utility plugins).
     */
    public static async filterPaymentSettings(
        paymentList: any[],
        context: { tenantId?: number; pluginService?: any; select?: any[]; request?: any }
    ): Promise<any[]> {
        let result = Array.isArray(paymentList) ? [...paymentList] : [];

        // 1. If pluginService is provided, check if any registered payment plugins need to be included
        if (context.pluginService) {
            for (const [pluginKey, handler] of this.paymentHandlers.entries()) {
                const displayName = handler.pluginName || pluginKey;
                const alreadyInList = result.some((p: any) =>
                    (p.pluginName && p.pluginName.toLowerCase() === pluginKey) ||
                    (p.slugName && p.slugName.toLowerCase() === pluginKey)
                );

                if (!alreadyInList) {
                    try {
                        const plugin = await context.pluginService.findOne({
                            where: [
                                { pluginName: displayName, pluginStatus: 1 },
                                { slugName: pluginKey, pluginStatus: 1 },
                            ],
                            ...(context.select ? { select: context.select } : {}),
                        });
                        if (plugin) {
                            result.push(plugin);
                        }
                    } catch (err: any) {
                        console.error(`[HookUtil] Error loading payment plugin ${pluginKey}:`, err.message);
                    }
                }
            }
        }

        // 2. Apply registered tenant filters
        for (const [name, filterFn] of this.paymentListFilters.entries()) {
            try {
                result = await filterFn(result, context);
            } catch (err: any) {
                console.error(`[HookUtil] Error in payment list filter for ${name}:`, err.message);
            }
        }
        return result;
    }

    /**
     * Trigger hook / webhook event safely.
     * 1. Executes in-process registered listeners.
     * 2. Triggers webhook via node-webhooks if event is configured in webHookConfig.json.
     * 3. Fallback: tries direct add-on hook in add-ons/ folder if no listener handled it.
     * Never throws errors so core application flow is never disrupted.
     */
    public static async trigger(event: string, payload: any): Promise<any[]> {
        const results: any[] = [];

        // 1. Run in-process listeners
        const list = this.listeners.get(event) || [];
        for (const handler of list) {
            try {
                const res = await handler(payload);
                if (res !== undefined) {
                    results.push(res);
                }
            } catch (err) {
                console.error(`[HookUtil] Error in listener for event "${event}":`, err);
            }
        }

        // 2. Trigger Webhook via WebHookConfig if configured
        try {
            await this.triggerWebhookIfConfigured(event, payload);
        } catch (err) {
            console.error(`[HookUtil] Error triggering webhook for event "${event}":`, err);
        }

        // 3. Fallback to direct add-on hook discovery if no in-process listener ran
        if (list.length === 0) {
            try {
                await this.tryAddonDirectHook(event, payload, results);
            } catch (err) {
                console.error(`[HookUtil] Error in direct addon hook for event "${event}":`, err);
            }
        }

        return results;
    }

    private static listeners: Map<string, HookHandler[]> = new Map();
    private static paymentHandlers: Map<string, PaymentPluginHandler> = new Map();
    private static paymentListFilters: Map<string, PaymentListFilter> = new Map();

    /**
     * Trigger via WebHookConfig if available and configured in webHookConfig.json
     */
    private static async triggerWebhookIfConfigured(event: string, payload: any): Promise<void> {
        const configPath = path.join(process.cwd(), 'webHookConfig.json');
        if (!fs.existsSync(configPath)) {
            return;
        }

        let webHookEvents: any;
        try {
            webHookEvents = require(configPath);
        } catch {
            return;
        }

        if (!webHookEvents || !webHookEvents[event]) {
            return;
        }

        // Check if WebHookConfig addon exists
        const webhookAddonPath = path.join(process.cwd(), 'add-ons/WebHook/WebHookConfig');
        const webhook = this.safeRequire(webhookAddonPath);
        if (webhook && typeof webhook.trigger === 'function') {
            await webhook.trigger(event, payload);
        }
    }

    /**
     * Automatically discover and run add-on hooks if they exist in add-ons folder
     */
    private static async tryAddonDirectHook(event: string, payload: any, results: any[]): Promise<void> {
        // Shopping cart / Shopping list event handlers
        if (event === 'shopping_cart_order' || event === 'shopping_list_order') {
            const candidatePaths = [
                path.join(process.cwd(), 'add-ons/ShoppingCart/ShoppingCartHook'),
                path.join(process.cwd(), 'add-ons/ShoppingList/ShoppingListHook'),
                path.join(process.cwd(), 'add-ons/shopping-list/shoppingListHook'),
                path.join(process.cwd(), 'src/api/core/ShoppingCartHook'),
            ];

            for (const candidate of candidatePaths) {
                const hookModule = this.safeRequire(candidate);
                if (hookModule) {
                    if (typeof hookModule.handleOrder === 'function') {
                        results.push(await hookModule.handleOrder(payload));
                        return;
                    }
                    if (typeof hookModule.findOne === 'function' && typeof hookModule.update === 'function') {
                        const cart = await hookModule.findOne({
                            where: {
                                id: payload.shoppingCartId,
                                ...(payload.customerId ? { customerId: payload.customerId } : {}),
                                isOrdered: 0,
                            },
                        });
                        if (cart) {
                            results.push(await hookModule.update(cart.id, { isOrdered: 1 }));
                        }
                        return;
                    }
                }
            }
        } else if (event === 'shopping_cart_customer_delete' || event === 'shopping_list_customer_delete') {
            const candidatePaths = [
                path.join(process.cwd(), 'add-ons/ShoppingCart/ShoppingCartHook'),
                path.join(process.cwd(), 'add-ons/ShoppingList/ShoppingListHook'),
                path.join(process.cwd(), 'add-ons/shopping-list/shoppingListHook'),
                path.join(process.cwd(), 'src/api/core/ShoppingCartHook'),
            ];

            for (const candidate of candidatePaths) {
                const hookModule = this.safeRequire(candidate);
                if (hookModule) {
                    if (typeof hookModule.handleCustomerDelete === 'function') {
                        results.push(await hookModule.handleCustomerDelete(payload));
                        return;
                    }
                    if (typeof hookModule.find === 'function' && typeof hookModule.deleteShoppingCart === 'function') {
                        const carts = await hookModule.find({ where: { customerUserId: payload.customerUserId } });
                        if (carts && carts.length) {
                            const ids = carts.map((c: any) => c.id);
                            results.push(await hookModule.deleteShoppingCart(ids));
                        }
                        return;
                    }
                }
            }
        }
    }
}
