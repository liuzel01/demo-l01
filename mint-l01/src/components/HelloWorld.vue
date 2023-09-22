<script setup lang="ts">
import { ref } from 'vue'
import { ElButton } from 'element-plus'
// import { defineComponent } from 'vue'
import { reactive, toRefs } from 'vue'

defineProps<{ msg: string }>()

// const msg = "mssg"
// const count = ref(100)

let obj = {
  count: 200
}
let objRet = reactive(obj)
let { count } = toRefs(objRet)



</script>




<template>
  <!-- <h1>{{ msg }}</h1> -->
  <p>{{ count }}</p>

  <div class="card">
    <el-button @click="count++">count is {{ count }}</el-button>

  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
