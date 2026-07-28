import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("about", "routes/about.tsx"),
  route("services", "routes/services.tsx"),

  // SEO endpoints
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),

  // Splat — trailing-slash normalization to canonical form, else 404
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
