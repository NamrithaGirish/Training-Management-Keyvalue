import { Program } from "../entities/program.entity";
import { ProgramMember } from "../entities/program-member.entity";
import type ProgramRepository from "../repositories/program.repository";

export default class ProgramService {
  constructor(private programRepository: ProgramRepository) {}

  async getAllPrograms(userId?: number) {
    if (userId) return this.programRepository.findProgramsByUser(userId);
    return this.programRepository.findAll();
  }

  async getProgramById(id: number) {
    return this.programRepository.findOneById(id);
  }

  async createProgram(programDto: Partial<Program>) {
    return this.programRepository.saveProgram(programDto);
  }

  async updateProgram(id: number, programDto: Partial<Program>) {
    return this.programRepository.updateProgram(id, programDto);
  }

  async deleteProgram(id: number) {
    return this.programRepository.deleteProgram(id);
  }

  async addMembers(programId: number, members: { userId: number, role: string }[]) {
    return this.programRepository.addMembers(programId, members);
  }

  async removeMember(programId: number, userId: number) {
    return this.programRepository.removeMember(programId, userId);
  }
}
