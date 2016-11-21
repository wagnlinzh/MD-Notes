## IE浏览器的检验


```javascript
 <script>
           $(function(){

           var isIE78910=/mise/i.test(navigator.userAgent.toLowerCase());
           var isIE11=/trident/i.test(navigator.userAgent.toLowerCase());
           var isIE=(isIE78910 || isIE11);
   
           if(isIE){
              //todo
           }
           })();
       </script>
```




## IE8 以及以下的版本检测 



```javascript
var islowIE8=false;
var isIE=/mise/i.test(navigator.userAgent.toLowerCase());
if (isIE) {
	var ieVersion=/msie ([\d.]+)/.navigator.userAgent.toLowerCase();
	ieVersion = parseInt(ieVersion);
	islowIE8= (ieVersion>8);
}

if (islowIE8){ 	//<=ie8的情况
	//todo..
}else{		 	//其他情况
	//todo..
}
```





