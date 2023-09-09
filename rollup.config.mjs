const babel = require('@rollup/plugin-babel');
const peerDepsExternal = require('rollup-plugin-peer-deps-external');
const resolve = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const typescript = require('@rollup/plugin-typescript');
const postcss = require('rollup-plugin-postcss');
const dts = require('rollup-plugin-dts');
const svgr = require('@svgr/rollup');
const alias = require('@rollup/plugin-alias');
const path = require('path');
const packageJson = require('./package.json');
const replace = require('rollup-plugin-replace');
const url = require('@rollup/plugin-url');

const Resolver = resolve({
    extensions: ['.mjs', '.ts', '.tsx', '.json', '.js', '.jsx'],
    browser: true,
});

module.exports = [
    {
        input: 'src/index.ts',
        output: [
            {
                file: packageJson.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                file: packageJson.module,
                format: 'esm',
                sourcemap: true,
            },
        ],
        plugins: [
            peerDepsExternal(),
            alias({
                entries: [
                    {
                        find: '@',
                        replacement: path.resolve(__dirname, 'src'),
                    },
                ],
                Resolver,
            }),
            babel({
                exclude: 'node_modules/**',
                presets: ['@babel/preset-react'],
                babelHelpers: 'runtime',
                plugins: ['@babel/plugin-transform-runtime'],
                external: [/@babel\/runtime/, 'react'],
            }),
            replace({
                'process.env.NODE_ENV': JSON.stringify('production'),
            }),
            url(),
            resolve({
                browser: true,
            }),
            svgr({ icon: true }),
            commonjs(),
            typescript({
                tsconfig: './tsconfig.json',
                exclude: ['src/**/*.test.(tsx|ts)', '**/stories/*'],
            }),
            postcss({
                extensions: ['.css'],
            }),
        ],
    },
    {
        input: ['src/index.ts'],
        output: [{ file: 'lib/index.d.ts', format: 'es' }],
        plugins: [dts.default()],
        external: [/\.css$/, 'styled-components'],
    },
];
