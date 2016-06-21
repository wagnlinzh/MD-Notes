## 从PHP到Node，聊一聊淘宝首页背后的技术

*2016-06-12* *小胡子哥* [InfoQ](javascript:void(0);)

![](http://mmbiz.qpic.cn/mmbiz/YriaiaJPb26VMGG3Y7Hk2KbnjP2f5uyh0KKfeSMSUp9Llm2VEcRDD4DvEupXbZK6Pm9pT4HiauQ36SnG835fe4cRA/640?wx_fmt=jpeg&tp=webp&wxfrom=5)

“作者从2014年双十二结束时开始接手淘宝首页，经历了淘宝首页的两次改版和一次从PHP到Node的迁移，不久前完成了工作的交接。本文介绍了淘宝首页的变迁过程、性能优化、稳定性保障和敏捷措施，分享了作者在此过程中的感受。

**相关背景介绍**

![](http://mmbiz.qpic.cn/mmbiz/yqVAqoZvDibG6wlFUVibvvuoCyK8g203xOWC41VMpfJ4t2SGRWnibL2qpsHfPMuiaQgRpeAyLb0DgwaO6micCmV3p3Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

淘宝首页是淘宝的门面，承载着几乎淘系所有业务的入口，流量很大，量级单位为亿。近几年无线端崛起，业务重点开始向无线终端偏移（目前不能叫偏移，基本以无线为主了），所以淘宝 PC 端首页的流量也有削减，不过即便如此，它的日均 PV 依然相当高。

淘宝首页一向是内部平台和技术的试验田，它一直在变化着。最新的框架和系统都会找淘宝首页试点，可以试想下，如果某一项需要推动的升级或者优化措施在淘宝首页已经上线，并且拿到了良好的数据和稳定性，其他业务还有什么理由不去尝试和更迭呢？同时，去年一年身在淘宝前端的技术架构组，自然而然也会主动去 push 一些实验性的内容到业务上。

淘系的站点页面包括首页、其他频道页和活动页等，这些页面并不都由淘宝前端一行一行的代码码出来，业务如此之多，这种玩法即便人数 double 也忙不过来。事实上，大多数页面都是依托内部的搭建平台一一运营或者前端通过模块搭建的方式一一构建的，而前端 focus 的重点在于搭建平台的建设自身以及模块的通用性和复用率的保障，当然，还有一些工程化的东西。

使用搭建平台搭建的页面，前端只需要考虑组成页面的原子模块的开发，整体的渲染由搭建平台提供的统一脚本全权负责。而在淘宝首页上，考虑到页面模块数量巨多，加上还有少量跨部门、跨团队的沟通，渲染模型略微不同。

**淘宝首页的整体变迁**

![](http://mmbiz.qpic.cn/mmbiz/yqVAqoZvDibG6wlFUVibvvuoCyK8g203xOWC41VMpfJ4t2SGRWnibL2qpsHfPMuiaQgRpeAyLb0DgwaO6micCmV3p3Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

背景中提到，淘宝首页依托于内部搭建平台，它的变迁自然也是跟着搭建系统的变化而变化的。

**1、PHP 下的淘宝首页**

接手淘宝首页不久，便遇到了一年一度的改版，那时它还运行在 PHP 环境中。这里需要说明的是，淘宝首页的所有代码完全由前端掌控，前端不会直接跟数据库打交道，其数据来源分为两部分。

**数据来源**

一是运营填写的数据。 采用前端挖坑的形式，预留坑位让运营获取填写数据，如（伪代码）：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVj2XiaIhv9oAddywstLzkGkTSX9s3CeSSlgUHibPwVCXZWQicn5rkSOroYQ/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

上面的代码会产生一份 PHP 的模板和info字段对应的表单坑位，这个过程简称“挖坑”。![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjB1mCNcIT0icKiaiaLAgxmkgfYbIhZCtqjmFM3YpmAvSSIlUCsvTZjKOWg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

运营填写这些坑位就会产生这份 PHP 模板对应的数据，最后渲染出来就是一个完整的 HTML 片段（实时性渲染）。

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjy0mEBECOWMch7iclDW10iaaa5lsKtBibWOV76ibAz5ntXTibC0NaUgGks1g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

旧版搭建系统中就是通过这种方式构造一个子模块。我描述得十分简单，但作为一个平台它需要考虑的东西还有很多很多的，比如数据顺序的控制、定时发布、回滚机制、过滤机制、筛选机制、数据的同步、数据的更新、版本控制、权限控制、其他系统的引用等。

二是后端或者个性化平台提供的数据。 不同的业务有不同的诉求。一些业务有自己的后端，他们要求使用自己业务产出的数据；有的业务希望用户看到的内容不一样，千人千面，期望接入算法；一些业务跟卖家直接打交道，期望使用招商数据；而有些业务期望采用运营从数据池筛选出来的数据……总之，淘宝首页需要对接形形色色的系统，接口繁多。后面会提到对动态数据源的整合。

并且这些系统对应的域名是不一样的，JSONP 格式自然也就成了首选。但一些特殊的系统，比如广告，它的渲染并不是一个简单的 JSONP 请求，可能它还要干预整个广告的渲染流程，比如加载他们的 JS，把渲染的控制权交过去。

**页面的架构**

上面介绍了数据的来源和子模块的结构，那么整个页面又是如何构成的呢？模块的搭建分为两种，一种是可视化搭建，运营或者前端可以将开发好的模块（或者模块库中选取的模块）拖拽到容器内，形成一个页面。

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjqQjK0f9t2VNQGPASpRxUlxGI7RfibEf5TJaic8X7MibQS1SxcZtViceUBg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)当然，上图也只是一个模型，作为一个系统需要考虑的问题还有很多很多，如页面的布局、多终端适配、模块的临时隐藏、位置调整、皮肤选择、模块的复制等。

也可以通过如下源码搭建的方式（伪代码）：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVj3ibPSuGxd27B4rckqwQldptjle0yBibcSsoj32iaujZgx7qrdvN9c8osw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

通过模块 id 将模块引入，并且添加一些类似 lazyload 的标记，方便控制渲染节奏和数据入口。源码搭建和模块搭建的区别在于，前者更易于控制模块的结构以及模块的渲染顺序。

**动态数据源**

首页面对一大堆接口和平台，对接几十个业务方，接口是个很大的问题，由于后台系统的差异，基本没有办法统一数据源的格式，一旦运营哪天心血来潮要换一个他自己觉得用的更爽的或者数据更好的系统，前后端估计又得沟通和对接几次。所以出现了下面这张图：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVj7Vw6ibmmEIhZ7LJtr5W9V9Cq48WfjA3YxhKHI9vjDmKUSH5rdmsxG1w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVj7Vw6ibmmEIhZ7LJtr5W9V9Cq48WfjA3YxhKHI9vjDmKUSH5rdmsxG1w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)
平台具备数据源接入的能力，也就是说我们挖的坑不仅仅可以让运营填数据，还可以从各种数据源中直接导入数据，当然，这里需要进行一次数据字段的映射转换。后端提供的接口是这样的：![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjLekFmYDibhibDRXVlx1OsRVpYAbLEWxiaUZPqLZ8UjjicQkTCw016c0mxw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

前端约定的接口形式是:

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjOaBX9ky7tJ0z1AT7waGQ4HvOAnXHlicokpgKApe9bvFoAfc4mWEUDZA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjOaBX9ky7tJ0z1AT7waGQ4HvOAnXHlicokpgKApe9bvFoAfc4mWEUDZA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)
那么系统必须提供这种映射的绑定策略：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjlhfz5kMGhicsLPoVaynvulibb4fw4FShtzbicdsNMzLjoYJc1iaE6MHOmA/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

绑定之后，数据既可以同步输出，也可以异步输出，这些都是平台提供的能力。这个方案基本上解决了后端系统/接口变化的问题，并且减少了前后端之间的沟通成本。

不过这里需要注意的是，虽然页面上的接口都通过平台统一梳理了一次，这也意味着，页面所有的请求会先流经平台，然后分发到各个后端，平台的抗压能力要求很高。

**2、PHP 到 Node 的变迁**

淘宝首页日均请求的这个量级，不可能是十几二十台台服务器抗得住的，支撑它必须有一个服务集群。

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjBJib82oibTOVFSqYyuFNmsVROgxviaPWcU0pZKxibZWick2jkn6YaDWmw6A/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)每一个 CDN 节点上都具备 PHP 渲染的能力，当页面发布时，我们把该页面所有的模块和数据同步到全部 CDN 节点上，基本模式大概就是如此了。看起来还挺不错，但是经过一段时间的运维，很多安全、性能问题都慢慢浮现出来了。

**性能问题。** 每个 PHP 页面包含多个子模块，而子模块也有可能引用了其他的子模块，PHP 的 include 操作是存在消耗的，每一次引用都是一次磁盘 IO，一个渲染节点上跑了成千上万个类似淘宝首页的 PHP 页面，并发一高其效率可想而知。

> // @邦彦 同学补充：php 的 include 操作是存在消耗，但是加载、执行的过程预热后，字节码直接进缓存，并不存在频繁磁盘 io 的情况。cdn php 性能差的问题主要是两个：1. php 版本过旧，5.4 和 7 的性能相差不只几倍；2. fast-cgi 模式在高并发的场景下和 node 相比没有任何优势。

**推送机制问题。** 文件同步（图中的 sync 动作）是一种比较恶心的机制，首先，时间上没法控制，一个文件同步到所有的节点，快则几秒钟，慢的话耗时会超过一两分钟；并且同步过程还有可能失败，健康检测的成本也是相当高的。发布比较紧凑时，需要同步的文件也很多，很容易造成队列堆积，加剧同步差的体验。

**实时性强需求问题。** 文件在推送之前，还可能经过一些前置系统，发布链路越长，线上生效时间越慢，慢的时候大约五分钟才生效，这样的延时对于实时性要求很高（如秒杀）的需求来说是完全不能接受的。

当然，还有很多其他问题，如运维成本增高、安全风险增高、PHP 资深人才储备不足等等。所以 PHP 渲染容器的命运，就是，被干掉。

下图改变了下玩法，服务集群为 Cache CDN，它只有静态文件处理能力，没有 PHP/Node 的渲染能力，所以处理效率高，性能也好，抗压能力相当强，并且扛不住的时候还可以花钱买服务，拓展 Cache 集群。

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjaV2aicRQcA6TppAibOlQmnSMqzjvRYhrnPUic9KSLjPcqYdXgUWaGGCwA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

用户访问时，Nginx 转到 Cache CDN，如果命中缓存则直接返回，没有命中便回源到源站服务器。源站服务器是具备模块渲染能力的 Node 服务，它可以做很多事情：

- 控制 Cache 响应头，通过 max-age 和 s-maxage 控制页面在客户端的缓存时间以及在 Cache 上的缓存时间，这个缓存时间可以根据需求随时做调整，比如大促的时候调长一些
- 控制内外网环境，和 AB 测试状态
- 融合前端相关的工具链，比如检测、压缩、过滤等等

它的优势有很多，这里不一一列举了。这个模式中还添加了一层容灾，源站服务器每隔一段时间将数据推送到于 Cache 同机房的备份服务器，一旦源站挂了，还能够自动容灾到备份数据上。

模式的变化不仅在运维上有了突破，CDN 被攻击时的安全风险也低了很多，同时也省却了 sync 所需的各种检测机制，每年节约成本也是百万以上，优势还是相当明显。

**3、Node，不一样的模式**

上面 PHP 模块中，我们只说了 HTML 和数据部分，用心的读者应该已经发现，CSS 和 JS 这些静态资源都没提到，那页面是如何渲染的呢？

旧版 PHP 页面中，我们是直接引入了一个 CSS 和一个 JS，淘宝这边采用的是 git 版本迭代发布，这些静态资源都是直接放在一个 git 仓库中。也就是这样：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjSaaghQDmibFLQX1iaX5Y5p7kt0eUWOOibrnFicQEmn4mu7Zc6LoHmj2j9g/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

每次发布完 git 文件，再修改 PHP 的版本号，然后发布 PHP 代码。当然，也做了相关的优化，比如发布 git 时自动更新版本号等。

而新版搭建平台的页面渲染模式与 PHP 的模式不太一样。

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVj2N8Bic3nialNuGoJSLcUagBWVA3JtCfH0DE8Q77k9jFtlYniau07vyC4w/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

一个模块的 CSS/JS 和模板放在一起，CSS/JS 与页面其他模块的静态资源是相互独立的，目的就是希望单个模块也能够完整的跑起来，更加利于模块的复用。

而模块的挖坑，也从模板中独立了出来，采用 JSON Schema 的形式定义数据格式。

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjQokic8me6lv9P1QZtLLvicysVSGqK7ibGvLcvlEASrTJK1YqhuzyAv6Vw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

搭建平台通过这个 JSON Schema 解析成 图一 的坑位。那么一个模块的渲染就编程了 index.xtpl 和挖坑数据之间的拼装了。

模块之间相互独立隔离，所以会存在一定程度的冗余，不过模块解偶带来的收益要比这点冗余要多得多。事实上，我们是通过一个仓库去管理单个模块的。页面的渲染就比较简单了，源站 Node 容器会将所有的 index.xtpl 合并成一个 page.xtpl，为减少页面请求，css 和 js 也会 combo 成一个文件，如上图所示的 http://cdn/??mod1.css,mod2.css,mod3.css。

任何模块的更新，页面都会有感知，下次进入系统时，就会提示是否需要升级模块和页面。

**淘宝首页的性能优化**

![](http://mmbiz.qpic.cn/mmbiz/yqVAqoZvDibG6wlFUVibvvuoCyK8g203xOWC41VMpfJ4t2SGRWnibL2qpsHfPMuiaQgRpeAyLb0DgwaO6micCmV3p3Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

首页模块众多，如果一口气吐出来，DOM 数量必然超过 4k 个，其结果就是首屏时间极长。按照 TMS 的开发规范，每个 TMS 模块都包含一个 index.js 和 index.css，最后展示出来两个 combo 的 js 和 css。首页加载的时候也不会一口气执行所有 index.js，否则刚开始页面阻塞会十分严重。

**页面的渲染逻辑**

首页框架的加载逻辑，大致如下图所示。

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjaoRdeDF5KpV4p62hdXXianNvhfJOlic2AKwYicmBSctiaL4XspDic2tAAfQ/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

- 遍历所有 TMS 模块（包含一个 J_Module 的钩子）
- 部分 TMS 模块无 JS 内容，但是加载了一个 index.js，为模块添加 tb-pass 的 class，用于跳过该模块 JS 的执行
- 将页面分为两块，首屏为一块，非首屏整体为第二块，先将首屏模块加入到懒加载监控
- 待首屏模块加载完成，或者用户处理了页面交互时（滚动、鼠标移动等），将非首屏模块加入到懒加载监控
- 处理一些特殊模块，它们会在进入视窗之前几百像素就开始加载
- 监控滚动，按照以上逻辑，渲染模块

部分模块即便是被执行了，也不一定渲染出来，因为它的优先级不高，在模块内部加了事件监听，比如等到 mouseover/onload 事件触发的时候再渲染这些内容。

之前写过性能优化相关的文章，复制就没必要了，直接贴地址：

- 《一起来看看淘宝首页的个性化》（http://www.barretlee.com/blog/2016/03/31/personality-in-taobao-home-page/）
- 《淘宝首页性能优化实践》（http://www.barretlee.com/blog/2016/04/01/optimization-in-taobao-homepage/）

代码的性能优化是一个精细活，如果你要在一个庞大的未经优化的页面上做性能优化，可能会面临一次重构代码。

上面的文章提到的是页面内部的细节优化，但是在开发流程中做的规范化、标准化，以及线上访问通路中的各个环节优化还没有提及。这一块内容可能有点跑题，就不多说了。

**淘宝首页的稳定性保障**

![](data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyBpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYwIDYxLjEzNDc3NywgMjAxMC8wMi8xMi0xNzozMjowMCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNSBXaW5kb3dzIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOkJDQzA1MTVGNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOkJDQzA1MTYwNkE2MjExRTRBRjEzODVCM0Q0NEVFMjFBIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6QkNDMDUxNUQ2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6QkNDMDUxNUU2QTYyMTFFNEFGMTM4NUIzRDQ0RUUyMUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz6p+a6fAAAAD0lEQVR42mJ89/Y1QIABAAWXAsgVS/hWAAAAAElFTkSuQmCC)

在大流量下，任何小问题都会被放大成大问题，所以开发环节遇到的任何偶发性问题都需要引起重视。不过很多偶发性问题在我们的测试环境中是找不到的，比如与地域相关的问题（如上海的某个 CDN 节点挂了），用户属性问题（如 nickname 最后一个为字母 s 的用户页面天窗），浏览器插件问题，运营商广告注入问题等等。

难以在上线之前把所有问题考虑周全，但是有两点是必须做好的：兜底容灾 + 监控预警。

**1、兜底容灾机制**

兜底容灾有两个层面的考虑：

- 异步接口请求错误，包括接口数据格式错误，接口请求超时等
- 同步渲染，源站页面渲染出错

异步接口请求，主要涉及到的是后台系统，对接系统较多，各个系统的稳定性和抗压能力各不相同，这方面的保障有多种方案，下面是最常见的：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjLdzuAwPS6I8c6mCyiatnqe5Nc3ibHst9kEL1omicgpiaXHAd8cGW1Dkzpg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjLdzuAwPS6I8c6mCyiatnqe5Nc3ibHst9kEL1omicgpiaXHAd8cGW1Dkzpg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)
每次数据请求都缓存到本地，并且为每个接口都提供一个硬兜底。还有一种方案是「重试」，请求一次不成功那就请求第二次。这方面的讨论具体可以看看之前写的这篇文章：《大流量的下兜底容灾方案》（http://www.barretlee.com/blog/2015/09/16/backup-solution-at-big-traffic/）。

对于同步渲染，它只需要页面模板和同步数据，两者中任一种存在错误，源站都会报错，此时回源返回的内容就是一个 error 页面，状态码为 5xx。这个错误不一定是开发者造成的，有可能是系统链路出现同步异常或者断路问题。针对这种问题，我给淘宝首页做了一个镜像页：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjxHonwXGFwmvUyt88bK8YKwTTw7vmvfPjOIvibqFySCVHxayKey00HWg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjxHonwXGFwmvUyt88bK8YKwTTw7vmvfPjOIvibqFySCVHxayKey00HWg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)
一旦源站任何异常，Nginx 都会转到与 Cache CDN 同机房的首页镜像上去，这个镜像内容就是淘宝首页的 HTML 备份源码。

**2、监控预警机制**

可以先看看之前写的这篇文章：《前端代码异常日志收集与监控》（http://www.barretlee.com/blog/2015/08/20/cb-fe-monitor/），介绍了一些监控方法。

监控也有两个层面：

- 模块级别的监控，接口请求布点、模块天窗检测等
- 页面的监控，在页面上添加特殊标记，定时回归所有 CDN 节点，查看特殊标记是否存在

模块层面的监控，内容还是相当多的，监控的点越多越详细，到最后定位问题的效率就会越高，比如在一个稍微复杂的模块上，我会埋下这些监控：

- 接口请求格式错误、请求失败、请求超时，至少三个埋点
- 硬兜底数据请求失败埋点
- 模块 5s 内没有渲染完成统计埋点
- 模块内链接和图片黑白名单匹配埋点

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVj4tYfNYzjh9fBZvkgFCwdhnkygtHMzMlrplLRaiaEceYEUhQbIY0kgtw/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

其中部分监控还会自动处理明确的错误，比如 https 页面下出现了 http 的图片，会立即自动处理掉这些问题。

**3、上线前的自动化检测**

这属于淘宝整个工程化环境的一部分，前端自动化测试。一般会在上线之前处理这些问题：

- 检测 HTML 是否符合规范
- 检测 https 升级情况
- 检测链接合法性
- 检测静态资源合法性
- 检测 JavaScript 报错
- 检测页面加载时是否有弹出框
- 检测页面是否调用 console.*
- 页面 JS 内存记录

当然，也可以自己添加测试用例，比如检测接口数据格式、模块天窗问题等。自动化检测也可以设定定时回归，还是比较有保障的。

**淘宝网首页的敏捷措施**

![](http://mmbiz.qpic.cn/mmbiz/yqVAqoZvDibG6wlFUVibvvuoCyK8g203xOWC41VMpfJ4t2SGRWnibL2qpsHfPMuiaQgRpeAyLb0DgwaO6micCmV3p3Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

**1、健康检查**

页面模块众多，为了能够追踪页面上每一个小点的变化，我在请求、渲染的每一个环节都做了详细的统计，如下图所示：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVju6suyVyhhpdcCahuZBX8XS2ic3YXLjD1gQicLN67McoyXw4wRc7rLMxA/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)一旦接口请求失败，或者接口走了容灾逻辑，或者模块渲染超过 5s，控制台都会有黄色警报，当然此时，也已经向服务器发送了警报统计。

**2、接口Hub**

接口 Hub 是对数据请求的管理工具，如下图所示：

![](http://mmbiz.qpic.cn/mmbiz/uMh5nccSicmLb05B80YNCf4aSBgMGHVVjricolZGZqGR902BldxPA0yMH1MRImdazeMK7h049ZJul3GZZYcBGRMg/640?wx_fmt=jpeg&tp=webp&wxfrom=5&wx_lazy=1)

页面很多模块的渲染都需要一个以上的数据源，一旦运营反馈页面渲染数据异常，可以直接通过 Hub 找到数据，加速 Bug 定位效率。同时 Hub 也可以用来切换环境，将一个接口的请求切换到日常或者预发环境的接口之中，它是调试的利器。

**3、快捷通道**

我在页面脚本执行前后都放了一个快捷操作通道，一旦遇到紧急线上问题，比如样式错乱溢出、接口报错导致天窗等，可以通过快捷通道直接修改页面的 CSS 和 JS，两分钟内上线。

不过这类通道只适合紧急问题的修复，毕竟随意插入 JS 代码是存在很大风险的。

**小结**

![](http://mmbiz.qpic.cn/mmbiz/yqVAqoZvDibG6wlFUVibvvuoCyK8g203xOWC41VMpfJ4t2SGRWnibL2qpsHfPMuiaQgRpeAyLb0DgwaO6micCmV3p3Q/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1)

本文有很多方面没有延伸拓展开，但希望可以让你对淘宝首页有一个基本的认识。

> - 本文由阿里小胡子哥授权InfoQ转载，
> - 戳**阅读原文**直达原文出处。

