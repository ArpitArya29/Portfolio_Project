import React from "react";

const MultiselectSection = ({ title, items, selected, setSelected }) => {
  const toggle = (id) => {
    if (selected.includes(id)) {
      setSelected(selected.filter((i) => i !== id));
    } else {
      setSelected([...selected, id]);
    }
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">{title}</h3>

      <div className="flex flex-wrap gap-2">
        {items.map((item) => {
          const isSelected = selected.includes(item.id);

          return (
            <button
              key={item.id}
              onClick={() => toggle(item.id)}
              className={`
                px-3 py-1 rounded-full text-sm transition-all duration-200 border
                ${
                  isSelected
                    ? "bg-primary/20 text-primary border-primary/40 shadow-sm"
                    : "bg-base-300 text-base-content/70 border-base-300 hover:bg-base-200"
                }
              `}
            >
              {item.name || item.title || item.company}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MultiselectSection;
