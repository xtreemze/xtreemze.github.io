<template>
  <div>
    <VContainer
      fluid
      grid-list-md
    >
      <VLayout
        row
        wrap
      >
        <VFlex
          my-5
          xs12
        >
          <VSlider
            v-model.number="size"
            label="Size"
            max="255"
            min="25"
            :color="`rgba(${parseInt(255 - (size))}, 209, ${parseInt(size)}, 1)`"
          />
        </VFlex>
      </VLayout>
    </VContainer>
    <VContainer
      fluid
      mx-0
      px-0
    >
      <VLayout
        column
        align-center
        class="skillsCard"
      >
        <VCard
          color="transparent"
          flat
          px-0
          mx-0
          my-5
          :min-width="minSize"
          :width="size + '%'"
        >
          <canvas id="myChart" />
        </VCard>
      </VLayout>
    </VContainer>
    <VContainer
      fluid
      grid-list-md
    >
      <VLayout
        row
        wrap
      >
        <VFlex
          my-5
          xs12
        >
          <VSlider
            v-model="minScore"
            thumb-label="always"
            label="Skill IQ"
            max="300"
            :color="`rgba(${parseInt(255 - (minScore))}, 209, ${parseInt(minScore)}, 1)`"
            @input="minScoreUpdate"
          />
        </VFlex>

        <VFlex
          xs12
          sm6
        >
          <VCard>
            <v-card-title primary-title>
              <h3>
                What do Skill IQ ratings mean?
              </h3>
            </v-card-title>
            <v-card-text>
              <p>
                Pluralsight Iris is a skill assessment algorithm and recommendation engine. Each skill assessment includes an Iris Quotient (IQ) score.
              </p>
              <p>
                The Pluralsight IQ is a continuous score from 0 to 300. This is based on the percentile in that skill area. Pluralsight's exclusive adaptive skill measurements work by benchmarking skill level compared to other professionals who also use the technology.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                large
                color="primary"
                href="https://www.pluralsight.com/product/iris/faqs"
              >
                Iris FAQ
              </v-btn>
            </v-card-actions>
          </VCard>
        </VFlex>
        <VFlex
          xs12
          sm6
        >
          <VCard>
            <v-card-title primary-title>
              <h3>
                Why Skill IQ?
              </h3>
            </v-card-title>
            <v-card-text>
              <p>
                Skill IQ is a measurement of proficiency in a technology skill.
              </p>
              <p>
                The difficulty of the questions change based on right or wrong answers given by all individuals who have taken a particular assessment. The tests are short and comprehensive because they are based on modern test theories, Bayesian statistics, and machine learning to model skills and find questions which match those skills.
              </p>
            </v-card-text>
            <v-card-actions>
              <v-btn
                flat
                large
                color="primary"
                href="https://help.pluralsight.com/help/what-is-pluralsight-iris-and-iq"
              >
                What is Skill IQ?
              </v-btn>
            </v-card-actions>
          </VCard>
        </VFlex>
      </VLayout>
    </VContainer>
  </div>
</template>
<script>
  import Chart from 'chart.js'

  import skills from './skills.json'

  export default {

    data: function () {

      return {
        size: '125',
        minSize: '600',
        ctx: '',
        skillChart: '',
        skillJSON: skills,
        icons: [],
        roleIQ: [],
        iconScore: [],
        percentile: [],
        color: [],
        minScore: 0,
        labels: []
      }

    },
    created: function () {

      skills.sort((a, b) => b.percentile - a.percentile)
      this.initialSkillSort()

      this.$nextTick(() => {

        this.ctx = document.getElementById('myChart').getContext('2d')

        this.skillChart = new Chart(this.ctx, {
          type: 'radar',
          data: {
            labels: this.labels,
            datasets: [
              {
                label: '',
                data: this.iconScore,
                backgroundColor: [
                  'rgba(0, 0, 0, 0)'
                ],
                borderColor: [
                  'rgba(0,0,0,0)'
                ],
                borderWidth: 0,
                lineTension: 0,
                pointRadius: 0,
                pointStyle: this.icons
              },
              {
                label: 'IQ',
                data: this.roleIQ,
                backgroundColor: [
                  'rgba(99, 99, 192, 0.1)'
                ],
                borderColor: [
                  'rgba(99,99,192,0.2)'
                ],
                borderWidth: 4,
                lineTension: 0.02,
                pointRadius: 6,
                pointHoverRadius: 12,
                pointBackgroundColor: this.color,
                pointStyle: 'circle'
              }

            ]
          },
          options: {

            maintainAspectRatio: 1,
            legend: { display: false },
            scale: {
              ticks: {
                min: 0,
                max: 350,
                display: false
              }
            }

          }
        })
        this.minScore = 128
        this.minScoreUpdate()

      })

    },
    methods: {
      initialSkillSort: function () {

        this.skillJSON = skills

        this.skillJSON.forEach(skill => {

          if (skill.score > this.minScore) {

            const icon = new Image()

            icon.src = skill.thumbnailUrl

            icon.width = 62
            icon.height = 62
            this.icons.push(icon)
            this.roleIQ.push(skill.score)
            this.iconScore.push(skill.score + 48)
            this.percentile.push(skill.percentile * 3)
            this.labels.push(skill.title)
            this.color.push(`rgba(${parseInt(255 - (skill.percentile * 3))}, 209, ${parseInt(skill.percentile * 3)}, 1)`)

          }

        })

      },

      addData: function () {

        this.skillChart.data.labels = this.labels

        this.skillChart.data.datasets[0].data = this.iconScore
        this.skillChart.data.datasets[1].data = this.roleIQ
        this.skillChart.update()

      },
      removeData: function removeData () {

        this.skillChart.data.labels.pop()
        this.skillChart.data.datasets.forEach((dataset) => {

          dataset.data.pop()

        })

      },

      minScoreUpdate: function () {

        while (this.skillChart.data.labels.length > 0) {

          this.removeData()

        }
        this.icons = []
        this.color = []
        this.roleIQ = []
        this.iconScore = []
        this.percentile = []
        this.labels = []
        this.initialSkillSort()
        this.addData()

      }
    }

  }
</script>

<style scoped>
.skillsCard {
  overflow: hidden;
}
</style>
