<template>
  <div
    class="modal fade modal-lg"
    id="addEnrollmentModal"
    tabindex="-1"
    aria-labelledby="addEnrollmentModalLabel"
    aria-hidden="true"
    data-bs-backdrop="static" 
  data-bs-keyboard="false"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5 text" id="addEnrollmentModalLabel">Editar Curso</h1>
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
                disabled
              />
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
                disabled
              ></textarea>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
          <button type="button" class="btn btn-primary" @click="createEnrollment">Se inscreva!</button>

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
import EnrollmentService from '@/services/EnrollmentService';
import { useEnrollmentStore } from '@/stores/EnrollmentStore';

const props = defineProps<{
  course: Courses;
}>();

// Clonamos os dados da prop para um estado editável local
const editedCourse = ref<Courses>({ ...props.course });

// Usar Pinia para obter categorias
const categoryStore = useCategoryStore();
const enrollmentStore = useEnrollmentStore();
const courseStore = useCourseStore();
const categories = ref<Category[]>([]);

// Buscar categorias ao montar o componente
onMounted(async () => {
  await categoryStore.findAllCategory();
  categories.value = categoryStore.category;
});



//conmtinuar aqui, e colocar array user_id
// Função para atualizar o curso
const createEnrollment = async () => {
  try {
    if (props.course.id) {
      // Recupera o usuário autenticado do sessionStorage
      const authUser = sessionStorage.getItem("auth_user");
      let userId = null;

      if (authUser) {
        const parsedUser = JSON.parse(authUser);
        userId = parsedUser.id; // Garante que userId esteja acessível fora do bloco
      }

      if (!userId) {
        throw new Error("Usuário não autenticado ou ID inválido.");
      }

      // Obter a data atual no formato ISO
      const currentDate = new Date().toISOString();
  
      // Enviar os dados atualizados para o backend
      await enrollmentStore.createEnrollment({
        user_id: userId,
        course_id: props.course.id,
        enrolled_at: currentDate,
        status: 'active',
        progress: 0,
        completed_at: null,
      });

      console.log("Matrícula criada com sucesso!");
    }
  } catch (error) {
    console.error("Erro ao criar matrícula:", error);
  }
};

</script>

