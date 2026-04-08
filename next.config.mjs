/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
    ];
  },
};

export default nextConfig;
