import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import multerS3 from 'multer-s3';

export const multerS3StorageProvider = {
  provide: 'MULTER_S3_STORAGE',
  useFactory: (configService: ConfigService) => {
    return multerS3({
      s3: new AWS.S3({
        accessKeyId: configService.get<string>('AWS_ACCESS_KEY_ID'),
        secretAccessKey: configService.get<string>('AWS_SECRET_ACCESS_KEY'),
        region: configService.get<string>('AWS_REGION'),
      }) as any,
      bucket: (() => {
        const bucket = configService.get<string>('AWS_BUCKET_NAME');
        if (!bucket) throw new Error('AWS_BUCKET_NAME não definido no .env');
        return bucket;
      })(),
      acl: 'public-read',
      contentType: multerS3.AUTO_CONTENT_TYPE,
      key: (req, file, cb) => {
        cb(null, `avatars/${Date.now()}-${file.originalname}`);
      },
    });
  },
  inject: [ConfigService],
};
