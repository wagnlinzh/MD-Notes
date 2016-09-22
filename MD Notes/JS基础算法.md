```
layou: post
title: "JavaScript 基础算法"
```



## JavaScript 基础算法





<hr />

### querystring

解析url

```javascript
function queryString(url){
	if( url.indexOf('?') > -1 ){
		var arr = url.split('?');											//split 将url分割为两项.以'http://baidu.com?a=b&c=d;'为例,即["http://baidu.com", "a=b&c=d;"]

		var queryString = arr[1];											//获取arr[1]即获取到参数部分,即为queryString

		var items = queryString.length ? queryString.split('&') : [];		//以&为分割,将queryString分割为name,value串数组存放在items中.


		var queryObj = {};

		var itemArr,name,value;
		for(var i=0,len=items.length;i<len;i++){

			itemArr = items[i].split('=');
			name = decodeURIComponent(itemArr[0]);
			value = decodeURIComponent(itemArr[1]);

			if(name.length){												//if是为了防止 name为空的情况
				queryObj[name] = value;										//设置对象的属性
			}
		}

		return queryObj;

	}

}
var url = 'http://baidu.com?a=100&c=1034';
console.log(JSON.stringify(getQueryString(url)));

//其中有个需要注意的地方就是URL里面的querystring都是经过编码了的， 所以在取值的时候要先解码decodeURIComponent()
```





<hr />

###  2

为Array原型中添加一个去重的操作

```javascript


// way1
Array.prototype.uniqiue=function(arr){
  arr.sort();
  var i=1,
      j=0;
      length=arr.length;
      arrTemp=[];
      arrTemp=arrp[0];
    while(i<length){
      if(arrTemp[j]==arr[i]){
        i++;
      }else{
        arrTemp[++j]=arr[i++];
      }
    }

    return arrTemp;
}



// way2
Array.prototype.uniqiue=function(arr){
  var arrTemp=[];
  var i=0;
  while(i<arr.length){
    buf=arr[i];
    var j=0;

    while(j<arrTemp.length){
      if (arrTemp[j] == buf) {
        break;
      }
      j++;
    }

    if (j==arrTemp.length) {
      arrTemp.push(buf);
    }

    i++;

  }

  return arrTemp;
}
```



这道题是阿里某一年前端的面试题. 其实在现实使用中一般不会做这么大的动作去改变Array对象的原型,因为动作太大,保不齐哪里会不会出什么问题. (一言以蔽之, 所有对全局的操作都需要慎重再慎重.) 这道题的主要考点我觉得有两个,一个是对js原型链的理解.另一个是对数组去重的基本算法的考察.解决这道题的方法有很多种算法, 在思考的过程中要兼顾性能最优.



### Fibonacci

真是在那儿都遇到它.(这其实已经跟JS无关了). 之前的在一篇文章中提到过它的作用(当时比较的是二分查找和fib查找之间的性能比较.) 代码不贴了,可以在那篇文章中找到.两点需要注意:

1. 打死都不要用递归, 是典型的2^n类型. 会吃光你所有的性能. 无论你的机器性能有多强
2. 用迭代代替递归. 用三个参数进行叠加就可以了.(甚至两个). 也不要用数组, 三个临时变量或者两个临时变量就够了.(^_^)



再提一点, 为什么不建议用数组,而采用三个临时变量呢? 原因在于: 数组是存放在内存的栈中, 你看到栈会觉得已经够快了是吧?是挺快的. 但是呢, 临时变量存放在哪儿呢? 寄存器中. 现在知道这个区别了吗?  这个结论的来源是<深入理解计算机系统>, 有兴趣的同学可以去了解下.



### insertAfter

```javascript
function insertAfter(newEl,targetNode){//在目标节点的后面插入节点
	var parentNode=targetNode.parentNode;
	if (parentNode.lashChild==targetNode) {
		parentNode.appendChild(newEl);
	}else{
		parentNode.insertBefore(newEl,targetNode.nextSubling);
	}
}
```

基本DOM操作



### sort

```javascript
function sortNmu(a,b) {
	return a-b;
}
var myarr=[];
myarr.sort(sortNmu);
```

会快排么?

(^_^)



###　sum

求sum(),参数的长度无限制

```javascript
/*
// Should equal 15
sum(1, 2, 3, 4, 5);
// Should equal 0
sum(5, null, -5);
// Should equal 10
sum('1.0', false, 1, true, 1, 'A', 1, 'B', 1, 'C', 1, 'D', 1,
  'E', 1, 'F', 1, 'G', 1);
// Should equal 0.3, not 0.30000000000000004
sum(0.1, 0.2);
*/

function sum() {
    var nResult = 0;
    for (var i = 0, l = arguments.length; i < l; i++) {
        nResult += window.parseFloat(arguments[i]) || 0;
    }

    return nResult.toFixed(3) * 1000 / 1000;
}
```

这好像也是阿里某年的一道笔试题. 这道题我觉得有意思的地方在于对于各种异常输入情况的处理,以及对结果的处理.另外对于js基础部分是对arguments 的了解.





###　正则匹配

```javascript
/^(\w+[_|\.|\_]?)*(\w)+@(\w+[_|\.|\_])*(\w)+\.[a-zA-z]{2,4}$/.test("wanglinzhizhi@hotmail.com");
```





### loading.....





晚安,地球
