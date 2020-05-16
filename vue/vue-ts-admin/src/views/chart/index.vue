<template>
  <div class="t-chart-container">
    <e-chart></e-chart>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import EChart from '@/components/EChart/index.vue'
@Component({
  name: 'Chart',
  components: {
    EChart
  }
})
export default class Chart extends Vue {}
</script>

<style lang="scss" scoped></style>
