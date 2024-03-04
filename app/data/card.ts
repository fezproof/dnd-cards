import localforage from "localforage";
import { z } from "zod";

export const statTypes = ["con", "dex", "str", "cha", "int", "wis"] as const;
export const itemTypes = ["weapon", "armour", "trinket"] as const;
export const damageTypes = [
  "bludgeoning",
  "piercing",
  "slashing",
  "acid",
  "cold",
  "fire",
  "force",
  "lightning",
  "necrotic",
  "poison",
  "psychic",
  "radiant",
  "thunder",
] as const;
export const rarityTypes = [
  "common",
  "uncommon",
  "rare",
  "very rare",
  "legendary",
  "artifact",
] as const;
export const diceTypes = ["d4", "d6", "d8", "d10", "d12", "d20"] as const;

const itemStatSchema = z.discriminatedUnion("type", [
  z.object({
    type: z.literal("bonus"),
    bonusValue: z.number().min(-5).max(5),
  }),
  z.object({
    type: z.literal("save_dc"),
    stat: z.enum(statTypes),
    saveValue: z.number().min(1).max(30),
  }),
  z.object({
    type: z.literal("charges"),
    count: z.number().min(2),
  }),
  z.object({
    type: z.literal("ac"),
    acValue: z.number().min(10).max(25),
    addDex: z.boolean().optional(),
    maxDex: z.number().optional(),
  }),
]);

export type CardStatType = z.output<typeof itemStatSchema>;

export const itemSchema = z.object({
  name: z.string(),
  description: z.string().max(280),
  type: z.enum(itemTypes),
  rarity: z.enum(rarityTypes),
  requiresAttunement: z.boolean(),
  stats: z.array(itemStatSchema),
  effects: z.array(
    z.object({
      title: z.string(),
      description: z.string(),
    })
  ),
  damage: z.array(
    z.object({
      type: z.enum(damageTypes),
      dice: z.enum(diceTypes),
      count: z.number().min(1),
      bonus: z.number().optional(),
    })
  ),
});

export type CardType = z.output<typeof itemSchema>;

const itemStore = localforage.createInstance({
  name: "cards",
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
});

export const getCard = async (id: string) => {
  const res = await itemStore.getItem(id);
  if (!res) {
    return undefined;
  }
  const item = itemSchema.safeParse(res);
  if (item.success) {
    return [id, item.data] as const;
  }
  return undefined;
};

export const listCards = async () => {
  const keys = await itemStore.keys();
  const items = await Promise.all(keys.map((k) => getCard(k)));
  return items.filter((v): v is NonNullable<typeof v> => !!v);
};

export const updateCard = async (
  id: string,
  item: z.input<typeof itemSchema>
) => {
  const parsedItem = itemSchema.safeParse(item);
  if (!parsedItem.success) {
    return false;
  }
  await itemStore.setItem(id, parsedItem.data);
  return true;
};

export const createCard = async (item: z.input<typeof itemSchema>) => {
  const parsedItem = itemSchema.safeParse(item);
  if (!parsedItem.success) {
    return undefined;
  }
  const id = crypto.randomUUID();
  const res = await itemStore.setItem(id, parsedItem.data);
  return [id, res] as const;
};
