import { Inject, Service } from "typedi";
import { BreakingBadOneRequest, BreakingBadRequest} from "@/dto/request/breaking.bad.request";
import { BreakingBad } from "@/entities/breaking.bad";
import { plainToClass, plainToInstance } from "class-transformer";
import { log } from "@/utils/logUtils";
import { BadRequestException, CrudException, GenericException, NotFoundException } from "@/models/error.types";
import { PageResponse, PageMetaResponse } from "@/dto/response/page.base.response";
import { BreakingBadResponse } from "@/dto/response/breaking.bad.response";
import { isNotValid } from "@/utils/objectUtils";
import { BreakingBadJsonRepository } from "@/repository/breaking.bad.repository";
import { PageBaseRequest } from "@/dto/request/page.base.request";

@Service()
export class BreakingBadService {

    constructor(
        @Inject("database.json") private repository: BreakingBadJsonRepository
    ){}

    public async list(breakingBadRequest: BreakingBadRequest){
        log.info('Start list(...)')
        let pageable = PageBaseRequest.get(breakingBadRequest, BreakingBadRequest)

        log.info('Find by pegeable request', pageable)
        let { result, total } = await this.repository.find(pageable);
        let meta = new PageMetaResponse(pageable, total, result.length);
        let content = plainToInstance(BreakingBadResponse, result);

        log.info('Create pageable response')
        return new PageResponse(content as any, meta);
    }

    public async one(id: number) {
        log.info('Start one(...)', id)
        let result = await this.repository.findOne(id)
        if (!result) {
            throw new NotFoundException(404, `register ${id} not found`);
        }

        log.info('Create one response')
        return plainToInstance(BreakingBadResponse, result);
    }

}