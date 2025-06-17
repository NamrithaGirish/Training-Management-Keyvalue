export type UserRole = "candidate" | "trainer" | "moderator";

export interface SessionData {
  trainerName: string;
  moderators: string[];
  sessionDescription: string;
  uploadedMaterials?: string[];
}

// export interface SessionPageProps {
//   userRole: UserRole;
//   sessionData: SessionData;
// }