## IE浏览器的检验


```javascript
 <script>
           $(function(){

           var isIE78910=/mise/i.test(navigator.userAgent.toLowerCase());
           var isIE11=/trident/i.test(navigator.userAgent.toLowerCase());
           var isIE=(isIE78910 || isIE11);
          //  alert(isIE);
          //  console.log(isIE);
           if(isIE){
               $(".three-d-box").hide();
           }
           })();
       </script>

```