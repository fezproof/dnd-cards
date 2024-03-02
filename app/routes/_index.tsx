import type { MetaFunction } from "@remix-run/cloudflare";
import { useState } from "react";
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
  const [count, setCount] = useState(1);
  return (
    <div className="px-[0.25in]">
      <div className="print:hidden flex gap-4">
        <button
          onClick={() => {
            setCount((c) => c + 1);
          }}
        >
          Add
        </button>
        <button
          onClick={() => {
            setCount((c) => c - 1);
          }}
        >
          Remove last
        </button>
      </div>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(3in,1fr))] gap-[0.25in]">
        {new Array(count).fill(undefined).map((_, i) => (
          <Card key={i} />
        ))}
      </div>
    </div>
  );
}
