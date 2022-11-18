import { Service } from "typedi";
import { PageableRequest } from "@/dto/request/page.base.request";

import { DATABASE } from "@/utils/constants";
import { BreakingBadRequest } from "@/dto/request/breaking.bad.request";

@Service("database.json")
export class BreakingBadJsonRepository {
    constructor(){}

    public async find(pageable: PageableRequest<BreakingBadRequest> ) {
        let { name, sesson, portrayed } = pageable.entity
        let query = DATABASE.filter((f) => {
            return  name ? (f["name"]|| "").toLowerCase().match(name.toLowerCase())  : f["name"] === f["name"] 
                &&  sesson ? (f["appearance"] || []).includes(sesson) : f["appearance"] === f["appearance"]
                &&  portrayed ? (f["portrayed"] || []).includes(portrayed) : f["portrayed"] === f["portrayed"]

        })

        let total = query.length
        let result = query
        return { result , total }
    }

    public async findOne(id: number) {
        return DATABASE.find(f => f.char_id === id)
    }
}
