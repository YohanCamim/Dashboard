import { JwtAuthGuard } from './guards/jwt-auth.guard';
import {
    Body,
    Controller,
    Post,
    ValidationPipe,
    Request,
    UseGuards,
    Get
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('/signup')
    async signUp(
        @Body(ValidationPipe) credentials: AuthCredentialsDto): Promise<void> {
        return await this.authService.signUp(credentials);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    async signIn(@Request() req:any) {
        return this.authService.signIn(req.user)
    }

    @UseGuards(JwtAuthGuard)
    @Get('/Me')
    getMe(@Request() req) {
        return req.user
    }
}
