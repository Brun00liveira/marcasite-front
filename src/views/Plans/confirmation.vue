<template>
    <div class="container mt-5">
      <div class="row">
        <div class="col-12 text-center">
          <h1 class="mb-4">Compra Confirmada</h1>
          <p class="lead">Obrigado pela sua compra! Aqui estão os detalhes:</p>
        </div>
      </div>
  
      <div class="row">
        <!-- Detalhes do Plano -->
        <div class="col-12 col-md-6 mb-4" v-if="subscriptionStore.subscription['0']?.plan">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Detalhes do Plano</h5>
            </div>
            <div class="card-body">
              <h6>Nome do Plano: {{ subscriptionStore.subscription['0'].plan.name }}</h6>
              <p>Preço: R$ {{ subscriptionStore.subscription['0'].plan.price }}</p>
              <p>Descrição: {{ subscriptionStore.subscription['0'].plan.description }}</p>
           
            </div>
          </div>
        </div>
         <!-- Detalhes do Plano -->
         <div class="col-12 col-md-6 mb-4" v-if="subscriptionStore.subscription['0']?.plan">
          <div class="card">
            <div class="card-header">
              <h5 class="card-title">Status de Compra</h5>
            </div>
            <div class="card-body">

              <p>Status de Pagamento: CONFIRMED</p>
              <p>
  <span
    :class="{
      'badge badge-warning text': subscriptionStore.subscription[0].status == 'PAYMENT_CREATED',
      'badge badge-success text': subscriptionStore.subscription[0].status == 'PAYMENT_RECEIVED'
    }"
    class="px-3 py-2 rounded-pill"
  >
    Status de Confirmação: {{ subscriptionStore.subscription[0].status }}
  </span>
</p>

              <p>Data de Vencimento: {{ subscriptionStore.subscription['0'].due_date }}</p>
            </div>
          </div>
        </div>
  
        <!-- Dados do Titular -->
        <div class="row" v-if="subscriptionStore.subscription['0']?.customer?.user">
          <div class="col-12">
            <div class="card">
              <div class="card-header">
                <h5 class="card-title">Dados do Titular</h5>
              </div>
              <div class="card-body">
                <p><strong>Nome:</strong> {{ subscriptionStore.subscription['0'].customer.user?.name }}</p>
                <p><strong>Email:</strong> {{ subscriptionStore.subscription['0'].customer.user?.email }}</p>
                <p><strong>CPF/CNPJ:</strong> {{ subscriptionStore.subscription['0'].customer.user?.cpf }}</p>
                <p><strong>CEP:</strong> {{subscriptionStore.subscription['0'].customer.user?.cep || "Não informado" }}</p>
                <p><strong>Telefone:</strong> {{ subscriptionStore.subscription['0'].customer.user?.phone }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { onMounted } from "vue";
  import { useSubscriptionStore } from "@/stores/SubscriptionStore";
  
  // Acesso ao store
  const subscriptionStore = useSubscriptionStore();
  
  onMounted(() => {
    subscriptionStore.findByUserId(); // Chama o método do store para buscar a assinatura
  });
  </script>
  <style>
.badge {
  display: inline-block;
  padding: 0.5em 1em;
  font-size: 0.9em;
  font-weight: bold;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: 10rem;
}

.badge-warning {
  background-color: #ffc107; /* Amarelo */
  color: #212529;
}

.badge-success {
  background-color: #28a745 ; /* Verde */
  color: #fff !important;
}
</style>