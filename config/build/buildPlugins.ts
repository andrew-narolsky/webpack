import path from 'path';
import { Configuration } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { buildOptions } from './types/types';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

export function buildPlugins(options: buildOptions): Configuration['plugins'] {
    const isProd = options.mode === 'production';
    const isDev = options.mode === 'development';
    let plugins: Configuration['plugins'] = [
        new HtmlWebpackPlugin({
            template: options.paths.html,
            favicon: path.resolve(options.paths.public, 'favicon.ico')
        })
    ];

    if (isProd) {
        plugins.push(
            new MiniCssExtractPlugin({
                filename: 'css/[name].[hash:8].css',
                chunkFilename: 'css/[name].[hash:8].css',
            })
        );
        plugins.push(
            new CopyPlugin({
                patterns: [
                    {
                        from: path.resolve(options.paths.public, 'img'),
                        to: path.resolve(options.paths.output, 'img')
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