interface ActionButtonProps {
  label: string;
  onClick?: () => void;
  endAdornment?: React.ReactNode;
  type?: "button" | "submit" | "reset";
}

const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  endAdornment,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      className="w-full flex justify-between items-center px-7 py-10 bg-cardColor border border-borderColor rounded-md text-white hover:bg-gray-800 hover:border-white transition"
    >
      <span className="text-2xl">{label}</span>
      <div className="flex items-center gap-2 text-xl">
        {endAdornment}
        <span className="text-4xl">+</span>
      </div>
    </button>
  );
};

export default ActionButton;
