## Vue.js Notes

数据驱动DOM变化

尽量不要直接操作DOM







[计算属性的奥秘](http://cn.vuejs.org/guide/reactivity.html#u8BA1_u7B97_u5C5E_u6027_u7684_u5965_u79D8)



**计算属性**



你应该注意到 Vue.js 的计算属性**不是**简单的 getter。计算属性持续追踪它的响应依赖。在计算一个计算属性时，Vue.js 更新它的依赖列表并缓存结果，只有当其中一个依赖发生了变化，缓存的结果才无效。因此，只要依赖不发生变化，访问计算属性会直接返回缓存的结果，而不是调用 getter。为什么要缓存呢？假设我们有一个高耗计算属性 `A`，它要遍历一个巨型数组并做大量的计算。然后，可能有其它的计算属性依赖 `A`。如果没有缓存，我们将调用 `A` 的 getter 许多次，超过必要次数。由于计算属性被缓存了，在访问它时 getter 不总是被调用。

```
var vm = new Vue({
  data: {
    msg: 'hi'
  },
  computed: {
    example: function () {
      return Date.now() + this.msg
    }
  }
})
```





计算属性 `example` 只有一个依赖：`vm.msg`。`Date.now()` **不是** 响应依赖，因为它跟 Vue 的数据观察系统无关。因而，在访问 `vm.example` 时将发现时间戳不变，除非 `vm.msg` 变了。







有时希望 getter 不改变原有的行为，每次访问 `vm.example` 时都调用 getter。这时可以为指定的计算属性关闭缓存：

```
computed: {
  example: {
    cache: false,
    get: function () {
      return Date.now() + this.msg
    }
  }
}
```



现在每次访问 `vm.example` 时，时间戳都是新的。**但是，只是在 JavaScript 中访问是这样的；数据绑定仍是依赖驱动的。**如果在模块中这样绑定计算属性 `{{example}}`，只有响应依赖发生变化时才更新 DOM。

