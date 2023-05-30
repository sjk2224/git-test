<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-btn to="/" label="Vue Study" class="text-subtitle1" unelevated></q-btn>
        </q-toolbar-title>

        <q-btn to="/signin" flat text-color="white" label="회원가입"></q-btn>
        <!--<div>Quasar v{{ $q.version }}</div>-->
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list>
        <q-item-label
          header
        >
          Essential Links
        </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from 'vue'
import EssentialLink from 'components/EssentialLink.vue'

const linksList = [
   {
    title: 'Vue 기초 문법',
    caption: 'Vue 핵심가이드',
    icon: 'school',
    link: '/vue'
  },
  {
    title: 'Shopping List',
    caption: 'vue component 실습',
    icon: 'code',
    link: '/shop'
  },
  {
    title: 'todo',
    caption: 'vue + store 실습',
    icon: 'code',
    link: '/todo'
  },
  {
    title: 'db todo list',
    caption: 'vue + database 실습',
    icon: 'chat',
    link: '/dbtodo'
  },
]

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      }
    }
  }
})
</script>
