## 禁止iOS的弹性滚动 微信的下拉回弹

**一种方法：**

html头部添加

```
<meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=no">

```

然后将页面body的高度设为window的高度

```
 $("body").height( $(window).height() );

```

**其他方法**

页面高度超过设备可见高度时，阻止掉touchmove事件。

```
document.body.addEventListener('touchmove', function (event) {
    event.preventDefault();
}, false);
```






<br>

<br>



```javascript

/**
 * 禁止浏览器下拉回弹
 */
function stopDrop() {
    var lastY;//最后一次y坐标点
    $(document.body).on('touchstart', function(event) {
        lastY = event.originalEvent.changedTouches[0].clientY;//点击屏幕时记录最后一次Y度坐标。
    });
    $(document.body).on('touchmove', function(event) {
        var y = event.originalEvent.changedTouches[0].clientY;
        var st = $(this).scrollTop(); //滚动条高度
        console.log("st = "+st);
        if (y >= lastY && st <= 0) {//如果滚动条高度小于0，可以理解为到顶了，且是下拉情况下，阻止touchmove事件。
            lastY = y;
            event.preventDefault();
        }
        lastY = y;

        //方法三
        // var abc=$(document.body).scrollTop();
        // console.log("abc = "+abc);
        // if (abc>0) {
        //   $(document.body).scrollTop(0);
        // }
    });
}
stopDrop();
```





<br>



<br>





https://segmentfault.com/q/1010000000322091