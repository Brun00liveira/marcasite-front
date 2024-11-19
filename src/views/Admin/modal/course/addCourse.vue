<template>
  <div class="modal fade modal-lg" id="addCourseModal" tabindex="-1" aria-labelledby="addCourseModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text" id="addCourseModalLabel">Adicionar Curso</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body text">
          <h5 class="modal-title text mb-4 emphasis" id="perfilModalLabel">Dados Pessoais</h5>
          <div class="d-flex justify-content-center align-items-center flex-column">
         
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
              <label for="name" class="form-label">Nome</label>
              <input type="text" class="form-control" id="name" v-model="course.title" placeholder="Título do curso" required />
            </div>
            <div class="col-md-4">
              <label for="category" class="form-label">Categoria</label>
              <select class="form-select" id="category" v-model="course.category_id" aria-label="Categoria" required>
                <option selected disabled>Escolha uma categoria</option>
                <option v-for="category in categoryStore.category" :key="category.id" :value="category.id">{{ category.name }}</option>
              </select>
            </div>
          
          </div>

          <div class="row mb-3">
            <div class="col-md-12 mt-2">
              <label for="description" class="form-label">Descrição</label>
              <textarea class="form-control" id="description" v-model="course.description" rows="3" required></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="saveCourse">Salvar alterações</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useCourseStore } from '@/stores/CourseStore';
import { useCategoryStore } from '@/stores/CategoryStore';

const courseStore = useCourseStore();
const categoryStore = useCategoryStore();

const course = ref({
  id: 0,
  title: "",
  description: "",
  photo: "", 
  is_active: 1,
  category_id: 0,
  category: null
});

const saveCourse = async () => {

    await courseStore.createCourse(course.value);
  
};
</script>
