<template>
  <div class="mx-5">
    <div class="row align-items-center">
      <h1 class="text topic">Meus Cursos</h1>

      <!-- Cards Responsivos -->
      <div class="row mt-5">
        <!-- Renderizando os cards dinamicamente -->
        <div v-for="enrollment in enrollmentStore.enrollments" :key="enrollment.id" class="col-12 col-sm-6 col-md-4 col-lg-4 mb-4">
          <div class="card" style="width: 100%;">
            <!-- Mantendo a imagem padrão se não houver imagem do curso -->
            <img src="/images/Home/notebook.png" class="card-img-top" alt="Curso imagem">
            <div class="card-body">
              <h5 class="card-title">{{ enrollment.course?.title }}</h5>
              <p class="card-text">{{ enrollment.course?.description }}</p>
              <p class="card-text">
                <small class="text-muted">Progresso: {{ enrollment.progress }}%</small>
              </p>
              <button type="button" class="btn btn-primary" data-bs-toggle="modal" :data-bs-target="'#modal' + enrollment.id">Detalhes</button>

              <!-- Modal para exibir mais informações -->
              <div class="modal fade" :id="'modal' + enrollment.id" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true"
              data-bs-backdrop="static" 
  data-bs-keyboard="false">
                <div class="modal-dialog">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5">{{ enrollment.course?.title }}</h1>
                      <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                      <p>{{ enrollment.course?.description }}</p>
                      <p>Status: {{ enrollment.status }}</p>
                      <p>Inscrito em: {{ new Date(enrollment.enrolled_at).toLocaleDateString() }}</p>
                      <p>Progresso: {{ enrollment.progress }}%</p>
                    </div>
                    <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fechar</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useEnrollmentStore } from '@/stores/EnrollmentStore';

// Acessando a store
const enrollmentStore = useEnrollmentStore();

onMounted(async () => {
  // Carregar os dados de matrícula ao montar o componente
  await enrollmentStore.enrollmentsByUserId();
});
</script>
