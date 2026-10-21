import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class UpdateSuggestionKeywordRequest {

    @IsNotEmpty()
    @IsString()
    public keyword: string;

    @IsNotEmpty()
    @IsNumber()
    public categoryId: number;
}
