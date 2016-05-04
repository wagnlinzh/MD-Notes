# Emmet使用手册





### 介绍

Emmet (前身为 Zen Coding) 是一个能大幅度提高前端开发效率的一个工具:

![](http://cdn.w3cplus.com/cdn/farfuture/jXcuIfm_Jn4-aJO7c59GOzDUd1163lwYGIWK3PIX2oE/mtime:1421034939/sites/default/files/styles/print_image/public/baiyaimages/emmet-p1.jpg)

基本上，大多数的文本编辑器都会允许你存储和重用一些代码块，我们称之为“片段”。虽然片段能很好地推动你得生产力，但大多数的实现都有这样一个缺点：你必须先定义你得代码片段，并且不能再运行时进行拓展。

Emmet把片段这个概念提高到了一个新的层次：你可以设置CSS形式的能够动态被解析的表达式，然后根据你所输入的缩写来得到相应的内容。Emmet是很成熟的并且非常适用于编写HTML/XML 和 CSS 代码的前端开发人员，但也可以用于编程语言。







### 使用示例：

**在编辑器中输入缩写代码：**ul>li*5 ，然后按下拓展键（默认为tab），即可得到代码片段：

```
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>

```

### 下载和安装

1. **Emmet为大部分流行的编辑器都提供了安装插件，下面是它们的下载链接：**

   -  [Sublime Text](https://github.com/sergeche/emmet-sublime#readme)
   -  [Eclipse/Aptana](https://github.com/emmetio/emmet-eclipse#readme)
   -  [TextMate](https://github.com/emmetio/Emmet.tmplugin#readme)
   -  [Coda](https://github.com/emmetio/Emmet.codaplugin#readme)
   -  [Espresso](https://github.com/emmetio/Emmet.sugar#readme)
   -  [Chocolat](https://github.com/sergeche/emmet.chocmixin#readme)
   -  [Komodo Edit](http://community.activestate.com/xpi/zen-coding)
   -  [Notepad++](https://github.com/emmetio/npp#readme)
   -  [PSPad](https://github.com/emmetio/pspad)
   -  [textarea](https://github.com/emmetio/textarea)
   -  [CodeMirror](https://github.com/emmetio/codemirror#readme)
   -  [Brackets](https://github.com/emmetio/brackets-emmet#readme)
   -  [NetBeans](https://github.com/emmetio/netbeans#readme)
   -  [Adobe Dreamweaver](https://github.com/emmetio/dreamweaver#readme)

2. **在线编辑器的支持：**

   -  [JSFiddle](http://jsfiddle.net/)
   -  [JS Bin](http://jsbin.com/)
   -  [CodePen](http://codepen.io/)
   -  [ICEcoder](http://icecoder.net/)
   -  [Divshot](http://www.divshot.com/)
   -  [Codio](http://codio.com/)

3. **第三方插件的支持**

   下面这些编辑器的插件都是由第三方开发者所提供的，所以可能并不支持所有Emmet的功能和特性。

   -  [SynWrite](http://www.uvviewsoft.com/synwrite/)
   -  [WebStorm](http://www.jetbrains.com/webstorm/)
   -  [PhpStorm](http://www.jetbrains.com/phpstorm/)
   -  [Vim](https://github.com/mattn/emmet-vim)
   -  [HTML-Kit](http://www.htmlkit.com/)
   -  [HippoEDIT](http://wiki.hippoedit.com/plugins/emmet)
   -  [CodeLobster PHP Edition](http://www.codelobster.com/)
   -  [TinyMCE](https://github.com/e-sites/tinymce-emmet-plugin#readme)

**因为我也是Sublime Text的使用者，所以下面为大家介绍一下sublime text中Emmet的安装方法：**

**步骤一：**首先你需要为sublime text安装Package Control组件：

1.  按Ctrl+`调出sublime text的console
2.  粘贴以下代码到底部命令行并回车： import urllib2,os;pf='Package Control.sublime-package';ipp=sublime.installed*packages*path();os.makedirs(ipp) if not os.path.exists(ipp) else None;open(os.path.join(ipp,pf),'wb').write(urllib2.urlopen('[http://sublime.wbond.net/'+pf.replace](http://sublime.wbond.net/'+pf.replace)(' ','%20')).read())
3.  重启Sublime Text
4.  在Perferences->package settings中看到package control，则表示安装成功

**步骤二：**使用Package Control安装Emmet插件：

1.  按Ctrl+Shift+P命令板
2.  输入install然后选择install Package，然后输入emmet找到 Emmet Css Snippets，点击就可以自动完成安装。

### 使用方法

emmet的使用方法也非常简单，以sublime text为例，直接在编辑器中输入HTML或CSS的代码的缩写，然后按tab键就可以拓展为完整的代码片段。（如果与已有的快捷键有冲突的话，可以自行在编辑器中将拓展键设为其他快捷键）

## 语法:

#### 后代：>

**缩写**：nav>ul>li

```
<nav>
    <ul>
        <li></li>
    </ul>
</nav>

```

#### 兄弟：+

**缩写**：div+p+bq

```
<div></div>
<p></p>
<blockquote></blockquote>

```

#### 上级：^

**缩写**：div+div>p>span+em^bq

```
<div></div>
<div>
    <p><span></span><em></em></p>
    <blockquote></blockquote>
</div>

```

**缩写**：div+div>p>span+em^^bq

```
<div></div>
<div>
    <p><span></span><em></em></p>
</div>
<blockquote></blockquote>

```

#### 分组：()

**缩写**：div>(header>ul>li*2>a)+footer>p

```
<div>
    <header>
        <ul>
            <li><a href=""></a></li>
            <li><a href=""></a></li>
        </ul>
    </header>
    <footer>
        <p></p>
    </footer>
</div>

```

**缩写**：(div>dl>(dt+dd)*3)+footer>p

```
<div>
    <dl>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
        <dt></dt>
        <dd></dd>
    </dl>
</div>
<footer>
    <p></p>
</footer>

```

#### 乘法：*

**缩写**：ul>li*5

```
<ul>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
    <li></li>
</ul>

```

#### 自增符号：$

**缩写**：ul>li.item$*5

```
<ul>
    <li class="item1"></li>
    <li class="item2"></li>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
</ul>

```

**缩写**：h$[title=item$]{Header $}*3

```
<h1 title="item1">Header 1</h1>
<h2 title="item2">Header 2</h2>
<h3 title="item3">Header 3</h3>

```

**缩写**：ul>li.item$$$*5

```
<ul>
    <li class="item001"></li>
    <li class="item002"></li>
    <li class="item003"></li>
    <li class="item004"></li>
    <li class="item005"></li>
</ul>

```

**缩写**：ul>li.item$@-*5

```
<ul>
    <li class="item5"></li>
    <li class="item4"></li>
    <li class="item3"></li>
    <li class="item2"></li>
    <li class="item1"></li>
</ul>

```

**缩写**：ul>li.item$@3*5

```
<ul>
    <li class="item3"></li>
    <li class="item4"></li>
    <li class="item5"></li>
    <li class="item6"></li>
    <li class="item7"></li>
</ul>

```

#### ID和类属性

**缩写**：#header

```
<div id="header"></div>

```

**缩写**：.title

```
<div class="title"></div>

```

**缩写**：form#search.wide

```
<form id="search" class="wide"></form>

```

**缩写**：p.class1.class2.class3

```
<p class="class1 class2 class3"></p>

```

#### 自定义属性

**缩写**：p[title="Hello world"]

```
<p title="Hello world"></p>

```

**缩写**：td[rowspan=2 colspan=3 title]

```
<td rowspan="2" colspan="3" title=""></td>

```

**缩写**：[a='value1' b="value2"]

```
<div a="value1" b="value2"></div>

```

#### 文本：{}

**缩写**：a{Click me}

```
<a href="">Click me</a>

```

**缩写**：p>{Click }+a{here}+{ to continue}

```
<p>Click <a href="">here</a> to continue</p>

```

#### 隐式标签

**缩写**：.class

```
<div class="class"></div>

```

**缩写**：em>.class

```
<em><span class="class"></span></em>

```

**缩写**：ul>.class

```
<ul>
    <li class="class"></li>
</ul>

```

**缩写**：table>.row>.col

```
<table>
    <tr class="row">
        <td class="col"></td>
    </tr>
</table>

```

### HTML

*所有未知的缩写都会转换成标签，例如，foo → *

**缩写**：!

```
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
</head>
<body>

</body>
</html>

```

**缩写**：a

```
<a href=""></a>

```

**缩写**：a:link

```
<a href="http://"></a>

```

**缩写**：a:mail

```
<a href="mailto:"></a>

```

**缩写**：abbr

```
<abbr title=""></abbr>

```

**缩写**：acronym

```
<acronym title=""></acronym>

```

**缩写**：base

```
<base href="" />

```

**缩写**：basefont

```
<basefont />

```

**缩写**：br

```
<br />

```

**缩写**：frame

```
<frame />

```

**缩写**：hr

```
<hr />

```

**缩写**：bdo

```
<bdo dir=""></bdo>

```

**缩写**：bdo:r

```
<bdo dir="rtl"></bdo>

```

**缩写**：bdo:l

```
<bdo dir="ltr"></bdo>

```

**缩写**：col

```
<col />

```

**缩写**：link

```
<link rel="stylesheet" href="" />

```

**缩写**：link:css

```
<link rel="stylesheet" href="style.css" />

```

**缩写**：link:print

```
<link rel="stylesheet" href="print.css" media="print" />

```

**缩写**：link:favicon

```
<link rel="shortcut icon" type="image/x-icon" href="favicon.ico" />

```

**缩写**：link:touch

```
<link rel="apple-touch-icon" href="favicon.png" />

```

**缩写**：link:rss

```
<link rel="alternate" type="application/rss+xml" title="RSS" href="rss.xml" />

```

**缩写**：link:atom

```
<link rel="alternate" type="application/atom+xml" title="Atom" href="atom.xml" />

```

**缩写**：meta

```
<meta />

```

**缩写**：meta:utf

```
<meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />

```

**缩写**：meta:win

```
<meta http-equiv="Content-Type" content="text/html;charset=windows-1251" />

```

**缩写**：meta:vp

```
<meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0" />

```

**缩写**：meta:compat

```
<meta http-equiv="X-UA-Compatible" content="IE=7" />

```

**缩写**：style

```
<style></style>

```

**缩写**：script

```
<script></script>

```

**缩写**：script:src

```
<script src=""></script>

```

**缩写**：img

```
<img src="" alt="" />

```

**缩写**：iframe

```
<iframe src="" frameborder="0"></iframe>

```

**缩写**：embed

```
<embed src="" type="" />

```

**缩写**：object

```
<object data="" type=""></object>

```

**缩写**：param

```
<param name="" value="" />

```

**缩写**：map

```
<map name=""></map>

```

**缩写**：area

```
<area shape="" coords="" href="" alt="" />

```

**缩写**：area:d

```
<area shape="default" href="" alt="" />

```

**缩写**：area:c

```
<area shape="circle" coords="" href="" alt="" />

```

**缩写**：area:r

```
<area shape="rect" coords="" href="" alt="" />

```

**缩写**：area:p

```
<area shape="poly" coords="" href="" alt="" />

```

**缩写**：form

```
<form action=""></form>

```

**缩写**：form:get

```
<form action="" method="get"></form>

```

**缩写**：form:post

```
<form action="" method="post"></form>

```

**缩写**：label

```
<label for=""></label>

```

**缩写**：input

```
<input type="text" />

```

**缩写**：inp

```
<input type="text" name="" id="" />

```

**缩写**：input:hidden

*别名：input[type=hidden name]*

```
<input type="hidden" name="" />

```

**缩写**：input:h

*别名：input:hidden*

```
<input type="hidden" name="" />

```

**缩写**：input:text, input:t

*别名：inp*

```
<input type="text" name="" id="" />

```

**缩写**：input:search

*别名：inp[type=search]*

```
<input type="search" name="" id="" />

```

**缩写**：input:email

*别名：inp[type=email]*

```
<input type="email" name="" id="" />

```

**缩写**：input:url

*别名：inp[type=url]*

```
<input type="url" name="" id="" />

```

**缩写**：input:password

*别名：inp[type=password]*

```
<input type="password" name="" id="" />

```

**缩写**：input:p

*别名：input:password*

```
<input type="password" name="" id="" />

```

**缩写**：input:datetime

*别名：inp[type=datetime]*

```
<input type="datetime" name="" id="" />

```

**缩写**：input:date

*别名：inp[type=date]*

```
<input type="date" name="" id="" />

```

**缩写**：input:datetime-local

*别名：inp[type=datetime-local]*

```
<input type="datetime-local" name="" id="" />

```

**缩写**：input:month

*别名：inp[type=month]*

```
<input type="month" name="" id="" />

```

**缩写**：input:week

*别名：inp[type=week]*

```
<input type="week" name="" id="" />

```

**缩写**：input:time

*别名：inp[type=time]*

```
<input type="time" name="" id="" />

```

**缩写**：input:number

*别名：inp[type=number]*

```
<input type="number" name="" id="" />

```

**缩写**：input:color

*别名：inp[type=color]*

```
<input type="color" name="" id="" />

```

**缩写**：input:checkbox

*别名：inp[type=checkbox]*

```
<input type="checkbox" name="" id="" />

```

**缩写**：input:c

*别名：input:checkbox*

```
<input type="checkbox" name="" id="" />

```

**缩写**：input:radio

*别名：inp[type=radio]*

```
<input type="radio" name="" id="" />

```

**缩写**：input:r

*别名：input:radio*

```
<input type="radio" name="" id="" />

```

**缩写**：input:range

*别名：inp[type=range]*

```
<input type="range" name="" id="" />

```

**缩写**：input:file

*别名：inp[type=file]*

```
<input type="file" name="" id="" />

```

**缩写**：input:f

*别名：input:file*

```
<input type="file" name="" id="" />

```

**缩写**：input:submit

```
<input type="submit" value="" />

```

**缩写**：input:s

*别名：input:submit*

```
<input type="submit" value="" />

```

**缩写**：input:image

```
<input type="image" src="" alt="" />

```

**缩写**：input:i

*别名：input:image*

```
<input type="image" src="" alt="" />

```

**缩写**：input:button

```
<input type="button" value="" />

```

**缩写**：input:b

*别名：input:button*

```
<input type="button" value="" />

```

**缩写**：isindex

```
<isindex />

```

**缩写**：input:reset

*别名：input:button[type=reset]*

```
<input type="reset" value="" />

```

**缩写**：select

```
<select name="" id=""></select>

```

**缩写**：option

```
<option value=""></option>

```

**缩写**：textarea

```
<textarea name="" id="" cols="30" rows="10"></textarea>

```

**缩写**：menu:context

*别名：menu[type=context]>*

```
<menu type="context"></menu>

```

**缩写**：menu:c

*别名：menu:context*

```
<menu type="context"></menu>

```

**缩写**：menu:toolbar

*别名：menu[type=toolbar]>*

```
<menu type="toolbar"></menu>

```

**缩写**：menu:t

*别名：menu:toolbar*

```
<menu type="toolbar"></menu>

```

**缩写**：video

```
<video src=""></video>

```

**缩写**：audio

```
<audio src=""></audio>

```

**缩写**：html:xml

```
<html xmlns="http://www.w3.org/1999/xhtml"></html>

```

**缩写**：keygen

```
<keygen />

```

**缩写**：command

```
<command />

```

**缩写**：bq

*别名：blockquote*

```
<blockquote></blockquote>

```

**缩写**：acr

*别名：acronym*

```
<acronym title=""></acronym>

```

**缩写**：fig

*别名：figure*

```
<figure></figure>

```

**缩写**：figc

*别名：figcaption*

```
<figcaption></figcaption>

```

**缩写**：ifr

*别名：iframe*

```
<iframe src="" frameborder="0"></iframe>

```

**缩写**：emb

*别名：embed*

```
<embed src="" type="" />

```

**缩写**：obj

*别名：object*

```
<object data="" type=""></object>

```

**缩写**：src

*别名：source*

```
<source></source>

```

**缩写**：cap

*别名：caption*

```
<caption></caption>

```

**缩写**：colg

*别名：colgroup*

```
<colgroup></colgroup>

```

**缩写**：fst, fset

*别名：fieldset*

```
<fieldset></fieldset>

```

**缩写**：btn

*别名：button*

```
<button></button>

```

**缩写**：btn:b

*别名：button[type=button]*

```
<button type="button"></button>

```

**缩写**：btn:r

*别名：button[type=reset]*

```
<button type="reset"></button>

```

**缩写**：btn:s

*别名：button[type=submit]*

```
<button type="submit"></button>
```

