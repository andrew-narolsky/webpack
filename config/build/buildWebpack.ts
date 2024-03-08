import webpack from 'webpack';
import { buildDevServer } from './buildDevServer';
import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolvers } from './buildResolvers';
import { buildOptions } from './types/types';
export function buildWebpack(options: buildOptions): webpack.Configuration {
    const isDev = options.mode === 'development';

    return {
        mode: options.mode ?? 'development',
        entry: options.paths.entry,
        devServer: isDev ? buildDevServer(options) : undefined,
        devtool: isDev && 'inline-source-map',
        output: {
            path: options.paths.output,
            filename: '[name].js',
            clean: true
        },
        plugins: buildPlugins(options),
        module: {
            rules: buildLoaders(options),
        },
        resolve: buildResolvers(options),
    };
}