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
      className="relative flex h-[256px] w-[365px] cursor-pointer flex-col items-center justify-center gap-0 rounded-[10px] bg-white-97 transition-colors duration-300 hover:bg-black-25 focus:outline-none focus:ring-4 focus:ring-primary focus:ring-opacity-50"
      onClick={onClick}
    >
      <div className="relative flex h-full max-h-[96px] w-full flex-grow items-center justify-center">
        {icon}
      </div>
      <div className="absolute bottom-0 w-full pb-[12px] text-center text-black-100">
        {text}
      </div>
    </div>
  );
};
