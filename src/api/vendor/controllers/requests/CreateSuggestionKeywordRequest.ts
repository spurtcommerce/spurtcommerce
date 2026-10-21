import {IsNotEmpty, IsNumber, IsArray, ArrayMinSize, IsString} from 'class-validator';

export class CreateSuggestionKeywordRequest {

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    @IsString({ each: true })
    public keywords: string[];

    @IsNotEmpty()
    @IsNumber()
    public categoryId: number;
}
