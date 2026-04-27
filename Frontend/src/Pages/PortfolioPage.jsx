import React, { useEffect, useState } from "react";
import { usePortfolioStore } from "../Stores/usePortfolioStore";
import { Loader } from "lucide-react";
import PortfolioCard from "../Components/PortfolioCard";
import PortfolioModel from "../Components/PortfolioModel";

const PortfolioPage = () => {
  const { allPortfolios, getAllPortfolios, isFetchingPortfolios } =
    usePortfolioStore();

  const [openModel, setOpenModel] = useState(false);
  const [editPortfolio, setEditPortfolio] = useState(null);

  if (isFetchingPortfolios) {
    return (
      <div className="flex items-center justify-center">
        <Loader className="h-5 w-5" />
      </div>
    );
  }

  return (
    <div className="space-y-8 w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center w-full gap-4">
        <h1 className="text-4xl font-bold text-white bg-linear-to-r from-purple-400 via-violet-500 to-indigo-500 bg-clip-text">
          Your Portfolios
        </h1>
        <button
          onClick={() => {
            setEditPortfolio(null);
            setOpenModel(true);
          }}
          className="bg-linear-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          + Add Portfolio
        </button>
      </div>

      {allPortfolios.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {allPortfolios.map((portfolio) => (
            <PortfolioCard
              key={portfolio.id}
              portfolio={portfolio}
              onEdit={() => {
                setEditPortfolio(portfolio);
                setOpenModel(true);
              }}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
            <p className="text-xl font-semibold text-slate-300">
              No portfolios created
            </p>
            <p className="text-slate-400 mt-2">
              Start by adding your first portfolio!
            </p>
          </div>
        </div>
      )}

      {openModel && (
        <PortfolioModel
          editPortfolio={editPortfolio}
          onClose={() => {
            setOpenModel(false);
          }}
        />
      )}
    </div>
  );
};

export default PortfolioPage;
