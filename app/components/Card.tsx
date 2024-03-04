import { CardStatType, CardType } from "~/data/card";
import { Arrows } from "./Arrows";
import { Fragment } from "react/jsx-runtime";
import { numberWithMod } from "~/utils/numbers";

const rarityColors = {
  common: "#CECDC3",
  uncommon: "#66800B",
  rare: "#205EA6",
  "very rare": "#5E409D",
  legendary: "#BC5215",
  artifact: "#A02F6F",
} as const;

export const Card = (props: CardType) => {
  return (
    <div
      className="border border-black w-[7cm] h-[12cm] flex flex-col justify-between py-2 items-stretch px-2 gap-2"
      style={{ pageBreakInside: "avoid" }}
    >
      <Arrows fill={rarityColors[props.rarity]} />

      <h1 className="text-2xl font-display text-center">{props.name}</h1>
      <p className="text-center text-xs">
        {props.damage.map((d, i, arr) => {
          return (
            <Fragment key={i}>
              <span className="capitalize">
                {d.count}
                {d.dice}
                {!!d.bonus && <>+{d.bonus}</>}&nbsp;{d.type}
              </span>
              {i !== arr.length - 1 && <>&nbsp;|&nbsp;</>}
            </Fragment>
          );
        })}
      </p>
      <hr
        className="border-0.5"
        style={{ borderColor: rarityColors[props.rarity] }}
      />
      <div className="flex flex-row gap-4 justify-center text-center text-xs">
        {props.stats.map((s, i) => (
          <Bonus key={i} {...s} />
        ))}
      </div>
      <div className="text-[7pt] flex-1">
        <p className="italic">{props.description}</p>
        {props.effects.map((e) => {
          return (
            <p key={e.title} className="leading-tight text-justify mb-0.5">
              <span className="font-bold">{e.title}.&nbsp;</span>
              {e.description}
            </p>
          );
        })}
      </div>

      <Arrows fill={rarityColors[props.rarity]} />
    </div>
  );
};

const Bonus = (props: CardStatType) => {
  if (props.type === "bonus") {
    return (
      <div>
        <p>{numberWithMod(props.bonusValue)}</p>
        <p className="text-[8pt]">BONUS</p>
      </div>
    );
  }
  if (props.type === "save_dc") {
    return (
      <div>
        <p>
          {props.saveValue}&nbsp;
          {props.stat.toUpperCase()}
        </p>
        <p className="text-[8pt]">SAVE DC</p>
      </div>
    );
  }
  if (props.type === "charges") {
    return (
      <div>
        <p>{numberWithMod(props.count)}</p>
        <p className="text-[8pt]">Charges</p>
      </div>
    );
  }
  if (props.type === "ac") {
    return (
      <div>
        <p>{props.acValue}</p>
        <p className="text-[8pt]">AC</p>
      </div>
    );
  }

  return null;
};
