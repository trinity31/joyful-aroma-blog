const { i18n } = require("./next-i18next.config");

module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "source.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  i18n,
  // Increase the timeout to 10 minutes (in milliseconds)
  staticPageGenerationTimeout: 600000,
};
