import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { usePublicStore } from "../Stores/usePublicStore";
import { Loader } from "lucide-react";
import PortfolioUI from "../Components/PortfolioUI";

const UserPortfolioPage = () => {
  const { publicId } = useParams();

  const { isFetchingData, portfolioData, fetchPortfolioData } =
    usePublicStore();

  useEffect(() => {
    fetchPortfolioData(publicId);
  }, []);

  if (isFetchingData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div>
          <Loader size={12} />
          <p className="text-sm font-semibold ">Fetching portfolio Details</p>
        </div>
      </div>
    );
  }

  if (!portfolioData) {
    // If no real data is found, show the UI with placeholder mock data for demonstration
    return (
      // <PortfolioUI />
      <div>
        portfolio not found
      </div>
    );
  }

  console.log(portfolioData);
  

  return (
    <PortfolioUI portfolio={portfolioData} />
  );
};

export default UserPortfolioPage;
