import type { MetaFunction } from "@remix-run/cloudflare";
import { Card } from "~/components/Card";

export const meta: MetaFunction = () => {
  return [
    { title: "Card maker" },
    {
      name: "description",
      content: "Its cards",
    },
  ];
};

export default function Index() {
  return (
    <div className="p-[0.25in]">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(3in,1fr))] gap-[0.25in]">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
}
