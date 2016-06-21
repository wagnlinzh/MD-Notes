# 开发环境

当项目逐渐变大，webpack 的编译时间会变长，可以通过参数让编译的输出内容带有进度和颜色。

```
$ webpack --progress --colors

```

如果不想每次修改模块后都重新编译，那么可以启动监听模式。开启监听模式后，没有变化的模块会在编译后缓存到内存中，而不会每次都被重新编译，所以监听模式的整体速度是很快的。

```
$ webpack --progress --colors --watch

```

当然，使用 `webpack-dev-server` 开发服务是一个更好的选择。它将在 localhost:8080 启动一个 express 静态资源 web 服务器，并且会以监听模式自动运行 webpack，在浏览器打开 [http://localhost:8080/](http://localhost:8080/) 或[http://localhost:8080/webpack-dev-server/](http://localhost:8080/webpack-dev-server/) 可以浏览项目中的页面和编译后的资源输出，并且通过一个 socket.io 服务实时监听它们的变化并自动刷新页面。

```
# 安装
$ npm install webpack-dev-server -g

# 运行
$ webpack-dev-server --progress --colors
```











# 故障处理

Webpack 的配置比较复杂，很容出现错误，下面是一些通常的故障处理手段。

一般情况下，webpack 如果出问题，会打印一些简单的错误信息，比如模块没有找到。我们还可以通过参数 `--display-error-details` 来打印错误详情。

```
$ webpack --display-error-details

Hash: a40fbc6d852c51fceadb
Version: webpack 1.12.2
Time: 586ms
    Asset     Size  Chunks             Chunk Names
bundle.js  12.1 kB       0  [emitted]  main
   [0] ./entry.js 153 bytes {0} [built] [1 error]
   [5] ./module.js 43 bytes {0} [built]
    + 4 hidden modules

ERROR in ./entry.js
Module not found: Error: Cannot resolve 'file' or 'directory' ./badpathmodule in /Users/zhaoda/data/projects/webpack-handbook/examples
resolve file
  /Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule doesn't exist
  /Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule.webpack.js doesn't exist
  /Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule.js doesn't exist
  /Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule.web.js doesn't exist
  /Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule.json doesn't exist
resolve directory
  /Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule doesn't exist (directory default file)
  /Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule/package.json doesn't exist (directory description file)
[/Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule]
[/Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule.webpack.js]
[/Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule.js]
[/Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule.web.js]
[/Users/zhaoda/data/projects/webpack-handbook/examples/badpathmodule.json]
 @ ./entry.js 3:0-26

```

Webpack 的配置提供了 `resolve` 和 `resolveLoader` 参数来设置模块解析的处理细节，`resolve` 用来配置应用层的模块（要被打包的模块）解析，`resolveLoader` 用来配置 `loader` 模块的解析。

当引入通过 npm 安装的 node.js 模块时，可能出现找不到依赖的错误。Node.js 模块的依赖解析算法很简单，是通过查看模块的每一层父目录中的`node_modules` 文件夹来查询依赖的。当出现 Node.js 模块依赖查找失败的时候，可以尝试设置 `resolve.fallback` 和 `resolveLoader.fallback` 来解决问题。

```
module.exports = {
  resolve: { fallback: path.join(__dirname, "node_modules") },
  resolveLoader: { fallback: path.join(__dirname, "node_modules") }
};

```

Webpack 中涉及路径配置最好使用绝对路径，建议通过`path.resolve(__dirname, "app/folder")` 或 `path.join(__dirname, "app", "folder")` 的方式来配置，以兼容 Windows 环境。













