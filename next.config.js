/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
		return {
			afterFiles: [
				{
					source: '/:path*',
					destination: `http://10.107.144.27:8080/:path*`,
				},
			],
		};
	},
	reactStrictMode: false,
};

module.exports = nextConfig;
