import { IsArray, ArrayNotEmpty, IsString, IsBoolean } from 'class-validator';

export class UpdateSuggestionRequest {

    @IsArray()
    @ArrayNotEmpty()
    @IsString({ each: true })
    public suggestions: string[];

    @IsBoolean()
    public status: boolean;

}
