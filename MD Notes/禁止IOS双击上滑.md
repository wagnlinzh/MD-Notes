## 取消双击上滑 

```javascript
var agent = navigator.userAgent.toLowerCase();
var iLastTouch = null;
if (agent.indexOf("iphone") >= 0 || agent.indexOf("ipad") >= 0) {
    document.body.addEventListener("touchend", function (event) {
        var a = new Date().getTime();
        iLastTouch = iLastTouch || a + 1;
        var c = a - iLastTouch;
        if (c < 500 && c > 0) {
            event.preventDefault();
            return false;
        }
        iLastTouch = a
    }, false);
};
```

