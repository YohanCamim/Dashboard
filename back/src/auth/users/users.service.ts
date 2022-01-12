import { AuthService } from './../auth.service';
import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes } from "crypto";
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User } from '../interfaces/user.interface';

@Injectable()
export class UsersService {
    constructor(@InjectModel('User') private userModel: Model<User>, private readonly authService: AuthService) { }

    async getByEmail(email: string) {
        return this.userModel.findOne({email})
    }

    async createWithGoogle(email: string,token:string) {

        const defaultPassword = randomBytes(50)
        const hashedPassword = await bcrypt.hash(defaultPassword, 10)
        const objet = {services: "google", params: [token]}
        const user = new this.userModel({ email, password: hashedPassword, widgets: objet})

        try {
            const newUser = await user.save()
            return newUser

        } catch (error) {
            if (error.code === 11000) {
                throw new ConflictException('User already exists')
            }
            throw error;
        }
    }
}