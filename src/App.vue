<template>
  <VApp
    id="sandbox"
    :dark="$store.state.dark"
  >
    <VNavigationDrawer
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
      <VList
        two-line
        :dense="toolbarDense"
      >
        <VSubheader inset>
          Navigation
        </VSubheader>
        <VListTile
          avatar
          to="/"
        >
          <VListTileAvatar>
            <VIcon large>
              category
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Skill IQ
            </VListTileTitle>
            <VListTileSubTitle>
              Pluralsight Iris Quotient
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VListTile
          avatar
          to="/employment"
        >
          <VListTileAvatar>
            <VIcon large>
              work
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Employment
            </VListTileTitle>
            <VListTileSubTitle>
              History
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
        <VDivider />
        <VSpacer />
        <VSubheader inset>
          Settings
        </VSubheader>
        <VListTile
          avatar
          to="interface"
        >
          <VListTileAvatar>
            <VIcon large>
              settings
            </VIcon>
          </VListTileAvatar>
          <VListTileContent>
            <VListTileTitle>
              Interface
            </VListTileTitle>

            <VListTileSubTitle>
              Display options
            </VListTileSubTitle>
          </VListTileContent>
        </VListTile>
      </VList>
    </VNavigationDrawer>
    <VToolbar
      app
      absolute
      :clipped-left="primaryDrawerClipped"
      :dense="toolbarDense"
      :flat="toolbarFlat"
    >
      <VToolbarSideIcon
        v-if="primaryDrawerType !== 'permanent'"
        @click.stop="primaryDrawerModel = !primaryDrawerModel"
      />
      <VToolbarTitle>
        {{ title }}
      </VToolbarTitle>
    </VToolbar>
    <VContent>
      <VContainer fluid>
        <VLayout
          align-center
          justify-center
        >
          <VFlex
            xs12
            sm12
          >
            <RouterView />
          </VFlex>
        </VLayout>
      </VContainer>
    </VContent>
    <VFooter
      :inset="footerInset"
      app
      :absolute="footerFloating"
    >
      <span class="px-3">&copy; {{ new Date().getFullYear() }}</span>
    </VFooter>
  </VApp>
</template>

<script>
  export default {
    data: () => ({

    }
    ),
    computed: {
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
      toolbarFlat: {
        get () {

          return this.$store.state.toolbar.flat

        },
        set (value) {

          this.$store.commit('updateToolbarFlat', value)

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
      footerInset: {
        get () {

          return this.$store.state.footer.inset

        },
        set (value) {

          this.$store.commit('updateFooterInset', value)

        }
      },
      footerFloating: {
        get () {

          return this.$store.state.footer.floating

        },
        set (value) {

          this.$store.commit('updateFooterFloating', value)

        }

      },
      primaryDrawerDense: {
        get() {

          return this.$store.state.primaryDrawer.dense

        },
        set(value) {

          this.$store.commit('updatePrimaryDrawerDense', value)

        }

      }

    }

  }
</script>
