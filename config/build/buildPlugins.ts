import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import {buildOptions} from './types/types';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins(options: buildOptions): Configuration['plugins'] {
    const isProd = options.mode === 'production';
    const isDev = options.mode === 'development';

    let htmlPlugins: HtmlWebpackPlugin[] = [];

    Object.entries(options.paths.html).forEach(([key, value]) => {
        htmlPlugins.push(
            new HtmlWebpackPlugin({
                filename: key + '.html',
                template: value,
                favicon: path.resolve(options.paths.public, 'favicon.ico'),
            }),
        )
    });

    let plugins: Configuration['plugins'] = htmlPlugins;

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: '[name].css',
                chunkFilename: '[name].css',
            })
        );
        plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(options.paths.public, 'images'),
                        to: path.resolve(options.paths.output, 'images')
                    },
                    {
                        from: path.resolve(options.paths.public, 'fonts'),
                        to: path.resolve(options.paths.output, 'fonts')
                    },
                    {
                        from: path.resolve(options.paths.public, 'assets'),
                        to: path.resolve(options.paths.output, 'assets')
                    },
                ],
            })
        );
    }

    if (isDev) {
        plugins.push(
            new ForkTsCheckerWebpackPlugin()
        );
    }

    return plugins;
}