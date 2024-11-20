<template>
  <div class="container">
    <h1 class="text topic mb-5">Categoria</h1>
    <div class="col-4 mt-3 col-4">
      
    </div>
    <div class="row justify">
    
      <div class="col text-end">
        <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCategoryModal">
          Adicionar
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
    <tr v-for="item in categoryStore.category" :key="item.id">
      <td>{{ item.name }}</td>
      <td>{{ item.is_active }}</td>
      <td>{{ item.description }}</td>
    
      <td>

        <i class="fa-solid fa-pencil text-success" style="cursor: pointer;" data-bs-toggle="modal" data-bs-target="#editCategoryModal" @click="editCategory(item.id)"></i> 
        <i class="fa-solid fa-trash text-danger" style="cursor: pointer;" @click="deleteCourse(item.id)"></i>
      </td>
    </tr>
  </tbody>
</table>

  </div>
  <AddCategory/>
  <EditCategory :category="selectedCategory" />

</template>

<script lang="ts" setup>
import { useCategoryStore } from '@/stores/CategoryStore';
import { onMounted, ref } from 'vue';
import AddCategory from './modal/category/addCategory.vue';
import EditCategory from './modal/category/editCategory.vue';
import type { Category } from '@/interfaces/CategoryInterface';
const categoryStore = useCategoryStore();

onMounted(async () => {
  await categoryStore.findAllCategory();
});

const selectedCategory = ref<Category>({
  id: 0,
  name: "",
  slug: "",
  description: "",
  is_active: 1,
});

const editCategory = async (categoryId: number) => {
  try {

    await categoryStore.findById(categoryId);

    if (categoryStore.categorie) {
      selectedCategory.value = categoryStore.categorie; 
    }
  } catch (error) {
    console.error('Erro ao buscar o curso', error);
  }
};

const deleteCourse = async (categoryId: number) => {
  try {

    await categoryStore.deleteCategory(categoryId);
    await categoryStore.findAllCategory();
  } catch (error) {
    console.error('Erro ao buscar o curso', error);
  }
};


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
