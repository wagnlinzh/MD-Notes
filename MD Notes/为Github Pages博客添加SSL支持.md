# 为Github Pages博客添加SSL支持

- [博客配置](http://blog.ishell.me/tags/%E5%8D%9A%E5%AE%A2%E9%85%8D%E7%BD%AE/)

总是看到人们讨论网站上https什么的，以前用VPS搭建博客的时候看到SSL需要各种配置，证书也蛮贵的，就望而却步。如今博客搬家到Github Page，本就是没打算再折腾，但是随手一搜，还能在Github Pages上用到免费的SSL，这挺有趣。索性再折腾折腾

[!\](http://ishell-imgs.b0.upaiyun.com/blog/1451368754/01.png)](http://ishell-imgs.b0.upaiyun.com/blog/1451368754/01.png)

[https://blog.ishell.me/](https://blog.ishell.me/)

- 首先应该拥有了一个Github Pages博客，它的访问地址是这样的([sincerefly.githut.io](http://blog.ishell.me/a/sincerefly.githut.io))
- 如果想拥有自己的域名，那么需要购买一个域名，在域名服务商那里设置nameserver，通常域名服务商的nameserver不是那么好用
- 想要让网站拥有免费的SSL，需要clouldflare服务商的服务，所以先得注册个帐号，将nameserver设置成clouldflare提供的地址
- 稍等片刻，在cf的界面应该就看到添加成功了，之后设置一个blog.ishell.me的CNAME类型指向到sincerefly.github.io
- 在页面最上一排有Overview, DNS, Crypto等，进入Crypto，将SSL选项设置为“Flexible”，这个的意思是访客到cf的过程是加密的，而cf到github pages不是加密的
- 将配置文件`_config.yml`，添加 `url: https://blog.ishell.me` 与 `enforce_ssl: blog.ishell.me`（我这里的程序是Hexo）
- 好了，还是很容易的，不过现在的网站访问带有https的时候会是红色，因为cf配置证书需要点时间，一个小时到几个小时不等
- 这段时间也别闲着，将博客的图片连接[http://都换成//吧(如果图片托管支持https的话)，而且引用的各种js，css文件，也需要这样修改，当这些都搞定，才能解锁出这个绿色的小锁头，否则是灰色的，还有个黄色的小圆点，强迫症肯定受不了](http://xn--vnu52ay41h//%E5%90%A7(%E5%A6%82%E6%9E%9C%E5%9B%BE%E7%89%87%E6%89%98%E7%AE%A1%E6%94%AF%E6%8C%81https%E7%9A%84%E8%AF%9D)%EF%BC%8C%E8%80%8C%E4%B8%94%E5%BC%95%E7%94%A8%E7%9A%84%E5%90%84%E7%A7%8Djs%EF%BC%8Ccss%E6%96%87%E4%BB%B6%EF%BC%8C%E4%B9%9F%E9%9C%80%E8%A6%81%E8%BF%99%E6%A0%B7%E4%BF%AE%E6%94%B9%EF%BC%8C%E5%BD%93%E8%BF%99%E4%BA%9B%E9%83%BD%E6%90%9E%E5%AE%9A%EF%BC%8C%E6%89%8D%E8%83%BD%E8%A7%A3%E9%94%81%E5%87%BA%E8%BF%99%E4%B8%AA%E7%BB%BF%E8%89%B2%E7%9A%84%E5%B0%8F%E9%94%81%E5%A4%B4%EF%BC%8C%E5%90%A6%E5%88%99%E6%98%AF%E7%81%B0%E8%89%B2%E7%9A%84%EF%BC%8C%E8%BF%98%E6%9C%89%E4%B8%AA%E9%BB%84%E8%89%B2%E7%9A%84%E5%B0%8F%E5%9C%86%E7%82%B9%EF%BC%8C%E5%BC%BA%E8%BF%AB%E7%97%87%E8%82%AF%E5%AE%9A%E5%8F%97%E4%B8%8D%E4%BA%86)

http://blog.ishell.me/a/react-gulp-es2015-jsx.html

