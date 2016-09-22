## [javascript动态改变css3的animation](http://www.shaynegui.com/javascript-changing-animation-keyframes/)



肖恩桂桂 a year ago

当需要在animation下动态计算keyframe水平或垂直方向的位移则比transition要麻烦许多,而且有诸多坑等着我们去踩.







### 动态改变keyframe

通过javascript动态改变animation的keyframe比较麻烦，造成此问题的原因也是受限于CSSOM的API,特别是定义了多个帧的frame时，js基本无法去在运行时动态改变,只能通过重写cssRule来实现

```javascript
function findKeyframesRule(animName) {
      var rule;
      var ss = document.styleSheets;
      for (var i = 0; i < ss.length; ++i) {
          for (var x = 0; x < ss[i].cssRules.length; ++x) {

              rule = ss[i].cssRules[x];

              if (rule.name == animName && (rule.type== CSSRule.KEYFRAMES_RULE || ss[i].cssRules[j].type == CSSRule.WEBKIT_KEYFRAMES_RULE )){
                  return rule;
              }
          }

      }

  }
  //删除旧的动画添加新的
  function change(selector,animName)
    {

        var keyframes = findKeyframesRule(animName);

        // 删除已经存在的开始和结束帧
        keyframes.deleteRule("0%");
        keyframes.deleteRule("100%");
        var clientWidth =  document.documentElement.clientWidth/2 || document.body.clientWidth/2 //此处为举例

        keyframes.insertRule("0% { -webkit-transform: translate("+clientWidth+"px); }");
        keyframes.insertRule("100% { -webkit-transform: translate(-"+clientWidth/2+"px); }");//结束移动屏幕一半

        // 重新指定动画名字使之生效
        document.querySelector(selector).style.webkitAnimationName = animName;
    }
```

此段代码对于未跨域link引入的css是可以生效,但是对于跨域的css在chrome下findKeyframesRule会取不到cssRule,`ss[i].cssRules`会始终为null,原以为link标签加上crossorigin属性,然后css的response响应的header加上**Access-Control-Allow-Origin: \***会能取到值,可是chrome下依旧取不到,无奈谷歌到chromium的[390947#issue](http://www.shaynegui.com/javascript-changing-animation-keyframes/chromium)才知道原因,即使设置了header,chrome也可能不会让js动态操作跨域的css,无奈只能放弃此条道路







## 重新插入新样式,覆盖旧样式





css的规则是权重相同的情况下,后面的定义的会覆盖前面的,因此我们只能动态的插入相应的新cssRule达到覆盖的目的

```javascript
function addStylesheetRules (rules) {  
  var styleEl = document.createElement('style'),
      styleSheet;
  document.head.appendChild(styleEl);

  // 获取样式
  styleSheet = styleEl.sheet;
  // 插入样式
  for(var i=0;i<rules.length;i++){
       styleSheet.insertRule(rules[i], styleSheet.cssRules.length);//后面一个参数表示插入位置的索引
  } 
}

addStylesheetRules(["body { color: white }","@-webkit-keyframes animName {  
    100% {
        -webkit-transform: translateX(-"+clientWidth/2"px);
    }
}"])
```





## 总结

- 能用transtion过渡就不用animation
- js操作animation的keyframe确实不是很方便,而且可能遭遇跨域问题,因此尽量能不用不用
- 如需要动态设置keyframe,建议动态构造新的style来覆盖旧的







