import { Repository } from "typeorm";
import { Session } from "../entities/session.entity";
import { User } from "../entities/user.entity";
import { Material } from "../entities/material.entity";
import { UserSession } from "../entities/user-session.entity";

class SessionRepository {
  constructor(private repository: Repository<Session>) {}

  // Create a new session
  async create(session: Session): Promise<Session> {
    return this.repository.save(session);
  }

  // Get all sessions
  async findAll(): Promise<Session[]> {
    return this.repository.find({
      relations: {
        training:true,
        userSessions: {
          user: true,
        },
        materials: true,
      },
    });
  }

//   // Get sessions where a user is a participant
//   async findByUserId(userId: number): Promise<Session[]> {
//     return this.repository
//       .createQueryBuilder("session")
//       .leftJoinAndSelect("session.userSessions", "userSession")
//       .leftJoinAndSelect("userSession.user", "user")
//       .leftJoinAndSelect("session.materials", "materials")
//       .where("user.id = :userId", { userId })
//       .getMany();
//   }

  // Get session by ID
  async findOneById(id: number): Promise<Session | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        training:true,
        userSessions: {
          user: true,
        },
        materials: true,
      },
    });
  }

  // Update a session
  async update(
        id: number,
        data: Partial<Omit<Session, "id">>
    ): Promise<Session| undefined> {
        return this.repository.save({ id, ...data });
    }

  // Delete a session
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }
  

  
}

export default SessionRepository;
