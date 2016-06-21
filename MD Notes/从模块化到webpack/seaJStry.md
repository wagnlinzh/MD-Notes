# CMD 模块定义规范

在 Sea.js 中，所有 JavaScript 模块都遵循 CMD（[Common Module Definition](https://github.com/cmdjs/specification/blob/master/draft/module.md)） 模块定义规范。该规范明确了模块的基本书写格式和基本交互规则。

在 CMD 规范中，一个模块就是一个文件。代码的书写格式如下：

```javascript
define(factory);
```























## define `Function`

`define` 是一个全局函数，用来定义模块。











### define `define(factory)`

`define` 接受 `factory` 参数，`factory` 可以是一个函数，也可以是一个对象或字符串。

`factory` 为对象、字符串时，表示模块的接口就是该对象、字符串。比如可以如下定义一个 JSON 数据模块：

```javascript
define({ "foo": "bar" });
```

也可以通过字符串定义模板模块：

```javascript
define('I am a template. My name is {{name}}.');
```

`factory` 为函数时，表示是模块的构造方法。执行该构造方法，可以得到模块向外提供的接口。`factory` 方法在执行时，默认会传入三个参数：`require`、`exports` 和 `module`：

```javascript
define(function(require, exports, module) {

  // 模块代码

});
```







## require.async require.async(id, callback?)

require.async 方法用来在模块内部异步加载模块，并在加载完成后执行指定回调。callback 参数可选。

```javascript
define(function(require,exports,modules){
  //异步加载一个模块,在加载完成时回调
  require.async("./b",function(b){
    b.doSometing();
  });

  // 异步加载多个模块,在加载完成时,执行回调
  require.async(['./c','./d'],function(c,d){
    c.doSometing();
    d.doSometing();
  })
})
```


注意：require 是同步往下执行，require.async 则是异步回调执行。require.async 一般用来加载可延迟异步加载的模块。












## require.resolve require.resolve(id)

使用系统模块内部的路径解析机制来解析并返回模板路径. 该函数不会加载模块,只返回解析后的 绝对路径.

这可以用来获取模块路径，一般用在插件环境或需动态拼接模块路径的场景下。

```javascript
define(function(require, exports){
  console.log(require.resolve('./b')); // ==> http://example.com/path/to/b.js
})
```





















## exports

```javascript
define(function(require,exports){
//对外提供foo属性
exports.foo="bar";

//对外提供doSomething方法
exports.doSomething=function(){};

});
```







除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口。见下:

```javascript
define(function(require){
  //通过return直接提供接口
  return {
    foo:"bar",
    doSomething:function(){}
  };
});
```



如果 return 语句是模块中的唯一代码，还可**进一步简化**为：
```javascript
define({
  foo: 'bar',
  doSomething: function() {}
});
```







**Notes:以下的这种写法是错误的**

```javascript
define(function(require,exports){
    exports={
    foo:'bar',
    doSomething:function(){}
  }
})
```





**正确的姿势是用return或者给module.exports赋值**

```javascript
difine(function(require,exports,module){
  
  //正确的写法
  module.exports={
    foo:"bar",
    doSomething:function(){}
  }
});
```

提示Tips：exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。





## module 

module 是一个对象, 上面存储了与当前模块相关联的一些属性和方法







### module.id -> 模块的唯一标识 

```javascript
difine('id',[],function(require,exports,module){
	//模块代码
});

//上述代码中,define的第一个参数就是模块标识
```





### module.uri 

根据模块系统的路径解析规则得到的模块绝对路径

```javascript
 define(function(require,exports,module){
  console.log(module.uri); // ==> http://example.com/path/to/this/file.js
});

// 一般情况下,(没有在define中手写id参数时),module.id 的值就是module.uri,两者完全相同.
```









### module.dependencies 

dependencies 是一个数组, 表示当前模块的依赖







### module.exports

当前模块对外提供的接口

传给factory 构造方法的exports 参数是module.exports对象的一个引用.只通过exports参数来提供接口, 有时无法满足开发者的所有需求. 比如当模块的接口是某个类的实例的时候.需通过moudle.exports来实现.

```javascript
difine(function(require,exports,module){
  //exports 是module.exports 的一个引用
  console.log(module.exports=== exports); //true

 //重新给module.exports 赋值
  module.exports=new SomeClass();

  //exports 不再等于module.exports
  console.log(module.exports=== exports); //false

})

```



**Notes:** **对module.exports 的赋值需要同步执行, 不能放在回调函数里**.









**下面是错误示范:**


```javascript
//x.js
define(function(require, exports, module){
  //错误用法
  setTimeOut(function(){
    module.exports = {a:"hello"};
  },0);
});
```

在y.js中调用上面的x.js

```javascript
// y.js
define(function(require, exports, module){
  var x=require("./x");
  //无法立即得到模块x的a属性
  console.log(x.a);//undefined
});
```








## 小结

这就是 CMD 模块定义规范的所有内容。经常使用的 API 只有 `define`, `require`, `require.async`, `exports`,`module.exports` 这五个。其他 API 有个印象就好，在需要时再来查文档，不用刻意去记。

与 RequireJS 的 AMD 规范相比，CMD 规范尽量保持简单，并与 CommonJS 和 Node.js 的 Modules 规范保持了很大的兼容性。通过 CMD 规范书写的模块，可以很容易在 Node.js 中运行，后续会介绍。

祝使用愉快，有任何想法建议，欢迎反馈留言。











#  























# 模块标识

模块标识是一个字符串，用来标识模块。在 `require`、 `require.async` 等加载函数中，第一个参数都是模块标识。



Sea.js 中的模块标识是 [CommonJS 模块标识](http://wiki.commonjs.org/wiki/Modules/1.1.1) 的超集:

1. 一个模块标识由斜线（`/`）分隔的多项组成。
2. 每一项必须是小驼峰字符串、 `.` 或 `..` 。
3. **模块标识可以不包含文件后缀名**，比如 `.js` 。
4. 模块标识可以是 **相对** 或 **顶级** 标识。如果第一项是 `.` 或 `..`，则该模块标识是相对标识。
5. **顶级标识**根据模块系统的**基础路径**来解析。
6. **相对标识**相对 `require` **所在模块的路径**来解析。



注意，符合上述规范的标识肯定是 Sea.js 的模块标识，但 Sea.js 能识别的模块标识不需要完全符合以上规范。 比如，除了大小写字母组成的小驼峰字符串，Sea.js 的模块标识字符串还可以包含下划线（`_`）和连字符（`-`）， 甚至可以是 `http://`、`https://`、`file:///` 等协议开头的绝对路径。











## 相对标识

相对标识以 `.` 开头，只出现在模块环境中（`define` 的 `factory` 方法里面）。**相对标识永远相对当前模块的 URI 来解析**：

```javascript
// 在 http://example.com/js/a.js 的 factory 中：
require.resolve('./b');  // => http://example.com/js/b.js

// 在 http://example.com/js/a.js 的 factory 中：
require.resolve('../c');  // => http://example.com/c.js
```











## 顶级标识

顶级标识不以点（`.`）或斜线（`/`）开始， 会**相对模块系统的基础路径**（即 Sea.js 的 `base` 路径）来解析：

```javascript
// 假设 base 路径是：http://example.com/assets/

// 在模块代码里：
require.resolve('gallery/jquery/1.9.1/jquery'); 
// => http://example.com/assets/gallery/jquery/1.9.1/jquery.js
```







模块系统的基础路径即 `base` 的**默认值**，与 `sea.js` 的访问路径相关：

```javascript
如果 sea.js 的访问路径是：
  http://example.com/assets/sea.js

则 base 路径为：
  http://example.com/assets/
```





当 `sea.js` 的访问路径中含有版本号时，`base` 不会包含 `seajs/x.y.z` 字串。 当 `sea.js` 有多个版本时，这样会很方便。

```javascript
如果 sea.js 的路径是：
  http://example.com/assets/seajs/1.0.0/sea.js

则 base 路径是：
  http://example.com/assets/
```





**手动配置base路径**



当然，也可以手工配置 `base` 路径：

```
seajs.config({
  base: 'http://code.jquery.com/'
});

// 在模块代码里：
require.resolve('jquery');
  // => http://code.jquery.com/jquery.js
```







## 普通路径

除了相对和顶级标识之外的标识都是普通路径。**普通路径的解析规则，和 HTML 代码中的 `` 一样，会相对当前页面解析。**

```javascript
// 假设当前页面是 http://example.com/path/to/page/index.html

// 绝对路径是普通路径：
require.resolve('http://cdn.com/js/a'); // => http://cdn.com/js/a.js

// 根路径是普通路径：
require.resolve('/js/b');          // => http://example.com/js/b.js

// use 中的相对路径始终是普通路径：
seajs.use('./c');                 // => 加载的是 http://example.com/path/to/page/c.js

seajs.use('../d');                // => 加载的是 http://example.com/path/to/d.js
```

**提示**：

1. 顶级标识始终相对 `base` 基础路径解析。
2. 绝对路径和根路径始终相对当前页面解析。
3. `require` 和 `require.async` 中的相对路径**相对当前模块路径**来解析。
4. `seajs.use` 中的**相对路径始终相对当前页面来解析**。











## 文件后缀的自动添加规则

Sea.js 在解析模块标识时， **除非在路径中有问号（`?`）或最后一个字符是井号（`#`），否则都会自动添加 JS 扩展名（`.js`）。**



如果不想自动添加扩展名，可以在路径末尾加上井号（`#`）。





```javascript
// ".js" 后缀 可以省略：
require.resolve('http://example.com/js/a');
require.resolve('http://example.com/js/a.js');
  // => http://example.com/js/a.js

// ".css" 后缀 不可省略：
require.resolve('http://example.com/css/a.css');
  // => http://example.com/css/a.css

// 当路径中有问号（"?"）时，不会自动添加后缀：
require.resolve('http://example.com/js/a.json?callback=define');
  // => http://example.com/js/a.json?callback=define

// 当路径以井号（"#"）结尾时，不会自动添加后缀，且在解析时，会自动去掉井号：
require.resolve('http://example.com/js/a.json#');
  // => http://example.com/js/a.json
```













## 设计原则

模块标识的规则就上面这些，设计的核心出发点是：



1. **关注度分离**。比如书写模块 `a.js` 时，如果需要引用 `b.js`，则只需要知道 `b.js` 相对 `a.js` 的相对路径即可，无需关注其他。

   ​

2. **尽量与浏览器的解析规则一致**。比如根路径（`/xx/zz`）、绝对路径、以及传给 `use` 方法的非顶级标识，都是相对所在页面的 URL 进行解析。

一旦理解了以上两点，一切都会很自然、很简单。不必刻意去记这些规则，多写写，自然就会。















































#  















# require 书写约定

使用 Sea.js 书写模块代码时，需要遵循一些简单规则。

> 只是书写和调试时的规范！！！构建后的代码完全不需要遵循下面的约定！！！！！！







### 1. 正确拼写

模块 factory 构造方法的第一个参数 **必须** 命名为 `require` 。

```javascript
// 错误！
define(function(req) {
  // ...
});

// 正确！
define(function(require) {
  // ...
});
```









### 2. 不要修改

不要重命名 `require` 函数，或在任何作用域中给 `require` 重新赋值。

```javascript
// 错误 - 重命名 "require"！
var req = require, mod = req("./mod");

// 错误 - 重定义 "require"!
require = function() {};

// 错误 - 重定义 "require" 为函数参数！
function F(require) {}

// 错误 - 在内嵌作用域内重定义了 "require"！
function F() {
  var require = function() {};
}
```











### 3. 使用直接量

`require` 的参数值 **必须** 是字符串直接量。

```javascript
// 错误！
require(myModule);

// 错误！
require("my-" + "module");

// 错误！
require("MY-MODULE".toLowerCase());

// 正确！
require("my-module");
```

在书写模块代码时，必须遵循这些规则。其实只要把 `require` **看做是语法关键字** 就好啦。







## 关于动态依赖

有时会希望可以使用 `require` 来进行条件加载：

```javascript
if (todayIsWeekend)
  require("play");
else
  require("work");
```

但请牢记，从静态分析的角度来看，这个模块同时依赖 play 和 work 两个模块，加载器会把这两个模块文件都下载下来。 这种情况下，推荐使用 `require.async` 来进行条件加载。









## Why?

这些约定初看起来会有些小不爽，其实也的确可以通过每次都编译的方式来去掉这些限制。但编译的方式，会给开发调试带来麻烦，代码的实现复杂度也会增加。Sea.js 的核心设计原则是保持简单，遵循 [New Jersey Approach](http://blog.jobbole.com/19062/)：

> 简单性：设计必须简单，这既是对实现的要求，也是对接口的要求。实现的简单要比接口的简单更加重要。简单是设计中需要第一重视的因素。

因为简单，所以可靠！















#  

















# 模块的加载启动

Sea.js 是一个模块加载器，模块加载器需要实现两个基本功能：

1. **实现模块定义规范，这是模块系统的基础。**
2. **模块系统的启动与运行。**











### 模块定义规范的实现

这就是 `define`，`require`，`exports`，`module` 的实现。具体实现细节，有兴趣的可以看 Sea.js 的源码：[seajs/src](https://github.com/seajs/seajs/tree/master/src)。可以按照 [Gruntfile.js](https://github.com/seajs/seatools/blob/master/Gruntfile.js#L98) 中声明的合并顺序阅读，核心是 `module.js` 文件。

`define` 等方法的具体使用，请阅读：[CMD 模块定义规范](https://github.com/seajs/seajs/issues/242)









### 模块系统的启动

有了 `define` 等模块定义规范的实现，我们可以开发出很多模块。但光有一堆模块不管用，我们还得让它们能跑起来。

首先就是**启动问题**。比如在 Node 中，启动很简单：

```
$ node main.js

```

这就是启动。









在 Sea.js 里，要启动模块系统很简单：

```javascript
<script src="path/to/sea.js"></script>
<script>
  seajs.use('./main');
</script>
```











## seajs.use `Function`

**用来在 页面中 加载模块。**









### seajs.use `seajs.use(id, callback?)`

通过 `use` 方法，**可以在页面中加载任意模块：**

```javascript
// 加载模块 main，并在加载完成时，执行指定回调
seajs.use('./main', function(main) {
  main.init();
});
```

`use` 方法还可以一次加载多个模块：

```javascript
// // 并发加载模块 a 和模块 b，并在都加载完成时，执行指定回调
seajs.use(['./a', './b'], function(a, b) {
  a.init();
  b.init();
});
```

`callback` 参数可选，省略时，表示无需回调。











### 与 DOM ready 的关系

**注意**：`seajs.use` 与 `DOM ready` 事件**没有任何关系**。



如果某些操作要确保在 `DOM ready` 后执行，需要使用`jquery` 等类库来保证，比如：





```javascript
seajs.use(['jquery', './main'], function($, main) {
  $(document).ready(function() {
    main.init();
  });
});
```







## sea.js 的引入

**在调用 `seajs.use` 之前，需要先引入 `sea.js` 文件，推荐直接使用 `script` 标签同步引入**：

```javascript
<script src="path/to/sea.js"></script>
```







为了满足某些场景下的性能优化需求，也可以将 `sea.js` 的**源码内嵌**：

```javascript
<script>
  // sea.js 的源码
  var seajs = global.seajs = {
    // The current version of Sea.js being used
    version: "@VERSION"
  }

  var data = seajs.data = {}
</script>
```

注意：代码内嵌时，需要通过 `seajs.config` 手动配置 `base` 路径。









## 最佳实践

1. **`seajs.use` 理论上只用于加载启动，不应该出现在 `define` 中的模块代码里。在模块代码里需要异步加载其他模块时，推荐使用 `require.async` 方法。**

   ​

2. **引入 `sea.js` 时，可以把 `sea.js` 与其他文件打包在一起，可提前合并好，或利用 combo 服务动态合并。无论哪一种方式，为了让 `sea.js` 内部能快速获取到自身路径，推荐手动加上 `id` 属性：**

```javascript
<script src="path/to/sea.js" id="seajsnode"></script>
```



**加上 `seajsnode` 值，可以让 `sea.js` 直接获取到自身路径，而不需要通过其他机制去自动获取。这对性能和稳定性会有一定提升，推荐默认都加上。**









## 小结

`seajs.use` 是模块加载器必备的一个接口。在 `seajs` 上，还有用于配置的 `config` 方法、方便调试的`cache` 等接口，这些会在接下来的文档中详细阐述。











#  

















# 配置

可以对 Sea.js 进行配置，让模块编写、开发调试更方便。
















## seajs.config `seajs.config(options)`





用来进行配置的方法。


```javascript
seajs.config({

  // 别名配置
  alias: {
    'es5-safe': 'gallery/es5-safe/0.9.3/es5-safe',
    'json': 'gallery/json/1.0.2/json',
    'jquery': 'jquery/jquery/1.10.1/jquery'
  },


  // 路径配置
  paths: {
    'gallery': 'https://a.alipayobjects.com/gallery'
  },

  // 变量配置
  vars: {
    'locale': 'zh-cn'
  },

  // 映射配置
  map: [
    ['http://example.com/js/app/', 'http://localhost/js/app/']
  ],

  // 预加载项
  preload: [
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ],

  // 调试模式
  debug: true,

  // Sea.js 的基础路径
  base: 'http://example.com/path/to/base/',

  // 文件编码
  charset: 'utf-8'
});
```

支持以下配置选项：





### alias `Object`





当模块标识很长时，可以使用 `alias` 来简化。

```javascript
seajs.config({
  alias: {
    'jquery': 'jquery/jquery/1.10.1/jquery',
    'app/biz': 'http://path/to/app/biz.js',
  }
});
```

```javascript
define(function(require, exports, module) {

   var $ = require('jquery');
     //=> 加载的是 http://path/to/base/jquery/jquery/1.10.1/jquery.js

   var biz = require('app/biz');
     //=> 加载的是 http://path/to/app/biz.js

});
```



使用 `alias`，可以让文件的真实路径与调用标识分开，有利于统一维护。







### paths `Object`





当目录比较深，或需要跨目录调用模块时，可以使用 `paths` 来简化书写。

```javascript
seajs.config({
  paths: {
    'gallery': 'https://a.alipayobjects.com/gallery',
    'app': 'path/to/app',
  }
});
```

```javascript
define(function(require, exports, module) {

   var underscore = require('gallery/underscore');
     //=> 加载的是 https://a.alipayobjects.com/gallery/underscore.js

   var biz = require('app/biz');
     //=> 加载的是 path/to/app/biz.js

});
```

`paths` 配置可以结合 `alias` 配置一起使用，让模块引用非常方便。







### vars `Object`





有些场景下，模块路径在运行时才能确定，这时可以使用 `vars` 变量来配置。

```javascript
seajs.config({
  vars: {
    'locale': 'zh-cn'
  }
});
```

```javascript
define(function(require, exports, module) {

  var lang = require('./i18n/{locale}.js');
     //=> 加载的是 path/to/i18n/zh-cn.js

});
```

`vars` 配置的是模块标识中的变量值，在模块标识中用 `{key}` 来表示变量。









### map `Array`





该配置可对模块路径进行映射修改，可用于路径转换、在线调试等。

```javascript
seajs.config({
  map: [
    [ '.js', '-debug.js' ]
  ]
});
```

```javascript
define(function(require, exports, module) {

  var a = require('./a');
     //=> 加载的是 path/to/a-debug.js

});
```

更多用法可参考：[调试实践](https://github.com/seajs/seajs/issues/263)



















### preload `Array`





使用 `preload` 配置项，可以在普通模块加载前，提前加载并初始化好指定模块。

```javascript
// 在老浏览器中，提前加载好 ES5 和 json 模块
seajs.config({
  preload: [
    Function.prototype.bind ? '' : 'es5-safe',
    this.JSON ? '' : 'json'
  ]
});
```

`preload` 中的空字符串会被忽略掉。







**注意**：`preload` 中的配置，需要等到 `use` 时才加载。比如：

```javascript
seajs.config({
  preload: 'a'
});

// 在加载 b 之前，会确保模块 a 已经加载并执行好
seajs.use('./b');
```









`preload` 配置**不能放在模块文件(用define定义的文件)**里面：

```javascript
seajs.config({
  preload: 'a'
});

define(function(require, exports) {
  // 此处执行时，不能保证模块 a 已经加载并执行好
});
```















### debug `Boolean`



值为 `true` 时，加载器不会删除动态插入的 script 标签。插件也可以根据 debug 配置，来决策 log 等信息的输出。













### base `String`

Sea.js 在解析顶级标识时，会相对 `base` 路径来解析。详情请参阅 [模块标识](https://github.com/seajs/seajs/issues/258)

**在 seajs@2.3.0 之前，Sea.js 会根据 sea.js 的路径去猜测 base 路径，一般为路径上含有 seajs 字符串的上一级路径。在 seajs@2.3.0 后，去掉了这个模糊的猜测。**



**我们推荐始终手动设置一个准确的 base 路径**。















### charset `String | Function`

获取模块文件时，`` 或 `` 标签的 `charset` 属性。 默认是 `utf-8`

`charset` 还可以是一个函数：

```javascript
seajs.config({
  charset: function(url) {

    // xxx 目录下的文件用 gbk 编码加载
    if (url.indexOf('http://example.com/js/xxx') === 0) {
      return 'gbk';
    }

    // 其他文件用 utf-8 编码
    return 'utf-8';

  }
});
```

















## 提示

### 多次配置自动合并

`seajs.config` 可以多次运行，每次运行时，会对配置项进行合并操作：

```
seajs.config({
  alias: {
    'jquery': 'path/to/jquery.js',
    'a': 'path/to/a.js'
  },
  preload: ['seajs-text']
});
```

```
seajs.config({
  alias: {
    'underscore': 'path/to/underscore.js',
    'a': 'path/to/biz/a.js'
  },
  preload: ['seajs-combo']
});
```

上面两处 `config` 运行的结果是：

```
 alias = {
   'jquery': 'path/to/jquery.js',
   'underscore': 'path/to/underscore.js',
   'a': 'path/to/biz/a.js'
 };

 preload = ['seajs-text', 'seajs-combo'];
```

即：`config` 会**自动合并不存在的项，对存在的项则进行覆盖。**











### 插件的配置

插件可以给 Sea.js 添加配置项，请查看具体插件了解相关配置。







### 配置文件

配置可以直接写在 html 页面上，也可以独立出来成为一个文件。

config.js

```
seajs.config({
  ...
});
```

独立成一个文件时，一般通过 script 标签在页面中同步引入。





#  

常用的配置项是 `alias`、`paths`、`base`，其他配置项有需要时，来查查文档就会用了。



































#  





