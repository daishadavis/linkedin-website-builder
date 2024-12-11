const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 8080,
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    hot: true,
    open: true,
    historyApiFallback: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    proxy: [
      {
        context: ['/api'], // Specify the API paths to proxy
        target: 'http://localhost:3000', // Backend server
        secure: false,
        changeOrigin: true,
      },
    ],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: {
            loader: 'url-loader',
        }
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};



/**
Sam Example from Past Project (idk how well this works because this was a LOOOOOONG time ago)
const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
	//entry point of application
	entry: './client/index.js',
	output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
		publicPath:'/'
    },
	module: {
        rules: [
            {
                test: /\.jsx?/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            },
            {
                test: /\.s?css/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
				  {
					loader: 'file-loader',
				  },
				],
			},
        ]
    },
	plugins: [
        new HtmlWebPackPlugin({
            template: './client/index.html'
        }),
    ],
	devServer: { // where the react app will run 
		host: 'localhost',
		port: 8080,
		static: {
			publicPath: '/build',
			directory: path.join(__dirname, './dist')
		},
		hot: true,
		historyApiFallback: true,
		headers: { 'Access-Control-Allow-Origin': '*' },

        proxy: { // connecting the backend;
            '/api': 'http://localhost:3000',
        },
    },
}
 */