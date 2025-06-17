import {
    IsString,
    IsNotEmpty,
    IsOptional,
    IsNumber,
    Min,
    Max,
} from "class-validator";

export class CreateMaterialDto {
    @IsNotEmpty()
    @IsNumber()
    session_id:number;
    @IsString()
    @IsNotEmpty()
    link: string;

}

export class UpdateMaterialDto {
    @IsOptional()
    @IsNumber()
    session_id:number;

    
    @IsString()
    @IsOptional()
    link: string;
    
}
