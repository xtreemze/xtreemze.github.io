<template>
  <VCard
    color="transparent"
    flat
  >
    <VCardText>
      <VLayout
        row
        wrap
      >
        <VFlex
          shrink
          ma-4
        >
          <span>Scheme</span>
          <VSwitch
            v-model="dark"
            primary
            label="Dark"
          />
        </VFlex>
        <VFlex
          shrink
          ma-4
        >
          <span>Drawer </span>

          <VRadioGroup
            v-model="primaryDrawerType"
            column
          >
            <VRadio
              v-for="drawer in drawers"
              :key="drawer"
              primary
              :label="drawer"
              :value="drawer.toLowerCase()"
            />
          </VRadioGroup>
          <VSwitch
            v-model="primaryDrawerClipped"
            label="Clipped"
            primary
          />
          <VSwitch
            v-model="primaryDrawerFloating"
            label="Floating"
            primary
          />
          <VSwitch
            v-model="primaryDrawerMini"
            label="Mini"
            primary
          />
          <VSwitch
            v-model="primaryDrawerDense"
            label="Dense"
            primary
          />
        </VFlex>
        <VFlex
          shrink
          ma-4
        >
          <span>Toolbar </span>

          <VSwitch
            v-model="toolbarDense"
            label="Dense"
            primary
          />
          <VSwitch
            v-model="toolbarFlat"
            label="Flat"
            primary
          />
        </VFlex>
        <VFlex
          shrink
          ma-4
        >
          <span>Footer</span>
          <VSwitch
            v-model="footerInset"
            label="Inset"
            primary
          />
          <VSwitch
            v-model="footerFloating"
            label="Floating"
            primary
          />
        </VFlex>
      </VLayout>
    </VCardText>
  </VCard>
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
      primaryDrawerDense: {
        get() {

          return this.$store.state.primaryDrawer.dense

        },
        set(value) {

          this.$store.commit('updatePrimaryDrawerDense', value)

        }

      },

      toolbarDense: {
        get () {

          return this.$store.state.toolbar.dense

        },
        set (value) {

          this.$store.commit('updateToolbarDense', value)

        }

      },
      toolbarFlat: {
        get () {

          return this.$store.state.toolbar.flat

        },
        set (value) {

          this.$store.commit('updateToolbarFlat', value)

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
      },

      footerFloating: {
        get() {

          return this.$store.state.footer.floating

        },
        set(value) {

          this.$store.commit('updateFooterFloating', value)

        }

      }

    }
  }

</script>
