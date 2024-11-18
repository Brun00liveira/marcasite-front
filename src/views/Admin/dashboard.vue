<template>
  <div class="container">
    <h1 class="text topic">Dashboard</h1>
    <div class="row g-4 mb-4 mt-5">
      <div class="col-12 col-md-4">
        <div class="card p-3 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Usuários Ativos</h5>
            <p class="card-text display-6">{{ dashboardStore.dashboard.activeUser }}</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card p-3 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Usuários Inativos</h5>
            <p class="card-text display-6">{{ dashboardStore.dashboard.inactiveUsers || 0 }}</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-md-4">
        <div class="card p-3 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Cursos</h5>
            <p class="card-text display-6">{{ dashboardStore.dashboard.coursesQuantity }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="row g-4 mb-4">
      <div class="col-12 col-md-6" style="margin-top: 40px;">
        <div class="card p-3 shadow-sm mb-4">
          <div class="card-body text-center">
            <h5 class="card-title">Pagantes</h5>
            <p class="card-text display-6">{{ dashboardStore.dashboard.paymentReceivedCount }}</p>
          </div>
        </div>
        <div class="card p-3 shadow-sm mb-4">
          <div class="card-body text-center">
            <h5 class="card-title">Cancelados</h5>
            <p class="card-text display-6">{{ dashboardStore.dashboard.paymentPending || 0 }}</p>
          </div>
        </div>
        <div class="card p-3 shadow-sm">
          <div class="card-body text-center">
            <h5 class="card-title">Em Pendência</h5>
            <p class="card-text display-6">{{ dashboardStore.dashboard.totalEnrollments }}</p>
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-12 col-lg-6 col-md-6">
        <div class="card p-3 shadow-sm">
          <h5 class="card-title">Novos Usuários</h5>
          <div class="card-body">
            <apexchart type="line" :options="chartOptions" :series="series" />
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-12 col-lg-6 col-md-6">
        <div class="card p-3 shadow-sm">
          <h5 class="card-title">Usuários por Categoria</h5>
          <div class="card-body">
            <apexchart type="bar" :options="barChartOptions" :series="barSeries" />
          </div>
        </div>
      </div>

      <div class="col-12 col-sm-12 col-lg-6 col-md-6">
        <div class="card p-3 shadow-sm">
          <h5 class="card-title">Cursos por Categoria</h5>
          <div class="card-body">
            <apexchart type="bar" :options="barCoursesOptions" :series="barCoursesSeries" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, watchEffect } from 'vue';
import { useDashboardStore } from '@/stores/DashboardStore';


const dashboardStore = useDashboardStore();

// Reactive reference to dashboard data
const dashboard = dashboardStore.dashboard;
onMounted(async () => {
  const data = dashboardStore.findAll();

});

// Chart options nd data, now using real data from the store
const series = ref([
  {
    name: 'Novos Usuários',
    data: dashboard.labelsEnrollments.map((date, index) => dashboard.seriesEnrollments[index])
  }
]);


const chartOptions = ref({
  chart: { type: 'line' },
  xaxis: {
    categories: dashboardStore.dashboard.labelsEnrollments
  }
});

const barSeries = ref([
  {
    name: 'Usuários por categoria',
    data: dashboardStore.dashboard.seriesCategory
  }
]);

const barCoursesSeries = ref([
  {
    name: 'Cursos por categoria',
    data: dashboardStore.dashboard.seriesCourse
  }
]);

const barCoursesOptions = ref({
  chart: { type: 'bar' },
  xaxis: {
    categories: dashboardStore.dashboard.labelsCourse
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    }
  }
});

const barChartOptions = ref({
  chart: { type: 'bar' },
  xaxis: {
    categories: dashboardStore.dashboard.labelsCategory
  },
  plotOptions: {
    bar: {
      columnWidth: '50%',
    }
  }
});

watchEffect(() => {
  series.value = [{
    name: 'Novos Usuários',
    data: dashboardStore.dashboard.labelsEnrollments.map((date, index) => dashboardStore.dashboard.seriesEnrollments[index])
  }];
  chartOptions.value = {
    chart: { type: 'line' },
    xaxis: {
      categories: dashboardStore.dashboard.labelsEnrollments
    }
  };
  barSeries.value = [{
    name: 'Usuários por categoria',
    data: dashboardStore.dashboard.seriesCategory
  }];
  barCoursesSeries.value = [{
    name: 'Cursos por categoria',
    data: dashboardStore.dashboard.seriesCourse
  }];
  barCoursesOptions.value = {
    chart: { type: 'bar' },
    xaxis: {
      categories: dashboardStore.dashboard.labelsCourse
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      }
    }
  };
  barChartOptions.value = {
    chart: { type: 'bar' },
    xaxis: {
      categories: dashboardStore.dashboard.labelsCategory
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      }
    }
  };
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
  color: #333;
}
</style>
