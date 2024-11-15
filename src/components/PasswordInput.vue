<template>
    <div data-mdb-input-init class="form-outline mb-4">
      <label class="form-label" :for="id">{{ label }}</label>
      <div class="input-group">
        <input
          :type="isPasswordVisible ? 'text' : 'password'"
          :id="id"
          class="form-control"
          :placeholder="placeholder"
          :value="modelValue"
          @input="$emit('update:modelValue', $event.target.value)"
          :required="required"
        />
        <button
          type="button"
          class="btn btn-outline-secondary"
          @click="togglePasswordVisibility"
        >
          <i :class="isPasswordVisible ? 'fa fa-eye-slash' : 'fa fa-eye'"></i>
        </button>
      </div>
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
    data() {
      return {
        isPasswordVisible: false,
      };
    },
    methods: {
      togglePasswordVisibility() {
        this.isPasswordVisible = !this.isPasswordVisible;
      },
    },
  };
  </script>
  
  <style scoped>
  /* Estilos adicionais */
  .input-group {
    display: flex;
    align-items: center;
  }
  .input-group .btn {
    border-left: none;
  }
  </style>
  