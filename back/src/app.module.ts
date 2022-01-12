import { WidgetsModule } from './widgets/widgets.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module'

@Module({
  imports: [MongooseModule.forRoot(SECRET_URL_MONGODB),AuthModule,WidgetsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
