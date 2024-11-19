<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 text-center">
        <h1 class="mb-4 text">Escolha Seu Plano</h1>
        <p class="lead text">Escolha o plano que melhor atenda às suas necessidades e aproveite todos os cursos disponíveis!</p>
      </div>
    </div>

    <!-- Exibição dos planos -->
    <div class="row justify-content-center">
      <div v-for="plan in planStore.plans" :key="plan.id" class="col-12 col-md-4 mb-4">
        <div class="card plan-card">
          <div class="card-body text-center">
            <h5 class="plan-title">{{ plan.name }}</h5>
            <p class="plan-price">R$ {{ plan.price }}</p>
            <p>{{ plan.description }}</p>
            <button
              class="btn btn-primary"
              @click="openPurchaseModal(plan.id)"
              data-bs-toggle="modal"
              data-bs-target="#purchaseModal"
            >
              Comprar
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal de compra do plano -->
    <div
      class="modal fade"
      id="purchaseModal"
      tabindex="-1"
      aria-labelledby="purchaseModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title text" id="purchaseModalLabel">Detalhes da Compra</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <h4 class="text">{{ planStore.selectedPlan?.name }}</h4>
            <p class="text">Preço: R$ {{ planStore.selectedPlan?.price }}</p>

            <form @submit.prevent="handlePurchase">
              
              <div class="mb-3">
                <label for="paymentMethod" class="form-label text">Forma de Pagamento</label>
                <select v-model="form.paymentMethod" class="form-select" id="paymentMethod" required>
                  <option value="cartao">Cartão de Crédito</option>

                </select>
              </div>
              <div>
          <h6 class="text">Informações Gerais</h6>
          <ul class="list-group mb-3">
            <li class="list-group-item"><strong>Tipo de Pagamento:</strong> {{ cardData.billingType }}</li>
            <li class="list-group-item"><strong>Valor:</strong> R$ {{  planStore.selectedPlan?.price }}</li>
            <li class="list-group-item"><strong>Data de Vencimento:</strong> {{ cardData.dueDate }}</li>
            <li class="list-group-item"><strong>IP Remoto:</strong> {{ cardData.remoteIp }}</li>
          </ul>
        </div>
        <div>
          <h6 class="text">Dados do Cartão</h6>
          <ul class="list-group mb-3">
            <li class="list-group-item"><strong>Nome do Titular:</strong> {{ cardData.creditCard.holderName }}</li>
            <li class="list-group-item"><strong>Número do Cartão:</strong> {{ cardData.creditCard.number }}</li>
            <li class="list-group-item"><strong>Mês de Expiração:</strong> {{ cardData.creditCard.expiryMonth }}</li>
            <li class="list-group-item"><strong>Ano de Expiração:</strong> {{ cardData.creditCard.expiryYear }}</li>
            <li class="list-group-item"><strong>CCV:</strong> {{ cardData.creditCard.ccv }}</li>
          </ul>
        </div>
        <div>
          <h6 class="text">Dados do Titular</h6>
          <ul class="list-group mb-3">
            <li class="list-group-item"><strong>Nome:</strong> {{ cardData.creditCardHolderInfo.name }}</li>
            <li class="list-group-item"><strong>Email:</strong> {{ cardData.creditCardHolderInfo.email }}</li>
            <li class="list-group-item"><strong>CPF/CNPJ:</strong> {{ cardData.creditCardHolderInfo.cpfCnpj }}</li>
            <li class="list-group-item"><strong>CEP:</strong> {{ cardData.creditCardHolderInfo.postalCode }}</li>
            <li class="list-group-item"><strong>Número do Endereço:</strong> {{ cardData.creditCardHolderInfo.addressNumber }}</li>
            <li class="list-group-item"><strong>Complemento:</strong> {{ cardData.creditCardHolderInfo.addressComplement || 'N/A' }}</li>
            <li class="list-group-item"><strong>Telefone:</strong> {{ cardData.creditCardHolderInfo.phone }}</li>
            <li class="list-group-item"><strong>Celular:</strong> {{ cardData.creditCardHolderInfo.mobilePhone }}</li>
          </ul>
        </div>
              <div class="text-center">
                <button type="submit" class="btn btn-primary">Confirmar Compra</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { usePlanStore } from "@/stores/PlanStore";
import { usePaymentStore } from "@/stores/PaymentStore";
// Acessando a store
const planStore = usePlanStore();
const PaymentStore = usePaymentStore();
// Formulário local para a compra
const form = ref({
  name: "",
  email: "",
  paymentMethod: "cartao",
});

const cardData = ref({
  billingType: 'CREDIT_CARD',
  value: 0,
  dueDate: '2025-07-21',
  creditCard: {
    holderName: 'marcelo h almeida',
    number: '5162306219378829',
    expiryMonth: '05',
    expiryYear: '2025',
    ccv: '318',
  },
  creditCardHolderInfo: {
    name: 'Marcelo Henrique Almeida',
    email: 'marcelo.almeida@gmail.com',
    cpfCnpj: '24971563792',
    postalCode: '89223-005',
    addressNumber: '277',
    addressComplement: null,
    phone: '4738010919',
    mobilePhone: '47998781877',
  },
  remoteIp: '116.213.42.532',
});

const openPurchaseModal = async (planId: number) => {
  await planStore.findById(planId);
  cardData.value.value = planStore.selectedPlan?.price ?? 0
};

// Função para processar a compra
const handlePurchase = async () => {
  try {
    PaymentStore.createPayment(cardData.value);  // Certifique-se de passar como `cardData.value` se estiver usando `ref`
  } catch (error) {
    // Caso ocorra algum erro no processo de compra
    console.error('Erro ao processar a compra', error);
  }
};

// Carrega os planos ao montar o componente
onMounted(() => {
  planStore.findAll();
});
</script>
