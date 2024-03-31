import { IsEnum, IsString } from 'class-validator';
import { ProductStatus } from '../types';

export class CreateShopifyProductDTO {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsString()
  vendor: string;

  @IsString()
  product_type: string;

  @IsEnum(ProductStatus)
  status: ProductStatus;
}
