## Atom 飞行指南



### 混合本地代码与 Web 技术

Web 浏览器很适合用来浏览网页，但写代码是一种需要可靠的工具的专业活动。更重要的是，浏览器出于安全的考虑，严格限制了对本地系统的访问，但对一个文本编辑器而言，不能向本地系统写入文件是不可接受的。

因此，我们没有把 Atom 构建为一个传统的 Web 应用，Atom 是一个专门被设计用作文本编辑器，而不是网页浏览器的 Chromium 定制版。Atom 的每一个窗口实际上都是一个本地渲染的网页。

所有来自 Node.js 可用的 API 在 Atom 窗口的 JavaScript 中同样可用，这种结合带来了一种独一无二的开发体验。

因为一切都是本地的，你不需要将静态资源打包、不需要关注脚本的异步加载，如果你希望加载一些代码。只需要在文件的最顶部 `require` 它即可，Node.js 的模块系统允许你将一个系统分割为小的、专注于某一功能的包。



### Web 技术：最有趣的部分



另一个好消息就是当你为 Atom 编写代码时，这些代码一定会被允许在最新版本的 Chromium 中。这意味着你可以无视与浏览器兼容性有关的黑科技，使用全部的最新的 Web 功能。



我们确信将 Atom 构建在 Web 技术之上是一个好的选择，因为整个行业都在推动着 Web 技术的发展。原生UI技术不断产生又不断淘汰，而 Web 是一个每年都变得更加强大和普及的标准。我们对于深入探索这一强大的技术感到无比兴奋。





## 命令面板



在 Atom 中几乎所有的操作都通过这种搜索驱动的菜单来完成，你只需要按下 `cmd-shift-P` 来搜索命令，而不必在复杂的传统菜单栏间点来点去。





## 偏好设置

当你启用了 Soft Tabs, Atom 将会在你按 `tab` 键时用空格来替代真正的制表符，Tab Length 则指定了一个制表符代表多少个空格，或者当 Soft Tabs 被禁用时多少个空格相当于一个制表符。



如果开启了 Soft Wrap 选项，Atom 会在一行中的文本超出屏幕显示范围时将其折为两行，如果禁用了这个选项，过长的行将简单地超出屏幕显示范围，你必须要横向移动滚动条才能看到剩余的部分。如果 Soft Wrap At Preferred Line Length 选项被开启，则总是会在 80 个字符处折行，你也可以设置一个自定义的长度来替换掉默认的 80 个字符。



## 打开目录

目录树允许你查看和修改当前项目的目录结构，你可以在目录树中打开文件、重命名文件、删除文件、创建文件。



## 打开项目中的文件

当你在 Atom 中打开了一个项目（即目录）后，你就可以简单地查找并打开来自项目中文件了。

当你按下 `cmd-T` 或 `cmd-P` 的时候，模糊查找框（Fuzzy Finder）就会弹出。它允许你通过输入文件名或路径的一部分，在整个项目中模糊查找相应的文件。

![](http://atom-china.org/uploads/default/43/58aedc7103e6bc4f.png)

你也可以通过 `cmd-B` 来只查找已经打开的文件，而不是所有文件。你还可以用 `cmd-shift-B` 来只查找从上次 Git 提交之后修改过或新增的文件。

模糊查找框会根据 `core.ignoredNames` 和 `fuzzy-finder.ignoredNames` 这两个选项来决定不查找哪些文件。如果在你的项目里有很多你不希望它们出现在模糊查找框的文件，那么你可以在选项中添加它们的路径或使用通配符。你可以在设置界面的 Core Settings 下找到这两个选项，之后我们会在 [Basic Customization](https://atom.io/docs/latest/using-atom-basic-customization#global-configuration-settings)一节中介绍更多的选项。



## 模块化的 Atom

就像 Atom 的其他很多部分一样，目录树也并非直接内建在 Atom 中，它是一个独立的插件，被捆绑在 Atom 发行版中并默认启用。

你可以在这里找到目录树插件的源代码：[https://github.com/atom/tree-view](https://github.com/atom/tree-view)

Atom 有趣的部分之一就是，很多核心功能实际上只是一个普通的插件——你也可以用类似的方式来实现其他功能。这意味着如果你不喜欢默认的目录树，你完全可以简单地自己编写一个，然后将默认的目录树替换掉。





# Atom中的包

首先，让我们从Atom的包系统开始讲起。像我们前面提到过的那样，Atom自己只是一个非常基础的功能核心，它上面加载了许多有用的包，这些包添加新的功能，像树视图（Tree View）和设置视图（Settings View）。

实际上，默认情况中，Atom中所有的功能由超过70种包组成。例如，你在首次启动Atom时看到的欢迎对话框，拼写检查工具，主题和模糊查找工具都是独立的包，它们使用了你所访问的相同API。



## 通过符号浏览

你也可以提供更多的信息来跳转。要想跳到一个方法声明之类的符号，按下`cmd-r`。它会打开一个列表，包含当前文件中所有的符号，你可以通过`cmd-t`进行模糊查找。使用`cmd-shift-r`来查找存在于整个项目中的符号。



你也可以使用`ctrl-alt-down`来跳到光标下的方法或者函数声明。

首先，你需要确保你的项目中生成了`tags`（或者`TAGS`）文件。通过安装ctags，并且从命令行中，在你的项目根目录下运行`ctags -R src/`这样的命令，来生成文件。





## 括号

Atom自带一种对括号的智能处理方式。

当你的光标覆盖他们时，Atom会自动高亮`{}`、`()`和`[]`。匹配的xml和html标签也会高亮显示。

Atom也会自动补全`[]`, `()`, `{}`, `“”`, `''`, `“”`, `‘’`, `«»`, `‹›`和反引号。当你输入开头的一个时，Atom会补全另一个。如果你在一段选择区域上面输入这些括号或引号的开头，Atom会用对应符号的结尾使区域闭合。

下面是一些其他的有趣的括号相关命令，你可以使用它们。





`ctrl-m`

跳到光标下的括号所匹配的括号。如果没有，就跳到最近的后括号。





`ctrl-alt-m`

选择当前括号中所有文本



````
alt-alt-.
````

**闭合当前的xml或html标签。**



括号功能在atom/bracket-matcher包中实现。和所有这些包一样，想要修改括号处理相关的默认行为，或者直接禁用它，你可以浏览设置视图（Settings view）中这个包的页面。





## 编码

Atom也自带了一些基本的文件编码支持，如果你发现你在处理非UTF-8文件，或者你打算创建这样的文件的话。

`ctrl-shift-U`

拉下菜单来修改文件编码

如果你弹出了编码对话框，你可以选择用来保存文件的编码。

当你打开一个文件时，Atom会自动检测文件编码。如果检测失败，编码会默认设置为UTF-8，它也是新建立的文件的编码。





# 查找和替换

在Atom中，对你文件或者项目中的文本进行查找或者替换，非常快速而且容易。

`cmd-F`

在缓冲区中查找

`cmd-shift-f`

在整个项目中查找





许多包自带他们自己的，具有特定模式的代码段。比如，提供了html语法高亮和语法的`language-html`包提供了许多代码段，来创建一些你想使用的不同HTML标签。如果你在Atom中创建一个新的HTML文件，你可以输入`html`然后按下`tab`，它会扩展为：

```
<html>
  <head>
    <title></title>
  </head>
  <body>

  </body>
</html>

```

同时它会把光标放在`title`标签的中间，以便你立即开始填充这个标签。许多代码段具有多个焦点位置，你可以按下`tab`在他们之间切换 —— 比如，在这个HTML代码段之中，你填充完标题标签之后，可以按下`tab`键，然后光标就会移动到body标签之间。

要查看当前打开文件拥有的所有代码段，你可以按下`alt-shift-S`。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/snippets.png)

你也可以在选择输入框中输入内容，来使用模糊搜索过滤这个列表。选择其中一个之后会执行光标所在的代码段（或者多个光标所在的代码段）。







## 创建你自己的代码段

所以说这样太爽了。但是，如果语言包中没有包含一些东西，或者你的代码中要编写一些自定义的东西，那会怎么样呢？很幸运的是，你可以非常便利地添加自己的代码段。

在你`~/.atom`目录下的`snippets.cson`文件，存放了你的所有自定义的代码段，他们会在Atom运行时加载。但是，你也可以通过`Atom > Open Your Snippets`菜单，轻易打开这个文件。

## 代码段的格式

现在让我们看一看如何编写代码段，基本的代码段格式像这个样子：

```
'.source.js':
  'console.log':
    'prefix': 'log'
    'body': 'console.log(${1:"crash"});$2'

```

最外面的键是选择器，即在哪里会加载代码段。决定它应该是什么的最简单的方法，是访问你想要添加代码段的语言的语言包，并找到“Scope”字符串。

例如，你想要添加在Java文件中工作的代码段，我们应该先在我们的设置视图中寻找`language-java`包，然后我们看到了Scope是“source.java”，代码段最顶层的键就应该是它前面加上一个点（就像CSS选择器那样）。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/snippet-scope.png)

下一层的键是代码段的名字，用于在代码段菜单中，以一个更具可读性的方式来描述代码段。通常来说，这里最好使用对人来说具有可读性的字符串。

在每个代码段的名字下面是`prefix`，用于触发代码段，以及`body`，当代码段被触发后用于插入。

每个后面带有数字的`$`是tab的停止位置。在代码段被触发之后，通过按下`tab`键来遍历它们。

上面的例子向Javascript文件添加了`log`代码段，它会被扩展为：

```
console.log("crash");

```

其中的"crash"字符串会在开始时被选中，再次按下`tab`键之后，光标会移动到分号之后。

并不像CSS选择器，代码段的键每层只能重复一次。如果某一层有重复的键，只有最后的那个会被读到，详见[配置CSON](https://atom.io/docs/v1.0.3/ch00/_cson)。

## 多行代码段主体

对于长一些的模板，你可以使用`"""`来使用多行语法。

```
'.source.js':
  'if, else if, else':
    'prefix': 'ieie'
    'body': """
      if (${1:true}) {
        $2
      } else if (${3:false}) {
        $4
      } else {
        $5
      }
    """

```

像你可能期待的那样，这是一个创建代码段的代码段。如果你打开一个代码段文件，输入`snip`之后按下`tab`，会将以下内容插入到文件中：

```
'.source.js':
  'Snippet Name':
    'prefix': 'hello'
    'body': 'Hello World!'

```

砰的一下，就把那个东西填充了，然后得到了一个代码段。只要你保存了文件，Atom就会重新加载它，你也就能立即使用它了。

代码段功能在atom/snippets包中实现。

更多例子请见[language-html](https://github.com/atom/language-html/blob/master/snippets/language-html.cson)中的代码段，和[language-javascript](https://github.com/atom/language-javascript/blob/master/snippets/language-javascript.cson)包。





# 折叠

如果你仅仅希望看到你所处理的代码文件的结构概览，折叠会是个非常有用的工具。折叠可以隐藏像函数和循环这样的代码块，来简化你屏幕上显示的东西。

当你把鼠标移到数字栏上，你就可以点击显示的箭头来折叠代码段。你也可以使用快捷键

````
alt-cmd-[

alt-cmd-]
````

来折叠和展开代码段。





使用

```
alt-cmd-shift-{
```
来折叠所有代码段，使用来展开所有代码段。

使用
```
alt-cmd-shift-}
```

来展开所有代码段



你也可以使用
```
cmd-k cmd-N
```
来指定折叠的缩进级别，其中N是缩进深度。



最后，你可以折叠你代码或文本的任意一部分，通过按下
```
ctrl-alt-cmd-F
```
或者在命令面板中选择`Fold Selection`。









# Atom中的版本控制

对于任何项目来说，版本控制都是很重要的一个方面。Atom集成了一些基本的Git和Github功能。

## 检出（checkout）HEAD中的版本

`cmd-alt-Z`快捷键检出当前文件在HEAD中的版本。

这是一个快捷的方法，来撤销所有你保存的或者阶段性的修改，并且把你的文件还原到HEAD中（最后提交）的版本。这从本质上相当于使用命令行在`path`中执行



`git checkout HEAD -- `

或者

`git reset HEAD -- `命令。



![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/git-checkout-head.gif)

这个命令会保存到撤销栈，所以稍后你可以使用`cmd-Z`来恢复之前的内容。





## Git状态（status）列表

Atom带有模糊查找的包，提供了`cmd-T`快捷键来快速打开项目中的文件，以及`cmd-B`快捷键来跳到任何已打开的编辑器。

这个包也提供了`cmd-shift-B`快捷键，用来显示所有未跟踪和已修改的文件列表。如果你运行`git status`，你在命令行中会看到相同的文件。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/git-status.gif)

每个文件的右边会出现一个小图标，让你知道它是未跟踪的还是已修改的。

## 提交（commit）编辑器

Atom可以用作你的Git提交（commit）编辑器，并自带git语法包（language-git），它添加了语法高亮来编辑提交（commit）、合并（merge）和rebase消息。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/git-message.gif)

你可以使用以下命令来设置Atom为你的Git提交编辑器。

```
$ git config --global core.editor "atom --wait"

```

language-git包会通过给提交消息的第一行加上颜色，来提醒你缩短它，当它超过50和65个字符的时候。

## 状态栏的图标

status-bar包带有一些Git标识，用于显示在状态栏的右边。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/git-status-bar.png)

当前检出的分支名称，会和当前分支在上游（upstream）分支之前或之后的提交数量一起显示。

如果当前文件未跟踪、已修改或者被忽略，就会添加一个标识。最后一次提交以来的添加和删除的行数也会显示。

## 行间差异

引入的git-diff包在行号旁边为添加、修改和删除的行着色。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/git-lines.png)

这个包也添加了`alt-g down`和`alt-g up`快捷键，允许你在当前编辑器中把光标移动到上一个或下一个不同的代码块。

## 在Github上打开

如果你处理的项目存放在Github上，你可以使用许多方便的集成功能。这些命令的大多数都作用于你当前查看的文件，并在Github上打开它的视图 —— 例如，当前文件的修改历史（blame）或者提交历史（commit history）。

`alt-G O`

在Github上打开文件。

`alt-G B`

在Github上打开文件的修改历史。

`alt-G H`

在Github上打开文件的提交历史。

`alt-G C`

复制当前文件在Github上的链接。

`alt-G R`

在Github上进行分支比较。

分支比较只是简单地向你展示那些在本地的当前工作分支上存在，并且在主分支上没有的提交。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/open-on-github.png)







## 使用CSON来配置

所有Atom的配置文件（除了你的样式表和初始脚本）全部用CSON编写，全称是CoffeeScript Object Notation。就像JSON（JavaScript Object Notation）的名字一样，CSON是一个储存结构化数据的文本格式，表现为由键值对组成的简单对象的形式。

```
key:
  key: value
  key: value
  key: [value, value]

```

对象是CSON的基石，由缩进（像上面的文件那样）或者花括号（`{}`）描述。一个键的值可以是字符串、数字、对象、布尔值、`null`或者上述数据类型的一个数组。

不像CSS的选择器，CSON的键在每个对象中只能重复一次。如果存在重复的键，最后一次出现的那个会覆盖其他所有同名的键。在Atom配置文件中也是如此。

避免这种情况：

```
# DON'T DO THIS
'.source.js':
  'console.log':
    'prefix': 'log'
    'body': 'console.log(${1:"crash"});$2'

# Only this snippet will be loaded
'.source.js':
  'console.error':
    'prefix': 'error'
    'body': 'console.error(${1:"crash"});$2'

```

而是要写成这样：

```
# DO THIS: Both of these will be loaded
'.source.js':
  'console.log':
    'prefix': 'log'
    'body': 'console.log(${1:"crash"});$2'
  'console.error':
    'prefix': 'error'
    'body': 'console.error(${1:"crash"});$2'

```









## 样式调整

如果你只是对个人样式做一些应急的修改，而不打算发布整个主题，你可以在你的`~/.atom`目录的`styles.less`文件中添加样式。

你可以在编辑器中从`Atom > Open Your Stylesheet`菜单打开这个文件。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/menubar.png)

例如，要修改光标的颜色，你可以将一下规则添加到你的`~/.atom/styles.less`文件中：

```
atom-text-editor::shadow .cursor {
  border-color: pink;
}

```

了解都有哪些class可用的最简单方式，是通过开发者工具手动查看DOM。我们将在下一章详细介绍这个工具，现在先简单来看一下。

你可以通过按下`alt-cmd-I`来打开开发者工具，然后会弹出一个Chrome开发者工具面板。

![](https://wizardforcel.gitbooks.io/atom-flight-manual-zh-cn/content/img/devtools.png)

你可以轻易查看到当前编辑器的所有元素。如果你想更新一些东西的样式，你需要先知道它拥有哪个class，然后再你的样式文件中添加一条Less规则。

如果你不熟悉Less，它是一个让CSS变得更简单的CSS预处理器，你可以访问lesscss.org来了解关于它的更多信息。如果你更愿意使用CSS，这个文件也可以命名为styles.css来包含CSS。







### 快捷键配置参考

- `core`
  - `disabledPackages`：被禁用的包名的一个列表
  - `excludeVcsIgnoredPaths`：不要加载`.gitignore`指定的文件
  - `ignoredNames`：在Atom中要忽略的文件名
  - `projectHome`：假定项目被存放的目录
  - `themes`：要加载的主题名称的数组，按照层叠顺序
- `editor`
  - `autoIndent`：开启或关闭基本的自动缩进（默认为true）
  - `nonWordCharacters`：一个非单词字符的字符串，来指定单词边界
  - `fontSize`：编辑器中的字体大小
  - `fontFamily`: 编辑器中的字体类型
  - `invisibles`: 一个Atom用来渲染空白字符的哈希表。键是空白字符的类型，值是被渲染成的字符（使用false来屏蔽单个的空白字符）`tab`：硬tab字符`cr`：回车（Carriage return，微软风格的行末尾）`eol：字符`\n``space`：在开头或末尾的空格字符
  - `preferredLineLength`：设定一行的长度（默认为80）
  - `showInvisibles`：是否将不可见字符渲染为占位符（默认为false）
  - `showIndentGuide`：是否在编辑器中显示缩进标识
  - `showLineNumbers`：显示或者隐藏行号
  - `softWrap`：开启或关闭编辑器中的软换行
  - `softWrapAtPreferredLineLength`: 开启或关闭在`preferredLineLength`处软换行
  - `tabLength`：tab字符所占空格字符的宽度（默认为2）
- `fuzzyFinder``ignoredNames`：只在模糊查找中忽略的文件名
- `whitespace``ensureSingleTrailingNewline`：是否将文件末尾的多个换行减少为一个`removeTrailingWhitespace`：开启或关闭清除行尾的空白字符（默认为true）
- `wrap-guide``columns`：带有`pattern`和`column`键的数组，用来将当前编辑器的目录匹配到列中的位置

