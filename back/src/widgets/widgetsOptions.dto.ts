import { IsArray, IsNotEmpty, IsNumber, IsString} from 'class-validator';

export class WidgetsOptionsDTO {
    // @IsString()
    id: string;

    @IsNotEmpty()
    @IsString()
    service: string;

    @IsArray()
    params:[any];
}