import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { IsEqualTo } from '../decorator/isEqualTo.decorator';

export class AuthCredentialsDto {
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(8, { message: 'Password is too short (8 characters min)' })
    @MaxLength(20, { message: 'Password is too long (20 characters max)' })
    password: string;

    @IsEqualTo('password')
    password_confirmation:string

    @IsOptional()
    widgets:[];
}