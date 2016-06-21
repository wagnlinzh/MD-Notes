### [Pull Request、Wiki 和全新界面的 Gogs](https://wuwen.org/2015/12/13/gogs-pull-request-wiki-and-new-design.html)

[Gogs](https://wuwen.org/tags/Gogs.html)



[Unknwon](https://github.com/Unknwon)

> 
>
> 本篇博客是随着 [Gogs - Go Git Service](https://gogs.io/) `v0.8.0` 版本而发布的。



距离上次写发行博文已经一年有余了，主要因为各种工作都在进行，计划严重滞后。好在大多数关键功能都已经在这个版本中实现，终于可以发布了！

自从上次写发行博文（`v0.5.0`）以来，已经提交了将近 1800 次代码，包括无数的改进、Bug 修复、功能和其它变更。尤其是渴求度最高的合并请求（Pull Request）、Wiki 和内置 SSH 服务器。除此之外，目前所有的页面都已经使用 Semantic UI 主题重写，同时对工单管理（Issue Tracker）进行了彻底地改造。当然，绝对不能忘记提及的就是，目前 Gogs 来自社区的贡献成员已经有 182 人之多啦。

### 升级到 0.8

- Gogs 从 `0.5.x` 版本开始就带有自动迁移功能，因此所有的升级都不需要人为干预。
- … 但是由于 `0.8` 版本停止了对 `0.6.0` 之前版本的自动迁移支持。所以如果您正在使用的版本低于 `0.6.0`，必须先运行一次 `0.8.0` 之前的任一版本完成迁移，再升级到 `0.8.0`。
- 升级步骤如下：
  - [从二进制升级](https://gogs.io/docs/upgrade/upgrade_from_binary)
  - [从源码升级](https://gogs.io/docs/upgrade/upgrade_from_source)

### Pull Request

不知道被吐槽了多久，Gogs 终于有了自己的合并请求（Pull Request）功能，并于 `0.6.9` 首次发布，经历数个版本之后目前功能稳定。当然，还是存在许多不足，例如无法在同一个仓库内创建合并请求，以及没有 Review Comments 的支持。

许多其它的底层实现也有许多改进空间，实现资源的合理利用。

![](https://wuwen.org/static/media/0013_pull_request.png)

### Wiki

现在，您可以直接通过在线 Markdown 编辑 Wiki 页面，也可以本地编辑完成之后推送到 Gogs。

![](https://wuwen.org/static/media/0013_wiki.png)

### 内置 SSH 服务器

一些人问我为什么多此一举弄个内置 SSH 服务，我就在这里一次性做个完整的回答：

由于 Go 语言开发的缘故，Gogs 无意间占据了低资源占用和高性能 HTTP 服务的优势，但 Gogs 的初衷是始终不变，让搭建 Git 自托管不再痛苦。通过内置 SSH 服务器，安装一个外部的 SSH 服务器不再是硬性要求，并且不再与系统的 `authorized_keys` 文件相互污染。最重要的是，Windows 下也可以用！

### Issue Tracker

数十个与工单管理（Issue Tracker）有关的问题被修复，您现在还可以使用 Emoji 表情并编辑评论。

![](https://wuwen.org/static/media/0013_emoji.png)

![](https://wuwen.org/static/media/0013_comments.png)

### 其它说明

- 现在支持推送 [linux](https://github.com/torvalds/linux) 仓库到 Gogs 啦。
- 部分 APIs 支持及 [文档](https://github.com/gogits/go-gogs-client/wiki)。
- 新增HTTPS 加密下载 [站点](https://dl.gogs.io/)。
- 新建用户支持 [论坛](http://forum.gogs.io/)。
- 新增官方支持的 [Docker](https://github.com/gogits/gogs/tree/master/docker) 镜像，只有 40MB。
- 越来越多的 [云平台](https://github.com/gogits/gogs/tree/master#deploy-to-cloud)、[产品](https://github.com/gogits/gogs/tree/master#product-support)、[服务及软件](https://github.com/gogits/gogs/tree/master#software-and-service-support) 开始支持 Gogs。

### 最后两句话

无法完全表达所有一路走来支持 Gogs 的同志们，你们。。。（此处省略 1 万字）。手动帮你们点 2048 个赞！

感谢您对 Gogs 的支持并花时间阅读这篇博文，如果您有任何建议或使用反馈，请到 [GitHub](https://github.com/gogits/gogs/issues?state=open) 上与我们进行交流。

