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
              <button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#addCourseModal">
                Adicionar
              </button>
              <button type="button" class="btn btn-danger mx-2 " data-bs-toggle="dropdown" aria-expanded="false">
                <i class="fa-solid fa-bars" style="margin-left: 0px;"></i> 
                <ul class="dropdown-menu">
                  <li><a class="dropdown-item" href="#">Excel</a></li>
                  <li><a class="dropdown-item" @click="extractPDF">PDF</a></li>
                </ul>
              </button>
            </div>
        </div>
  
      <table class="table table-hover mt-2">
        <thead>
          <tr style="background-color: #335992FF;">
            <th scope="col">Nome</th>
            <th scope="col">Status</th>
            <th scope="col">Valor</th>
            <th scope="col">Método de Pagamento</th>
            <th scope="col">Data do pagamento</th>
            <th scope="col">Data de vencimento</th>
          </tr>
        </thead>
         <tbody v-for="subscript in subscription.subscriptions">
          <tr>
            <td>{{subscript.customer.user?.name}}</td>
            <td>{{subscript.status}}</td>
            <td>{{subscript.value}}</td>
            <td>{{subscript.billing_type}}</td>
            <td>{{subscript.payment_date}}</td>
            <td>{{subscript.due_date}}</td>
          </tr>
        </tbody>
      </table>
      <nav aria-label="Page navigation example">
    <ul class="pagination justify-content-center">
      <li class="page-item" :class="{ disabled: subscription.currentPage === 1 }">
        <a class="page-link" href="#" @click.prevent="changePage(subscription.currentPage - 1)">Previous</a>
      </li>
      <li
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page-item"
        :class="{ active: pageNumber === subscription.currentPage }"
      >
        <a class="page-link" href="#" @click.prevent="changePage(pageNumber)">{{ pageNumber }}</a>
      </li>
      <li class="page-item" :class="{ disabled: subscription.currentPage === subscription.lastPage }">
        <a class="page-link" href="#" @click.prevent="changePage(subscription.currentPage + 1)">Next</a>
      </li>
    </ul>
  </nav>
    </div>

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
    import { useSubscriptionStore } from '@/stores/SubscriptionStore';

    const searchName = ref<string>('');
    const subscription = useSubscriptionStore();

    onMounted(async () => {
      await subscription.findAllSubscription();
     
    });

    const filterCoursesByName = () => {
  
      subscription.findAllSubscription(subscription.currentPage, 6, { name: searchName.value })
    };

    const extractPDF = async () => {
    try {
        await subscription.exportSubscription();
      
    } catch (error) {
        console.error('Erro ao exportar o PDF:', error);
    }
};


    const clearFilter = () => {
      searchName.value = '';
      subscription.findAllSubscription(1, 6, { name: searchName.value });
    };

    const totalPages = computed(() => subscription.last_page);

    const changePage = (pageNumber: number) => {

      if (pageNumber >= 1 && pageNumber <= subscription.lastPage) {
        
        subscription.findAllSubscription(pageNumber, 6);
      }
    };
  
  </script>