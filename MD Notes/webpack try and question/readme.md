## webpack 踩坑的路上



-  css-loader?moudle是个好东西,但是对没有设置的来说,其他的全都无效了.... 怎么解决..

详见main6.jsx

阮一峰的demo 从main7 中开始讲插件



-- 



- [UglifyJs Plugin]


为了方便之后的测试, 我决定把这个注释掉.





--





-  还有一个问题,测试不方便,因为模拟器里面的不是真是位置.

webpack-dev-server之后东西都放在了head中,样式,and so on 不好处理.好像需要个map神马的.



--






-  main13 添加之后,刚开始出现了问题. main1,2,3..7 都无法正常加载.

将mian13和vendors 放到最前面之后,问题解决.

貌似和添加顺序有关.具体原因不详.

  ProvidePlugin 这个可以理解为全局变量. 不需要require.就能够全局使用. 详见main1302 









--

在webpack hash 化之后怎么定位.

定位定位,定位的问题.