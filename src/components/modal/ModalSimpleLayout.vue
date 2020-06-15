<template>
    <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-content">
            <div class="modal-header">
            {{ header }}
            </div>
            <div class="modal-body">
            {{ body }}
            </div>
          </div>
          <div class="modal-default-button" @click="close('只有确认')">
            确定
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    header: '',
    body: ''
  },
  methods: {
    close (message) {
      this.$emit('onSimpleConfirm', message)
    }
  }
}
</script>

<style scoped>

.modal-mask {
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  font-family: Helvetica Neue, Arial, sans-serif;
  color: #444;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 3px;
  box-shadow: 0 4px 16px rgba(0,0,0,.15);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-content {
  padding: 20px 30px 20px 30px;
}

.modal-header {
  margin-top: 0;
  color: #484848;
  font-size: 20px;
  text-align: center;
}

.modal-body {
  margin: 30px 0;
  font-size: 14px;
  line-height: 20px;
}

.modal-default-button {
  color: white;
  background-color: #215cb1;
  font-size: 18px;
  width: 100%;
  padding: 15px 0px 15px 0px;
  text-align: center;
  border-bottom-right-radius:3px;
  border-bottom-left-radius:3px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

</style>
