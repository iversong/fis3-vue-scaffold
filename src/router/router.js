export default function (router) {
  router.map({
    '/': {
      component: function(resolve) {
        //异步加载组件
        require.async('/src/views/App',resolve)
      }
    }
  })

  router.beforeEach(function ({to, from, next}) {
    let toPath = to.path
    let fromPath = from.path
    console.log('to: ' + toPath + ' from: ' + fromPath)
    if (toPath.replace(/[^/]/g, '').length > 1) {
      router.app.isIndex = false
    }
    else {
      router.app.isIndex = true
    }
    next()
  })

  router.afterEach(function ({to}) {
    console.log(`成功浏览到: ${to.path}`)
  })
}
