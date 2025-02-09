import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ValidateContents, ValidateIsComplete, ValidateUuid} from './app.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ValidateContents).forRoutes('task/add')
      .apply(ValidateUuid).forRoutes('task/delete')
      .apply(ValidateUuid).forRoutes('task/update')
      .apply(ValidateIsComplete).forRoutes('task/update')
  }
}