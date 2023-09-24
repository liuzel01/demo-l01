<template>
  <div>
    <!-- <el-button @click="count++">count is {{ dbCount }}</el-button> -->

    <l01Child>

      <!-- <template v-slot:btnL01>
        <el-button>按钮</el-button>
      </template> -->

      <!-- 在父组件的子组件标签内部，中获取子组件的数据 -->
      <template #btnL01="scope">
        <!-- 这里的 scope 是自定义的，不过一般都叫 scoped 
        scope 专门收集所对应的子组件内部的 slot 标签身上的标签属性，作为自己的属性（除了 name 属性）-->
        子组件-title: {{ scope.title }}
      </template>
    </l01Child>
  </div>
  <!-- <l01Child v-model:count="num"></l01Child> -->
</template>


<script setup lang="ts">
import l01Child from "@/l01/l01-child.vue";


</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
