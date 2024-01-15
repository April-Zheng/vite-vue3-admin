<template>
  <div v-if="label" class="pro-form-item__label">
    <span>{{ label }}</span>
    <el-tooltip :content="tooltip" v-if="tooltip">
      <Icon
        v-if="tooltip"
        color="#999"
        :style="{ marginLeft: '5px' }"
        icon="QuestionFilled"
      />
    </el-tooltip>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ label?: string; tooltip?: string }>()
</script>
<style scoped lang="scss">
.pro-form-item__label {
  display: flex;
  align-items: center;
}
</style>
