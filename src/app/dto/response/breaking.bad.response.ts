import { Exclude, Expose, Transform, Type } from "class-transformer";

export class BreakingBadResponse {

    char_id: number;
    name: string;
    birthday: Date;
    occupation: String[];
    img: String;
    status: string;
    nickname: string;
    appearance: Number[];
    portrayed: String;
    category: String;
    better_call_saul_appearance: Number[];

}