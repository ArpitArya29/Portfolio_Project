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
    <div className="space-y-6 w-full">
      <div className="flex justify-between items-center w-full p-8">
        <h1 className="text-4xl font-bold underline">Your Portfolios</h1>
        <button
          onClick={() => {
            setEditPortfolio(null);
            setOpenModel(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800 transition cursor-pointer"
        >
          + Add Portfolio
        </button>
      </div>

      {allPortfolios.length > 0 ? (
        <div className="grid grid-cols-2 gap-4 px-8">
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
        <div className="text-center">
          <p className="text-xl font-bold">No any portfolios created</p>
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
