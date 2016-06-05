# [Atom编辑器折腾记_(11)编辑器实时预览HTML页面(插件:Atom HTML Preview)](http://blog.csdn.net/crper/article/details/46333295)

标签： [atom编辑器](http://www.csdn.net/tag/atom%e7%bc%96%e8%be%91%e5%99%a8)[atom插件](http://www.csdn.net/tag/atom%e6%8f%92%e4%bb%b6)[atom实用插件](http://www.csdn.net/tag/atom%e5%ae%9e%e7%94%a8%e6%8f%92%e4%bb%b6)[atom前端](http://www.csdn.net/tag/atom%e5%89%8d%e7%ab%af)

2015-06-02 18:06 4057人阅读 [评论](http://blog.csdn.net/crper/article/details/46333295#comments)(0) [收藏](javascript:void(0);) [举报](http://blog.csdn.net/crper/article/details/46333295#report)

![](http://static.blog.csdn.net/images/category_icon.jpg) 分类：

 

Atom折腾记*（21）* ![](http://static.blog.csdn.net/images/arrow_triangle%20_down.jpg)

版权声明：保留原博文链接及作者的情况下，请尽情转载吧！！！

目录[(?)](http://blog.csdn.net/crper/article/details/46333295#)[[\]](http://blog.csdn.net/crper/article/details/46333295#)

# 为何寻找

    每次预览HTML页面,都需要打开各种浏览器;哪怕不是调试,只是为了查看下效果; 

    每次预览HTML页面,都需要打开各种浏览器;哪怕不是调试,只是为了查看下效果; 
切换来切换去,各种刷新,感觉有些浪费时间;以前用过DW的实时预览,感觉这个功能很赞; 

    每次预览HTML页面,都需要打开各种浏览器;哪怕不是调试,只是为了查看下效果; 
切换来切换去,各种刷新,感觉有些浪费时间;以前用过DW的实时预览,感觉这个功能很赞; 
    又踏上了atom插件仓库慢慢寻找之路…..

------

# 插件:atom-html-preview

> 官方描述:A live preview tool for Atom Editor. 
>
> 官方描述:A live preview tool for Atom Editor. 
> 简言之:Atom编辑器内实时预览的工具

------

# 获取方式

1. 通过命令行安装 

   通过命令行安装 
   `apm install atom-html-preview`

2. 通过编辑器内部的install搜索`atom-html-preview` 安装

------

# 使用方式及效果

## 快捷键

- 默认快捷键 : CTRL + P 调用 ,会和内置核心插件冲突(切换文件那个) — 非常不好
- 修改版快捷键: CTRL + F12(感觉方便使用且没有冲突的快捷键)

```
#实时浏览器调用快捷键
'atom-text-editor':
  'ctrl-F12':'atom-html-preview:toggle'123123
```

**Tips:** 

**Tips:** 
写在keymap里面的权重是最高的….较新版本的atom内置了**Dev Live Reload**这个插件;

这个插件的作用就是重新加载所有样式和规则,有点类似linux的source xx.sh一样..即时生效 

这个插件的作用就是重新加载所有样式和规则,有点类似linux的source xx.sh一样..即时生效 
调用快捷键是`CTRL + SHIFT + ALT +R`

当然,关闭atom再开atom编辑器也能达到重新加载所有样式规则的效果….

------

## 效果图

**我用BS框架写的页面来测试….可以正确预览,内部css是cdn也能正确识别** 

**我用BS框架写的页面来测试….可以正确预览,内部css是cdn也能正确识别** 
![效果图](http://img.blog.csdn.net/20150602174615100)

![效果图](http://img.blog.csdn.net/20150602180409882)

------

# 浏览器猜测

跑到该插件的github仓库页面,只看到一些cson规则,,没有调用外部浏览器..

那么答案只有一个….就是chromium框架….所以内核应该也是blink 

那么答案只有一个….就是chromium框架….所以内核应该也是blink 
以下是引用外部描述的atom[不知道是不是官方]

> Web本地应用程序
>
> Atom是一款基于Web技术的桌面应用程序，和其他桌面应用程序一样，它也拥有自己的图标、本地菜单、对话框以及访问整个文件系统的权限。
>
> 无论你是调整Atom的CSS接口还是添加一些HTML和[JavaScript](http://lib.csdn.net/base/18)主要功能，它都可以被你轻松控制，并且使用起来非常方便。

哈哈..当然,若是错了,大伙权当笑料…笑笑就好….

**软仓地址:** 

**软仓地址:** 
[atom-html-preview](https://github.com/webBoxio/atom-html-preview/)

