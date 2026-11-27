import {
    GraphQLBoolean,
    GraphQLEnumType,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
} from 'graphql';

export const SortDirectionEnum = new GraphQLEnumType({
    name: 'SortDirection',
    values: {
        ASC: { value: 'ASC' },
        DESC: { value: 'DESC' },
    },
});

export const PageInfoType = new GraphQLObjectType({
    name: 'PageInfo',
    description: 'Relay-style pagination metadata.',
    fields: {
        hasNextPage: { type: new GraphQLNonNull(GraphQLBoolean) },
        hasPreviousPage: { type: new GraphQLNonNull(GraphQLBoolean) },
        startCursor: { type: GraphQLString },
        endCursor: { type: GraphQLString },
    },
});

export const UserErrorType = new GraphQLObjectType({
    name: 'UserError',
    description: 'Shopify-style mutation validation or business logic error.',
    fields: {
        field: { type: new GraphQLList(GraphQLString) },
        message: { type: new GraphQLNonNull(GraphQLString) },
    },
});

export function encodeCursor(offset: number): string {
    return Buffer.from(`cursor:${offset}`, 'utf8').toString('base64');
}

export function decodeCursor(cursor?: string | null): number {
    if (!cursor) {
        return 0;
    }
    try {
        const decoded = Buffer.from(cursor, 'base64').toString('utf8');
        if (decoded.startsWith('cursor:')) {
            const num = parseInt(decoded.replace('cursor:', ''), 10);
            return Number.isNaN(num) || num < 0 ? 0 : num;
        }
        const plain = parseInt(cursor, 10);
        return Number.isNaN(plain) || plain < 0 ? 0 : plain;
    } catch {
        return 0;
    }
}

export function resolvePaginationParams(args: { first?: number; after?: string; limit?: number; offset?: number }): { limit: number; offset: number } {
    const rawLimit = args.first ?? args.limit ?? 20;
    const limit = Math.min(Math.max(Number(rawLimit) || 20, 1), 100);
    let offset = 0;
    if (args.after) {
        offset = decodeCursor(args.after) + 1;
    } else if (args.offset !== undefined && args.offset !== null) {
        offset = Math.max(Number(args.offset) || 0, 0);
    }
    return { limit, offset };
}

export function buildConnection<T>(items: T[], totalCount: number, limit: number, offset: number): {
    totalCount: number;
    pageInfo: {
        hasNextPage: boolean;
        hasPreviousPage: boolean;
        startCursor: string | null;
        endCursor: string | null;
    };
    edges: Array<{ cursor: string; node: T }>;
    nodes: T[];
} {
    const edges = items.map((node, idx) => ({
        cursor: encodeCursor(offset + idx),
        node,
    }));
    return {
        totalCount,
        pageInfo: {
            hasNextPage: offset + items.length < totalCount,
            hasPreviousPage: offset > 0,
            startCursor: edges.length ? edges[0].cursor : null,
            endCursor: edges.length ? edges[edges.length - 1].cursor : null,
        },
        edges,
        nodes: items,
    };
}

/**
 * Helper to create a Relay-style Connection GraphQLObjectType for any node type.
 */
export function createConnectionType(name: string, nodeType: GraphQLObjectType): GraphQLObjectType {
    const EdgeType = new GraphQLObjectType({
        name: `${name}Edge`,
        fields: {
            cursor: { type: new GraphQLNonNull(GraphQLString) },
            node: { type: nodeType },
        },
    });

    return new GraphQLObjectType({
        name: `${name}Connection`,
        fields: {
            totalCount: { type: new GraphQLNonNull(GraphQLInt) },
            pageInfo: { type: new GraphQLNonNull(PageInfoType) },
            edges: { type: new GraphQLList(EdgeType) },
            nodes: { type: new GraphQLList(nodeType) },
        },
    });
}
