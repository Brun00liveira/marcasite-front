<template>
  <div data-mdb-input-init class="form-outline mb-4">
    <label class="form-label" :for="id">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      class="form-control"
      :placeholder="placeholder"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      :required="required"
    />
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: 'text',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: [String, Number],
      default: '',
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para o componente */
</style>
