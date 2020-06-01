<template>
    <div class="stars" :class="`stars-${size}`" >
        <div class="star" :class="item" :style="{marginRight:`${mr}px`}"
             v-for="(item,index) in scoreArr"  :key="index"></div>
    </div>
</template>

<script>
export default {
  name: 'stars',
  props:{
    length:Number,
    size:String,
    score:Number,
    mr:String
  },
  data(){
    return{
    }
  },
  computed: {
    scoreArr(){
      if(this.score === undefined) return ['off','off','off','off','off']
      if(this.score < 0) return ['off','off','off','off','off']
      if(this.score > 5) return ['on','on','on','on','on']

      let arr =[]
      let score = Math.round(this.score * 2) / 2
      let fullSize = Math.floor(score)
      let needHalf = (score % 1) === 0 ? false : true

      for(var i = 0 ; i < fullSize ; i++){
        arr.push('on')
      }
      if(needHalf) arr.push('half')
      while(arr.length < this.length) arr.push('off')

      return arr
    }
  },
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixin.styl"

  .stars
      margin 0 auto
      display inline-flex
      justify-content center
      .star
        background-size 100%
        background-repeat no-repeat
      &.stars-48
        .star
          width 20px
          height 20px
          margin-right 12px
          &:last-child
              margin-right 0
          &.on
            bg-image(star48_on)
          &.half
            bg-image(star48_half)
          &.off
            bg-image(star48_off)

      &.stars-36
        .star
          width 15px
          height 15px
          margin-right 9px
          &:last-child
              margin-right 0
          &.on
            bg-image(star36_on)
          &.half
            bg-image(star36_half)
          &.off
            bg-image(star36_off)

      &.stars-24
        .star
          width 10px
          height 10px
          margin-right 6px
          &:last-child
              margin-right 0
          &.on
            bg-image(star24_on)
          &.half
            bg-image(star24_half)
          &.off
            bg-image(star24_off)

</style>
