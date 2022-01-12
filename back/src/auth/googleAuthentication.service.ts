import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from './users/users.service';
import { google, Auth } from 'googleapis';
import { AuthService } from './auth.service';

import { User } from './interfaces/user.interface';

@Injectable()
export class GoogleAuthenticationService {
    oauthClient: Auth.OAuth2Client;
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {
        const clientID = "" + process.env.GOOGLE_CLIENT_ID
        const clientSecret = "" + process.env.GOOGLE_SECRET

        this.oauthClient = new google.auth.OAuth2(
            clientID,
            clientSecret
        );
    }

    async authenticate(token: string) {
        const tokenInfo = await this.oauthClient.getTokenInfo(token);

        const email = tokenInfo.email;

        try {
            const user = await this.usersService.getByEmail(email);
            if (!user) {
                return this.registerUser(token, email);
            } else {
                return this.handleRegisteredUser(user);
            }

        } catch (error) {
            if (error.status !== 404) {
                throw new error;
            }

        }
    }

    async registerUser(token: string, email: string) {
        const user = await this.usersService.createWithGoogle(email,token);

        return this.handleRegisteredUser(user);
    }

    async getUserData(token: string) {
        const userInfoClient = google.oauth2('v2').userinfo;

        this.oauthClient.setCredentials({
            access_token: token
        })

        const userInfoResponse = await userInfoClient.get({
            auth: this.oauthClient
        });

        return userInfoResponse.data;
    }

    async handleRegisteredUser(user: User) {
        return this.authService.signIn(user)
    }
}