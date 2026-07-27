// Legacy URL → current URL redirect map.
// Preserves link equity and search rankings from the previous WordPress site
// and from earlier route slugs. Keys are pathnames with no trailing slash;
// the catch-all strips trailing slashes before looking a path up here.
export const LEGACY_REDIRECTS: Record<string, string> = {
  // Earlier code-defined slugs → live cityvestklinik.dk slugs
  "/omskaering": "/om-omskaering",
  "/omskaering-med-klassisk-metode": "/omskaering-ved-klassisk-metode",
  "/omskaering-med-fuld-bedoevelse": "/om-omskaering",
  "/forberedelse-inden-omskaering": "/forberedelse-foer-indgrebet",
  "/kontakt-os": "/kontakt",

  // Legacy WordPress /index.php/* paths
  "/index.php/booking": "/booking",
  "/index.php/priser": "/priser",
  "/index.php/faq": "/faq",
  "/index.php/om-os": "/om-os",
  "/index.php/om-omskaering": "/om-omskaering",
  "/index.php/kontakt": "/kontakt",
};
