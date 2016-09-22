## 两种js监听滚轮事件的实现方法



**一、原生js通过window.onscroll监听**

```
//
window.onscroll = function() {
//为了保证兼容性，这里取两个值，哪个有值取哪一个　　

var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
　　//scrollTop就是触发滚轮事件时滚轮的高度
}
```






**二、Jquery通过$(window).scroll()监听**

```
$(window).scroll(function(){
//为了保证兼容性，这里取两个值，哪个有值取哪一个　　
var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;　　
//scrollTop就是触发滚轮事件时滚轮的高
}
```

