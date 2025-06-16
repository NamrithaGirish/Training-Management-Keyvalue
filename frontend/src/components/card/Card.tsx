type DashboardCardProps = {
  label?: string;
  value?: number | string;
};

const DashboardCard: React.FC<DashboardCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-10 bg-cardColor text-white border border-gray-600 rounded-md p-7 w-50 h-50 shadow-sm">
      <h3 className="text-2xl text-gray-400 text-center">{label}</h3>
      <p className="text-5xl font-semibold mt-2 text-center">{value}</p>
    </div>
  );
};

export default DashboardCard;






