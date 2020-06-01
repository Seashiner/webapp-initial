<template>
  <div class='control' v-if="food">
    <transition name="control">
      <i class='minus' v-show="food.count>0" @click='minus(food)'>-</i>
    </transition>
    <transition name="control">
      <span class='count' v-show="food.count>0">{{food.count}}</span>
    </transition>
    <i class='add' @click='add(food)'>+</i>
  </div>
</template>

<script>
export default {
 name: 'control',
 data(){
   return{}
 },
 props:{
   food:Object
 },
 methods: {
   add(food){
     this.$Bus.$emit('add', food)
   },
   minus(food){
     this.$Bus.$emit('minus', food)
   }
 },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
 @import "../../common/stylus/transition.styl"
  .control
    display inline-flex
    justify-content center
    align-items center
    flex 0 0 0
    // position absolute
    right 18px
    bottom 10px
    i
      font-style normal
      width 20px
      height 20px
      text-align center
      border-radius 50%
      box-sizing border-box
      &.add
        background rgba(0,160,220,1)
        color #fff
        position relative
      &.minus
        border 1px solid rgba(0,160,220,1)
        color rgba(0,160,220,1)
        // position absolute
        right 40px
        top 0 
    span
      display inline-block
      width 20px
      text-align center
      font-size 10px
      vertical-align middle
      color rgba(147,153,159,1)



</style>
