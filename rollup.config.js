import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import url from '@rollup/plugin-url';
import svgr from '@svgr/rollup';
import { resolve as _resolve } from 'path';
import { dts } from 'rollup-plugin-dts';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import replace from 'rollup-plugin-replace';

import { main, module as _module } from './package.json';

const Resolver = resolve({
  extensions: ['.mjs', '.ts', '.tsx', '.json', '.js', '.jsx'],
  browser: true,
});

const resolveAliases = () =>
  alias({
    entries: [
      {
        find: '@appTypes',
        replacement: _resolve(__dirname, 'src/types'),
      },
      {
        find: '@helpers',
        replacement: _resolve(__dirname, 'src/helpers/index.ts'),
      },
      {
        find: '@',
        replacement: _resolve(__dirname, 'src'),
      },
    ],
    Resolver,
  });

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: main,
        format: 'cjs',
        sourcemap: true,
      },
      {
        file: _module,
        format: 'esm',
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      typescript({
        tsconfig: './tsconfig.json',
        exclude: ['src/**/*.test.(tsx|ts)', '**/stories/*'],
      }),
      resolveAliases(),
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
      postcss({
        extensions: ['.css'],
      }),
    ],
  },
  {
    input: ['src/index.ts'],
    output: [{ file: 'lib/index.d.ts', format: 'es' }],
    plugins: [resolveAliases(), dts()],
    external: [/\.css$/, 'styled-components'],
  },
];
