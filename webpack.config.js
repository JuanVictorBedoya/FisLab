
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var clientConfig = {
	target: 'web',

	resolve: {
		alias: {
			'react': 'react-lite',
			'react-dom': 'react-lite'
		}
	},

	entry: {
		'fislab.demos': './test/demos/client.jsx'
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
		new ExtractTextPlugin('css/fislab.min.css')
	]
};

module.exports = [ clientConfig ];
