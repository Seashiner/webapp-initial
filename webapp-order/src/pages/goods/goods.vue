<template>
  <div class='goods'>
    <div class='content'>
      <div class='left' ref='left'>
        <ul class="menuList" ref="menulist">
          <li class="menu" :class="{active:currentIndex===index}" v-for="(good, index) in goods" :key="index" @click='handleCForMenu(index)'>
            <v-icon class='icon' v-if="good.type" size='3' :type="good.type"></v-icon>
            {{good.name}}
          </li>
        </ul>
      </div>
      <div class='right' ref='right'>
        <ul class="goodList" ref="goodList">
          <li class="good" v-for="(good, index) in goods" :key="index">
            <h2 class="goodName">{{good.name}}</h2>
            <ul class="foodlist">
              <li class="foodWrap" v-for="(food, index) in good.foods" :key="index">
                <v-food :food = food></v-food>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
    
    <v-cart class="cartWrap" :selectedFoods="selectedFoods"></v-cart>
  </div>
</template>

<script>
import food from 'components/food/food'
import icon from 'components/icon/icon'
import cart from 'components/cart/cart'
import {mapState,mapActions} from 'vuex'
import {GETGOODS} from "@/store/mutation_typies.js";
import BScroll from 'better-scroll'

export default {
 name: 'goods',
 data(){
   return{
     tops:[],
     scrollY:0
   }
 },
  async mounted() {
  await this[GETGOODS]()

  this.initScroll()
  this.initTop()

  this.$Bus.$on('add',this.add);
  this.$Bus.$on('minus',this.minus);
  this.$Bus.$on('clear',this.clear);

 },
 computed: {

   ...mapState(['goods']),

   selectedFoods(){
     let selectedFoods = []
     this.goods.forEach((good)=>{
       good.foods.forEach((food)=>{
         if(food.count){
           selectedFoods.push(food)
         }
       })
     })
     return selectedFoods
   },

   currentIndex(){
     let {tops,scrollY} = this
     let inde = tops.findIndex((top,index)=>{
       return scrollY >= top && scrollY < tops[index+1]
     })
      //让元素尽量滑到顶部
      let targetNode = this.$refs.menulist && this.$refs.menulist.children[inde]
      this.leftScroll && this.leftScroll.scrollToElement(targetNode,300)

      return inde
   },

 },
 methods: {
   ...mapActions([GETGOODS]),

   clear(){
     this.goods.forEach((good)=>{
       good.foods.forEach((food)=>{
         if(food.count && food.count>0){
           food.count = 0
         }
       })
     })
   },

   handleCForMenu(index){
     let targetNode = this.$refs.goodList && this.$refs.goodList.children[index]
     this.rightScroll && this.rightScroll.scrollToElement(targetNode,300)
   },

  initScroll(){
    this.$nextTick(()=>{
      //左侧包裹区域
      this.leftScroll = new BScroll(this.$refs.left,{click:true})
      this.rightScroll = new BScroll(this.$refs.right,{probeType:3,click:true})
      this.rightScroll.on('scroll',({x,y})=>{
        this.scrollY = Math.abs(y)
      })
    })
   },

  initTop(){
    this.$nextTick(()=>{
      let goodList = this.$refs.goodList
      let goods = goodList.children
      let top = 0
      let tops = [top]
      Array.from(goods).forEach((good)=>{
        top += good.offsetHeight
        tops.push(top)
      })
      this.tops = tops
    })
  },
   add(food){
     if(!food.count){
       this.$set(food,'count',1)
     }else{
       food.count +=1
     }
   },
   minus(food){
     if(food.count > 0){
       food.count-=1
     }
   },

 },
 components:{
   'v-food':food,
   'v-icon':icon,
   'v-cart':cart,
 }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

 .goods
    // background pink
    flex 1
    display flex
    flex-direction column
    overflow hidden
    .cartWrap
      height 46px
    .content
      flex 1
      display flex
      overflow hidden
      .left
        flex-basis 80px
        background #f3f5f7
        ul
          min-height 500px
          li
            one-px(rgba(7,17,27,0.1))
            height 54px
            font-size 12px 
            font-weight 200
            display flex
            align-items center
            justify-content center
            .icon
              margin-right 5px
            &.active
                background pink
            &:last-child
              border-none()
      .right
        flex 1
        .goodList
          .good
            .goodName
              height 26px
              line-height 26px
              font-size 12px
              font-weight 800
              background #f3f5f7
              border-left 3px solid #d9dde1
              padding-left 14px
              color rgba(147,153,159,1)
            .foodlist
              .foodWrap
                one-px(rgba(7,17,27,.1))
                padding 18px
                position relative
                &:after
                    width 80%
                    left 0
                    right 0
                    margin auto
                &:last-child
                    border-none()
    .cart
      flex-basis 50px
      

</style>
