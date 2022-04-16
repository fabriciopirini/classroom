/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
  env: {
    graphqlUrl: "http://localhost:3332/graphql",
    webApiUrl: "http://localhost:3000/api",
  },
};

module.exports = nextConfig;
