<template>
  <div>
    <v-container
      fluid
      mx-0
      px-0
    >
      <v-layout
        column
        align-center=""
      >
        <v-card
          color="transparent"
          flat
          px-0
          mx-0
          my-5
          min-width="800"
          width="150%"
        >
          <canvas
            id="myChart"
            class="minSize"
          />
        </v-card>
      </v-layout>
    </v-container>
    <v-container
      fluid
      grid-list-md
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          my-5
          xs12
        >
          <v-slider
            v-model="minScore"
            thumb-label="always"

            label="Skill IQ"
            max="300"
            :color="`rgba(${parseInt(255 - (minScore))}, 209, ${parseInt(minScore)}, 1)`"
            @input="minScoreUpdate"
          />
        </v-flex>

        <v-flex
          xs12
          sm6
        >
          <v-card>
            <v-card-title
              primary-title
            >
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
          </v-card>
        </v-flex>
        <v-flex
          xs12
          sm6
        >
          <v-card>
            <v-card-title
              primary-title
            >
              <h3>
                Why Skill IQ?
              </h3>
            </v-card-title>
            <v-card-text>
              <p>
                Skill IQ is a measurement of proficiency in a technology skill.
              </p>
              <p>The difficulty of the questions change based on right or wrong answers given by all individuals who have taken a particular assessment. The tests are short and comprehensive because they are based on modern test theories, Bayesian statistics, and machine learning to model skills and find questions which match those skills.</p>
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
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>
<script>
  import Chart from 'chart.js'
  import skills from './skills.json'

  export default {

    data: function () {
      return {
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
                label: 'Pluralsight Skill IQ',
                data: this.iconScore,
                backgroundColor: [
                  'rgba(205, 99, 192, 0)'
                ],
                borderColor: [
                  'rgba(255,99,192,0)'
                ],
                borderWidth: 2,
                lineTension: 0.8,
                pointRadius: 0,
                pointBackgroundColor: this.color,
                pointStyle: this.icons
              },
              {
                label: 'Pluralsight Skill IQ',
                data: this.roleIQ,
                backgroundColor: [
                  'rgba(99, 99, 192, 0.1)'
                ],
                borderColor: [
                  'rgba(99,99,192,0.2)'
                ],
                borderWidth: 4,
                lineTension: 0.1,
                pointRadius: 6,
                pointHoverRadius: 12,
                pointBackgroundColor: this.color,
                pointStyle: 'circle'
              }

            ]
          },
          options: {
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
            this.color.push(
              `rgba(${parseInt(255 - (skill.percentile * 3))}, 209, ${parseInt(skill.percentile * 3)}, 1)`)
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
