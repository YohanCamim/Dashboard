import { ConflictException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './interfaces/user.interface';


@Injectable()
export class AuthService {
    constructor(@InjectModel('User') private userModel: Model<User>, private jwtService: JwtService) { }

    async signUp(credentials: AuthCredentialsDto): Promise<any> {
        const { email, password } = credentials

        const hashedPassword = await bcrypt.hash(password,10)

        const user = new this.userModel({email, password: hashedPassword})

        try {
            await user.save()
            return {success: "User has been created"}
        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists')
            }
            throw error;
        }
    }

    async signIn(user: User) {
        const payload =  {email:user.email, sub:user._id};
        return {
            accessToken: this.jwtService.sign(payload)
        }
    }

    async validateUser(email:string, password:string): Promise<User> {
        const user = await this.userModel.findOne({ email });

        if (!user) {
            return null;
        }

        const valid = await bcrypt.compare(password, user.password)

        if (valid) {
            return user;
        }

        return null;
    }
}
