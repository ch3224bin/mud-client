<template>
  <div>
    <div>맵제작</div>
    <div>
      <component v-bind:is="selectedComponent"></component>
    </div>
  </div>
</template>

<script>
import Room from '@/components/admin/Room'

export default {
  components: {
    Room
  },
  data () {
    return {
      selectedComponent: 'room'
    }
  }
}
</script>
