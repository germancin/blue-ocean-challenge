import { Trophy, Users, TrendingUp } from 'lucide-react';

const Stats = () => {
  const stats = [
    {
      icon: <Trophy className="w-8 h-8 text-bright-blue" />,
      value: "$100K+",
      label: "Prize Pool",
    },
    {
      icon: <Users className="w-8 h-8 text-bright-blue" />,
      value: "10K+",
      label: "Active Traders",
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-bright-blue" />,
      value: "24/7",
      label: "Live Trading",
    },
  ];

  return (
    <div className="bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg hover:shadow-lg transition-shadow duration-200"
            >
              {stat.icon}
              <h3 className="text-4xl font-bold text-navy mt-4 mb-2">{stat.value}</h3>
              <p className="text-dark-gray">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Stats;