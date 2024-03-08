import path from 'path';
import { buildWebpack } from './config/build/buildWebpack';
import { buildMode, buildPath } from './config/build/types/types';

interface envVariables {
    mode?: buildMode,
    port?: number
}

export default (env: envVariables) => {
    const paths: buildPath = {
        output: path.resolve(__dirname, 'build'),
        entry: path.resolve(__dirname, 'src', 'app.ts'),

        html: {
            index: path.resolve(__dirname, 'public', 'index.html'),
        },

        public: path.resolve(__dirname, 'public'),
        src: path.resolve(__dirname, 'src'),
    };

    return buildWebpack({
        port: env.port ?? 3000,
        mode: env.mode ?? 'development',
        paths
    });
}