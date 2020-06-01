# 使用说明
- 需要引入 base.css / base.js / transform.js
- html结构
```html
<div id="wrap">
    <div class = 'nav'></div>
</div>
```
- js结构

`nav.init({wrap,arr})`

配置对象的wrap属性：模拟包含快的元素
配置对象的arr属性：导航条的名称，数组类型

# 功能点

- 布局

  滑屏区域 + 滑屏块

  滑屏区域：占视口100%宽

  滑屏块：需要被内容撑开，且内容不换行

  white-space:nowrap ———— 使其子元素（行内元素和行内块元素）不换行

- 基础可拖拽效果

- 手动滑屏过渡效果 + 橡皮筋效果

  橡皮筋效果 在 touchmove 阶段 滑出起始点后，在 touchend 阶段 回到起始点：

  需要分别求出滑块滑出的距离（ 相距 滑屏区域的左/右边界————起始点），并根据 块滑出的距离 计算一个缩小的比例，让手指滑动时，滑块*scale,滑块滑动的距离与手指滑动距离成反比
  ```js
  var scale = document.documentElement.clientWidth /( (document.documentElement.clientWidth + touchDis)*2)

  eleE = eleX + touchDis*scale
  ```

- 快速滑屏 + 橡皮筋效果

  快速滑屏 在 touchend 阶段发生

  根据手指滑动的距离与手指移动的时间，求出手指移动的速度，若速度的绝对值大于0.5，则开启快速滑屏：速度越大，滑块最终滑动的距离（eleE）越大

  `eleE = eleE +speed*400`

  在快速滑屏是若要有橡皮筋的效果，需要给transition加上 贝塞尔曲线

- 3d 硬件加速

给滑块开启3d

`transform.css(list,'translateZ',0)`
















