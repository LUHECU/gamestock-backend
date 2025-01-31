import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { IsNotBlank } from "src/decorators/is-not-blank.decorator";

export class CreateGameDto {

    @IsNotBlank({message: 'name cannot be empty'})
    @IsString()
    name!: string;

    @IsString()
    description!: string;

    @IsString()
    image!: string;

    @IsString()
    storage!: string;
    
    @IsDate()
    release_date!: Date;
}
