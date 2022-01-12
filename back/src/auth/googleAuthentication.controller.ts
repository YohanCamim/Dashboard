import {
    Controller,
    Post,
    Body,
    Req,
} from '@nestjs/common';
import { GoogleTokenVerificationDto } from './dto/googleTokenVerification.dto';
import { GoogleAuthenticationService } from './googleAuthentication.service';
import { Request } from 'express';

@Controller('google-authentication')
export class GoogleAuthenticationController {
    constructor(
        private readonly googleAuthenticationService: GoogleAuthenticationService) {}

    @Post()
    async authenticate(@Body() tokenData: GoogleTokenVerificationDto, @Req() request: Request) {
        const accessToken = await this.googleAuthenticationService.authenticate(tokenData.token);

        // request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

        return accessToken;
    }
}