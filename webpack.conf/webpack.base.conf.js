const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');


const PATHS = {
	src: path.join(__dirname, "../src"),
	dist: path.join(__dirname, "../dist"),
	assets: "assets/",
	lk: {
		src: path.join(__dirname, "../lk/src"),
	}
};

module.exports = {
	externals: {
		paths: PATHS
	},
	entry: {
		app: PATHS.src,
		lk: PATHS.lk.src// если необходима другая точка входа
	},
	output: {
		filename: `${PATHS.assets}js/[name].[chunkhash].js`,
		path: PATHS.dist,
		publicPath: "/"
	},
	optimization: {
		minimize: true,
		
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',					
					enforce: true
					
				}
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				loader: "babel-loader",
				exclude: "/node_modules/"
			},
			{
				test: /\.vue$/,
				loader: "vue-loader",
				options: {
					loader: {
						scss: "vue-style-loader!css-loader!sass-loader"
					}
				}
			},
			{
				test: /\.(png|jpg|gif|svg)$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]"
				}
			},
			{
				test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
				loader: "file-loader",
				options: {
					name: "[name].[ext]"
				}
			},
			{
				test: /\.scss$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,                       
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},			
			{
				test: /\.css$/,
				use: [
					"style-loader",
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
						options: {
							sourceMap: true
						}
					},
					{
						loader: "postcss-loader",
						options: {
							sourceMap: true,                       
						}
					}               
				]
			}
		]
	}, 
	
	resolve: {
		alias: {
			'~': 'src',
			'vue$': 'vue/dist/vue.js'
		}
	},
   
	plugins: [
		new VueLoaderPlugin(),
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: `${PATHS.assets}css/[name].[contenthash].css`,
			// chunkFilename: `${PATHS.assets}css/[id].css`,
		}),
		new OptimizeCssAssetsPlugin({
			cssProcessor: require('cssnano'),
			cssProcessorPluginOptions: {
			  preset: ['default', { discardComments: { removeAll: true } }],
			},
			canPrint: true
		  }),
		new HtmlWebpackPlugin({
			template: `${PATHS.src}/index.html`,
			filename: "./index.html",
			//inject: false // позволяет отменить автоматическую вставку скриптов и css в шаблон,
			xhtml: true,
		}),
		new CopyWebpackPlugin([
			{
				from: `${PATHS.src}/${PATHS.assets}img`,
				to: `${PATHS.assets}img`
			},
			{
				from: `${PATHS.src}/${PATHS.assets}fonts`,
				to: `${PATHS.assets}fonts`
			},
			{
				from: `${PATHS.src}/static`,
				to: ""
			}
		]),
		new CleanWebpackPlugin(),
	],
};