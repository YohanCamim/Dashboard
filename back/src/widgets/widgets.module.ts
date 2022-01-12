import { UserSchema } from './../auth/schemas/user.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from "@nestjs/common";
import { WidgetsController } from './widgets.controller'
import { WidgetsService } from './widgets.service'

@Module({
    imports: [MongooseModule.forFeature([{name:'User',schema: UserSchema}])],
    controllers: [WidgetsController],
    providers: [WidgetsService]
})

export class WidgetsModule {}