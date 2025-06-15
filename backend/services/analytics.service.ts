import HTTPException from "../exceptions/http.exception";
import LoggerService from "./logger.service";
import UserService from "./user.service";

export default class AnalyticsService {
  private logger = LoggerService.getInstance(AnalyticsService.name);

  constructor(private userService: UserService) {}

  async getUserCount() {
    return await this.userService.countUsers();
  }

  async getOverallAnalytics(): Promise<OverallAnalytics> {
    throw new Error("Method not implemented.");
  }

  async getUserAnalytics(userId: number): Promise<UserAnalytics> {
    throw new Error("Method not implemented.");
  }

  async getSingleProgramAnalytics(programId: number) {
    throw new Error("Method not implemented.");
  }

  async exportUserList(): Promise<Buffer> {
    const userList = await this.userService.findAllUsers();

    const csvHeader = "ID,Username,Email,IsAdmin\n";

    const csvContent = userList
      .map((user) => {
        return `${user.id},${user.username},${user.email},${user.isAdmin}`;
      })
      .join("\n");

    return Buffer.from(csvHeader + csvContent, "utf-8");
  }

  async exportProgramList(): Promise<Buffer> {
    throw new Error("Method not implemented.");
  }

  async exportSingleProgram(programId: number): Promise<Buffer> {
    throw new Error("Method not implemented.");
  }

  async exportSessionList(): Promise<Buffer> {
    throw new Error("Method not implemented.");
  }

  async exportSingleSession(sessionId: number): Promise<Buffer> {
    throw new Error("Method not implemented.");
  }
}
