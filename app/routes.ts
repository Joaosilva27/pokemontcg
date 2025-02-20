import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sets", "routes/SetsPage.tsx"),
  route("/search", "routes/SearchPage.tsx"),
  route("/sets/:setId", "routes/SetPage.tsx"),
  route("/cards/:pokemonId", "routes/CardDetailsPage.tsx"),
] satisfies RouteConfig;
