<template>
  <ul class='list'>
      <li v-for="(item, index) in list" :key="index">
          <v-icon class='icon' size='2' :type='item.type'></v-icon>
          <span class='text'>{{item.content}}</span>
      </li>
  </ul>
</template>

<script>
import icon from 'components/icon/icon'
export default {
 name: 'list',
 props:{
    list:Array
 },
 data(){
   return{}
 },
 components:{
    'v-icon':icon
 }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .list
      width 80%
      margin 24px auto 0
      padding 12px 12px 28px
      box-sizing border-box
      & > li
          margin-bottom 6px
          display flex
          align-items center
          &:last-child
              margin-bottom 0
          .icon
              margin-right 6px
          .text
              font-size 12px
              line-height 12px
              font-weight 200
              color rgba(255,255,255,1)

</style>
