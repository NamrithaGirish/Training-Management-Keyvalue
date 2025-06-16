
import SessionRepository from "../repositories/session.repository";
import { Session } from "../entities/session.entity";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { CreateSessionDto } from "../dto/session.dto";

export class SessionService {
    logger: any;
    constructor(private serviceRepository: SessionRepository) {}


 async createSession(sessionDto: CreateSessionDto): Promise<Session> {
    const session= plainToInstance(Session, instanceToPlain(sessionDto));

    const result = await this.serviceRepository.create(session);
    this.logger.info(`Session created with ID: ${result.id}`);

    return result;
  }


    
}
