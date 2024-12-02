<template>
  <div id="app">
    <router-view />
    <footer>
      <p>&copy; 2024 Rymdresor AB</p>
    </footer>
  </div>
</template>

<style>
body {
  margin: 0;
  padding: 0;
  width: 100%;
  min-width: 320px;
  min-height: 100vh;
  background-color: #333;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

nav {
  background-color: transparent;
  padding: 1em;
}

nav a {
  color: #fff;
  margin-right: 1em;
  text-decoration: none;
}

footer {
  background-color: #333;
  color: #fff;
  text-align: center;
  padding: 1em;
  width: 100%;
  margin: 0;

}
</style>
