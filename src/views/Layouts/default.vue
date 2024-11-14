<template>
  <div class="d-flex flex-column">
    <navTopSide />
    <div class="container-fluid flex-grow-1">
      <div class="row flex-nowrap h-100">
        <navSide />
        <main class="col p-4 main-content">
          <router-view />
        </main>
       
      </div>
    </div>
    
    <footerSide />
  </div>

</template>
  
<script setup lang="ts">
import navSide from '@/views/Layouts/leftSide.vue';
import navTopSide from '@/views/Layouts/nav.vue';
import footerSide from '@/views/Layouts/footerSide.vue';

</script>

<style scoped>

.main-content {
  margin-top: 45px;
  margin-left: 170px;
  flex-grow: 1;
}

@media (max-width: 575px) {
  .main-content {
    margin-top: 40px; 
    margin-left: 35px; 
    padding: 10px; 
  }
}

</style>
