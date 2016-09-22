## 移动性能

#### 要考虑`Android`低端机与`2G`网络场景下性能 注意！



发布前必要检查项

- 所有图片必须有进行过压缩
- 考虑适度的有损压缩，如转化为80%质量的jpg图片
- 考虑把大图切成多张小图，常见在banner图过大的场景

加载性能优化, 达到打开足够快

- 数据离线化，考虑将数据缓存在 localStorage
- 初始请求资源数 `< 4` 注意！
- 图片使用CSS Sprites 或 DataURI
- 外链 CSS 中避免 @import 引入
- 考虑内嵌小型的静态资源内容
- 初始请求资源gzip后总体积 `< 50kb`
- 静态资源(HTML/CSS/JS/Image)是否优化压缩？
- 避免打包大型类库
- 确保接入层已开启Gzip压缩（考虑提升Gzip级别，使用CPU开销换取加载时间） 注意！
- 尽量使用CSS3代替图片
- 初始首屏之外的静态资源（JS/CSS）延迟加载 注意！
- 初始首屏之外的图片资源按需加载（判断可视区域） 注意！
- 单页面应用(SPA)考虑延迟加载非首屏业务模块
- 开启Keep-Alive链路复用

运行性能优化, 达到操作足够流畅

- 避免 iOS 300+ms 点击延时问题 注意！
- 缓存 DOM 选择与计算
- 避免触发页面重绘的操作
- Debounce连续触发的事件(scroll / resize / touchmove等)，避免高频繁触发执行 注意！
- 尽可能使用事件代理，避免批量绑定事件
- 使用CSS3动画代替JS动画
- 避免在低端机上使用大量CSS3渐变阴影效果，可考虑降级效果来提升流畅度
- HTML结构层级保持足够简单
- 尽能少的使用CSS高级选择器与通配选择器
- Keep it simple

在线性能检测评定工具使用指南

- 访问 [Google PageSpeed](http://developers.google.com/speed/pagespeed/insights/) 在线评定网站
- 在地址栏输入目标URL地址，点击分析按钮开始检测
- 按 PageSpeed 分析出的建议进行优化，优先解决红色类别的问题

推荐阅读

- [移动WEB性能](http://www.webperformancetoday.com/tag/mobile-web-performance/)
- [优化WEB缓存](https://developers.google.com/speed/docs/best-practices/caching)
- [最小化RTT次数](https://developers.google.com/speed/docs/best-practices/rtt)
- [最小化请求负载](https://developers.google.com/speed/docs/best-practices/payload)
- [优化浏览器渲染](https://developers.google.com/speed/docs/best-practices/rendering)