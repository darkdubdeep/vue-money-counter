<template>
    <v-alert
      :value="true"
      type="error"
      dismissible
      @input="onClose"
    >
      {{ text }}
    </v-alert>
</template>


<script>
export default {
  props: {
    text: String
  },
  methods: {
    onClose() {
      this.$emit("dismissed");
    }
  }
};
</script>

<style>

</style>


