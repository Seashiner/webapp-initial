### 项目的初始化
    1. 使用@vue/cli创建项目
            vue -V
            vue create webapp
            npm run serve

    2. 添加vue.config.js配置文件,对脚手架的环境进行一些配置
            module.exports={
                lintOnSave:false,
                devServer:{
                    open:true
                }
            }

    3. 安装哈士奇 & git操作
            npm i husky -D

            定义git的钩子: 修改package.json文件
                "husky":{
                    "hooks":{
                      "pre-commit":"npm run lint"
                    }
                }

            git 最基本的操作
                git status
                git add ./
                git commit -m "xx"
                git push

    4. 搭建vue的生态圈
        mock & axios
            静态mock:
               //引入静态的json数据

                const {seller,goods,ratings} = require("./data/data.json")

                module.exports={
                    lintOnSave:false,
                    devServer:{
                        open:true,
                        before: function(app) {
                            //app 就是我们express的核心对象  可以用来注册一个后台路由
                            app.get('/api/seller', function(req, res) {
                                res.json({seller});
                            });
                            app.get('/api/goods', function(req, res) {
                                res.json({goods});
                            });
                            app.get('/api/ratings', function(req, res) {
                                res.json({ratings});
                            });
                        }
                    }
                }

            axios
                npm i axios -s
                在app.vue中进行测试
                    async mounted(){
                        const seller = await axios.get("/api/seller");
                        console.log(seller)
                    }

        vue-router
            安装包:npm i vue-router -s
            定义路由: 路径与vue组件的映射关系
            定义路由器 :初始化一个路由器对象
            将路由交给路由器管理
            将路由器交给vue管理
            将vue-router注册为vue的插件(会在router.js中进行)
            为命中的路由选取一个渲染的位置

        vuex
            安装包:npm i vuex -s
            将vuex注册为vue的插件(必须在仓库创建之前完成)
            定义仓库:初始化一个仓库对象
                将仓库存数据的地方,仓库中可以修改数据的工具全部初始化好
            将仓库交给vue管理

    5. 为pages,components配别名
            //data就是data.json对应的js对象
            const {seller,goods,ratings} = require("./data/data.json");
            const path = require('path')
            function resolve (dir) {
                return path.join(__dirname, dir)
            }
            module.exports={
                lintOnSave:false,
                devServer:{
                    open:true,
                    before: function(app) {
                        //app 就是我们express的核心对象  可以用来注册一个后台路由
                        app.get('/api/seller', function(req, res) {
                            res.json({seller});
                        });
                        app.get('/api/goods', function(req, res) {
                            res.json({goods});
                        });
                        app.get('/api/ratings', function(req, res) {
                            res.json({ratings});
                        });
                    }
                },
                //配置别名
                configureWebpack:{
                    resolve: {
                        alias: {
                            'pages': resolve('src/pages'),
                            'components': resolve('src/components'),
                        }
                    }
                }
            }

------------------


### 移动端页面的准备工作
    1. 引入reset.css
    2. 加入viewport标签(创建理想视口)
         <meta name="viewport"
                  content="width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no">
    3. 解决click在移动端300ms的延迟:引入fastclick库
        <script src="https://as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>
        if ('addEventListener' in document) {
            document.addEventListener('DOMContentLoaded', function() {
                FastClick.attach(document.body);
            }, false);
        }
    4.禁止事件的默认行为
        var app = document.querySelector("#app");
        app.addEventListener("touchstart",(ev)=>{
            ev = ev || event;
            ev.preventDefault();
        })
    5.选择一个css预处理器
        less      : npm i less less-loader -s
        sass
        stylus(√) : npm i stylus stylus-loader -s

        <style scoped lang="stylus" rel="stylesheet/stylus">

        </style>
        
    6.引入字体图标
        UI制作符合自己公司风格的矢量图;
        去iconfont站点借阿里的矢量图
        前端工程师拿到矢量图 使用iconmoon站点 将矢量图与对应的字符进行一一绑定
        生成一套字体;
        再结合自定义字体技术@font-face 在项目中使用!!!

    ```js
    自定义字体：
    <style>
        /*如果你想百分比保证所有的用户使用的字体都是统一的,那就要使用自定义字体*/
        /*定义字体*/
        /*业务驱动*/
        @font-face{
            font-family: "sun";
            src: url("./font/AGENCYR.TTF"),
                 url("./font/AGENCYB.TTF");
        }
        #app{
            font-size: 30px;
            font-family: "sun";
        }
    </style>
    ```

    ```js
        iconmoon：

        在 main.js 中引入 iconmoon.styl:
        import '@/common/stylus/iconmoon.styl'

        从iconmoon网站下载之后，只留下fonts和style.css
    ```

    7. 挑选一个适配方案
        viewport
        rem
        不适配(√)

    8. 让包裹区域充当视口

        #app{
            height:100%;
            width:100%;
            overflow:hidden
        }

    9. 配置别名
        见上文 vue.config.js 的配置

------------------
### vuex

```js
state.js:

export default {
  seller:{},
}
```

```js
mutation_typies.js:

export const GETSELLER = 'getSeller'
```

```js
mutations.js:

import {GETSELLER} from "@/store/mutation_typies.js"

export default {
  [GETSELLER](state,seller){
    state.seller = seller
  }
}
```

```js
actions.js:

import axios from '@/http/http'
import {GETSELLER} from "@/store/mutation_typies.js"

export default {
    async [GETSELLER](store){
    const result = await axios.get("/api/seller")
    const {code,data} = result
    if(code===200){
      store.commit(GETSELLER,data)
    }
  }
}
```

```js
seller.vue

import {mapState,mapActions} from "vuex";
import {GETGOODS} from "@/store/mutation_typies.js";
computed: {
   ...mapState(['seller'])
},
methods:{
    ...mapActions([GETSELLER])
},
mounted() {
   this[GETSELLER]()
}

```

```js
import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import state from '@/store/state.js'
import getters from '@/store/getters.js'
import mutations from '@/store/mutations.js'
import actions from '@/store/actions.js'
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions
})
```

------------------
### vue-router

```js
routes.js

import goods from '@/pages/goods/goods'
import ratings from '@/pages/ratings/ratings'
import seller from '@/pages/seller/seller'

export default [
  {
    path:'/',
    redirect:'/goods'
  },
  {
    path:'/goods',
    component:goods
  },
  {
    path:'/ratings',
    component:ratings
  },
  {
    path:'/seller',
    component:seller
  }
]
```

```js
router.js

import VueRouter from 'vue-router'
import routes from '../routes/routes'
import Vue from 'vue'
Vue.use(VueRouter)

export default new VueRouter({
  routes,
  mode: 'history'
})
```

------------------

### 滑屏库

文档 : https://ustbhuangyi.github.io/better-scroll/doc/zh-hans

npm i better-scroll@1.15.2 -S

```js
import BScroll from 'better-scroll'

 mounted() {
   let leftScroll = new BScroll(this.$refs.left)
   let rightScroll = new BScroll(this.$refs.right)
 },
```

### 基本滑屏效果
```js
    //左侧包裹区域
    this.leftScroll = new BScroll(this.$refs.left)
    //右侧包裹区域
    this.rightScroll = new BScroll(this.$refs.right,{probeType:3})

```

### 右侧内容滑到哪个模块，左侧哪个模块就处于选中状态

1、定义两个data数据：右侧模块滑动时记录滚动的坐标scrollY、每个商品类别的坐标位置tops

```js
initScroll(){
    this.$nextTick(()=>{
      //左侧包裹区域
      this.leftScroll = new BScroll(this.$refs.left)
      //右侧包裹区域
      this.rightScroll = new BScroll(this.$refs.right,{probeType:3})
      //右侧滚动的坐标
      this.rightScroll.on('scroll',({x,y})=>{
        this.scrollY = Math.abs(y)
      })
    })
}
```
```js
//将每个商品类别所在的坐标记录下来，放在数组中
initTop(){
    this.$nextTick(()=>{
        //从DOM中提取的数组是伪数组    
        let goodList = this.$refs.goodList
        let goods = goodList.children

        let top = 0
        let tops = [top]
        //先将伪数组转换成真数组，累加 offsetHeight
        Array.from(goods).forEach((good)=>{
        top += good.offsetHeight
        tops.push(top)
        })
        this.tops = tops
    })
}
```
```js
//通过滚动的实时位置，看在top的哪个区间，计算出index
currentIndex(){
    let {tops,scrollY} = this
    let inde = tops.findIndex((top,index)=>{
    return scrollY >= top && scrollY < tops[index+1]
    })
    return inde
},
```

### 右侧内容滑到哪个模块，左侧哪个模块就处于选中状态,并尽可能滚动到顶部

通过scrollToElement方法，滚动到想去的元素。

将 leftScroll/rightScroll 放到实例上，方便使用

```js
//让元素尽量滑到顶部
let targetNode = this.$refs.menulist && this.$refs.menulist.children[inde]
this.leftScroll && this.leftScroll.scrollToElement(targetNode,300)
```

------------------
### 评价页
#### 过滤器
1、npm install --save moment

2、
```js
components/filters/index.js:

/*
自定义过滤器模块
 */
import moment from 'moment'
import Vue from 'vue'

Vue.filter('dateString', function (value, format) {
    return moment(value).format(format || 'YYYY-MM-DD HH:mm:ss')
})
```
3、注册全局过滤器
```js
index.js:

import './filters/index.js'
```
4、使用
{{xxxx | dataString}}
------------------
### 商家页