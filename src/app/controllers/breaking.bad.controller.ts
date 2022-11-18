import { Request, Response } from "express";
import { BreakingBadService } from "@/services/breaking.bad.service";
import { Controller, Get} from "@/utils/injectUtils";
import { getUrlParamValidator, getQueryValidator } from '@/middlewares/validation.handler';
import { BreakingBadOneRequest, BreakingBadRequest } from "@/dto/request/breaking.bad.request";

@Controller("/")
export class BreakingBadController {

    constructor(
        private breakingBadService: BreakingBadService,
    ){}

    @Get("/", getQueryValidator(BreakingBadRequest))
    public async list(request: Request, response: Response): Promise<Response> {
        let result = await this.breakingBadService.list(request?.query as unknown as BreakingBadRequest)
        return response.status(200).send(result);
    }

    @Get("/:id", getUrlParamValidator(BreakingBadOneRequest))
    public async one(request: Request, response: Response): Promise<Response> {
        let { id } = request.params;
        let result = await this.breakingBadService.one(Number(id))
        return response.status(200).send(result);
    }

    
}
