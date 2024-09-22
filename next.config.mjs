/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["media.imgcdn.org", "ausbachi.shop"],
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};

export default nextConfig;
