import { ModuleOptions } from 'webpack';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { buildOptions } from './types/types';
export function buildLoaders(options: buildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';
    const scssLoader = {
        test: /\.[s|c][ac]?ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            'sass-loader',
        ],
    };
    const tsLoader = {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
            {
                loader: 'ts-loader',
                options: {
                    transpileOnly: true,
                }
            }
        ]
    };

    return [
        scssLoader,
        tsLoader
    ];
}