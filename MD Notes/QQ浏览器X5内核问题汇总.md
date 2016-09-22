# QQ浏览器X5内核问题汇总

23 September 2015

重要更新，X5内核即将更新为Blink内核，到时候下面的这些问题将全部被修复。

X5内核开发团队也给开发者们提供了不少指引，推荐关注： [http://x5.tencent.com/guide?id=2001](http://x5.tencent.com/guide?id=2001)



@2016-04-05

<br /><br /><br /><br /><br />

## 

常常被人问及微信中使用的X5内核的问题，其实我也不是很清楚，只知道它是基于android 4.2的webkit，版本号是webkit 534。今天正好从X5团队拿到了一份问题汇总，梳理下发出来，给各位开发者以参考——不排除明天会删除这篇文章的可能。

<br />

1.Android WebView常见问题及解决方案汇总：

[http://blog.csdn.net/t12x3456/article/details/13769731](http://blog.csdn.net/t12x3456/article/details/13769731)



<br />

2.请问各位碰到过X5浏览器内，局部滑动使用iscroll卡顿的问题么？

回答：是使用 iscroll.js 这个JS去滚动么？如果只是为了产生滚动，建议使用 overflow 属性来，目前有一种滚动优化在线上版本效率不是太好，通过JS去改变CSS的属性产生滚动



<br />

3.调用：`-webkit-filter: blur(10px);filter: blur(10px);`在Android下 背景图没有blur掉，只是被单纯的放大而已

回答：`-webkit-filter`目前还不支持，可以先用图片替换的方式 后续版本会支持这个属性



<br />

4.shadowBlur是阴影效果吧，我们是想实现图片毛玻璃

回答： [http://blog.csdn.net/jia20003/article/details/9195915](http://blog.csdn.net/jia20003/article/details/9195915) 这个有用么

<br />

5.LBS相关，定位频繁失败

第一步，首先确认定位失败是个别站点原因还是所有站点定位都失败。如果是所有站点定位都不成功，很有可能是内核问题，转内核相关同学跟进调查定位逻辑是否有缺陷；如果是某个站点才会出现的问题，继续第二步排查，从站点源码着手。

第二步，找到站点请求定位的js代码段，检查获取定位信息函数的options字段，很有可能是 options 中 timeout 字段设置的超时太短导致，建议前端开发将该字段时间设置长一些（建议10s以上）或者不设置该字段。如果js没有设置 timeout 字段的情况下仍然定位不成功，则转内核同学调查内核流程。

ps：H5获取LBS信息的js接口

回答：

```
navigator.geolocation.getCurrentPosition(showPosition,showError,{  
    enableHighAccuracy:false，
    timeout:10*1000,
    maximumAge:0
});

navigator.geolocation.watchPosition(watchPosition,showError,options);  

```

showPosition：定位成功时回调； 
showError：定位出错时回调； 
options：可选的地理定位请求特征 
enableHightAccuracy：可选，是否开启高精度模式，参数默认值为 false 
timeout：可选，单位为ms，浏览器需要在该时间段内完成定位，否则定位失败，默认值为 - - infinity，无穷大。如果该值设置较小，会有很高的定位失败率。 
maximumAge：可选，单位ms，重新计算位置的时间间隔。默认为0，即每次时时计算位置信息。



<br />

6.打开视频播放，后退视频仍然在播放

回答：部分机型，浏览页面时打开视频播放，点击返回，页面上的视频仍然在播放。解决办法是捕获后退事件，主动调用 onHideCustomView() 方法，并且在该方法里将 onShowCustomView 里关联的view解除关联



<br />

7.请问一下微信浏览器的cookie清理机制是怎么样的？

回答：X5内核是不会清除的。



<br />

8.打开WWW页面，缩放显示的问题

回答： 使用webview打开www页面，如果页面被放大显示，确定websettings有没有设置，`webSettings.setUseWideViewPort（true`），默认为false，www页面不会被缩放显示的。手机QQ浏览器默认为true，显示www页面更美观



<br />

9.关于滚动时候动画的问题

回答：

页面滑动过程中动画不会被触发 页面滑动过程中动画会被停止 这个是X5内核为了做滚动优化而做的限制



<br />

10.关于connection type定义的问题

回答：X5执行的标准比较老，NetworkInfo_API

```
enum ConnectionType {  
UNKNOWN = 0,  
ETHERNET = 1,  
WIFI = 2,  
CELL_2G = 3,  
CELL_3G = 4,  
CELL_4G = 5,  
NONE = 6,  
};

```



<br />

11.出现网络正常，但是页面打不开的情况

回答：关于设置里面的云加速试下是否可以打开。



<br />

12.js阻塞和css阻塞的不同

回答：css是阻塞渲染过程，js阻塞解析过程！对于用户来说，没什么区别，都是空白的 js的执行时，如果js中有读写css的属性的代码，并且下载队列中有待加载的css，js执行会被阻塞掉。





<br />

13.cookie的4k限制

回答：浏览器端cookie的数量可能会超过4k，有http请求时，内核只取前4k的cookie数据！



<br />

14.Js Defer与把js放到html底部的区别

回答：js defer：先加载，ondownload 后执行。和js放到html底部类似。不同的就是html预扫描到会先加载





<br />

15.首屏显示后，为什么又会重排版

回答：浏览器的排版宽度受上层ui设置的webview宽度影响。如果webview没设置或者是设置成0，浏览器内核会用默认的排版宽度320px进行排版。此时若webview的宽度值被正常设置，计算出来的排版宽度不是320px（一般是360px），这样浏览器就要用360px宽度，对页面进行重排。





<br />

16.canvas的数量是不是有限制

回答：

- 小于1G的内存， canvas的内存不能超过100M
- 1G到2G的内存， canvas的内存不能超过300M
- 大于2G的内存 canvas的内存不能超过500M
- 为了防止内存占用过多，硬件加速的CANVAS最多支持5个

小于等于1G内存手机，由于内存没办法精确统计，当达到75M以上，CANVAS数量最多支持20个

上面说的canvas内存，仅仅是说canvas 长宽计算出来的内存，不包括canavs使用的图片等资源内存





<br />

17.x5浏览器CSS3有些不支持,同样的样式，在chrome里能起到效果，在X5就没用。并且js性能也差的多,微信还内置X5，用起来太不爽

回答：是否方便具体说下是什么样的性能问题和css样式缺陷影响到您？我们这边可以跟进查看下原因。

X5内核也在不断改进，您的反馈可以帮助我们进一步优化。

chrome在标准的支持和性能优化方面确实目前走在业界前面，不过android系统的碎片化，android系统webview更是碎片化严重。

android系统上的web开发可能也需要考虑到不同rom的兼容情况。X5内核致力于为开发者提供统一的web体验，并通过不断的优化，来向业界标准对齐。

目前我们也在做基于chromium内核的研究工作，后续在标准的支持和性能上会有进一步提高。





<br />

18.请问下x5中js调用android怎么实现？

回答：跟系统内核下一样，都借助 addjavainterface 实现





<br />

19.请问一下，android手机微信上用的x5支持webgl吗？

回答：android手机中微信上的X5都是支持webgl的，不过部分机型上还有兼容性问题，由于兼容性问题，webgl之前我们是采用软绘的方式支持,目前切换到了硬绘，但整体来说还是会有兼容性和性能问题,后续这块还会持续更新





<br />

20.如果在某个设备第一次打开应用的时候 没有网络，x5内核可以启动吗？单网络恢复后还要再次认证，还是 不用在认证？

回答：第一次打开应用是不会拉起X5的 在第二次打开之后 不管有无网络都可以拉起





<br />

21.如果我不安装浏览器，安装微信，x5能调用起来吗?

回答：不能，只能安装QQ浏览器才能调用





<br />

22.web audio api是否已经支持？

回答：暂时还不支持



<br />

23.什么时候支持html5的onunload和onbeforeunload事件

回答：现在是支持html5的 onunload 和 onbeforeunload 事件的



<br />

24.要用X5的内核，必须要用QQ浏览器么？

回答：目前 SDK 版本是这样的，我们正在预研的版本，手机如果安装了微信或手Q ，其它 app 可以不依赖 QQ浏览器 而共享 x5 内核。



<br />

25.关于svg问题。

回答：关于SVG的问题：

关于svg模糊的问题，有2种情况：

直接访问一个.svg url的页面或者object，embed加入的svg， 出现模糊的问题

此问题已解决， qq浏览器5.8上已经修复， tbs下个版本也会修复 svg用作background-image, 模糊这个问题是我们目前渲染机制导致不能兼容非标准写法： 在用svg作为background-image的时候， 需要指定background-size， 不然会模糊

关于svg支持情况： 在5.3之前的qq浏览器不支持svg， 我们会在后台把svg转成一张jpeg图片， 供浏览器显示，5.4及以上版本支持svg，如果遇到被转成图片的问题，需要升级浏览器版本。



<br />

26.请问flexbox近期会支持吗？

回答：flexbox我们正在做开发支持



<br />

27.x5内核 目前是独立运行的 还是需要安装ＱＱ浏览器？

回答：sdk是需要QQ浏览器的，微信手Q里的是不需要的





<br />

28.现在X5内核怎么调试？在微信或者手q或者qq浏览器中调试页面

回答：现在的微信手Q里面的X5还无法通过inspector调试 后期我们会把带有inspector调试的版本挂在开发者后台下载区 敬请期待



<br />

29.请问x5支持webgl的所有接口吗？能在所有版本的android机（4.0+)和ios机(5.0+)上运行webgl吗？

回答：webgl目前是支持的，不过部分机型上还有兼容性问题



<br />

30.X5上支持哪些扩展？支持多少个纹理单元？

回答：X5上只能支持：

```
WEBGL_lose_context  
EXT_texture_filter_anisotropic  
OES_texture_float  
OES_standard_derivatives  
OES_vertex_array_object  
WEBGL_debug_renderer_info  
WEBGL_debug_shaders  
WEBKIT_WEBGL_compressed_texture_s3tc  

```

而且这些是必须手机GPU有对应的扩展指令才行的。

关于纹理单元。我们这边没有限制

上面的扩展，也都是基本每一个对应opengl的一个扩展

支持多少纹理单元，也是从opengl查询得到的。

主要应该是看手机GPU支持到啥程度，我们是做个对接。





<br />

31.x5的文件分片功能解决了吗，`blob = file.webkitSlice(start, stop)`,这样分片出来的blob用不了啊。

回答：分片问题这边已经定位处理，浏览器会在5.8版本修复





<br />

32.手机qq浏览器是否有调试工具呢？

回答：有的，Inspector。



<br />

33.请问现在微信调用的手机QQ浏览器支持websocket 吗？

回答：支持websocket ，暂不支持wss，不支持webrtc



<br />

34.有计划支持webRTC吗？

回答：这个我们后续会评估的。



<br />

35.我是HTML5游戏开发者，制作中的H5游戏需要有音乐音效。但是我在android机器上使用QQ浏览器出现了如下问题：

循环播放BGM时，如果同时播放音效，BGM会被强行暂停 多个音效同时播放时，会出现明显的无法忍受的延迟和播放失败 这个问题在同一台机器的微信上同样存在，但是同一台机器的chrome没有这个问题。

我能想到的最合理的解释是：X5内核同一时间只能播放一个音频通道。

希望官方能解答我的疑惑和遇到的问题，谢谢。

PS：

- 使用的H5音频库 : SoundJS
- 使用的音频格式 : mp3
- 使用的Android机型：三星 Note3

回答：播放音效需要获取声音输出焦点，目前只支持同时播放一个音效 您提的需求我们会讨论评估后期是否能有方案现





<br />

36.播放音效时，为啥会把我后台的BGM播放给暂停掉？

回答：播放声音时当前音频需要获取 audiofocus ，系统在audiofocus丢失时会通知其它音频播放软件，这个暂停应该是播放软件自身的行为，我们本身并没有暂停后台音频，只是向系统申请了 audiofocus



<br />

37.300ms延迟是指什么？click 和 touch ?

回答：touch 点击之后，到 click 事件被触发，click 事件有延迟，touch 不存在，用 touchstart 事件替代 click 事件就OK





<br />

38.现在微信内置的浏览器能支持flexbox么，现在有没有什么好办法能够替代呢？做好的网页一放到微信上，大量的flex的页面

回答：你好flexbox正在开发支持，flexbox在android4.1到4.3系统内核上，也有类似问题，页面是需要兼容的





<br />

39.有没有什么x5内核的论坛或者wiki之类的？可以参考下。

回答：[http://bbs.browser.qq.com/](http://bbs.browser.qq.com/) [http://x5.tencent.com/](http://x5.tencent.com/) 这两个论坛可以关注下

另外有我们的公众账号 有问题可以随时交流



<br />

40.X5公众号叫什么？

回答：腾讯X5浏览服务



<br />

41.手q上面的内核应该也是x5的吧？这样直接在手q上面的效果和在微信里面应该是一样的？

回答：是的手Q微信内的webview都是X5。





<br />

42.x5不支持font-face吗？

回答：支持



<br />

43.x5 支持flex吗？有兼容性文档吗？

回答：不支持.[http://1.h5support.sinaapp.com/incoming/cow.html](http://1.h5support.sinaapp.com/incoming/cow.html)

这个页面是参考caniuse的测试用例得到的测试结果，5.7是对应qq浏览器5.7版本，可以对比下和系统浏览器4.1~.4.4的支持度。有需要的同学可以先参考下，相关的文档建设我们也在逐步完……



<br />

44.iscroll+lazyload在x5浏览器里面卡顿很严重，有人碰到过类似问题么，小米手机 列表内元素200个左右。

回答：iscroll本身对内核要求比较高，较新的blink版本支持才比较好。可以对比测试下android 4.x 的系统浏览器看看。建议还是在前端做些优化，避免较长的元素，并减少动画效果。[http://www.cnblogs.com/vbluebirdv/archive/2012/11/18/2776300.html](http://www.cnblogs.com/vbluebirdv/archive/2012/11/18/2776300.html) 可以参考网上一些iscroll调优的文章





<br />

45.微信里面缓存问题，在安卓下和 ios下，刷新机制是不是不一样？

回答：ios因为有刷新功能，点击之后请求到的都是最新的文件，安卓下，不管怎样请求都不会更新文件



<br />

46.现在微信里面没有假如这个啊？为什么IOS QQ浏览器不识别这个？

回答：ios内核不是X5， ios 浏览器后续版本也会支持 [http://open.mb.qq.com/doc?id=1201](http://open.mb.qq.com/doc?id=1201) 目前ios 浏览器仅支持 x5-page-mode



<br />

47.现在白鹭游戏引擎是不是内置在x5里面了？

回答：内置了白鹭引擎runtime



<br />

48.x5内核不支持 canvas 的 background 属性吗？

```
<!doctype html>  
<html xmlns="http://www.w3.org/1999/xhtml">  
<head>  
<meta charset="utf-8">  
<title>canvas test</title>  
    <!--<meta HTTP-EQUIV="pragma" CONTENT="no-cache">-->
    <!--<meta HTTP-EQUIV="Cache-Control" CONTENT="no-store, must-revalidate">-->
</head>

<body>  
<div>  
    <canvas id="testCanvas" width="500" height="300" style="background: #00FF00;"></canvas>

<!--<canvas id="testCanvas" width="1136" height="640" style="background:#000"></canvas> -->  
</div>  
</body>  
</html>  

```

背景颜色显示不出来

回答：这个是做了优化，当canvas下盖了背景，就没有去绘制背景图片，当初是因为一些手机的GPu在绘制这块，如果存在这种情况绘制非常慢



<br />

49.qq浏览器有没有准备支持asm.js的计划？

回答：我们也正在筹备相关工作，会对市面上各种游戏引擎进行全面评测并设计合理的架构方案整合。预计下半年可以推出，敬请期待



<br />

50.X5不支持`canvas.toDataUrl()`的image/jpeg参数，还是转成了默认的png格式请问有什么替换方法吗？

回答：当前确实还不支持...我们在修复



<br />

51.问一下 ios版的微信里面是用的系统自带的UIWebView还是用的qq浏览器的内核？

回答：ios版微信里面用的是系统自带的





<br />

<br />

<br />

<br />

[神飞](https://www.qianduan.net/author/shenfei/)爱好前端设计与开发，崇尚一目了然的设计。现居深圳/广州，就职于腾讯微信设计团队。