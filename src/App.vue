<template>
  <v-app
    id="sandbox"
    :dark="$store.state.dark"
  >
    <v-navigation-drawer
      v-model="primaryDrawerModel"
      :permanent="primaryDrawerType === 'permanent'"
      :temporary="primaryDrawerType === 'temporary'"
      :clipped="primaryDrawerClipped"
      :floating="primaryDrawerFloating"
      :mini-variant="primaryDrawerMini"
      absolute
      overflow
      app
    >
      <v-list two-line>
        <v-subheader inset>
          Navigation
        </v-subheader>
        <v-list-tile
          avatar
          to="/"
        >
          <v-list-tile-avatar>
            <v-icon>
              settings
            </v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              Skill IQ
            </v-list-tile-title>
            <v-list-tile-sub-title>
              Pluralsight Iris Quotient
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          avatar
          to="/"
        >
          <v-list-tile-avatar>
            <v-icon>
              business
            </v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              Employment
            </v-list-tile-title>
            <v-list-tile-sub-title>
              History
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-subheader inset>
          Settings
        </v-subheader>

        <v-list-tile
          avatar
          to="interface"
        >
          <v-list-tile-avatar>
            <v-icon>
              settings
            </v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>
              Interface
            </v-list-tile-title>

            <v-list-tile-sub-title>
              Display options
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      absolute
      :clipped-left="primaryDrawerClipped"
    >
      <v-toolbar-side-icon
        v-if="primaryDrawerType !== 'permanent'"
        @click.stop="primaryDrawerModel = !primaryDrawerModel"
      />
      <v-toolbar-title>
        {{ title }}
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout
          align-center
          justify-center
        >
          <v-flex
            xs12
            sm12
          >
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer
      :inset="footerInset"
      app
    >
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
  export default {
    data: () => ({

    }
    ),
    computed:{
      title: {
        get () {

          return this.$store.state.title

        },
        set (value) {

          this.$store.commit('updateTitle', value)

        }
      },
      primaryDrawerModel: {
        get () {

          return this.$store.state.primaryDrawer.model

        },
        set (value) {

          this.$store.commit('updatePrimaryDrawerModel', value)

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
