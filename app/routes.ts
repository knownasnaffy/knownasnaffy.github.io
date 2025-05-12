import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.tsx"),
  route("fancy", "./routes/fancy.tsx"),
  route("blog", "./routes/blog.tsx"),
] satisfies RouteConfig;
