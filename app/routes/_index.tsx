import type { MetaFunction } from "@remix-run/cloudflare";
import { Link, useLoaderData } from "@remix-run/react";
import { Card } from "~/components/Card";
import { listCards } from "~/data/card";

export const meta: MetaFunction = () => {
  return [
    { title: "Card maker" },
    {
      name: "description",
      content: "Its cards",
    },
  ];
};

export const clientLoader = async () => {
  const cards = await listCards();

  return { cards };
};

export default function Index() {
  const { cards } = useLoaderData<typeof clientLoader>();
  return (
    <div className="px-[0.25in]">
      <Link to="create">Create Card</Link>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(3in,1fr))] gap-[0.25in]">
        {cards.map(([id, card]) => {
          return (
            <div key={id}>
              <Card {...card} />
              <Link to={`edit/${id}`}>Edit</Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
