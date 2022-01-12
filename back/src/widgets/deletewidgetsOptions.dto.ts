import { IsString} from 'class-validator';

export class DeleteWidgetsOptionsDTO {
    @IsString()
    id: string;
}