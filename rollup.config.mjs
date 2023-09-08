import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import { createRequire } from 'node:module';
import dts from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
const requireFile = createRequire(import.meta.url);
const packageJson = requireFile('./package.json');

export default [
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
        plugins: [peerDepsExternal(), resolve(), commonjs(), typescript({
            exclude: ["**/stories", "**/*.stories.ts"]
        })],
    },
    // {
    //     input: 'src/index.d.ts',
    //     output: [{ file: 'lib/index.d.ts', format: 'es' }],
    //     plugins: [dts()],
    //     external: [/\.css$/],
    // },
];
