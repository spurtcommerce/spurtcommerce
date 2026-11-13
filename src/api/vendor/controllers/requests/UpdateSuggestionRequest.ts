import { IsArray, ArrayNotEmpty, IsString, IsOptional } from 'class-validator';

export class UpdateSuggestionRequest {

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    public suggestions: string[];

    @IsOptional()
    public status: number | boolean;

}
