import { Training } from "../entities/training.entity";
import type TrainingRepository from "../repositories/training.repository";

export default class TrainingService {
  constructor(private trainingRepository: TrainingRepository) {}

  async getAllTrainings(userId?: number) {
    if (userId) return this.trainingRepository.findOneById(userId);
    return this.trainingRepository.findAll();
  }

  async getTrainingById(id: number) {
    return this.trainingRepository.findOneById(id);
  }

  async createTraining(trainingDto: Partial<Training>) {
    return this.trainingRepository.saveTraining(trainingDto);
  }

  async updateTraining(id: number, trainingDto: Partial<Training>) {
    return this.trainingRepository.updateTraining(id, trainingDto);
  }

  async deleteTraining(id: number) {
    return this.trainingRepository.deleteTraining(id);
  }

  // async addMembers(
  //   trainingId: number,
  //   members: { userId: number; role: string }[]
  // ) {
  //   return this.trainingRepository.addMembers(trainingId, members);
  // }

  // async removeMember(trainingId: number, userId: number) {
  //   return this.trainingRepository.removeMember(trainingId, userId);
  // }
  addMembers(trainingId: number, members: { userId: number; role: string }[]) {
    return this.trainingRepository.addMembers(trainingId, members);
  }

  removeMembers(trainingId: number, userIds: number[]) {
    return this.trainingRepository.removeMembers(trainingId, userIds);
  }
}
