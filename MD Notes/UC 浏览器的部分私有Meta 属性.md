## UC 浏览器的部分私有Meta 属性

1 设置屏幕方向为横屏还是竖屏
<meta name="screen-orientation" content="portrait|landscape">



2 设置是否全屏，yes表示强制浏览器全屏
<meta name="full-screen" content="yes">



3 缩放不出滚动条
<meta name="viewport" content="uc-fitscreen=no|yes"/>
设置no后用户缩放与标准浏览器缩放一直，设置为yes后，用户缩放金放到图片和文字，不出现横向滚动条。



4  排版
<meta name="layoutmode" content="fitscreen|standard" />
  fitscreen模式简化页面处理，适合页面阅读节省流量，standard模式和标准浏览器一致；一旦设置layoutmode meta后，用户使用浏览器提供的的排版模式选项将会无效。



5强制图片显示
<meta name="imagemode" content="force"/>
 UC浏览器为了节省流量，为用户提供了无图模式，但是如果页面的图片是必不可少的，如验证码的，需要强制浏览器显示图片，可以设置imagemode， 不影响子页面。通过META设置图片加载方式会作用于整个页面，如果希望对单个图片进行设置，那么可以使用这个

<img src="..." show="force">



6 应用模式
<meta name="browsermode" content="application"/>
使用了application这种应用模式后，页面讲默认全屏，禁止长按菜单，禁止收拾，标准排版，以及强制图片显示。

