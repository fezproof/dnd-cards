import { FormId, useFormMetadata } from "@conform-to/react";
import NumberInput from "~/components/inputs/number-input";
import SelectInput from "~/components/inputs/select-input";
import TextArea from "~/components/inputs/text-area";
import TextInput from "~/components/inputs/text-input";
import {
  CardType,
  damageTypes,
  diceTypes,
  itemTypes,
  rarityTypes,
  statTypes,
} from "~/data/card";

type CardFormFieldProps = {
  formId: FormId<CardType>;
};

export default function CardFormFields(props: CardFormFieldProps) {
  const form = useFormMetadata(props.formId);
  const fields = form.getFieldset();

  const damage = fields.damage.getFieldList();
  const stats = fields.stats.getFieldList();
  const effects = fields.effects.getFieldList();

  return (
    <>
      <fieldset className="mb-8">
        <legend className="mb-2">Basic Info</legend>
        <TextInput name={fields.name.name} label="Name" type="text" />
        <div className="grid grid-cols-2 gap-2">
          <SelectInput name={fields.rarity.name} label="Rarity">
            {rarityTypes.map((r) => (
              <option key={r} value={r}>
                {r.toLocaleUpperCase()}
              </option>
            ))}
          </SelectInput>
          <SelectInput name={fields.type.name} label="Item type">
            {itemTypes.map((t) => (
              <option key={t} value={t}>
                {t.toLocaleUpperCase()}
              </option>
            ))}
          </SelectInput>
        </div>

        <TextArea name={fields.description.name} label="Visual description" />
      </fieldset>

      <fieldset className="mb-6">
        <legend className="mb-2">Damage values</legend>
        <ol className="mb-2 list-outside list-decimal">
          {damage.map((d, index) => {
            const damageFields = d.getFieldset();

            return (
              <li
                key={d.key}
                className="flex flex-row flex-nowrap gap-4 items-center"
              >
                <NumberInput
                  className="w-16"
                  name={damageFields.count.name}
                  label="Dice count"
                />
                <SelectInput
                  className="w-16"
                  name={damageFields.dice.name}
                  label="Dice"
                >
                  {diceTypes.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </SelectInput>
                <SelectInput
                  className="w-40"
                  name={damageFields.type.name}
                  label="Damage type"
                >
                  {damageTypes.map((d) => (
                    <option key={d} value={d}>
                      {d.toLocaleUpperCase()}
                    </option>
                  ))}
                </SelectInput>
                <NumberInput
                  className="w-12"
                  name={damageFields.bonus.name}
                  label="Bonus"
                />
                <button
                  className="w-8 h-8 mt-3 ml-auto pt-0.5 rounded-full outline-none hover:bg-base-150 focus:bg-base-150"
                  {...form.remove.getButtonProps({
                    name: fields.damage.name,
                    index,
                  })}
                >
                  &#10005;
                </button>
              </li>
            );
          })}
        </ol>

        <button
          className="w-full p-1 outline-none rounded border border-base-100 hover:border-base-150 focus:border-base-200 focus:ring-1 focus:ring-base-200"
          {...form.insert.getButtonProps({
            name: fields.damage.name,
            defaultValue: {
              count: 1,
              dice: "d4",
              type: "bludgeoning",
              bonus: undefined,
            },
          })}
        >
          Add damage
        </button>
      </fieldset>

      <fieldset className="mb-6">
        <legend className="mb-2">Stat values</legend>
        <ol className="mb-2 list-outside list-decimal">
          {stats.map((stat, index) => {
            const statFields = stat.getFieldset();

            const selectedType = statFields.type.value;

            return (
              <li
                key={stat.key}
                className="flex flex-row flex-nowrap gap-4 items-center"
              >
                <SelectInput
                  className="w-32"
                  name={statFields.type.name}
                  label="Dice"
                >
                  <option value={"bonus"}>BONUS</option>
                  <option value={"save_dc"}>SAVE DC</option>
                  <option value={"charges"}>CHARGES</option>
                  <option value={"ac"}>AC</option>
                </SelectInput>

                {selectedType === "bonus" && (
                  <NumberInput
                    className="w-12"
                    name={statFields.bonusValue.name}
                    label="Value"
                  />
                )}

                {selectedType === "save_dc" && (
                  <>
                    <NumberInput
                      className="w-12"
                      name={statFields.saveValue.name}
                      label="Value"
                    />
                    <SelectInput
                      name={statFields.stat.name}
                      label="Stat"
                      className="w-20"
                    >
                      {statTypes.map((s) => (
                        <option key={s} value={s}>
                          {s.toLocaleUpperCase()}
                        </option>
                      ))}
                    </SelectInput>
                  </>
                )}

                {selectedType === "charges" && (
                  <NumberInput
                    className="w-12"
                    name={statFields.count.name}
                    label="Count"
                  />
                )}

                {selectedType === "ac" && (
                  <>
                    <NumberInput
                      key="ac"
                      className="w-12"
                      name={statFields.acValue.name}
                      label="Value"
                    />
                    {/* Dex controls */}
                  </>
                )}

                <button
                  className="w-8 h-8 mt-3 ml-auto pt-0.5 rounded-full outline-none hover:bg-base-150 focus:bg-base-150"
                  {...form.remove.getButtonProps({
                    name: fields.stats.name,
                    index,
                  })}
                >
                  &#10005;
                </button>
              </li>
            );
          })}
        </ol>

        <button
          className="w-full p-1 outline-none rounded border border-base-100 hover:border-base-150 focus:border-base-200 focus:ring-1 focus:ring-base-200"
          {...form.insert.getButtonProps({
            name: fields.stats.name,
            defaultValue: {
              type: "bonus",
            },
          })}
        >
          Add stat
        </button>
      </fieldset>

      <fieldset className="mb-6">
        <legend className="mb-2">Effects</legend>
        <ol className="mb-2 space-y-3 list-decimal list-outside">
          {effects.map((e, index) => {
            const effectFields = e.getFieldset();

            return (
              <li
                key={e.key}
                className="grid grid-cols-[1fr,auto] gap-x-4 gap-y-0 items-center"
              >
                <TextInput
                  className="w-52"
                  name={effectFields.title.name}
                  type="text"
                  label="Title"
                />
                <TextArea
                  className="col-span-2 col-start-1 row-start-2"
                  rows={8}
                  name={effectFields.description.name}
                  label="Description"
                />

                <button
                  className="row-start-1 col-start-2 w-8 h-8 mt-3 pt-0.5 rounded-full outline-none hover:bg-base-150 focus:bg-base-150"
                  {...form.remove.getButtonProps({
                    name: fields.effects.name,
                    index,
                  })}
                >
                  &#10005;
                </button>
              </li>
            );
          })}
        </ol>

        <button
          className="w-full p-1 outline-none rounded border border-base-100 hover:border-base-150 focus:border-base-200 focus:ring-1 focus:ring-base-200"
          {...form.insert.getButtonProps({
            name: fields.effects.name,
          })}
        >
          Add effect
        </button>
      </fieldset>
    </>
  );
}
