<template>
  <div id="app">
 
    <input
      :value = "searchQuery"
      type="text"
      placeholder="Search..."
      @input="handleInput"
    />
  </div>
</template>

<script>
export default {
  props: {
    searchQuery: {
      type: String,
      default: '',
    
    }
  },
  methods: {
      
    handleInput(event) {
      this.$emit('update-query', event.target.value);
    }
  }
  
};
</script>




<style scoped>
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

