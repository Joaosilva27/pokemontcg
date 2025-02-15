import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "TCG Collection" },
    { name: "description", content: "Pokemon Trading Cards" },
  ];
}

export default function Home() {
  return <div>hi</div>;
}
