<template>
  <v-app
    id="sandbox"
    :dark="interfaceOptions.dark"
  >
    <v-navigation-drawer
      v-model="interfaceOptions.primaryDrawer.model"
      :permanent="interfaceOptions.primaryDrawer.type === 'permanent'"
      :temporary="interfaceOptions.primaryDrawer.type === 'temporary'"
      :clipped="interfaceOptions.primaryDrawer.clipped"
      :floating="interfaceOptions.primaryDrawer.floating"
      :mini-variant="interfaceOptions.primaryDrawer.mini"
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
          to="home"
          :interface-options="interfaceOptions"
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
      :clipped-left="interfaceOptions.primaryDrawer.clipped"
    >
      <v-toolbar-side-icon
        v-if="interfaceOptions.primaryDrawer.type !== 'permanent'"
        @click.stop="interfaceOptions.primaryDrawer.model = !interfaceOptions.primaryDrawer.model"
      />
      <v-toolbar-title>Carlos Velasco - Frontend Developer</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <v-layout
          align-center
          justify-center
        >
          <v-flex xs10>
            <router-view />
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
    <v-footer
      :inset="interfaceOptions.footer.inset"
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
