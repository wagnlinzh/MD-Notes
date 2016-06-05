# [JS代码片段补全(插件:javascript-snippets)](http://blog.csdn.net/crper/article/details/47854489)

****

版权声明：保留原博文链接及作者的情况下，请尽情转载吧！！！

目录[(?)](http://blog.csdn.net/crper/article/details/47854489#)[[\]](http://blog.csdn.net/crper/article/details/47854489#)

# 题外话

这款插件就比较重量级了….用熟悉了写原生JS的效率要提升很多……而且,不仅支持JS还包含了nodejs snippet

------

# [javascript-snippets](https://atom.io/packages/javascript-snippets)

插件作者: **zenorocha** 

插件作者: **zenorocha** 
Github地址 : [https://github.com/zenorocha/atom-javascript-snippets](https://github.com/zenorocha/atom-javascript-snippets)

内置了丰富的JS snippet . 而且也很好理解和记忆…耍多了会上手的

------

# 安装

- 在设置中心搜索安装

![javascript-snippet](http://img.blog.csdn.net/20150822042211359)

------

# 代码片段(Tab或者Enter补全)

## Console命令

### [cd] console.dir — 这条命令可以遍历一个对象内容

```
console.dir(${1:obj});11
```

### [ce] console.error — 打印出信息带有错误图标

```
console.error(${1:obj});11
```

### [cl] console.log — 打印出信息

```
console.log(${1:obj});11
```

### [cw] console.warn — 打印带有警告图标的信息

```
console.warn(${1:obj});11
```

## DOM — 文档对象模型

### [ae] addEventListener — 事件监听

```
${1:document}.addEventListener('${2:event}', function(e) {
    ${0:// body...}
});123123
```

### [ac] appendChild — 增加子元素

```
${1:document}.appendChild(${2:elem});11
```

### [rc] removeChild — 删除子元素

```
${1:document}.removeChild(${2:elem});11
```

### [cel] createElement — 创建元素

```
${1:document}.createElement(${2:elem});11
```

### [cdf] createDocumentFragment — 创建文档碎片节点

```
${1:document}.createDocumentFragment(${2:elem});11
```

### [ca] classList.add — 冷门属性,为了解决className不能解决出现..没用过

```
${1:document}.classList.add('${2:class}');11
```

### [ct] classList.toggle — 同上

```
${1:document}.classList.toggle('${2:class}');11
```

### [cr] classList.remove — 同上

```
${1:document}.classList.remove('${2:class}');11
```

### [gi] getElementById — 获取元素ID

```
${1:document}.getElementById('${2:id}');11
```

### [gc] getElementsByClassName — 获取元素类名[返回值为数组]

```
${1:document}.getElementsByClassName('${2:class}');11
```

### [gt] getElementsByTagName — 获取标签集合[返回值是一个nodeList,非数组]

```
${1:document}.getElementsByTagName('${2:tag}');11
```

### [ga] getAttribute — 获取属性值

```
${1:document}.getAttribute('${2:attr}');11
```

### [sa] setAttribute — 设置属性值

```
${1:document}.setAttribute('${2:attr}', ${3:value});11
```

### [ra] removeAttribute — 移除属性值

```
${1:document}.removeAttribute('${2:attr}');11
```

### [ih] innerHTML — 代码块插入html结构

```
${1:document}.innerHTML = '${2:elem}';11
```

### [tc] textContent — 纯文本,裸奔的innerHTML

```
${1:document}.textContent = '${2:content}';11
```

### [qs] querySelector — HTML5新属性,获取选择器,类似JQ的$(‘div#name’)

```
${1:document}.querySelector('${2:selector}');11
```

### [qsa] querySelectorAll — 同上,都支持多个选择器,但这个返回一个nodeList

```
${1:document}.querySelectorAll('${2:selector}');11
```

## Loop

### [fe] forEach — 遍历数组或者对象用的方法

```
${1:myArray}.forEach(function(${2:elem}) {
    ${0:// body...}
});123123
```

### [fi] for in — 遍历对象用的方法

```
for (${1:prop} in ${2:obj}) {
    if (${2:obj}.hasOwnProperty(${1:prop})) {
        ${0:// body...}
    }
}1234512345
```

## Function

### [fn] function — 函数声明

```
function ${1:methodName} (${2:arguments}) {
    ${0:// body...}
}123123
```

### [afn] anonymous function —- 匿名函数

```
function(${1:arguments}) {
    ${0:// body...}
}123123
```

### [pr] prototype — 原型

```
${1:ClassName}.prototype.${2:methodName} = function(${3:arguments}) {
    ${0:// body...}
}123123
```

### [iife] immediately-invoked function expression — 函数表达式

```
(function(window, document, undefined) {
    ${0:// body...}
})(window, document);123123
```

### [call] function call — 回调函数

```
${1:methodName}.call(${2:context}, ${3:arguments})11
```

### [apply] function apply — 回调函数

```
${1:methodName}.apply(${2:context}, [${3:arguments}])11
```

### [ofn] function as a property of an object — 函数声明

```
${1:functionName}: function(${2:arguments}) {
    ${3:// body...}
}123123
```

## Timer

### [si] setInterval — 根据设置时间不断调用的方法

```
setInterval(function() {
    ${0:// body...}
}, ${1:delay});123123
```

### [st] setTimeout — 同上,区别在于一般不会重复执行

```
setTimeout(function() {
    ${0:// body...}
}, ${1:delay});123123
```

## NodeJS

### [ase] assert.equal

```
assert.equal(${1:actual}, ${2:expected});11
```

### [asd] assert.deepEqual

```
assert.deepEqual(${1:actual}, ${2:expected});11
```

### [asn] assert.notEqual

```
assert.notEqual(${1:actual}, ${2:expected});11
```

### [me] module.exports

```
module.exports = ${1:name};11
```

### [pe] process.exit

```
process.exit(${1:code});11
```

### [re] require — 请求模块

```
require('${1:module}');11
```

## BDD

### [desc] describe

```
describe('${1:description}', function() {
    ${0:// body...}
});123123
```

### [ita] it asynchronous

```
it('${1:description}', function(done) {
    ${0:// body...}
});123123
```

### [its] it synchronous

```
it('${1:description}', function() {
    ${0:// body...}
});123123
```

### [itp] it pending

```
it('${1:description}');11
```

## Misc

### [us] use strict — JS语法使用严格模式

```
'use strict';11
```

### [al] alert — 弹窗

```
alert('${1:msg}');11
```

### [pm] prompt — 提示弹窗

```
prompt('${1:msg}');11
```

# 结束语

这些用熟悉了…. 写代码的速度不说提升百分百…但是增加20%还是有的; 

这些用熟悉了…. 写代码的速度不说提升百分百…但是增加20%还是有的; 
而且还有一个好处,不会出现代码漏打字符,打错字符的情况..毕竟模版写死了; 

这些用熟悉了…. 写代码的速度不说提升百分百…但是增加20%还是有的; 
而且还有一个好处,不会出现代码漏打字符,打错字符的情况..毕竟模版写死了; 
除非参数传错了…..

我也在学习的路上,,,,慢慢的充实自己……………………………

****