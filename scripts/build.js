import { build } from "esbuild";

const isDevelopment = process.env.NODE_ENV === 'DEV';

console.log('Build app dependencies...');
build({
  entryPoints: ['src/client/js/app/index.js'],
  allowOverwrite: true,
  platform: 'browser',
  format: 'cjs',
  resolveExtensions: ['.css', '.js'],
  bundle: true,
  outdir: 'public/app',
  keepNames: true,
  minify: !isDevelopment,
  sourcemap: isDevelopment,
  logLevel: 'info',
  metafile: true
})
  .then(async (result) => {
    console.log('Build vendor dependencies...');
    return build({
      entryPoints: ['src/client/js/deps/index.js'],
      allowOverwrite: true,
      platform: 'browser',
      format: 'cjs',
      resolveExtensions: ['.css', '.js'],
      bundle: true,
      outdir: 'public/deps',
      keepNames: true,
      minify: !isDevelopment,
      sourcemap: isDevelopment,
      logLevel: 'info',
      metafile: true
    });
  })
  .then(async (result) => {
    console.log('Creating vendor hashes...');
    return build({
      entryPoints: ['src/client/js/deps/index.js'],
      allowOverwrite: true,
      platform: 'browser',
      format: 'cjs',
      assetNames: '[dir]/vendor.[hash]',
      loader: { '.js': 'file' },
      resolveExtensions: ['.css', '.js'],
      bundle: true,
      outdir: 'public/deps',
      logLevel: 'info'
    });
  });
