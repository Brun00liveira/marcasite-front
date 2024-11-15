<template>
    <div data-mdb-input-init class="form-outline mb-4">
      <label class="form-label" :for="id">{{ label }}</label>
      <input
        type="tel"
        :id="id"
        class="form-control"
        v-mask="mask"
        :placeholder="placeholder"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :required="required"
      />
    </div>
  </template>
  
  <script>
  import { mask } from 'vue-the-mask';
  
  export default {
    directives: { mask },
    props: {
      label: String,
      id: String,
      modelValue: String,
      placeholder: String,
      required: Boolean,
      mask: {
        type: String,
        default: '(##) #####-####',
      },
    },
  };
  </script>
  