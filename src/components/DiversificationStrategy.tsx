import React from 'react';

const DiversificationStrategy = () => {
  const strategies = [
    {
      title: "Asset Allocation",
      description: "Distributing investments across various asset classes to reduce risk."
    },
    {
      title: "Sector Diversification",
      description: "Investing in different sectors to mitigate sector-specific risks."
    },
    {
      title: "Geographic Diversification",
      description: "Spreading investments across different regions to minimize country-specific risks."
    },
    {
      title: "Investment Style Diversification",
      description: "Combining different investment styles, such as growth and value investing."
    },
  ];

  return (
    <div id="strategy" className="relative bg-navy py-20 overflow-hidden">
      <div className="container mx-auto px-4">
        <h2 className="text-6xl font-bold text-white text-center mb-12">Diversification Strategies</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {strategies.map((strategy, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-2xl font-semibold mb-2">{strategy.title}</h3>
              <p className="text-gray-700">{strategy.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DiversificationStrategy;