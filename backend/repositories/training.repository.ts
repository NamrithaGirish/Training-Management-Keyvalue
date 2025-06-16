import { Repository } from "typeorm";
import { Training } from "../entities/training.entity";
import {
  TrainingUser,
  TrainingUserRole,
} from "../entities/training-users.entity";
// import { TrainingMember } from "../entities/training-member.entity";

export default class TrainingRepository {
  constructor(private trainingRepo: Repository<Training>) {}

  findAll() {
    return this.trainingRepo.find();
  }

  findTrainingsByUser(userId: number) {
    return this.trainingRepo
      .createQueryBuilder("training")
      .leftJoin("training.user", "member")
      .where("member.user.id = :userId", { userId })
      .getMany();
  }

  findOneById(id: number) {
    return this.trainingRepo.findOne({
      where: { id },
      relations: ["members", "members.user"],
    });
  }

  saveTraining(trainingDto: Partial<Training>) {
    const training = this.trainingRepo.create(trainingDto);
    return this.trainingRepo.save(training);
  }

  updateTraining(id: number, trainingDto: Partial<Training>) {
    return this.trainingRepo.save({ id, ...trainingDto });
  }

  deleteTraining(id: number) {
    return this.trainingRepo.delete(id);
  }

  //   async addMembers(
  //     trainingId: number,
  //     members: { userId: number; role: string }[]
  //   ) {
  //     const insertValues = members.map((m) => ({
  //       training: { id: trainingId },
  //       user: { id: m.userId },
  //       role: m.role,
  //     }));

  //     return this.trainingRepo.manager
  //       .getRepository(TrainingMember)
  //       .save(insertValues);
  //   }

  //   async removeMember(trainingId: number, userId: number) {
  //     return this.trainingRepo.manager
  //       .getRepository(TrainingMember)
  //       .delete({ training: { id: trainingId }, user: { id: userId } });
  //   }
  async addMembers(
    trainingId: number,
    members: { userId: number; role: string }[]
  ) {
    const insertValues = members.map((m) => ({
      training: { id: trainingId },
      user: { id: m.userId },
      role: m.role as TrainingUserRole,
    }));

    return this.trainingRepo.manager
      .getRepository(TrainingUser)
      .save(insertValues);
  }

  async removeMembers(trainingId: number, userIds: number[]) {
    const trainingUserRepo =
      this.trainingRepo.manager.getRepository(TrainingUser);
    return trainingUserRepo.delete(
      userIds.map((userId) => ({
        training: { id: trainingId },
        user: { id: userId },
      }))
    );
  }
}
