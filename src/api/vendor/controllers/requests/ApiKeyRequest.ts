import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiKeyExpiryType } from 'src/common/entities-index';

export class ApiKeyRequest {

  @IsNotEmpty()
  public expiryType: ApiKeyExpiryType;

  @IsOptional()
  public name?: string;
}
