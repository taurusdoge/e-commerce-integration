import { BadRequestException } from '@nestjs/common';
import { ClassConstructor, plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

export async function validateDTO<T>(
  obj: unknown,
  dtoClass: ClassConstructor<T>,
): Promise<T> {
  const transformedObj = plainToClass(dtoClass, obj);
  const errors = await validate(transformedObj as object);
  if (errors.length > 0) {
    throw new BadRequestException(
      `Validation failed: ${JSON.stringify(errors)}`,
    );
  }
  return transformedObj;
}
