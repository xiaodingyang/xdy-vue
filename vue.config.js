
const path = require('path')

function resolve(dir) {
	return path.join(__dirname, dir)
}

const name = 'xdy-vue' // 标题

const port = process.env.port || process.env.npm_config_port || 8080 // 端口

// vue.config.js 配置说明 参考文档 https://cli.vuejs.org/zh/config/#css-loaderoptions
module.exports = {
	// 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
	productionSourceMap: false,
	pages: {
		index: {
			entry: 'packages/main.js', //入口文件
			template: 'public/index.html',
			filename: 'index.html',
		},
	},
	// webpack-dev-server 相关配置
	devServer: {
		host: '0.0.0.0',
		port: port,
		open: true,
		proxy: {
			// detail: https://cli.vuejs.org/config/#devserver-proxy
			[process.env.VUE_APP_BASE_API]: {
				target: `http://localhost:8080`,
				changeOrigin: true,
				pathRewrite: {
					['^' + process.env.VUE_APP_BASE_API]: '',
				},
			},
		},
		disableHostCheck: true,
	},
	configureWebpack: {
		name: name,
		resolve: {
			alias: {
				'@': resolve('packages'),
			},
		},
	},
	chainWebpack(config) {
		// cssImport(config)
		config.plugins.delete('preload') // TODO: need test
		config.plugins.delete('prefetch') // TODO: need test
		// set svg-sprite-loader
		config.module.rule('svg').exclude.add(resolve('src/assets/icons')).end()
		config.module
			.rule('icons')
			.test(/\.svg$/)
			.include.add(resolve('src/assets/icons'))
			.end()
			.use('svg-sprite-loader')
			.loader('svg-sprite-loader')
			.options({
				symbolId: 'icon-[name]',
			})
			.end()

		config.when(process.env.NODE_ENV !== 'development', (config) => {
			config
				.plugin('ScriptExtHtmlWebpackPlugin')
				.after('html')
				.use('script-ext-html-webpack-plugin', [
					{
						// `runtime` must same as runtimeChunk name. default is `runtime`
						inline: /runtime\..*\.js$/,
					},
				])
				.end()
			
		})
	},
}
