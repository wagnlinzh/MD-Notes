
//# CMD 模块定义规范
/*
在 Sea.js 中，所有 JavaScript 模块都遵循 CMD（Common Module Definition） 模块定义规范。该规范明确了模块的基本书写格式和基本交互规则。
*/


// 在 CMD 规范中，一个模块就是一个文件。代码的书写格式如下：

define(factory);
define Function
/*
define 是一个全局函数，用来定义模块。
*/

define define(factory)
/*
define 接受 factory 参数，factory 可以是一个函数，也可以是一个对象或字符串。
*/
/*
factory 为对象、字符串时，表示模块的接口就是该对象、字符串。比如可以如下定义一个 JSON 数据模块：
*/
define({ "foo": "bar" });
//也可以通过字符串定义模板模块：

//# define('I am a template. My name is {{name}}.');

/*
factory 为函数时，表示是模块的构造方法。执行该构造方法，可以得到模块向外提供的接口。factory 方法在执行时，默认会传入三个参数：require、exports 和 module：
*/

define(function(require, exports, module) {

  // 模块代码

});



// #require.async require.async(id, callback?)

// require.async 方法用来在模块内部异步加载模块，并在加载完成后执行指定回调。callback 参数可选。


define(function(require,exports,module){
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


/*
注意：require 是同步往下执行，require.async 则是异步回调执行。require.async 一般用来加载可延迟异步加载的模块。
*/



//# require.resolve require.resolve(id)

//使用系统模块内部的路径解析机制来解析并返回模板路径. 该函数不会加载模块,只返回解析后的 绝对路径.

//这可以用来获取模块路径，一般用在插件环境或需动态拼接模块路径的场景下。
define(function(require, exports){
  console.log(require.resolve('./b')); // ==> http://example.com/path/to/b.js
})




//# exports


define(function(require,exports){
//对外提供foo属性
exports.foo="bar";

//对外提供doSomething方法
exports.doSomething=function(){};

});


//除了给 exports 对象增加成员，还可以使用 return 直接向外提供接口。见下:

define(function(require){
  //通过return直接提供接口
  return {
    foo:"bar",
    doSomething:function(){}
  };
});




// 如果 return 语句是模块中的唯一代码，还可简化为：

define({
  foo: 'bar',
  doSomething: function() {}
});


//上面这种格式特别适合定义 JSONP 模块。



//Notes : **特别注意：下面这种写法是错误的！**

define(function(require, exports) {

  // 错误用法！！!
  exports = {
    foo: 'bar',
    doSomething: function() {}
  };

});


//正确的姿势是用return或者给module.exports赋值
difine(function(require,exports,module){
  //正确的写法
  module.exports={
    foo:"bar",
    doSomething:function(){}
  }
});

//提示Tips：exports 仅仅是 module.exports 的一个引用。在 factory 内部给 exports 重新赋值时，并不会改变 module.exports 的值。因此给 exports 赋值是无效的，不能用来更改模块接口。



// ## module

// module 是一个对象, 上面存储了与当前模块相关联的一些属性和方法



// ### module.id -> 模块的唯一标识

difine('id',[],function(require,exports,module){
//模块代码
});


//上述代码中,define的第一个参数就是模块标识



// ## module.uri
//根据模块系统的路径解析规则得到的模块绝对路径。

define(function(require,exports,module){
  console.log(module.uri); // ==> http://example.com/path/to/this/file.js
});

// 一般情况下,(没有在define中手写id参数时),module.id 的值就是module.uri,两者完全相同.



//module.dependencies
//dependencies 是一个数组, 表示当前模块的依赖



/*
module.exports Object

当前模块对外提供的接口。

传给 factory 构造方法的 exports 参数是 module.exports 对象的一个引用。只通过 exports 参数来提供接口，有时无法满足开发者的所有需求。 比如当模块的接口是某个类的实例时，需要通过 module.exports 来实现：

*/

difine(function(require,exports,module){
  //exports 是module.exports 的一个引用
  console.log(module.exports=== exports); //true

 //重新给module.exports 赋值
  module.exports=new SomeClass();

  //exports 不再等于module.exports
  console.log(module.exports=== exports); //false

})

//注意：对 module.exports 的赋值需要同步执行，不能放在回调函数里。下面这样是不行的：



//x.js
define(function(require, exports, module){
  //错误用法
  setTimeOut(function(){
    module.exports = {a:"hello"};
  },0);
});
//在y.js中调用上面的x.js
// y.js
define(function(require, exports, module){
  var x=require("./x");
  //无法立即得到模块x的a属性
  console.log(x.a);//undefined
})


<script>
  // sea.js 的源码
  var seajs = global.seajs = {
    // The current version of Sea.js being used
    version: "@VERSION"
  }

  var data = seajs.data = {}
</script>
