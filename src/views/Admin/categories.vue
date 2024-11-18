<template>
  <div class="container">
    <h1 class="text topic mb-5">Categoria</h1>
    <div class="col-4 mt-3 col-4">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Nome" aria-label="Recipient's username" aria-describedby="button-addon2">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2">
          <i class="fa-solid fa-magnifying-glass text-dark"></i>
        </button>
      </div>
    </div>
    <div class="row justify">
      <div class="col">
        <p class="text margin-bottom">
          Exibindo 1 até 6 de um total de 6 itens encontrados <strong>(sem filtro 6)</strong>
        </p>
      </div>
      <div class="col text-end">
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
          Adicionar
        </button>
        <button type="button" class="btn btn-danger mx-2" data-bs-toggle="dropdown" aria-expanded="false">
          <i class="fa-solid fa-bars" style="margin-left: 0px;"></i>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" href="#">Excel</a></li>
            <li><a class="dropdown-item" href="#">PDF</a></li>
          </ul>
        </button>
      </div>
    </div>

    <table class="table table-hover mt-2">
  <thead>
    <tr style="background-color: #335992FF;">
      <th scope="col">Nome</th>
      <th scope="col">Status</th>
      <th scope="col">Descrição</th>
      <th scope="col">Ações</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(item, index) in categoryStore.category" :key="index">
      <td>{{ item.name }}</td>
      <td>{{ item.is_active }}</td>
      <td>{{ item.description }}</td>
    
      <td>
        <i class="fa-solid fa-user text-dark"></i>
        <!-- <i class="fa-solid fa-pencil text-success" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#editCourseModal" @click="editCourse(item)"></i>
        <i class="fa-solid fa-trash text-danger" style="cursor: pointer;" @click="deleteCourse(item)"></i> -->
      </td>
    </tr>
  </tbody>
</table>

  </div>
  <AddCategory/>
</template>

<script lang="ts" setup>
import { useCategoryStore } from '@/stores/CategoryStore';
import { onMounted } from 'vue';
import AddCategory from './modal/category/addCategory.vue';

const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.findAllCategory();
});
</script>

<style scoped>
  th,
  td {
    background-color: transparent;
  }

  th {
    color: white;
  }

  i {
    margin-left: 10px;
    cursor: pointer;
  }

  .margin-bottom {
    margin-bottom: 0px;
  }

  .justify {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
