import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/index.tsx"),
  route("robots.txt", "routes/robots[.]txt.tsx"),
  route("sitemap.xml", "routes/sitemap[.]xml.tsx"),

  // Content pages — slugs match the live cityvestklinik.dk URLs
  route("om-omskaering", "routes/om-omskaering.tsx"),
  route("omskaering-ved-klassisk-metode", "routes/omskaering-ved-klassisk-metode.tsx"),
  route("omskaering-med-ringmetoden", "routes/omskaering-med-ringmetoden.tsx"),
  route("forberedelse-foer-indgrebet", "routes/forberedelse-foer-indgrebet.tsx"),
  route("om-os", "routes/om-os.tsx"),
  route("faq", "routes/faq.tsx"),
  route("priser", "routes/priser.tsx"),
  route("find-os", "routes/find-os.tsx"),

  // Contact (form UI + action-only endpoint)
  route("kontakt", "routes/kontakt.tsx"),
  route("kontakt-send", "routes/kontakt-send.tsx"),

  // Booking
  route("booking", "routes/booking.tsx"),
  route("tak-for-din-booking", "routes/tak-for-din-booking.tsx"),

  // Legal
  route("privatlivspolitik", "routes/privatlivspolitik.tsx"),
  route("cookiepolitik", "routes/cookiepolitik.tsx"),

  // Splat — trailing-slash normalization + legacy redirects, else 404
  route("*", "routes/catch-all.tsx"),
] satisfies RouteConfig;
