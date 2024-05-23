// // @ts-check
 
// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   webpack: (
//     config,
//     { buildId, dev, isServer, defaultLoaders, nextRuntime, webpack }
//   ) => {
//     config.externals.push({
//       knex: "commonjs knex",
//     });
//     // Important: return the modified config
//     return config;
//   }
// }
 
// module.exports = nextConfig

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['knex'],
  },
};

module.exports = nextConfig;
