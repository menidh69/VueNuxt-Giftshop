<template>
  <div>
    <nav>
      <ul>
        <li>Home</li>
        <div class="flex flex-row">
          <li>Sign Up</li>
          <li>Log In</li>
        </div>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
nav {
  width: 100vw;
  background-color: tomato;
  padding: 20px;
  color: aliceblue;
}
ul {
  list-style: none;
  display: flex;
  justify-content: space-between;
}
</style>
