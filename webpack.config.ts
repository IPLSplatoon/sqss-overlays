// noinspection JSUnusedGlobalSymbols

import HtmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';
import * as globby from 'globby';
import * as path from 'path';
import webpack from 'webpack';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

const isProd = process.env.NODE_ENV === 'production';

function graphicsConfig(): webpack.Configuration {
    const entries: { [key: string]: string } = globby
        .sync(['*/main.js', '*/main.ts'], { cwd: 'src/graphics' })
        .reduce((prev, curr) => {
            prev[path.basename(path.dirname(curr))] = `./${curr}`;
            return prev;
        }, {});

    let plugins = [];

    plugins = plugins.concat(
        [
            ...Object.keys(entries)
                .map(
                    (entryName) =>
                        new HtmlWebpackPlugin({
                            filename: `${entryName}.html`,
                            chunks: [entryName],
                            title: entryName,
                            template: `./${entryName}/${entryName}.html`
                        })
                ),
            new CopyPlugin({
                patterns: [
                    { from: 'assets/**/*' }
                ]
            }),
        ]
    );

    if (!isProd) {
        plugins.push(
            new LiveReloadPlugin({
                port: 0,
                appendScriptTag: true
            })
        );
    }

    return {
        context: path.resolve(__dirname, 'src/graphics'),
        mode: isProd ? 'production' : 'development',
        target: 'web',
        entry: entries,
        output: {
            path: path.resolve(__dirname, 'graphics'),
            filename: 'js/[name].js'
        },
        resolve: {
            extensions: ['.js', '.ts', '.json'],
            plugins: [
                new TsconfigPathsPlugin({
                    configFile: 'tsconfig-browser.json'
                })
            ]
        },
        module: {
            rules: [
                {
                    test: /\.scss$/,
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                },
                {
                    test: /\.js$/,
                    exclude: '/node_modules',
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.ts$/,
                    exclude: '/node_modules',
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [['@babel/preset-env', { targets: { chrome: '75' } }], '@babel/preset-typescript']
                        }
                    }
                }
            ]
        },
        plugins,
        optimization: (isProd) ? {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    common: {
                        minChunks: 2
                    },
                    defaultVendors: false,
                    default: false
                }
            }
        } : undefined
    };
}

export default [
    graphicsConfig()
];
