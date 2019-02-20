<template>
  <v-card>
    <v-card-text>
      <v-layout
        row
        wrap
      >
        <v-flex
          xs12
          md6
        >
          <span>Scheme</span>
          <v-switch
            v-model="dark"
            primary
            label="Dark"
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <span>Drawer </span>

          <v-radio-group
            v-model="primaryDrawerType"
            column
          >
            <v-radio
              v-for="drawer in drawers"
              :key="drawer"
              primary
              :label="drawer"
              :value="drawer.toLowerCase()"
            />
          </v-radio-group>
          <v-switch
            v-model="primaryDrawerClipped"
            label="Clipped"
            primary
          />
          <v-switch
            v-model="primaryDrawerFloating"
            label="Floating"
            primary
          />
          <v-switch
            v-model="primaryDrawerMini"
            label="Mini"
            primary
          />
        </v-flex>
        <v-flex
          xs12
          md6
        >
          <span>Footer</span>
          <v-switch
            v-model="footerInset"
            label="Inset"
            primary
          />
        </v-flex>
      </v-layout>
    </v-card-text>
    <v-card-actions>
      <v-spacer />
      <v-btn flat>
        Cancel
      </v-btn>
      <v-btn
        flat
        color="primary"
      >
        Submit
      </v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
  export default {
    name: 'Interface',
    data: function () {

      return {
        drawers: ['Default (no property)', 'Permanent', 'Temporary']
      }

    },
    computed: {
      dark: {

        get () {

          return this.$store.state.dark

        },
        set (value) {

          this.$store.commit('updateDark', value)

        }

      },
      title: {
        get () {

          return this.$store.state.title

        },
        set (value) {

          this.$store.commit('updateTitle', value)

        }
      },
      primaryDrawerType: {
        get () {

          return this.$store.state.primaryDrawer.type

        },
        set (value) {

          this.$store.commit('updatePrimaryDrawerType', value)

        }
      },
      primaryDrawerClipped: {
        get () {

          return this.$store.state.primaryDrawer.clipped

        },
        set (value) {

          this.$store.commit('updatePrimaryDrawerClipped', value)

        }
      },
      primaryDrawerFloating: {
        get () {

          return this.$store.state.primaryDrawer.floating

        },
        set (value) {

          this.$store.commit('updatePrimaryDrawerFloating', value)

        }
      },
      primaryDrawerMini: {
        get () {

          return this.$store.state.primaryDrawer.mini

        },
        set (value) {

          this.$store.commit('updatePrimaryDrawerMini', value)

        }
      },
      footerInset: {
        get () {

          return this.$store.state.footer.inset

        },
        set (value) {

          this.$store.commit('updateFooterInset', value)

        }
      }
    }
  }

</script>
