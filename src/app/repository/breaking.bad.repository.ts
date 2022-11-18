import { Service } from "typedi";
import { PageableRequest } from "@/dto/request/page.base.request";

import { DATABASE } from "@/utils/constants";
import { BreakingBadRequest } from "@/dto/request/breaking.bad.request";

@Service("database.json")
export class BreakingBadJsonRepository {
    constructor(){}

    public async find(pageable: PageableRequest<BreakingBadRequest> ) {
        let { name, sesson, portrayed } = pageable.entity;
        let { page, limit, order, sort } = pageable;
        let isAsc = order === 'asc'
        let query = DATABASE.filter((f) => {
            return  (name ? (f["name"]|| "").toLowerCase().match(name.toLowerCase())  : f["name"] === f["name"] )
                &&  (sesson ? (f["appearance"] || []).includes(sesson) : f["appearance"] === f["appearance"])
                &&  (portrayed ? (f["portrayed"] || []).includes(portrayed) : f["portrayed"] === f["portrayed"])

        })
        let result = [];
        if (isAsc) {
            result = query.sort((a, b) => (a[sort] > b[sort] ? 1: -1 ))
        } else {
            result = query.sort((a, b) => (a[sort] > b[sort] ? -1: 1 ))
        }

        result = result.slice((page) * limit , (page + 1) * limit)

        let total = query.length
        return { result , total }
    }

    public async findOne(id: number) {
        return DATABASE.find(f => f.char_id === id)
    }
}
