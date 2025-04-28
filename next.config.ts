/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/dpavjxpr6/image/upload/**", // BU TO'G'RI YO'L
      },
    ],
  },
};

module.exports = nextConfig;
