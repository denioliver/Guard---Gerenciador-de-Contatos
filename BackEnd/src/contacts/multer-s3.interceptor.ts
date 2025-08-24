import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Inject } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class MulterS3Interceptor implements NestInterceptor {
  constructor(
    @Inject('MULTER_S3_STORAGE') private readonly multerS3Storage: any,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const InterceptorClass = FileInterceptor('avatar', { storage: this.multerS3Storage });
    const interceptor = new InterceptorClass();
    return interceptor.intercept(context, next);
  }
}
