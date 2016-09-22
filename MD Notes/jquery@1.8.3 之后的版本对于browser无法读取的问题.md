## jQuery 1.9以上版本对于`jQuery.browser.version`舍弃之后的解决方法 

这个标题...我也不知道我在说什么, 具体来说,就是对于高版本的jquery中放弃了browser这个方法 . 问题是一些插件会用到这个方法,那么怎么解决呢?

如下. 自己实现一下这个方法就可以了.



:)



```javascript
jQuery.browser = {};
(function () {
  jQuery.browser.msie = false;
  jQuery.browser.version = 0;
  if (navigator.userAgent.match(/MSIE ([0-9]+)./)) {
    jQuery.browser.msie = true;
    jQuery.browser.version = RegExp.$1;
  }
})();
```

  