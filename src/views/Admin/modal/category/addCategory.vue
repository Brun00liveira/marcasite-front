<template>
    <div class="modal fade modal-lg" id="addCategoryModal" tabindex="-1" aria-labelledby="addCategoryModalLabel" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5 text" id="addCategoryModalLabel">Adicionar Curso</h1>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body text">
            <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Dados Pessoais</h5>
            <div class="d-flex justify-content-center align-items-center flex-column">
              <!-- <img :src="imagePreview" alt="User" class="img-fluid rounded-circle mb-3" style="width: 100px; height: 100px;">
              <div class="col-md-6 mb-4">
                <input type="file" class="form-control" id="imagem" @change="handleImageChange" />
              </div> -->
            </div>
  
            <div class="row mb-3">
              <div class="col-md-6">
                <label for="name" class="form-label">Nome</label>
                <input type="text" class="form-control" id="name" v-model="categories.name" placeholder="Título do curso" required />
              </div>
              <div class="col-md-6">
                <label for="slug" class="form-label">Slug</label>
                <input type="text" class="form-control" id="slug" v-model="categories.slug" placeholder="Valor do curso" required />
              </div>
            </div>
  
            <div class="row mb-3">
              <div class="col-md-12 mt-2">
                <label for="description" class="form-label">Descrição</label>
                <textarea class="form-control" id="description" v-model="categories.description" rows="3" required></textarea>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
            <button type="button" class="btn btn-primary" @click="saveCategories">Salvar alterações</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useCategoryStore } from '@/stores/CategoryStore';
  
  const categoryStore = useCategoryStore();
  
  const categories = ref({
    id: 0,
    name: "",
    slug: "",
    description: "",
    is_active: 1,
    category: null
  });
  
  const saveCategories = async () => {

    await categoryStore.createCategory(categories.value);
    
  };
  </script>
  