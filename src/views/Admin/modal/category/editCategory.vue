<template>
    <div
      class="modal fade modal-lg"
      id="editCategoryModal"
      tabindex="-1"
      aria-labelledby="editCategoryModalLabel"
      aria-hidden="true"
    >

    <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text" id="editCategoryModalLabel">Adicionar Curso</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body text">
            <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">
              Dados Pessoais
            </h5>
          </div>
          <div class="row mb-3">
            <div class="col-md-4">
              <label for="name" class="form-label text">Nome</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="category.name"
                placeholder="Título do curso"
                required
              />
            </div>
          
            <div class="col-md-4">
              <label for="price" class="form-label text">Slug</label>
              <input
                type="text"
                class="form-control"
                id="slug"
                v-model="category.slug"
                placeholder="Valor do curso"
                required
              />
            </div>
            <div class="row mb-3">
            <div class="col-md-12 mt-2">
              <label for="description" class="form-label text">Descrição</label>
              <textarea
                class="form-control"
                id="description"
                v-model="category.description"
                rows="3"
                required
              ></textarea>
            </div>
          </div>
          </div>
          
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="updateCategory">Salvar alterações</button>
  
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import type { Category } from '@/interfaces/CategoryInterface';
  import { defineProps } from 'vue';
  import { useCategoryStore } from '@/stores/CategoryStore';
  
  const props = defineProps<{
    category: Category;
  }>();
  
  const categoryStore = useCategoryStore();
  const categories = ref<Category[]>([]);
  
  onMounted(async () => {
    await categoryStore.findAllCategory();
    categories.value = categoryStore.category;
  });
  
  const updateCategory = async () => {
    try {
     
      if (props.category.id) {
        await categoryStore.updateCategory(props.category.id, props.category);
      }
    } catch (error) {
  
      console.error(error);
    }
  };
  </script>
  
  