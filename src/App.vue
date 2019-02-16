<template>
  <v-app
    id="sandbox"
    :dark="$store.state.dark"
  >
    <v-navigation-drawer
      v-model="$store.state.primaryDrawer.model"
      :permanent="$store.state.primaryDrawer.type === 'permanent'"
      :temporary="$store.state.primaryDrawer.type === 'temporary'"
      :clipped="$store.state.primaryDrawer.clipped"
      :floating="$store.state.primaryDrawer.floating"
      :mini-variant="$store.state.primaryDrawer.mini"
      absolute
      overflow
      app
    >
      <v-list two-line>
        <v-subheader inset>
          Settings
        </v-subheader>

        <v-list-tile
          avatar
          to="/"
        >
          <v-list-tile-avatar>
            <v-icon>settings</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>Interface </v-list-tile-title>
            <v-list-tile-sub-title>Display options</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-list-tile
          avatar
          to="about"
        >
          <v-list-tile-avatar>
            <v-icon>settings</v-icon>
          </v-list-tile-avatar>
          <v-list-tile-content>
            <v-list-tile-title>About</v-list-tile-title>
            <v-list-tile-sub-title>Carlos</v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      app
      absolute
      :clipped-left="$store.state.primaryDrawer.clipped"
    >
      <v-toolbar-side-icon
        v-if="$store.state.primaryDrawer.type !== 'permanent'"
        @click.stop="$store.state.primaryDrawer.model = !$store.state.primaryDrawer.model"
      />
      <v-toolbar-title>Carlos Velasco - Frontend Developer</v-toolbar-title>
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
            md10
          >
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer
      :inset="$store.state.footer.inset"
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
    )

  }
</script>
