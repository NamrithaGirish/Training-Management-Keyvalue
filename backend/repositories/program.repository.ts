import { Repository } from "typeorm";

import { ProgramMember } from "../entities/program-member.entity";
import { Program } from "../entities/program.enity";

export default class ProgramRepository {
  constructor(private programRepo: Repository<Program>) {}

  findAll() {
    return this.programRepo.find();
  }

  findProgramsByUser(userId: number) {
    return this.programRepo
      .createQueryBuilder("program")
      .leftJoin("program.members", "member")
      .where("member.user.id = :userId", { userId })
      .getMany();
  }

  findOneById(id: number) {
    return this.programRepo.findOne({ where: { id }, relations: ["members", "members.user"] });
  }

  saveProgram(programDto: Partial<Program>) {
    const program = this.programRepo.create(programDto);
    return this.programRepo.save(program);
  }

  updateProgram(id: number, programDto: Partial<Program>) {
    return this.programRepo.save({ id, ...programDto });
  }

  deleteProgram(id: number) {
    return this.programRepo.delete(id);
  }

  async addMembers(programId: number, members: { userId: number, role: string }[]) {
    const insertValues = members.map(m => ({
      program: { id: programId },
      user: { id: m.userId },
      role: m.role,
    }));

    return this.programRepo.manager.getRepository(ProgramMember).save(insertValues);
  }

  async removeMember(programId: number, userId: number) {
    return this.programRepo.manager.getRepository(ProgramMember).delete({ program: { id: programId }, user: { id: userId } });
  }
}