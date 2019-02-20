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
            v-model="$store.state.dark"
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
            v-model="$store.state.primaryDrawer.type"
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
            v-model="$store.state.primaryDrawer.clipped"
            label="Clipped"
            primary
          />
          <v-switch
            v-model="$store.state.primaryDrawer.floating"
            label="Floating"
            primary
          />
          <v-switch
            v-model="$store.state.primaryDrawer.mini"
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
            v-model="$store.state.footer.inset"
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
    
    }
  }

</script>
