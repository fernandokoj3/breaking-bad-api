import { IsArray, IsDefined, IsEnum, IsIn, IsInt, IsNumberString, IsOptional, IsPositive, IsString, Matches, Max, Min } from "class-validator";
import { IsValidNumber } from "@/middlewares/custom.validation";
import { PageBaseRequest, Sortable } from "./page.base.request";
import { Transform, Type } from "class-transformer";

export class BreakingBadOneRequest {
    @IsValidNumber()
    id: number | string
}

export class BreakingBadRequest extends PageBaseRequest implements Sortable {
    
    @IsOptional()
    @IsIn(["char_id", "birthday", "portrayed", "status", "name"])
    sort: string = "char_id";

    @IsOptional()
    @IsString()
    @IsIn(["asc", "desc"])
    @Transform(({ value }) => value.toLowerCase() )
    order: string = "asc";

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsValidNumber()
    @Transform(({value}) => Number(value))
    sesson: number

    @IsOptional()
    portrayed: string
}