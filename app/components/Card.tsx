import { Arrows } from "./Arrows";

export const Card = () => {
  return (
    <div className="border border-black w-[7cm] h-[12cm] flex flex-col justify-between py-2 items-stretch px-2 gap-2">
      <Arrows />

      <h1 contentEditable className="text-2xl font-display text-center">
        Title
      </h1>
      <p className="text-center text-xs" contentEditable>
        2d8 Piercing | 1d6 Fire
      </p>
      <hr className="border-0.5 border-blue-400" />
      <div className="flex flex-row gap-4 justify-center text-center text-xs">
        <Bonus />
        <Bonus />
        <Bonus />
      </div>
      <div className="text-[7pt] flex-1" contentEditable>
        Description
      </div>

      <Arrows />
    </div>
  );
};

const Bonus = () => {
  return (
    <div>
      <p contentEditable>+1</p>
      <p contentEditable className="text-[8pt]">
        BONUS
      </p>
    </div>
  );
};
