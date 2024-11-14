<template>
  <div class="container">
  <h1 class="text topic">Dashboard</h1>
    <div class="row g-4 mb-4 mt-5">
      <div class="col-6 col-md-4">
        <div class="card p-3 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Usuários Ativos</h5>
            <p class="card-text display-6">{{ activeUsers }}</p>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-4">
        <div class="card p-3 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Usuários Inativos</h5>
            <p class="card-text display-6">{{ inactiveUsers }}</p>
          </div>
        </div>
      </div>

      <div class="col-6 col-md-4">
        <div class="card p-3 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Cursos</h5>
            <p class="card-text display-6">{{ totalCourses }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-12 col-md-6">
          <div class="card p-3 shadow-sm mb-4">
          <div class="card-body text-center">
            <h5 class="card-title">Pagantes</h5>
            <p class="card-text display-6">{{ payingUsers }}</p>
          </div>
        </div>
        <div class="card p-3 shadow-sm mb-4">
          <div class="card-body text-center">
            <h5 class="card-title">Cancelados</h5>
            <p class="card-text display-6">{{ cancelledUsers }}</p>
          </div>
        </div>
        <div class="card p-3 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Em Pendência</h5>
            <p class="card-text display-6">{{ pendingUsers }}</p>
          </div>
        </div>
      </div>

      <div class="col-12  col-sm-12  col-lg-6 col-md-6">
          <div class="card p-3 shadow-sm">
            <h5 class="card-title">Novos Usuários</h5>
          <div class="card-body">
            <apexchart type="line" :options="chartOptions" :series="series" />
          </div>
        </div>
      </div>
      <div class="col-12 col-sm-12 col-lg-6 col-md-6">
        <div class="card p-3 shadow-sm">
          <h5 class="card-title">Usuários Ativos</h5>
          <div class="card-body">
            <apexchart type="bar" :options="barChartOptions" :series="barSeries" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import VueApexCharts from 'vue3-apexcharts';

const activeUsers = ref(150);
const inactiveUsers = ref(35);
const totalCourses = ref(12);
const payingUsers = ref(80);
const cancelledUsers = ref(5);
const pendingUsers = ref(10);

const series = ref([
  {
    name: 'Sales',
    data: [50, 30, 70, 100, 60]
  }
]);

const chartOptions = ref({
  chart: { type: 'line' },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
  }
});

const barSeries = ref([
  {
    name: 'Usuários Ativos',
    data: [120, 90, 150, 200, 180]
  }

]);

const barChartOptions = ref({
  chart: { type: 'bar' },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May']
  },

  plotOptions: {
    bar: {
      columnWidth: '50%',
    }
  }
});


</script>

<style scoped>
.apexcharts-canvas {
  max-width: 100% !important;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  border: none;
}

.shadow-sm {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
  color: #6c757d;
}

.display-6 {
  font-size: 1.5rem;
  color: #007bff;
}
</style>
