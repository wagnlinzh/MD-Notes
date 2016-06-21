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
















function Supertype1(){
  this.color=["red","blue","green"];
}

function SubType1(){

}

SubType1.prototype=new Supertype1();


var instance1=new SubType1();
instance1.color.push("black")
console.log(instance1.color);


var instance2=new SubType1();
console.log(instance2.color);





//借用继承
function Supertype1(){
  this.color=["red","blue","green"];
}

function SubType1(){

  Supertype1.call(this);
  //子类型构造函数的内部调用超类型函数. 通过使用call()方法(或apply()方法也可以), 我们实际上是在(未来将要)新创建的SubType 实例(对象)的环境下 调用了SuperType构造函数. 这样一来,就会在新SupType 对象上执行SuperType()函数中定义的所有对象初始化代码. 结果,SubType 的每个实例就都会具有自己的colors 属性的副本了.
}

SubType1.prototype=new Supertype1();


var instance1=new SubType1();
instance1.color.push("black")
console.log(instance1.color);


var instance2=new SubType1();
console.log(instance2.color);









function SuperType2(name){
  this.name=name;
}

function SubType2(){
  //继承了SuperType 同时还传递了参数
  SuperType2.call(this,"wanglinzhizhi");

  //对象实例属性
  this.age=29;
}

var instance2 = new SubType2();
console.log(instance2.name);
console.log(instance2.age);




//组合继承


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































// 原型式继承















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
















//寄生式继承
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


















// 寄生组合式继承
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
