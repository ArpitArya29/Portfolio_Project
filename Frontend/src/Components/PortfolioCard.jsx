import React from "react";
import { Copy, ExternalLink, Pencil, Trash } from "lucide-react";
import toast from "react-hot-toast";
import { usePortfolioStore } from "../Stores/usePortfolioStore";

const PortfolioCard = ({ portfolio, onEdit }) => {
  const { deletePortfolio } = usePortfolioStore();

  const publicUrl = `${window.location.origin}/portfolio/${portfolio.publicId}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(publicUrl);
    toast.success("Link Copied");
  };

  return (
    <div className="bg-base-100 border border-base-300 rounded-xl p-5 space-y-4 hover:shadow-lg transition">
      {/* top part */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-semibold">{portfolio.title}</h3>
          <p className="text-sm text-gray-400 mt-1 line-clamp-2">
            {portfolio.bio}
          </p>
        </div>
        <div className="flex gap-2">
          <button onClick={onEdit} className="p-2 text-blue-400 hover:text-blue-600">
            <Pencil size={18} />
          </button>
          <button
            onClick={() => deletePortfolio(portfolio.id)}
            className="p-2 text-red-400 hover:text-red-600"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="flex gap-4 text-sm text-gray-400">
        <span>Skills: {portfolio.skills?.length || 0}</span>
        <span>Exp: {portfolio.experiences?.length || 0}</span>
        <span>Projects: {portfolio.projects?.length || 0}</span>
      </div>

      {/* Public link */}
      <div className="bg-base-200 rounded-lg p-3 flex items-center justify-between ">
        <p className="text-xs truncate max-w-[70%] text-gray-400">
          {publicUrl}
        </p>
        <div className="flex gap-2">
          <button onClick={handleCopy} className="p-2 hover:text-blue-400">
            <Copy size={16} />
          </button>

          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 hover:text-green-400"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
