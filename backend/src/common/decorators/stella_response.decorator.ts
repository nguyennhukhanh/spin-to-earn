import { applyDecorators } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger';

export function StellaResponse(status: number, schemaModel: any) {
  return applyDecorators(
    ApiExtraModels(schemaModel),
    ApiResponse({
      status: status,
      schema: {
        $ref: getSchemaPath(schemaModel),
      },
    }),
  );
}
