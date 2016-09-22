## rem

```javascript
  (function (doc, win) {
    var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (clientWidth<320) {
        docEl.style.fontSize = 50 + 'px';
      }else if(clientWidth>640){
        docEl.style.fontSize = 120 + 'px';
      }else{
        docEl.style.fontSize = 100 * (clientWidth / 640) + 'px';

      }
    };
    recalc();
    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, recalc, false);
  })(document, window);
```





Meta部分

```html
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0"/>
 <meta name="format-detection" content="telephone=no" />
 <meta name="apple-mobile-web-app-capable" content="yes" />
 <meta http-equiv="X-UA-Compatible" content="IE=Edge">
```

