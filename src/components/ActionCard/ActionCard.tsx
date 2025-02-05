import React from "react";

interface ActionCardProps {
  icon?: React.ReactNode;
  text: string;
  onClick: () => void;
}

export const ActionCard = ({ icon, text, onClick }: ActionCardProps) => {
  return (
    <div
      role="button"
      tabIndex={0}
      className="relative flex h-[256px] max-w-[365px] cursor-pointer flex-col items-center justify-center gap-0 rounded-[10px] bg-white-97 transition-colors duration-300 hover:bg-black-25 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
      onClick={onClick}
    >
      <div className="flex max-h-[96px] flex-grow items-center justify-center">
        {icon}
      </div>
      <span className="absolute bottom-0 pb-[12px] text-center text-md">
        {text}
      </span>
    </div>
  );
};
