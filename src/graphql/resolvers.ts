import { Container } from 'typedi';
import { ProductService } from '../api/core/services/ProductService';

export const resolvers = {
    products: async () => {
        const productService = Container.get(ProductService);

        const products = await productService.findAll();

        return products.map(product => ({
            productId: product.productId,
            name: product.name,
            price: Number(product.price),
        }));
    },

    product: async ({ productId }: { productId: number }) => {
    const productService = Container.get(ProductService);

    const product = await productService.findOne({
        where: {
            productId,
        },
    });

    if (!product) {
        return null;
    }

    return {
        productId: product.productId,
        name: product.name,
        price: Number(product.price),
    };
},
};
