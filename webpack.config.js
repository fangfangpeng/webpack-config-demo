const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const optimizeCss = require('optimize-css-assets-webpack-plugin');
module.exports = {
	devtool: 'eval-source-map',
	entry: __dirname + '/app/main.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle-[hash].js'
	},
	devServer: {
		contentBase: './public',
		historyApiFallback: true,
		inline: true,
	},
	resolve: {
		extensions: ['.js', '.jsx']
	},
	resolveLoader: {
		modules: ['node_modules'],
		moduleExtensions: ['-loader']
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader',
					// 在.babelrc文件中配置presets选项，此处就可以省略。webpack会自动调用.babelrc里的babel配置选项
					// options: {
					// 	presets: ['es2015', 'react']
					// }
				},
				exclude: /node_modules/
			},
			{
				test: /\.css$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader',
						options: {
							// 最近有一个叫做css modules的技术就意在把JS的模块化思想带入到css中来，通过css模块，所有的类名，动画名默认都只作用于当前模块，
							// webpack从一开始就对css模块提供了支持.在css loader 中进行配置后，你所需要做的一切就是把'modules'传递到所需要的地方，然后
							// 就可以直接把CSS的类名传递到组件的代码中，且这样做只对当前组件有效，不必担心在不同的模块中使用相同的类名造成冲突。
							modules: true,
							camelCase: true,
							// name: 组件引入的样式文件的文件名,local:样式名, hash:base64:5 后缀为base64格式的hash值前五位。
							localIdentName: '[path][name]__[local]-[hash:base64:5]',
						}
					},
					{
						loader: "postcss-loader"
					}
				]
			}
		]
	},
	plugins: [
		new CleanPlugin({
			path: './build'
		}),
		new webpack.BannerPlugin('版权所有，翻版必究'),
		new HtmlWebpackPlugin({
			template: __dirname  + '/app/index.tmpl.html'
		}),
		new webpack.HotModuleReplacementPlugin(),
		// new webpack.optimize.UglifyJsPlugin(),
		new ExtractTextWebpackPlugin({
			filename: '[name]-[hash:10].min.css',
			disable: false,
			allChunks: true
		}),
		new optimizeCss({
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: false
		}),
		new UglifyJsPlugin({
			uglifyOptions: {
				compress: {
					// 在UglifyJs删除没有用到的代码时不输出警告
					warnings: false,

					// 删除所有的console语句，可以兼容ie浏览器
					drop_console: true,

					// 内嵌定义了但是只用到一次的变量
					collapse_vars: true,

					// 提取出出现多次但是没有定义成变量去引用的静态值
					reduce_vars: true
				},
				output: {
					// 删除所有的注释
					comments: false,
					// 最紧凑的输出
					beautify: false
				}
			}
		})
	],
};
