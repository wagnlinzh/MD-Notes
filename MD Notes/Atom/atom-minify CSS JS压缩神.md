# [Atom编辑器折腾记_(17)atom-minify[CSS/JS压缩神\]](http://blog.csdn.net/crper/article/details/49283677)

标签： [atom](http://www.csdn.net/tag/atom)[压缩](http://www.csdn.net/tag/%e5%8e%8b%e7%bc%a9)[插件](http://www.csdn.net/tag/%e6%8f%92%e4%bb%b6)[gulp](http://www.csdn.net/tag/gulp)

2015-10-20 21:50 1861人阅读 [评论](http://blog.csdn.net/crper/article/details/49283677#comments)(0) [收藏](javascript:void(0);) [举报](http://blog.csdn.net/crper/article/details/49283677#report)

![](http://static.blog.csdn.net/images/category_icon.jpg) 分类：

 

Atom折腾记*（21）* ![](http://static.blog.csdn.net/images/arrow_triangle%20_down.jpg)

版权声明：保留原博文链接及作者的情况下，请尽情转载吧！！！

目录[(?)](http://blog.csdn.net/crper/article/details/49283677#)[[\]](http://blog.csdn.net/crper/article/details/49283677#)

# 简介

对于接触前端的小伙伴们,为了优化肯定是想尽办法的…. 

对于接触前端的小伙伴们,为了优化肯定是想尽办法的…. 
atom丰富的拓展接口,让atom变得更加强大,,,,国外的大牛把几种常见的压缩集成到一个小插件里面; 

对于接触前端的小伙伴们,为了优化肯定是想尽办法的…. 
atom丰富的拓展接口,让atom变得更加强大,,,,国外的大牛把几种常见的压缩集成到一个小插件里面; 
于是就有`atom-minify`这个快捷压缩神器

# 插件项目首页

作者： armin-pfaeffle

插件地址：　[https://atom.io/packages/atom-minify](https://atom.io/packages/atom-minify)

＃安装方法 

＃安装方法 
1. `apm install atom-minify` 

＃安装方法 
1. `apm install atom-minify` 
\2. 进入设置中心搜索`atom-minify`

设置非常丰富,一些图形化的设置已经满足一些小伙伴正常使用了

![这里写图片描述](http://img.blog.csdn.net/20151020213917715)

# 默认快捷键

- `ctrl-shift-m` : 执行压缩,生成一个带min后缀的(不想用min代表压缩可以进入设置修改)
- `ctrl-alt-shift-m`/`ctrl-cmd-shift-m` : 全局开启或者关闭保存自动生成压缩软件
- `ctrl-alt-shift-h /`ctrl-cmd-shift-h` : 全局开启或者关闭执行后弹出的消息面板功能
- 还有一些比较少用的快捷键,具体看文档

# 支持的压缩规格

- CSS支持四种压缩标准 

  CSS支持四种压缩标准 
  YUI Compressor, clean-css, CSSO, Sqwish.

- JS支持三种压缩标准 

  JS支持三种压缩标准 
  YUI Compressor, Google Closure Compiler, UglifyJS2.

# 提示

atom的许多特性插件都是大牛从npm那里搬过来封装的….所以就必须依赖各种模块;所以执行插件遇到各种错误的时候别虚,,看下错误..缺啥补啥….

如果想玩自动化构建的,可以去了解下 **gulp** , 通过丰富的插件,来实现更加复杂的功能,比如动态监听,压缩等等

附上一个Github项目: 

附上一个Github项目: 
[https://github.com/crperlin/StartFrontendProject](https://github.com/crperlin/StartFrontendProject)

个人写的gulp执行队列,涵盖了一些常用的功能….有兴趣的可以fork一起完善;

后续再增加webpack这些…

