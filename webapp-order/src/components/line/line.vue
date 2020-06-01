<template>
  <div class='line'>
    <div class='left'></div>
    <div class='text'>
      <slot><span>default</span></slot>
    </div>
    <div class='right'></div>
  </div>
</template>

<script>
export default {
 name: 'v-line',
 data(){
   return{

   }
 }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .line
    width 80%
    margin 0 auto
    display flex
    justify-content between
    align-items center
    .left,.right
      flex 1
      height 1px
      background rgba(255,255,255,0.2);

</style>
