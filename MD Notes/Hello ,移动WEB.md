## Hello ,移动WEB 笔记















<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

## 2-1 pixel像素基础

- px  : CSS pixels 逻辑像素 .浏览器使用的抽象单位


- dp,pt : device independent pixels 设备无关像素(物理像素)
- dpr: devicePixelRatio 设备像素缩放比



iphone5   640 x 1136 指的是物理像素.





px 与 dp之间的换算关系.

```
1px = (dpr)*(dpr)*dp
```



**iphone5 dpr=2**

->

1px = (2)^2 *dp 

1px由4个物理像素来渲染.





--



DPI: 打印机每英寸可以喷的墨汁点

PPI: **屏幕每英寸的像素数量, 即单位英寸内的像素密度.**

**Notes:** 目前在计算机显示设备参数描述上, 二者意思表达是一样的. 这里的像素(物理像素)



```
计算公式: 以iphone5 为例 

iphone5 的 ppi
= (1136*1136+640*640).开方 /4 
=326ppi


1136 640:dp
4 : 4英寸.
```



PPI 越高 图片越清晰.









PPI 像素默认缩放比



|       | ldpi | mdpi | hdpi | xhdpi |
| ----- | ---- | ---- | ---- | ----- |
| ppi   | 120  | 160  | 240  | 320   |
| 默认缩放比 | 0.75 | 1.0  | 1.5  | 2.0   |





iphone ppi =326 > 320    ==> pdr=2























<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

## Viewport

visual viewport (视口viewport)



layout viewport(布局viewport)











layout viewport 不是原页面的大小.iphone 5 的viewport是960px



底下一层:layout viewport 是负责渲染页面.

上面一层:visual viewport 通过缩放来显示底层的layout viewport的一部分内容或者全部内容.





通过缩放来使视口viewport来显示layout viewport



我们能够得到并且操作的是 布局viewport 即layout viewport. 对于visual 我们没法得到也没有办法修改. 只能通过窗口缩放(scale)来控制.







```css
/*layout viewport 布局视口*/
document.body.clientWidth

/* visual viewport 视觉视口*/
window.innerWidth.
```





默认缩放比 = (visual viewport) / (layout viewport) ;





禁止默认缩放.  **initial-scale=1**



```html
<meta name="viewport" content="width=device-width,initial-scale=1">

<!--
通过width=device-width :使得 layout viewport 等于设备宽度
通过 initial-scale=1: 使得layoutviewport = visual viewport
-->
```









<br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

## 4-1

在移动设备上没有了鼠标输入,hover等一些鼠标事件不再生效. 取而代之的是更加人性化的触摸事件(touch). 







<br /><br /><br /><br /><br />

## Tap事件基础

300毫秒延迟的解决方案. **使用Tap事件去代替click事件**

Tap事件是自定义事件.

```
自定义Tap事件的原理:

在touchstart,touchend时记录 时间,手指位置,在touchend时进行比较,如果手指位置为同一位置(或允许移动一个非常小的位移值)且时间间隔较短(一般认为是200ms),且过程中未曾触发过touchmove,即可认为出发了手持设备的"click",一般称它为"tap"
```











<br /><br /><br /><br /><br />

## 触摸Touch

触摸是移动设备的交互的核心事件

- touchstart
- touchmove
- touchend
- touchcancel 



对性能友好的做法去移动物体,较好的做法是使用css3 的translation



每个touch对象包含属性:

clientX: 触摸目标在视口中的x坐标

clientY: 触摸目标在视口中的y坐标

identifier: 标识触摸的唯一ID

pageX 触摸目标在页面中的x坐标

pageY 触摸目标在页面中的y坐标

screenX: 触摸目标在屏幕中的x坐标

screenY:触摸目标在屏幕中的y坐标

target: DOM节点目标









<br /><br /><br /><br /><br />

##  弹性滚动

局部滚动开启弹性滚动:

```css
body{
  overflow:scroll;
  -webkit-overflow-scrolling:touch;
}
```

安卓不支持弹性滚动.可以借助第三方库IScroll来实现







<br /><br /><br /><br /><br /><br /><br />



## 几种适配不同尺寸屏幕的方法分析





```javascript
(function (doc, win) {
  var docEl = doc.documentElement,
  resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
  recalc = function () {
    var clientWidth = docEl.clientWidth;
    docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
    //clientWidth 是逻辑宽度,也就是最单纯的CSS piexl 640也是单纯的CSS piexl像素单位.
  };
  recalc();
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, false);
})(document, window);


/**
  * docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';
  * clientWidth 是逻辑宽度,也就是最单纯的CSS piexl 640也是单纯的CSS piexl像素单位.
  *
  */


```

这段代码的作用是完成缩放.让各个屏幕通过缩放达到**相同比例的一致**. 这是针对iphone5 的. 缩放标准在iphone5 的基础上改好了,其他的适配就完成了.为什么呢? 因为缩放.



对于iphone5

```javascript
document.documentElement.style.fontSize 
= 100 * (document.documentElement.clientWidth / 640) + 'px';
```

这时html.font-size 应该等于 50px. 相对于设计稿为640px的psd. 对于宽度为100% 的图. 我们需要做到的设置其宽度为320px.即有 320px/50px =6.4rem.





如果要以iphone 6 plus作为参照应该怎么设计呢? iphone 6 plus  414px?



:)





 