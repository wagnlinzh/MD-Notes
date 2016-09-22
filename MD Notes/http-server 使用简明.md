# http-server 使用简明

安装

```
npm i http-server -g
```



http-server服务器只能解析以`.html`后缀的文件. 不能处理shtml的文件,这点请注意.


<br /><br /><br /><br />

最简单的做法是直接在 `git bash`里面输入下面的这行命令

```
http-server
```

这样就启动了一个服务器,可以方便的 在手机上调试了.



<br /><br /><br /><br />

##  稍微复杂一点的操作



嗯..有时候需要启动多个服务器,那么就需要修改一下参数.

```
http-server -a 172.20.XXXX.XXX -pYYYY
```



xxxx,和YYYY分别代表数字.-p YYYY最四位已经以上



172.20.xxx.xxxx 是本机的IP地址. 查询方法:



<br /><br /><br /><br />

### ipconfig


```
ipconfig
```



Done

:)