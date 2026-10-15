import 'reflect-metadata';
import { IsNotEmpty } from 'class-validator';
// tslint:disable-next-line:class-name
export interface productQRcode {
    productId?: number;
    productSlug?: string;
    base64Image?: string;
}

export class ProductQRcodeRequest {

    @IsNotEmpty()
    public productData: productQRcode[];
}
