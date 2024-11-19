<template>
    <div class="container">
      <h1 class="text topic mb-5">Users</h1>
      <div class="col-4 mt-3">
      <div class="input-group mb-3">
        <!-- Campo de entrada para o filtro de nome -->
        <input 
          type="text" 
          class="form-control" 
          placeholder="Nome" 
          v-model="searchName"
          aria-label="Recipient's username" 
          aria-describedby="button-addon2" 
        />
        <!-- Botão para disparar a busca -->
        <button 
          class="btn btn-outline-secondary" 
          type="button" 
          id="button-addon2" 
          @click="filterCoursesByName"
        >
          <i class="fa-solid fa-magnifying-glass text-dark"></i>
        </button>
        <button 
      class="btn btn-outline-danger ms-2" 
      type="button" 
      @click="clearFilter"
    >
      Limpar
    </button>
      </div>
    </div>

        <div class="row justify">
            <div class="col">
                <p class="text margin-bottom">Exibindo 1 até 6 de um total de 6 itens encontrados <strong>(sem filtro 6)</strong></p>
            </div>
            <div class="col text-end">
              <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addUserModal">
                Adicionar
              </button>
              <button type="button" class="btn btn-danger mx-2 " data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-bars" style="margin-left: 0px;"></i> 
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" @click="extractExcel" href="#">Excel</a></li>
                  <li><a class="dropdown-item" @click="extractPDF">PDF</a></li>
                </ul>
              </button>
            </div>
        </div>
  
      <table class="table table-hover mt-2">
        <thead>
          <tr style="background-color: #335992FF;">
            <th scope="col">Nome</th>
            <th scope="col">Email</th>
            <th scope="col">Status</th>
            <th scope="col">Valor</th>
            <th scope="col">Método de Pagamento</th>
            <th scope="col">Data do pagamento</th>
            <th scope="col">Ações</th>
          </tr>
        </thead>
         <tbody v-for="user in userStore.users">
          <tr>
            <td>{{user.name}}</td>
            <td>{{user.email}}</td>
            <td>{{user.customer?.subscription?.status}}</td>
            <td>{{user.customer?.subscription?.value}}</td>
            <td>{{user.customer?.subscription?.billing_type}}</td>
            <td>{{user.customer?.subscription?.payment_date}}</td>
            <td>
            
            <i
              class="fa-solid fa-pencil text-success"
              style="cursor: pointer;"
              @click="editUser(user.id)"
              data-bs-toggle="modal"
              data-bs-target="#editUserModal"
            ></i>

            <i class="fa-solid fa-trash text-danger" style="cursor: pointer;" @click="deleteUser(user.id)"></i>
              </td> 
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: userStore.currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(userStore.currentPage - 1)">Previous</a>
      </li>
      <li
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page-item"
        :class="{ active: pageNumber === userStore.currentPage }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
      </li>
      <li class="page-item" :class="{ disabled: userStore.currentPage === userStore.lastPage }">
        <a class="page-link" href="#" @click.prevent="changePage(userStore.currentPage + 1)">Next</a>
      </li>
    </ul>
  </nav>
    </div>
    <AddUser/>
    <EditUser :user="selectedUser"/>
</template>
  
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
  <script lang="ts" setup>
    import { ref, onMounted, watch, computed } from 'vue';
    import { useUserStore } from '@/stores/UserStore';
    import AddUser from './modal/user/addUser.vue';
import type { Register, User } from '@/interfaces/UserInterface';
import EditUser from './modal/user/editUser.vue';

    const searchName = ref<string>('');
    const userStore = useUserStore();
    const selectedUser = ref<Register>({
      id: 0,
      name: '',
      email: '',
      phone: '',
      cpf: null,
      birth_date: null,
      address: null,
      city: null,
      state: null,
      cep: null,
      country: null
    });

      
    onMounted(async () => {
      await userStore.findAll();
     
    });

    const filterCoursesByName = () => {
     const response = userStore.findAll(userStore.currentPage, 6, { name: searchName.value })

    };

  const extractPDF = async () => {
    try {
        await userStore.exportSubscription();
      
    } catch (error) {
        console.error('Erro ao exportar o PDF:', error);
    }
  };

  const extractExcel = async () => {
    try {
        await userStore.exportExcelSubscription();
      
    } catch (error) {
        console.error('Erro ao exportar o PDF:', error);
    }
  };


    const clearFilter = () => {
      searchName.value = '';
      userStore.findAll(1, 6, { name: searchName.value });
    };

    const totalPages = computed(() => userStore.last_page);

    const changePage = (pageNumber: number) => {

      if (pageNumber >= 1 && pageNumber <= userStore.lastPage) {
        
        userStore.findAll(pageNumber, 6);
      }
    };

    const fetchUsers = async () => {
      await userStore.findAll(userStore.currentPage, 6)
    };

const deleteUser = async (userId: number) => {
  try {
    await userStore.deleteUsers(userId);
    fetchUsers()
  } catch (error) {
    console.error('Erro ao buscar o curso', error);
  }
};
const editUser = async (userId: number) => {
  try {
    await userStore.findById(userId);
    console.log(userStore.register)
    if (userStore.user) {
     
      selectedUser.value = userStore.user;
    }

  } catch (error) {
    console.error('Erro ao buscar o curso', error);
  }
}
  
  </script>