interface ActionButtonProps {
  label: string;
  onClick?: () => void;
}

const ActionButton: React.FC<ActionButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center px-7 py-10 bg-cardColor border border-borderColor rounded-md text-white hover:bg-gray-800 hover:border-white transition"
    >
      <span className="text-2xl">{label}</span>
      <span className="text-4xl">+</span>
    </button>
  );
}

export default ActionButton;