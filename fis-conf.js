var path = require('path');
//代码版本号
var version = '1.0.0';
//debug版本资源编译路径
var debug = {
	domain: 'http://oss-static.detu.com', //资源域名
	static: '/assets/debug-'+ version +'/$0', //静态资源发布路径规则
};

var test = {
	domain: 'http://oss-static.detu.com', //资源域名
	static: '/assets/test-'+ version +'/$0',
};

var prod = {
	domain: 'http://oss-static.detu.com', //资源域名
	static: '/assets/prod-'+ version +'/$0',
};
// 所有的文件产出到 output/ 目录下
fis.match('*', {
    release: '/assets/$0'
});

//入口index.html发布到根目录
fis.match('**.html', {
  release: '/$0'
});

//commonjs模块化支持
fis.hook('commonjs', {
    baseUrl: './src',
    extList: ['.js', '.ts', '.vue']
});

/**
 * 业务逻辑目录src
 * node_modules目录开启模块化支持和同名依赖
 */
fis.match('/{node_modules,src}/**.js', {
    isMod: true,
    useSameNameRequire: true
});


/**
 * babel es6=>es5
 */
fis.match('/src/**.js', {
    rExt: 'js',
    parser: fis.plugin('babel-5.x', {},{
        presets: ["es2015", "stage-0"]
    })
});

/**
 * less解析
 */
fis.match('**.less', {
	parser: fis.plugin('less'),
	isCssLike: true,
	rExt: '.css'
});

/**
 * 添加css和image模块化加载支持
 * import 'font-awesome.css' 或 require('font-awesome.css')
 */
fis.match('**.{js,jsx,ts,es6,vue}', {
    preprocessor: [
      fis.plugin('js-require-css'),
      fis.plugin('js-require-file', {
        useEmbedWhenSizeLessThan: 10 * 1024 // 小于10k用base64
      })
    ]
});


/**
 * vue模块解析
 */
fis.match('/src/(**).vue', {
	parser: [
		fis.plugin('vue-component'), 
		fis.plugin('babel-5.x', {},{
      	presets: ["es2015", "stage-2"]
  	})
	],
	id: '$1',
	rExt: '.js',
	isJsLike: true,
	isMod: true,
	useSameNameRequire: true
});


/**
 * common/lib下资源不做解析
 */
fis.match('/common/lib/**.js', {
  parser: null,
  isMod: false
});

/**
 * 入口main.js不做AMD包装
 */
fis.match('/src/main.js', {
  isMod: false
});

/**
 * loader分析依赖并自动引入资源。
 */
fis.match('::package', {
    postpackager: fis.plugin('loader',{
        // allInOne: false
    }),
    packager: fis.plugin('map'),
    spriter: fis.plugin('csssprites', {
        layout: 'matrix',
        margin: '15'
    })
});

// 禁用components
fis.unhook('components')
fis.hook('node_modules')

/**=====================================
 * 开发环境
 * 使用：npm run dev
 */
fis.media('debug')
  .match('**.{js,jsx,css,less}', {
    useHash: false
  })
  .match('**', {
    deploy: fis.plugin('local-deliver', {
      to: path.join(__dirname, './output')
    })
  });

/**=====================================
 * 生产环境css、js压缩合并
 * js、css、图片引用 URL 添加 md5 戳
 * 使用：npm run release
 */
fis
  .media('prod')
  .match('**.{js,jsx,css,less}', {
    useHash: true
  })
  .match('*.js', {
    optimizer: fis.plugin('uglify-js')
  })
  .match('*.{css,less,styl}', {
  	useSprite: true,
    optimizer: fis.plugin('clean-css')
  })
  .match('::package', {
		postpackager: fis.plugin('loader', {
			allInOne: { //配置是否合并零碎资源。
			  css: '/pkg/aio.css',
			  js: '/pkg/aio.js'
			  // includeAsyncs: true //是否包含异步依赖。
			},
			resourceType: 'mod',
			useInlineMap: true // 资源映射表内嵌
		})
	})
	.match('*.{css,less,js,png,jpg,gif}', {  // 静态资源添加MD5戳
	  useHash: true,
	  domain: prod.domain
	  // deploy: fis.plugin('alioss', { //发布到aliyun oss
	  //   accessKey: '',
	  //   secretKey: '',
	  //   bucket: 'websit-static'
	  // })
	})
  .match('**', {
    deploy: fis.plugin('local-deliver', {
      to: path.join(__dirname, './prod')
    })
  });
