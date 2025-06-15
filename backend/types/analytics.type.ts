interface OverallAnalytics {
  totalUsers: number;
  totalAdminUsers: number;
  totalPrograms: number;
  totalSessions: number;
  draftPrograms: number;
  scheduledPrograms: number;
  activePrograms: number;
  completedPrograms: number;
  sessionsToday: number;
  sessionsThisWeek: number;
}

interface UserAnalytics {
  userId: number;
  username: string;
  email: string;
  isAdmin: boolean;
  totalPrograms: number;
  totalSessions: number;
  completedPrograms: number;
  completedSessions: number;
  activePrograms: {
    programId: number;
    programName: string;
    numberOfSessions: number;
    completedSessions: number;
    nextSession: {
      sessionId: number;
      sessionName: string;
      scheduledTime: Date;
    } | null;
    pendingAssignments: {
      assignmentId: number;
      assignmentName: string;
      dueDate: Date;
    }[];
  };
}
