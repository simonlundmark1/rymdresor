<template>
  <div id="app">
    <h1>Search Bar Example</h1>
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search..."
      @input="handleSearch"
    />
    <ul>
      <li v-for="item in filteredItems" :key="item">
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: "",
      experiences: [], 
    };
  },
  computed: {
    filteredItems() {
      const query = this.searchQuery.toLowerCase();
      return this.experiences.filter((item) =>
        item.toLowerCase().includes(query)
      );
    },
  },
  methods: {
    handleSearch() {
      console.log("Searching for:", this.searchQuery);
    },
  },
  async created() {
    try {
      const res = await fetch("/src/data/data.json");
      const data = await res.json();
      this.experiences = data.experiences;
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  },
};
</script>




<style>
#app {
  font-family: Arial, sans-serif;
  text-align: center;
  padding: 20px;
}
input {
  width: 50%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  padding: 5px;
  border-bottom: 1px solid #eee;
}
</style>

