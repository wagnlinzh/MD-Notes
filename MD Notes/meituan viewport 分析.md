# meituan viewport







```javascript

    (function() {
        var ua = window && window.navigator && window.navigator.userAgent;
        if (!ua) return;
        var text, scale = 1.0, ratio = 1;
        if (/(ipad|iphone|ipod)/i.exec(ua)) {
            ratio = 1;
            if (window.devicePixelRatio >= 2) {
                scale *= 0.5;
                ratio *= 2;
            }
        }
        text = '<meta name="viewport" content="initial-scale=' + scale + ', maximum-scale=' + scale +', minimum-scale=' + scale + ', width=device-width, height=device-height,  user-scalable=no" />';
        document.write(text);
        if (ratio) {
            document.documentElement.style.fontSize = 50*ratio + "px";
            document.documentElement.classList.add('ratio--' + ratio);
        }

    })();

```

