## HACK 主站的样式



主站的样式,由于和我们使用的单位制不同, 所以在使用rem标准的 时候,会出现问题. 需要hack`主站的头尾`的样式.



```css
/*HACK 主站样式*/
.header .btn-nav{
  font-size: 16px !important;
}

.header .pop-nav i{
  top: -8px !important;
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









## headerNew





```html
<!--头尾样式-->
<!--#include file="/ushtml/0000/myiche2016_cube_headerandfooter-1188.shtml"-->


<!--页头通用文件开始 -->
  <div id="m_header">
        <!-- header start -->
        <div class="op-nav">
            <a href="http://m.yiche.com" class="btn-return">返回</a>
            <div class="tt-name">
              <a href="http://m.yiche.com/" class="yiche-logo">汽车</a>
              <h1>专题</h1>
          	</div>
         <!--#include file="/include/pd/2016/wap/00001/201607_wap_common_ejdht_Manual.shtml"-->
        </div>
        <div class="op-nav-mark" style="display:none;"></div>
        <!-- header end -->
    </div>
<!--页头通用文件结束 -->




  <!--页尾文件开始 -->
      <div id="m_footer">
  		<!-- 新页底开始 -->
  		<!-- footer start -->
  		<div class="footer15">
  			<!--搜索框-->
  			<!--#include file="/ushtml/block/so/mobile/MobileSugBottom_chexing_noBom.shtml"-->
  			<!--页底内容-->
  			<!--#include file="/include/pd/2016/wap/00001/201607_wap_common_footer_Manual.shtml"-->
  		</div>
  		<!-- footer end -->
  		<!-- 新页底结束 -->
  		<!--#include file="/zhuanti/adtopic/include/201511_m.shtml"-->
  	</div>
  	<!--页尾文件结束 -->
```





```css

/*HACK header new*/

div#m_footer {
    font-size: 14px  !important
    line-height: initial  !important;
}

.menu-pop-n .yiche-login, .menu-pop-n .yiche-logout{
    font-size: 14px !important;
}

.op-nav{
  font-size:  16px !important;
}

.op-nav .btn-menu-p{
      font-size: 16px !important;
}

.op-nav .tt-name{
  font-size: 17px !important;
}

.op-nav .tt-name h1{
  height: 44px !important;
  line-height: 44px !important;
  font-size:15px !important;
}

.menu-nav-n a{
  font-size: 16px !important;
	text-decoration: none !important;
}

.op-nav .btn-menu-p{
	text-decoration: none !important;
}

.op-nav .btn-menu-p span{
    font-size: 14px !important;
}

.footer15 .opt-change{
    font-size: 14px !important;
}

.footer15 .foot-contact{
  font-size: 12px !important;
}

.footer15 .foot-copyright{
  font-size: 12px !important;
}

.footer15 .foot-contact a{
  font-size: 14px !important;
}

.m-s-box input[type="text"], .m-s-box input[type="search"]{
  font-size: 15px !important;
  -webkit-appearance: none !important;
}

#app_download{display: none;}
```



Tips: 这么写了之后,最好还是放到的测试的那个地址上试一下. 看看有没有什么问题.





