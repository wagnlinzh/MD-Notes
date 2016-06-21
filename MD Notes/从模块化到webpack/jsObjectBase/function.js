var functionName=function(arg0,arg1,arg2){
  //body
}


/*
  创建一个函数并赋值给变量functionName. 这种情况下创建的函数叫做匿名函数(anonymous function), 因为function 关键字后面没有标识符.(匿名函数有时候也叫做阿姆达函数). 宁函数的name 属性是空字符串.
*/



function createComparisonFucntion(prototypeName){
  return function(object1,object2){
    var value1=object1[prototypeName];
    var value2=object2[prototypeName];
    if(value1 < value2){
      return -1;
    }else if(value1 > value2){
      return 1;
    }else{
      return 0;
    }
  }
}







//递归
function factorial (num){
  if (num<1) {
    return 1;
  } else {
    return num*factorial(num-1);
  }
}

var anotherFactorial = factorial; //赋值过去的是引用, 浅复制
factorial=null;
console.log(anotherFactorial(4));




// 递归  callee

function factorial (num){
  if (num<1) {
    return 1;
  } else {
    return num*arguments.callee(num-1);
  }
}

var anotherFactorial = factorial;
factorial=null;
console.log(anotherFactorial(4));

/*
  arguments.callee 是一个指向正在执行的函数的指针. 因此可以用它来实现对函数的递归调用

  通过使用arguments.callee可以替代函数名,可以确保无论怎样调用函数都不会出问题. 因此,在编写递归函数时, 使用argument.callee 总比使用函数名更保险.

  但在严格模式下,不能通过脚本访问arguments.callee, 访问这个属性会导致错误. 不过,可以使用命名函数表达式来达成相同的结果.
*/


// 递归  use  strict
var factorial=(function f(num){
  if(num<=1){
    return 1;
  }else{
    return num*f(num-1);
  }
});

var anotherFactorial = factorial;
factorial=null;
console.log(anotherFactorial(4));

/*
  以上代码创建了一个名为f() 的命名函数表达式, 然后将它赋值给变量factorial . 即便把函数赋值给了另一个变量, 函数的名字f依然有效.所以递归调用照样能正确完成. 这种方式在严格模式和非严格模式中都行得通.
*/




//闭包
//闭包指 有权访问另一个函数作用域中的变量的函数. 创建闭包的常见方法, 就是在一个函数内部创建另一个函数




function compare(value1,value2){
  if (value1 < value2) {
    return -1;
  }else if(value1> value2){
    return 1;
  }else{
    return 0;
  }
}


var result = compare(5,10);
/***
  * 以上代码先定义了compare() 函数 , 然后又在全局作用域中调用了它. 当调用compare() 时,会创建一个包含arguments, value1 和value2 的活动对象. 全局执行环境的变量对象(包含result ,和compare) 在comprase 执行环境中则处于第二位.
  *
  * 后台的每个执行环境都有一个表示变量的对象---- 变量对象. 全局环境的变量对象始终存在, 而 像compare() 函数这样的局部环境的变量对象,则只在函数执行的过程中存在.
  *
  */








//闭包和变量
function createFunctions(){
  var result= new Array();

  for (var i = 0; i < 10; i++) {
    result[i] = function(){
      return i;
    };
  }
  // console.log(result);
  return result;

}
var resultG= createFunctions();
resultG[2](); //10
resultG[3](); //10
resultG[9](); //10

/* 这个函数会返回一个函数数组.
  这个函数表面上看,似乎每个函数都应该返回自己的索引值, 即位置0 的函数返回0 , 位置1 的函数返回1, 以此类推. 但实际上, 每个函数都返回10



  因为每个函数的作用域中都保存着createFunctions() 函数的活动对象,所以他们引用的都是同一个变量i. 当createFunctions()函数返回后, 变量i的值是10. 此时,每个函数都引用这保存变量i 的 同一个变量对象, 所以在每个函数内部i的值都是10.

*/


function createFunctions2(){
  var result= new Array();

  for (var i = 0; i < 10; i++) {
    result[i]= function(num){
      return function(){
        return num;
      }
    console.log(result[i]);
    }(i)
  }
  return result;
}

var resultG= createFunctions2();
resultG[2](); //2
resultG[3](); //3
resultG[9](); //9


//wanglinzhizhi ways 这种方法表达的不是那个意思
function createFunctions3(){
  var result= new Array();

  for (var i = 0; i < 10; i++) {
    result[i] = (function(){
      return i;
    };
    console.log(result[i]);
  })();

  return result;
}

var resultG= createFunctions3();










/*

# this 对象

this对象在运行时基于函数的执行环境绑定的. 在全局函数中,this 等于window, 而当函数被某个对象的方法调用时,this等于那个对象. 不过,匿名函数的执行环境具有全局性, 因此其this 对象通常指向window .

Notes: 在通过call() huozhe apply() 改变函数执行环境的情况下, this就会指向其他对象.

*/


var name="the global window";

var object1={
  name: "my Object",

  getNameFunc: function(){
    return function(){
      return this.name;

    };
  }
};

console.log(object1.getNameFunc()());




//
var name="THe Windows";

var object2={
  name:"My Object2",

  getNameFunc2: function(){
    var that=this;
    return function(){
      return that.name;
    }
  }
}

console.log(object2.getNameFunc2()());


/*
  每个函数在调用时都会自动获取两个特殊变量: this & arguments . 内部函数在搜索这两个变量时, 只会搜索到其活动对象为止, 因此永远不可能 直接访问外部函数中的这两个变量. 不过, 把外部作用域中的this对象保存在一个闭包能够访问到的 变量里, 就可以让闭包访问该对象了.
*/

var name="The windows3";

var object3={

  name:"My Object3",

  getName: function(){
    return this.name;
  }

};


object3.getName(); //"My Object3"
(object3.getName)(); // "My Object3"
(object3.getName = object3.getName)(); // 先执行一个赋值语句,然后再调用赋值后的结果. 因为赋值表达式是函数本省, 所以this的值不能得到维持. 结果就返回了"The Windows3"


//log 上面的 那个object3. 其实可以测出来,写错了,在对象中多了一个分号






//内存泄露

//IE 9
//闭包在IE9 以前的版本中会导致一些问题.具体说来,就是闭包的作用域链中保存着一个HTML元素, 那么意味着该元素将无法撤销.

function assignHandler(){
  var element = document.getElementById("someElement");
  element.onclick=function(){
    console.log(element.id);
  }
}

/*
  以上代码创建了一个作为element 元素时间处理程序的闭包, 而这个闭包则又创建了一个循环引用.由于匿名函数保存了一个对assignHadler() 的活动对象的引用, 因此就会导致无法减少element的引用数. 只要匿名函数存在, element 的引用数减少为1 . 因此它所占用的内存就永远不会被回收.

  解决方案,见下
*/



function assignHandlerUpdate(){
  var element = document.getElementById("someElement");
  var id= element.id;

  element.onclick=function(){
    console.log(id);
  }
  element=null;
}






/*
 在匿名函数中定义的任何变量, 都会在执行结束时被销毁.

这种技术常在全局作用域中被用在函数外部, 从而限制向全局作用域中添加过多的变量和函数. 一般来说, 我们应该尽量少向全局作用域中添加变量和函数.

在一个由很多开发人员共同参与的大型应用程序中, 过多的全局变量和函数很容易导致命名冲突. 而通过创建私有作用域, 每个开发人员既可以使用自己的变量
 又不必担心搞乱全局作用域

*/
(function(){
var now=new Date();
if (now.getMonth() == 0 && now.getDate() ==1) {
  console.log("happy New years!");
}
})();



// # 私有变量
/*
  严格来讲,Javascript 中没有私有成员的概念: 所有对象属性都是共有的. 不过,倒是有一个私有变量的概念.任何在函数中定义的变量, 都可以认为是私有变量. 因为不能在函数的外部访问这些变量. 私有变量包括函数的参数, 局部变量, 和在函数内部定义的其他函数.

*/


/*
  私有变量, 在函数的外部不能访问它们. 如果再这个函数内部创建一个闭包, 那么闭包通过自己的 作用域也可以访问这些变量. 而利用这一点,就可以创建用于访问私有变量的公有方法.

  我们把有权访问私有变量和私有函数的公有方法称为特权方法(privileged method).


有两种在对象上创建特权方法的方式.

- 第一种 是在构造函数中定义特权方法 -> 类Java中的面向对象思想
- 第二种 使用静态私有变量来实现特权方法

*/

function MyObject(){
  //私有变量和私有方法
  var privateVariable=10;
  function privateFunction(){
    return false;
  }

  //特权方法
  this.publicMethod = function(){
    privateVariable++;
    return privateFunction();
  };
}


// # 私有变量实现特权方法
(function(){

  //私有变量和私有函数
  var privateVariable= 10;
  function privateFunction(){
    return false;
  }

  //构造函数
  MyObject = function(){  //  记住 :) 初始化未经申明的变量,总是会创建一个全局变量. -> 能够在私有作用域外被访问到.但也要知道, 在严格模式下给未经声明的变量赋值会导致错误.

  };

  // 公有/特权方法
  MyObject.prototype.publicMethod=function(){
    privateVariable++;
    return privateFunction();
  }

})()


/*
  这个模式与在构造函数中定义特权方法的主要区别, 就在于私有变量和函数时由实例共享的 . 由于特权方法在原型上定义的, 因此所有实例都使用同一个函数.
  而这个特权方法, 作为一个闭包, 总是保存着对包含作用域的引用.

*/
(function(){
  var  name="";
  Person= function(value){
    name=value;
  }
  Person.prototype.getName=function(){
    return name;
  }
  Person.prototype.setName = function(value){
    name=value;
  };
})()

var person1=new Person("wanglinzhzihi");

console.log(person1.getName());

person1.setName("wagnlinzhizhi2");
console.log(person1.getName());

var person2=new Person("luozhen");
console.log(person2.getName());

person2.setName("luozhenluozhen2");
console.log(person1.getName());
console.log(person2.getName());


/*
  在这种模式下, 变量name 就变成了一个静态的, 由所有实例共享的属性. 也就是说, 在一个实例上调用setName() 会影响所有的实例. 而调用setName() 或新建一个Person 实例都会富裕name属性一个新值. 结果就是 所有实例都会返回相同的值.

  以这种方式创建静态私有变量会因为使用原型而增加代码复用, 但每个实例都没有自己的 私有变量. 到底是使用实例变量,还是静态私有变量, 最终还是要视你的情况而定.
*/




//# 模块模式
/*
  模块模式 则为单例创建了私有变量和特权方法. 所谓单例(singleton), 指的是只有一个实例的对象.
*/
var singleton={
  name : value,
  method:function(){
    //todo
  }
}
// 模块模式通过为单例添加私有变量和特权方法使其得到增强,其形式如下:
var singleton=function(){
  //私有变量和私有函数
  var privateVariable= 10;

  function privateFunction(){
    return false;
  }


  // 特权和公有方法及属性
  return {
    publicProperty:true,

    publicMethod:function(){
      privateVariable++;
      return privateFunction();
    }
  };
}();








//# 增强的模块模式 (增强 -> 扩展)

var singleton= function(){
  //私有变量和私有函数
  //私有变量和私有函数
  var privateVariable= 10;

  function privateFunction(){
    return false;
  }

  //创建对象 增强CustomType,添加CustomType的特性
  var object=new CustomType();

  //添加特权和公有属性和方法.
  object.publicProperty=true;
  object.publicMethod=function(){
    privateVariable++;
    return privateFunction();
  }

  //返回这个对象.
  return object;
}
