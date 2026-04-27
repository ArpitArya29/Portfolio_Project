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
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-4 hover:shadow-xl hover:bg-white/10 transition-all duration-300">
      {/* top part */}
      <div className="flex justify-between items-start">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-white">
            {portfolio.title}
          </h3>
          <p className="text-sm text-slate-300 mt-1 line-clamp-2">
            {portfolio.bio}
          </p>
        </div>
        <div className="flex gap-2 ml-4">
          <button
            onClick={onEdit}
            className="p-2 text-purple-400 hover:text-purple-300 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Pencil size={18} />
          </button>
          <button
            onClick={() => deletePortfolio(portfolio.id)}
            className="p-2 text-red-400 hover:text-red-300 rounded-lg hover:bg-white/5 transition-colors"
          >
            <Trash size={18} />
          </button>
        </div>
      </div>

      {/* stats */}
      <div className="flex gap-6 text-sm text-slate-400">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          Skills: {portfolio.skills?.length || 0}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-green-400"></span>
          Exp: {portfolio.experiences?.length || 0}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-orange-400"></span>
          Projects: {portfolio.projects?.length || 0}
        </span>
      </div>

      {/* Public link */}
      <div className="bg-white/5 rounded-xl p-4 flex items-center justify-between border border-white/5">
        <p className="text-xs truncate max-w-[70%] text-slate-400">
          {publicUrl}
        </p>
        <div className="flex gap-2">
          <button
            onClick={handleCopy}
            className="p-2 text-blue-400 hover:text-blue-300 rounded-lg hover:bg-white/10 transition-colors"
          >
            <Copy size={16} />
          </button>

          <a
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 text-green-400 hover:text-green-300 rounded-lg hover:bg-white/10 transition-colors"
          >
            <ExternalLink size={16} />
          </a>
        </div>
      </div>
    </div>
  );
};

export default PortfolioCard;
