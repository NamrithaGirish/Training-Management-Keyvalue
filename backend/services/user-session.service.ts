import SessionRepository from "../repositories/session.repository";
import { Session } from "../entities/session.entity";
import { instanceToPlain, plainToInstance } from "class-transformer";
import { CreateSessionDto, UpdateSessionDto } from "../dto/session.dto";
import LoggerService from "./logger.service";
import HTTPException from "../exceptions/http.exception";
import { UserSessionRepository } from "../repositories/user-session.repository";
import { CreateUserSessionDto } from "../dto/user-session.dto";
import { UserSession } from "../entities/user-session.entity";
import UserRepository from "../repositories/user.repository";
import UserService from "./user.service";
import { SessionService } from "./session.service";

export class UserSessionService {
  private logger = LoggerService.getInstance("UserService()");
  constructor(private userSessionRepository:UserSessionRepository,private sessionService: SessionService,private userService:UserService) {}
  
  async addUserToSession(userSessionDto: CreateUserSessionDto): Promise<UserSession> {
    const userSession = plainToInstance(UserSession, instanceToPlain(userSessionDto));
    userSession.session=await this.sessionService.findOneById(userSessionDto.session_id);
    userSession.user=await this.userService.findOneById(userSessionDto.user_id);
    const result = await this.userSessionRepository.addUserToSession(userSession);
    this.logger.info(`User Session created with ID: ${result.id}`);
    return result;

  }
  async findAllSessions(): Promise<UserSession[]> {
    const userSessions = await this.userSessionRepository.getAll();
    return userSessions ;
  }
   async findOneById(session_id: number,user_id:number): Promise<UserSession> {
      const userSession = await this.userSessionRepository.getByUserAndSession(user_id,session_id);
      if (!userSession) {
        throw new HTTPException(404, "User Session not found");
      }
      return userSession;
    }


}
