import { IsArray, IsInt, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class FeaturedProductRequest {

    @IsNotEmpty()
    @IsArray()
    @ArrayNotEmpty()
    @IsInt({ each: true })
    public productIds: number[];
}
