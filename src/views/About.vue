<template>
  <VCard
    class="about"
    color="transparent"
    flat
  >
    <canvas
      id="myChart"
    />
</VCard>
</template>
<script>
  import Chart from 'chart.js'
  export default {
    data: function () {
      return {
        set: [32, 26, 52, 244, 14, 42],

        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange']
      }
    },
    created: function () {
      this.$nextTick(() => {
        const ctx = document.getElementById('myChart').getContext('2d')

        const myChart = new Chart(ctx, {
          type: 'radar',
          data: {
            labels: this.labels,
            datasets: [{
              label: 'Skill',
              data: this.set,
              backgroundColor: [
                'rgba(205, 99, 192, 0.2)'
              ],
              borderColor: [
                'rgba(255,99,192,1)'
              ],
              borderWidth: 3
            }]
          },
          options: {
            legend: { display: false },
            scale: {
              ticks: {
                display: false
              }
            }

          }
        })
      })
    },
    methods: {

      addData: function (chart, label, data) {
        chart.data.labels.push(label)
        chart.data.datasets.forEach((dataset) => {
          dataset.data.push(data)
        })
        chart.update()
      },
      removeData: function (chart) {
        chart.data.labels.pop()
        chart.data.datasets.forEach((dataset) => {
          dataset.data.pop()
        })
        chart.update()
      }
    }

  }
</script>
