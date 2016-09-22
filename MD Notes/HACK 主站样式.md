## HACK 主站的样式



主站的样式,由于和我们使用的单位制不同, 所以在使用rem标准的 时候,会出现问题. 需要hack`主站的头尾`的样式.



```css
/*HACK 主站样式*/
.header .btn-nav{
  font-size: 16px !important;
}

.footer15 .foot-copyright{
  font-size: 12px  !important;
}

.footer15 .opt-change{
  font-size: 14px  !important;
}

.footer15 .foot-contact{
  font-size: 12px !important;
}

.footer15 .foot-contact a{
  font-size: 14px  !important;
}
.header .pop-nav ul li{
  font-size: 12px !important;
}

#app_download{display: none;}

```





Tips: 这么写了之后,最好还是放到的测试的那个地址上试一下. 看看有没有什么问题.