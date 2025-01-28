import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    reactStrictMode: true,

    images: {
        domains: ['emkotech.epart.az'], // Add your external domain here
    },
};

export default nextConfig;
