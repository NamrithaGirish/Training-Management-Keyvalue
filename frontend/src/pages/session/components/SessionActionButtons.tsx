import type { UserRole } from "./sessionTypes";

interface SessionActionButtonsProps {
  userRole: UserRole;
  onUploadAssignment: () => void;
  onGiveFeedback: () => void;
  onUploadMaterials: () => void;
}

export const SessionActionButtons: React.FC<SessionActionButtonsProps> = ({
  userRole,
  onUploadAssignment,
  onGiveFeedback,
  onUploadMaterials
}) => {
  switch (userRole) {
    case "candidate":
      return (
        <div className="flex gap-4">
          <button
            onClick={onGiveFeedback}
            className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Give Feedback
          </button>
          <button
            onClick={onUploadAssignment}
            className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Upload Assignment
          </button>
        </div>
      );
    
    case "trainer":
      return (
        <div className="flex gap-4">
          <button
            onClick={onUploadMaterials}
            className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Upload Materials ↑
          </button>
          <button
            onClick={onGiveFeedback}
            className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Give Feedback
          </button>
        </div>
      );
    
    case "moderator":
      return (
        <div className="flex gap-4">
          <button
            onClick={onGiveFeedback}
            className="px-4 py-2 border border-white rounded-md hover:bg-white hover:text-black transition"
          >
            Give Feedback
          </button>
        </div>
      );
    
    default:
      return null;
  }
};