## ie8的 奇怪的地方.



- 你对其元素设置z-index值,他会按照其父元素的位置确定而不是他本身的位置. **人家拼的是爹.**

- grba 我们的ie8 是不支持的.



  怎么办呢? 这样:

  ```css
  <span style="white-space:pre">	
  </span>
  background: rgba(255,255,255,.1);        filter:progid:DXImageTransform.Microsoft.gradient(startColorstr=#19ffffff,endColorstr=#19ffffff);
  ```

  ​

