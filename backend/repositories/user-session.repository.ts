import { Repository } from "typeorm";
import { UserSession } from "../entities/user-session.entity";
import { Session } from "../entities/session.entity";
import { User } from "../entities/user.entity";

export class UserSessionRepository {
  constructor(private repository: Repository<UserSession>) {}

  async addUserToSession(userSession: UserSession): Promise<UserSession> {
    return this.repository.save(userSession);
  }

  async getAll(): Promise<UserSession[]> {
    return this.repository.find({
      relations: { user: true, session: true },
    });
  }

  async getByUserAndSession(userId: number, sessionId: number): Promise<UserSession | null> {
    return this.repository.findOne({
      where: {
        user: { id: userId },
        session: { id: sessionId },
      },
      relations: { user: true, session: true },
    });
  }

  // Get all sessions a user is part of
  async getSessionsByUser(user: User): Promise<UserSession[]> {
    return this.repository.find({
      where: { user },
      relations: { session: true },
    });
  }

  // Get all users in a session
  async getUsersBySession(session: Session): Promise<UserSession[]> {
    return this.repository.find({
      where: { session },
      relations: { user: true },
    });
  }

  // Update a user's role in a session
  async updateRole(userId: number, sessionId: number, newRole: string): Promise<void> {
    await this.repository.update(
      { user: { id: userId }, session: { id: sessionId } },
      { role: newRole }
    );
  }

  // Remove user from session
  async removeUserFromSession(userId: number, sessionId: number): Promise<void> {
    await this.repository.delete({
      user: { id: userId },
      session: { id: sessionId },
    });
  }
}
