<template>
  <div id="app">
    <router-view />
    <footer class="footer">
      <p>&copy; 2024 Tidsresor AB</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import "./style/style.css";
import "./style/components/footer.css";

</script>

<style scoped>
.footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1em;
  width: 100%;
  margin: 0;
}
</style>
