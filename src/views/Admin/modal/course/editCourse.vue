<template>
  <div
    class="modal fade modal-lg"
    id="editCourseModal"
    tabindex="-1"
    aria-labelledby="editCourseModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text" id="editCourseModalLabel">Editar Curso</h1>
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
          <div class="d-flex justify-content-center align-items-center flex-column">
            <!-- Placeholder para imagem e upload -->
          </div>

          <div class="row mb-3">
            <div class="col-md-4">
              <label for="name" class="form-label">Nome</label>
              <input
                type="text"
                class="form-control"
                id="name"
                v-model="course.title"
                placeholder="Título do curso"
                required
              />
            </div>
            <div class="col-md-4">
              <label for="category" class="form-label">Categoria</label>
              <select
                class="form-select"
                id="category"
                v-model="course.category_id"
                aria-label="Categoria"
                required
              >
                <option selected disabled>Escolha uma categoria</option>
                <option
                  v-for="category in categories"
                  :key="category.id"
                  :value="category.id"
                >
                  {{ category.name }}
                </option>
              </select>
            </div>
            <div class="col-md-4">
              <label for="is_active" class="form-label">Status</label>
              <select
                class="form-control"
                id="is_active"
                v-model="course.is_active"
                required
              >
                <option value="1">Ativo</option>
                <option value="0">Inativo</option>
              </select>
            </div>

          </div>

          <div class="row mb-3">
            <div class="col-md-12 mt-2">
              <label for="description" class="form-label">Descrição</label>
              <textarea
                class="form-control"
                id="description"
                v-model="course.description"
                rows="3"
                required
              ></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="updateCourse">Salvar alterações</button>

        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';

import type { Category } from '@/interfaces/CategoryInterface';
import type { Courses } from '@/interfaces/CousesInterface';
import { defineProps } from 'vue';
import { useCategoryStore } from '@/stores/CategoryStore';
import CourseService from '@/services/CourseService';
import { useCourseStore } from '@/stores/CourseStore';

const props = defineProps<{
  course: Courses;
}>();

// Clonamos os dados da prop para um estado editável local
const editedCourse = ref<Courses>({ ...props.course });

// Usar Pinia para obter categorias
const categoryStore = useCategoryStore();
const courseStore = useCourseStore();
const categories = ref<Category[]>([]);

// Buscar categorias ao montar o componente
onMounted(async () => {
  await categoryStore.findAllCategory();
  categories.value = categoryStore.category;
});

// Função para atualizar o curso
const updateCourse = async () => {
  try {

    if (props.course.id) {
      // Enviar os dados atualizados para o backend
      await courseStore.updateCourse(props.course.id, props.course);

    }
  } catch (error) {

    console.error(error);
  }
};
</script>

