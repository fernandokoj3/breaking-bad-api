import { IsArray, IsDefined, IsEnum, IsInt, IsNumberString, IsOptional, IsString, Matches, Max, Min } from "class-validator";
import { IsValidNumber } from "@/middlewares/custom.validation";
import { Sortable } from "./page.base.request";
import { Transform } from "class-transformer";

export class BreakingBadOneRequest {
    @IsValidNumber()
    id: number | string
}

export class BreakingBadRequest implements Sortable {
    
    sort: string;

    order: string;

    limit: number;

    page: number;

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