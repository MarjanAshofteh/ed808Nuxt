<template>
  <div class="header">
    <div class="progress-container">
      <div class="progress-bar" id="myBar"></div>
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    window.onscroll = function() {
      myFunction();
    };

    function myFunction() {
      var winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      var height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      var scrolled = (winScroll / height) * 100;
      document.getElementById("myBar").style.width = scrolled + "%";
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 10;
  width: 100%;
  background-color: transparent;
}

.header h2 {
  text-align: center;
}

.progress-container {
  width: 100%;
  height: 2px;
  background: transparent;
}

.progress-bar {
  height: 2px;
  background: #92278f;
  background: var(--md-theme-default-primary-on-background, #92278f);
  width: 0%;
}
</style>
