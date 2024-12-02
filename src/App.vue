<template>
  <div id="app">
    <nav>
      <router-link to="/">Hem</router-link>
      <router-link to="/booking">Boka Upplevelse</router-link>
      <router-link to="/packages">Paket Erbjudanden</router-link>
    </nav>
    <router-view />
    <footer>
      <p>&copy; 2024 Rymdresor AB</p>
    </footer>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  margin: 0;
  padding: 0;
}

nav {
  background-color: #333;
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
  position: fixed;
  width: 100%;
  bottom: 0;
}
</style>
