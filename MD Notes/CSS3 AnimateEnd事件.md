## CSS3 AnimateEnd 事件

```html
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style> 
#myD{
    margin: 25px;
    width: 550px;
    height: 100px;
    background: orange;
    position: relative;
    font-size: 20px;
}
/* Chrome, Safari, Opera */
@-webkit-keyframes mymove {
    from {top: 0px;}
    to {top: 200px;}
}

@keyframes mymove {
    from {top: 0px;}
    to {top: 200px;}
}
</style>
</head>
<body>
<p>使用addEventListener()方法给div元素添加"animationstart事件、animationiteration事件、animationend事件</p>
<div id="myD" onclick="myFc()">点击这里开始播放动画</div>

</body>
  
  
  
  <script>
var x = document.getElementById("myD");
// 使用JavaScript播放动画
function myFc() {
    x.style.WebkitAnimation = "mymove 4s 2"; // 用于Chrome、 Safari、 Opera浏览器
    x.style.animation = "mymove 4s 2";       // 标准语法
    }
// Chrome、 Safari、 Opera
x.addEventListener("webkitAnimationStart", myStartFunction);
x.addEventListener("webkitAnimationIteration", myRepeatFunction);
x.addEventListener("webkitAnimationEnd", myEndFunction);
// 标准语法
x.addEventListener("animationstart", myStartFunction);
x.addEventListener("animationiteration", myRepeatFunction);
x.addEventListener("animationend", myEndFunction);
function myStartFunction() {
    this.innerHTML = "触发了animationstart事件 - 开始播放动画";
    this.style.backgroundColor = "pink";
}
function myRepeatFunction() {
    this.innerHTML = "触发了animationiteration事件 -动画重复播放了！";
    this.style.backgroundColor = "lightblue";
}
function myEndFunction() {
    this.innerHTML = "触发了animationend event occured -动画播放完毕";
    this.style.backgroundColor = "lightgray";
}
</script>
  
</html>
```

