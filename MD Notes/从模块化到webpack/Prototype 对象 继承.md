#  #1. 创建对象









# Prototype





我们创建的 每个函数都有一个prototype (原型)属性, 这个属性是一个指针, 指向一个对象,而这个对象的用途是 包含可以由特定类型的所有实例共享的属性和方法. 如果按照字面(prototype)意思 理解, 那么prototype就是通过调用构造函数而创建的那个对象实例的原型对象. 



#  

使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法. 换句话说, 不必在构造函数中定义对象实例的信息.而是可以将这些信息直接添加到原型中.







#  

### constructor





创建了自定义的构造函数之后, 其**原型对象**默认只会取得construction 属性; 至于其他方法, 则都是从Object继承而来的. 当调用构造函数创建一个新实例后,该实例的内部将包含一个指针(内部属性), 指向构造函数的原型对象. 

**要明确的一点就是, 这个连接存在于实例与构造函数的原型对象之间,而不是存在于实例与构造函数之间**







#  

### 构造函数模式 + 原型模式



构造函数模式用于定义实例属性,而原型模式用于定义方法和共享的属性. 结果,每个实例都会有自己的一份实例属性的副本, 但同时又共享着 对方法的引用,最大限度的节省了内存.



目前是ECMAScript 中使用最广泛,认同度最高的一种创建自定义类型的方法. 这是用来定义引用类型的一种默认模式.



#  

###  **动态原型模式**









#  

###  **寄生构造函数模式**

构造函数在不返回值的情况下,默认会返回新对象实例.而通过在构造函数的 末尾添加一个return 语句, 可以重写调用构造函数时返回的值.





```
返回的对象与构造函数或者与构造函数的原型属性之间没有什么关系

也就是说,构造函数返回的对象与在构造函数外部创建的对象没有什么不同

为此,不能依赖instanceof 操作符来确定对象类型.
```











Notes:子类型有时候需要覆盖父类型的某个方法,或者需要添加父类型中不存在的某个方法. 不管怎样, 给原型添加方法的代码一定要放在代替原型的语句之后.



```javascript
function SuperType(){
  this.property = true;
}

SuperType.prototype.getSuperValue=function(){
  return this.property;
}

function SubType(){
  this.subproperty = false;
}

//继承了SuperType
SubType.prototype = new SuperType();

//添加新方法
SubType.prototype.getSubValue=function(){
  return this subproperty;
}


//重写父类型中的方法
SubType.prototype.getSuperValue =function(){
  return false;
}

var instance = new SubType();
console.log(instance.getSuperValue());

```







#  

<br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />

# #2 . 继承



ECMAScript 中描述了原型链的概念, 并将原型链作为实现继承的主要方法. 其基本思想是利用原型让一个引用类型继承另一个引用类型的属性和方法.









#  

### 2.2 借用构造函数(伪造对象/经典继承)



思想: **在子类的构造函数的内部调用超类型构造函数**.



函数只不过是在特定环境中执行代码的对象, 因此通过使用apply() 和 call() 方法也可以在(将来) 新创建的对象上 执行构造函数. 



借助构造函数有一个很大的优势, 即可以在子类型构造函数中向超类型构造函数传递参数.



```javascript
function SuperType2(name){
  this.name=name;
}

function SubType2(){
  //继承了SuperType 同时还传递了参数
  SuperType2.call(this,"wanglinzhizhi");

  //对象实例属性
  this.age=24;
}

var instance2 = new SubType2();
console.log(instance2.name);
console.log(instance2.age);
```



以上代码中的SuperType2 只接受一个参数name. 该参数会直接赋给一个属性.在SubType2 构造函数内部调用SuperType2构造函数时, 实际上是为了SubType 的实例设置了name属性. 为了确保SuperType2 构造函数不会重写子类型的属性, 可以在调用超类型的构造函数之后,再添加应该在子类型总定义的属性.







借用构造函数的**问题**.



如果仅仅是借用构造函数,那么也将无法避免构造函数模式存在的问题----方法都在构造函数中定义,因此函数复用无从谈起.而且在超类型的原型中定义的方法, 对子类型而言也是不可见的. 结果所有类型都只能使用构造函数模式.





#  

### 组合继承



思想: 将原型链和借用构造函数 的技术组合到一起. 思路是, 使用**原型链**实现对**原型属性和方法**的继承,使用**借用构造函数**来实现对**对象实例**属性的继承.  



这样,既通过在原型上定义方法实现了函数复用, 又能保证每个实例都有它自己的属性.

```javascript
function SuperType3(name){
  this.name=name;
  this.colors=["red","blue","green"];
}

SuperType3.prototype.sayName=function(){
  console.log(this.name);
}

function SubType33(name,age){
  //继承属性
  SuperType3.call(this, name);

  //对象实例的属性
  this.age=age;
}

//继承方法
SubType33.prototype =new SuperType3();
SubType33.prototype.constructor = SubType33;
SubType33.prototype.sayAge=function(){
  console.log(this.age);
}

var instance33=new SubType33("wanglinzhizhi",25);
instance33.colors.push("black");
console.log(instance33.colors);
instance33.sayName();
instance33.sayAge();

var instanc333 = new SubType33();
console.log(instanc333.colors);
instanc333.sayName();
instanc333.sayAge();
```



<br />

#  

###  原型式继承



```javascript
//借助原型,基于已有的对象创建新对象,同时还不必因此创建自定义类型.
function object(o){
  function F(){};
  F.prototype = o;
  return new F();
}

/**
  * 在object() 函数内部, 先创建一个临时性的构造函数, 然后将传入的对象作为这个构造函数的原型, 最后返回了这个临时类型的一个新实例.
  * 从本质上说, object() 对传入其中的对象执行了一次浅复制.
  *
  */

var person = {
 name :"wanglinzhizhi",
 friends:["luozhen","yuhui","chengdu"]
};

var anotherPerson =  object(person);
anotherPerson.name="wagnlinzh";
anotherPerson.friends.push("Rob");

var yetAnotherPerson=object(person);

yetAnotherPerson.name="Linda";
anotherPerson.friends.push("Barder");

console.log(person.friends);


/**
  *这种原型式继承, 要求你 必须有一个对象可以作为另一个对象的基础.
  *如果有这么一个对象的话, 可以把它传递给object() 函数, 然后再根据具体需求
  *对得到的对象加以修改即可
  */





/**
  * ES5 中新增了Object.create()方法. 规范了这种原型式继承. 这个方法接受两个参数:
  * 1. 用作新对象原型的对象
  * 2. 一个为新对象定义额外属性的对象.(可选)
  * 在传入一个参数的情况下,Object.create() 与object()方法的行为相同
  */


  var person = {
   name :"wanglinzhizhi",
   friends:["luozhen","yuhui","chengdu"]
  };

  var anotherPerson =  Object.create(person);
  anotherPerson.name="wagnlinzh";
  anotherPerson.friends.push("Rob");

  var yetAnotherPerson=Object.create(person);

  yetAnotherPerson.name="Linda";
  anotherPerson.friends.push("Barder");

  console.log(person.friends);








```















<br />

#  

### 寄生式继承



```javascript
/*寄生继承 与原型式继承 紧密相关. 寄生式继承的思路与 寄生构造函数和工厂模式类似, 即创建一个仅用于封装集成过程的函数, 改函数在内部以某种方式来增强对象
,最后再返回对象.*/


function object(o){
  function F(){};
  F.prototype = o;
  return new F();
}

function createAnother(original){
  var clone= object(original);

  //在原来original的基础上,增强对象
  clone.sayHi=function(){
    console.log("Hi! :)");
  }
  return clone;
}

/*
在主要考虑对象而不是自定义类型和构造函数的情况下, 寄生式继承也是一种有用的模式. 前面展示继承模式时使用的object() 函数不是必需的; 任何能够返回新对象的函数都能适用于此模式.


使用寄生模式来为对象添加函数,会由于不能做到函数复用而降低效率;这一点与构造函数模式相似.




*/
```






#  

### 寄生组合式继承





所谓寄生组合式继承,即通过**借用构造函数**来继承属性, 通过原型链的混成形式来继承方法.其背后的基本思想是:


不必为了指定子类型的原型而调用超类型的构造函数,我们需要的无非就是超类型原型的一个副本而已.  本质上,就是使用寄生式来继承超类型的原型, 然后将结果指定给子类型的原型.



```javascript
/*所谓寄生组合式继承,即通过借用构造函数来继承属性, 通过原型链的混成形式来继承方法.其背后的基本思想是:
  不必为了指定子类型的原型而调用超类型的构造函数,我们需要的无非就是超类型原型的一个副本而已.
  本质上,就是使用寄生式来继承超类型的原型, 然后将结果指定给子类型的原型
*/



function inheritPrototype(subType,superType){
  var prototype = Object(superType.prototype); //创建父类型原型的一个副本
  prototype.constructor = subType;//为创建的副本添加constructor 属性,从而弥补因重写原型而失去的默认的constructorshuxing .
  subType.prototype = prototype;//将新创建的对象(即副本) 赋值给子类型的原型.
}
//这样我们就可以调用inheritPrototype() 函数的语句, 去替代前面中为子类型原型赋值的语句 .

function SuperType(name){
  this.name=name;
  this.colors=["red","blue","green"];
}
SuperType.prototype.sayName=function(){
  console.log(this.name);
}

function SubType(name ,age){
  SuperType.call(this,name);

  this.age=age;
}

inheritPrototype(SubType,SuperType);

SubType.prototype.sayAge=function(){
  console.log(this.age);
}
```















