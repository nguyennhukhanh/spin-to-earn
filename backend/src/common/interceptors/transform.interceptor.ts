import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import type { StellaConfig } from 'src/configs';
import type { IResponse } from 'src/shared/interfaces/response.interface';
import { getLogger } from 'src/utils/logger';

const logger = getLogger('Response');

function processResponseData(data: any, statusCode?: number): any {
  return {
    meta: {
      code: data?.statusCode || statusCode,
      message: data?.message || 'Successful',
    },
    data: data?.results || data,
  };
}

@Injectable()
export class TransformInterceptor<T>
  implements NestInterceptor<T, IResponse<T>>
{
  constructor(private readonly configService: ConfigService<StellaConfig>) {}
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<IResponse<T>> {
    const { statusCode, req } = context.switchToHttp().getResponse();
    const pathname = req._parsedUrl.pathname;

    if (
      pathname ===
        `/${this.configService.get('main.apiPrefix', {
          infer: true,
        })}/bluePrint` ||
      pathname ===
        `/${this.configService.get('main.apiPrefix', {
          infer: true,
        })}/updateBluePrint`
    )
      return next.handle();

    return next
      .handle()
      .pipe(
        map(
          (data) => (
            logger.info(`API Response Status Code: ${statusCode}`),
            processResponseData(data, statusCode)
          ),
        ),
      );
  }
}
