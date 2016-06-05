# [Atom编辑器折腾记_(12)Sync-setttings(插件-备份神器)](http://blog.csdn.net/crper/article/details/47291063)

标签： [atom](http://www.csdn.net/tag/atom)[编辑器](http://www.csdn.net/tag/%e7%bc%96%e8%be%91%e5%99%a8)[插件](http://www.csdn.net/tag/%e6%8f%92%e4%bb%b6)[atom主题](http://www.csdn.net/tag/atom%e4%b8%bb%e9%a2%98)[atom插件](http://www.csdn.net/tag/atom%e6%8f%92%e4%bb%b6)

2015-08-05 08:47 1691人阅读 [评论](http://blog.csdn.net/crper/article/details/47291063#comments)(0) [收藏](javascript:void(0);) [举报](http://blog.csdn.net/crper/article/details/47291063#report)

![](http://static.blog.csdn.net/images/category_icon.jpg) 分类：

 

Atom折腾记*（21）* ![](http://static.blog.csdn.net/images/arrow_triangle%20_down.jpg)

版权声明：保留原博文链接及作者的情况下，请尽情转载吧！！！

目录[(?)](http://blog.csdn.net/crper/article/details/47291063#)[[\]](http://blog.csdn.net/crper/article/details/47291063#)

# 简述

插件作者:Hackafe 

插件作者:Hackafe 
功能描述:Synchronize settings, keymaps, user styles, init script, snippets and installed packages across Atom instances.(简言之就是可以同步Atom的设置文件,自定义快捷键,用户风格,初始化脚本及代码片段,还支持已安装的插件同步)

Features

```
Sync Atom's and package settings
Sync installed packages
Sync user keymaps
Sync user styles
Sync user init script
Sync snippets
Sync user defined text files
Manual backup/restore to a gist

```

------

# 获取安装方式

- 命令行安装: `$ apm install sync-settings`
- 设置中心: 搜索sync-settings

------

# 设置及使用方法

## 初始化设置

1. 进入设置中心找到该插件,进去setting
2. 打开自己的github创建一个[personal access token](https://github.com/settings/tokens/new) – 然后复制生成的token序列,粘贴到插件的setting里面的(最后再放图,一目了然)
3. 再打开github的gist服务,创建一个gist–复制生成gistID,也粘贴到二步设置里面

**看图** 

**看图** 
![这里写图片描述](http://img.blog.csdn.net/20150805083519371)

最后我去研究了下他为啥用到gist的…原来是为了备份配置文件; 

最后我去研究了下他为啥用到gist的…原来是为了备份配置文件; 
使用的是coffee脚本保存;

**看图**

![这里写图片描述](http://img.blog.csdn.net/20150805083837854)

## 使用方法(配置完毕后)

- 在文档编辑页面,按下全局命令搜索面板(Ctrl+shift+p)

- 搜索sync- ,会有可选项 

  搜索sync- ,会有可选项 
  sync-settings:backup – 这条命令是备份当前的配置sync-settings:restore – 这条命令是回复配置,是直接覆盖的;sync-settings:view-backup – 这条是当你执行备份后到线上查询你的备份的,也就是到你的gist code里面sync-settings:check-backup – 这条是查询最后一次是否正常

备份成功和失败都有一条信息提醒,看图

![这里写图片描述](http://img.blog.csdn.net/20150805084359657)

------

其他推荐: 

其他推荐: 
Atom-Material这个主题真心不错,是[Android](http://lib.csdn.net/base/15) material风格

![这里写图片描述](http://img.blog.csdn.net/20150805084612674)

此篇教程到此结束,有任何疑问尽情留言~~~



