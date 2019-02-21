<template>
  <VCard>
    <VCardText>
      <VLayout
        row
        wrap
      >
        <VFlex
          xs12
          md6
        >
          <span>Scheme</span>
          <VSwitch
            v-model="dark"
            primary
            label="Dark"
          />
        </VFlex>
        <VFlex
          xs12
          md6
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
        </VFlex>
        <VFlex
          xs12
          md6
        >
          <span>Footer</span>
          <VSwitch
            v-model="footerInset"
            label="Inset"
            primary
          />
        </VFlex>
      </VLayout>
    </VCardText>
    <VCardActions>
      <VSpacer />
      <VBtn flat>
        Cancel
      </VBtn>
      <VBtn
        flat
        color="primary"
      >
        Submit
      </VBtn>
    </VCardActions>
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
