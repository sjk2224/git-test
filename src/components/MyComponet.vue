// src/components/MyComponent.vue
<template row>
    <q-list bordered >
      <q-item   clickable v-ripple>
        <q-item-section class="row items-start">{{ index + 1 }}. {{ item.message }}</q-item-section>
      </q-item>
    </q-list>
  <q-separator />
</template>

<script>
export default {
  name: "MyComponent",
  props: ["item", "index"],
};
</script>

<style></style>