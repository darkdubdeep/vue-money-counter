<template>
  <div class="text-xs-center preloader-holder">
    <v-progress-circular
      :size="50"
      color="primary"
      indeterminate
    ></v-progress-circular>
  </div>
</template>


<script>
export default {
    name:'preloader-component',
    props:['loading'],
}
</script>

<style>
.preloader-holder {
    position: absolute;
    width:100%;
    height:80%;
    z-index: 10000;
    background-color:rgba(255, 255, 255, 0.5); 
}
.v-progress-circular{
    margin-top: 15%;
    margin-right:49px;
}
</style>

