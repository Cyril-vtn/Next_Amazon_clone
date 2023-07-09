/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["i.ibb.co"],
  },
  i18n: {
    locales: ["fr"],
    defaultLocale: "fr",
  },
};

module.exports = nextConfig;
