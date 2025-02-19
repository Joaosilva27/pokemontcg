import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("/sets", "routes/SetsPage.tsx"),
  route("/sets/:setId", "routes/SetPage.tsx"),
] satisfies RouteConfig;
