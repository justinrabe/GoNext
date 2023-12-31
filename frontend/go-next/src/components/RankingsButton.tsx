import { useState } from 'react';

interface RankingsButtonProps {
  name: string;
  onClick: () => void;
}

export default function RankingsButton({ name, onClick }: RankingsButtonProps) {
  return (
    <button
      className={`max-w-[171px] px-3 py-2 font-display text-[20px] font-medium uppercase text-gold4 focus:border-b-[3px] focus:border-b-[#785A28] `}
      onClick={onClick}
    >
      {name}
    </button>
  );
}
