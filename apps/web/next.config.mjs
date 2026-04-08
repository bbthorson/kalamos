/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@kalamos/compendium-data"],
  async redirects() {
    return [
      {
        source: "/for-clinics",
        destination: "/services",
        permanent: true,
      },
      {
        source: "/for-therapists",
        destination: "/services/therapists",
        permanent: true,
      },
      {
        source: "/compendium",
        destination: "https://compendium.kalamos.care",
        permanent: false,
      },
      {
        source: "/compendium/:path*",
        destination: "https://compendium.kalamos.care/intervention/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
