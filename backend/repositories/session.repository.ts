import { Repository } from "typeorm";
import { Session } from "../entities/session.entity";
import { User } from "../entities/user.entity";
import { Material } from "../entities/material.entity";
import { UserSession } from "../entities/userSession.entity";

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
        userSessions: {
          user: true,
        },
        materials: true,
      },
    });
  }

  // Get sessions where a user is a participant
  async findByUserId(userId: number): Promise<Session[]> {
    return this.repository
      .createQueryBuilder("session")
      .leftJoinAndSelect("session.userSessions", "userSession")
      .leftJoinAndSelect("userSession.user", "user")
      .leftJoinAndSelect("session.materials", "materials")
      .where("user.id = :userId", { userId })
      .getMany();
  }

  // Get session by ID
  async findOneById(id: number): Promise<Session | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        userSessions: {
          user: true,
        },
        materials: true,
      },
    });
  }

  // Update a session
  async update(id: number, updates: Partial<Session>): Promise<void> {
    await this.repository.update(id, updates);
  }

  // Delete a session
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  // Assign roles in a session
  async setRoles(
    session: Session,
    roles: { user: User; role: string }[]
  ): Promise<void> {
    session.userSessions = roles.map(({ user, role }) => {
      const userSession = new UserSession();
      userSession.user = user;
      userSession.session = session;
      userSession.role = role;
      return userSession;
    });
    await this.repository.save(session);
  }

  // Remove role (remove participant from session)
  async removeUser(sessionId: number, userId: number): Promise<void> {
    const session = await this.repository.findOne({
      where: { id: sessionId },
      relations: { userSessions: true },
    });

    if (!session) return;

    session.userSessions = session.userSessions.filter(
      (us) => us.user.id !== userId
    );
    await this.repository.save(session);
  }

  // Add material
  async addMaterial(sessionId: number, material: Material): Promise<void> {
    const session = await this.repository.findOne({
      where: { id: sessionId },
      relations: { materials: true },
    });
    if (!session) return;

    session.materials.push(material);
    await this.repository.save(session);
  }

  // Delete material
  async deleteMaterial(sessionId: number, materialId: number): Promise<void> {
    const session = await this.repository.findOne({
      where: { id: sessionId },
      relations: { materials: true },
    });
    if (!session) return;

    session.materials = session.materials.filter((m) => m.id !== materialId);
    await this.repository.save(session);
  }
}

export default SessionRepository;
