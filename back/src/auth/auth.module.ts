import { GoogleAuthenticationService } from './googleAuthentication.service';
import { GoogleAuthenticationController } from './googleAuthentication.controller';

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './schemas/user.schema'

import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy} from './strategies/jwt.strategy'
import { GoogleStrategy } from './strategies/google.strategy';
import { UsersService } from './users/users.service';

@Module({
    imports: [
        MongooseModule.forFeature([{name:'User',schema: UserSchema}]), 
        PassportModule,
        JwtModule.register({
            secret:"" + process.env.JWT_SECRET,
            signOptions:{expiresIn:'2 days'},
        })
    ],
    controllers: [AuthController,GoogleAuthenticationController],
    providers: [AuthService, GoogleAuthenticationService, UsersService, LocalStrategy, JwtStrategy, GoogleStrategy]
})

export class AuthModule {}