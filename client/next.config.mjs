/** @type {import('next').NextConfig} */
const nextConfig = {
	async rewrites() {
	  return [
	    {
	      source: '/api/:path*',
	      destination: 'http://localhost:80/:path*', // Proxy to Flask Server
	    },
	  ];
	},
      };
      
      export default nextConfig;
      