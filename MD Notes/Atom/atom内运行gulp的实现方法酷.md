# [Atom编辑器折腾记_(18)atom内运行gulp的实现方法[酷\]](http://blog.csdn.net/crper/article/details/49284259)

标签： [atom](http://www.csdn.net/tag/atom)[编辑器](http://www.csdn.net/tag/%e7%bc%96%e8%be%91%e5%99%a8)[插件](http://www.csdn.net/tag/%e6%8f%92%e4%bb%b6)[gulp](http://www.csdn.net/tag/gulp)

2015-10-20 22:12 1913人阅读 [评论](http://blog.csdn.net/crper/article/details/49284259#comments)(0) [收藏](javascript:void(0);) [举报](http://blog.csdn.net/crper/article/details/49284259#report)

![](http://static.blog.csdn.net/images/category_icon.jpg) 分类：

 

Atom折腾记*（21）* ![](http://static.blog.csdn.net/images/arrow_triangle%20_down.jpg)

版权声明：保留原博文链接及作者的情况下，请尽情转载吧！！！

目录[(?)](http://blog.csdn.net/crper/article/details/49284259#)[[\]](http://blog.csdn.net/crper/article/details/49284259#)

# 效果图

![这里写图片描述](http://img.blog.csdn.net/20151020215535684)

atom编辑器内置一个gulp执行面板; 

atom编辑器内置一个gulp执行面板; 
左边是探测到gulpfile的队列任务,单机即可运行…右边就是执行的状态预览;

本人只实现了三个面板,因为现在不用grunt了…可以汇总错误信息 

本人只实现了三个面板,因为现在不用grunt了…可以汇总错误信息 
![这里写图片描述](http://img.blog.csdn.net/20151020220314298)

------

# 功能实现

**单纯的gulp面板只依赖两个插件** 

**单纯的gulp面板只依赖两个插件** 
\- bottom-dock 

**单纯的gulp面板只依赖两个插件** 
\- bottom-dock 
\- gulp-manager package

两者缺一不可;

bottom-dock不仅仅可以实现gulp面板,还能实现todo[很实用的功能],还有grunt队列也能实现;

这些功能都是同一个封装好的插件;

------

# 面板快捷键

三个面板有些快捷键是公用的,有些是专用的,可以看下;

## Bottom-dock快捷键

- `ctrl-k ctrl-t`: 是否显示面板
- `ctrl-k ctrl-r`: 刷新窗口
- `ctrl-k ctrl-c`: 关闭窗口

## GULP面板快捷键

- `ctrl-k ctrl-t`: 是否显示面板
- `ctrl-k ctrl-g`: 创建一个新的gulp面板
- `ctrl-k ctrl-r`: 刷新窗口
- `ctrl-k ctrl-c`: 关闭窗口

## TODO面板快捷键

- `ctrl-k ctrl-t`: 是否显示面板
- `ctrl-k ctrl-r`: 刷新窗口
- `ctrl-k ctrl-c`: 关闭窗口
- `ctrl-k ctrl-m`: 添加面板

------

# 作者主页

[https://atom.io/users/benjaminRomano](https://atom.io/users/benjaminRomano)

老话重谈,node环境记得部署好..atom很多插件基于nodejs做的

再丢一次我的小项目,有兴趣的fork一起完善;

StartFrontendProject 

StartFrontendProject 
[https://github.com/crperlin/StartFrontendProject](https://github.com/crperlin/StartFrontendProject)

