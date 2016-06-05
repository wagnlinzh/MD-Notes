# [Atom编辑器折腾记_(13)JS代码智能提示补全(插件:atom-ternjs)](http://blog.csdn.net/crper/article/details/47723437)

标签： [ternjs](http://www.csdn.net/tag/ternjs)[atom-ternj](http://www.csdn.net/tag/atom-ternj)[atom插件](http://www.csdn.net/tag/atom%e6%8f%92%e4%bb%b6)

2015-08-17 12:26 2600人阅读 [评论](http://blog.csdn.net/crper/article/details/47723437#comments)(1) [收藏](javascript:void(0);) [举报](http://blog.csdn.net/crper/article/details/47723437#report)

![](http://static.blog.csdn.net/images/category_icon.jpg) 分类：

 

笔记-HTML4&5/CSS2.1&3*（35）* ![](http://static.blog.csdn.net/images/arrow_triangle%20_down.jpg) Atom折腾记*（21）* ![](http://static.blog.csdn.net/images/arrow_triangle%20_down.jpg)

版权声明：保留原博文链接及作者的情况下，请尽情转载吧！！！

目录[(?)](http://blog.csdn.net/crper/article/details/47723437#)[[\]](http://blog.csdn.net/crper/article/details/47723437#)

# 题外话

官方正式版虽然内置了.autocomplete-plus;最为明显的一个功能就是记忆你已经输入过的名称进行匹配; 

官方正式版虽然内置了.autocomplete-plus;最为明显的一个功能就是记忆你已经输入过的名称进行匹配; 
但是针对于某些语言来说,还是有些不足的….其中JS的补全上就明显不足了…所以需要借助插件来拓展

# [atom-ternjs](https://atom.io/packages/atom-ternjs)

官方描述: 

官方描述: 
[JavaScript](http://lib.csdn.net/base/18) code intelligence for atom with tern.js. Uses suggestion provider by autocomplete-plus.

简言之,就是JS代码智能提示,个人也希望以后可以直接内置到atom中,而不是作为第三方插件!!

此插件依赖两个东东,**git** 和**nodejs** ; 具体可以参考我博客里面的其他博文

## 作用范围:

1. Configure your project(针对项目进行配置– 英文言简意赅就不翻译了)
   - Navigate to Packages -> Atom Ternjs -> Configure project
   - The config view appears.
   - Hit “Save & Restart Server” to create/update the .tern-project file
2. 全局(这个就不用解释了)

## 智能提示支持的语言特性:

- browser: completion for vanilla js (optional)
- ecma5: es5 (optional)
- ecma6: es6 (optional)
- jquery: completion for jQuery (optional) – 这个可以有,JQ也支持

## 安装方式两种:

1. `apm install atom-ternjs`
2. settings内部搜索插件名

## 效果图

![很实用](http://img.blog.csdn.net/20150817120735678)

最后,官网链接就在那个一级标题(atom-ternjs)上

