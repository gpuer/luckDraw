<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style >
#app,body,html{
  height: 100%;
  display: block;
  padding: 0;
  margin: 0;
}
#app{
  background-image: url("./assets/bg.jpeg");
  background-repeat: no-repeat;
  background-position: 78% 0;
  background-size: auto 100% ;
}
@media screen and (min-width:720px){
  #app{
    background-position: 0 0;
    background-size:cover;
  }
  
}
</style>
