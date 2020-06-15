<template>
  <div class="dir_layout">
    <ul class="ul-layout">
      <li
        class="li-layout"
        v-for="dirItem in dirSubArr"
        :key="dirItem.name"
        @click.stop="goRouter(dirItem.name)">{{ $t(dirItem.dirName) }} > </li>
      <li
        class="li-layout"
        v-for="dirItem in dirExactArr"
        :key="dirItem.name"
        :class="['last-part-layout']">{{ $t(dirItem.dirName) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  computed: {
    dirSubArr () {
      let dirArr = []
      for (let index = 0; index < this.$store.state.dirArrModule.dirArr.length; index++) {
        const dirItem = this.$store.state.dirArrModule.dirArr[index]
        if (this.$store.state.dirArrModule.dirArr.length - 1 > index) {
          dirArr.push(dirItem)
        }
      }
      return dirArr
    },
    dirExactArr () {
      let dirArr = []
      for (let index = 0; index < this.$store.state.dirArrModule.dirArr.length; index++) {
        const dirItem = this.$store.state.dirArrModule.dirArr[index]
        if (this.$store.state.dirArrModule.dirArr.length - 1 === index) {
          dirArr.push(dirItem)
        }
      }
      return dirArr
    }
  },
  methods: {
    goRouter (routeName) {
      this.$router.push({name: routeName})
    }
  },
  watch: {
    '$store.state.dirArrModule.dirArr' (to, from) {
      this.currentDirArr = to
    }
  }
}
</script>

<style scoped>
 .dir_layout {
    width:fit-content;
    width:-webkit-fit-content;
    width:-moz-fit-content;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #484848;
    padding-left: 10px;
    padding-right: 10px;
  }

  .ul-layout {
    display: flex;
    justify-content: flex-start;
  }

  .li-layout {
    padding-left: 5px;
    padding-right: 5px;
    cursor: pointer;
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
  }

  .last-part-layout {
    color: #215cb1;
    cursor: auto;
  }
</style>
