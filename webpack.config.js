
var path = require('path');
var nodeExternals = require('webpack-node-externals');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

var serverConfig = {
	node: {
		__filename: true,
		__dirname: false
	},
	target: 'node',
	externals: [nodeExternals()],

	entry: {
		'index.js': './src/server/index.js',
	},

	output: {
		path: path.join(__dirname, 'dist'),
		filename: '[name]'
	},

	module: {
		loaders: [
			{
				exclude: /node_modules/,
				loader: 'babel-loader'
			}
		]
	},

	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/server/config.json', to: 'config.json' },
		])
	]
};

var clientConfig = {
	target: 'web',

	resolve: {
		alias: {
			'react': 'react-lite',
			'react-dom': 'react-lite'
		}
	},

	entry: {
		'fislab.physics-engine': './src/client/engines/physics.js',
		'fislab.render-engine': './src/client/engines/render.js',
		'fislab.main': './src/client/app/main.jsx',
		//'fislab.demos': './test/demos/client.jsx'
	},

	output: {
		path: path.join(__dirname, 'dist', 'assets'),
		filename: 'js/[name].min.js'
	},

	module: {
		rules: [
			{
				test: /\.jsx?/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: ['css-loader', 'sass-loader']
				})
			}
		]
	},
	plugins: [
		new ExtractTextPlugin('css/fislab.min.css'),
		new CopyWebpackPlugin([
			{ from: './resources/images', to: 'images' },
			{ from: './resources/models', to: 'models' },
			{ from: './resources/textures', to: 'textures' }
		])
	]
};

module.exports = [ serverConfig, clientConfig ];
