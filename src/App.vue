<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
    >
      <v-list dense>
        <template v-for="(item,index) in $store.state.menuList">
        <v-layout
          v-if="item.heading"
          :key="index"
          row
          align-center
        >
        </v-layout>
        <v-list-group
          v-else-if="item.children"
          :key="item.text"
          v-model="item.model"
          :prepend-icon="item.model ? item.icon : item['icon-alt']"
          append-icon=""
        >
          <template v-slot:activator>
            <v-list-tile>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ item.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </template>
          <v-list-tile
            v-for="(child, i) in item.children"
            :key="i"
            router :to="{name:child.url}"
          >
            <v-list-tile-action v-if="child.icon">
              <v-icon>{{ child.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ child.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>
        <v-list-tile v-else :key="index" router :to="{name:item.url}">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title>
              {{ item.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="blue darken-3"
      dark
      app
      fixed
    >
      <v-toolbar-title style="width: 300px" class="ml-0 pl-3">
        <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
        <span class="hidden-sm-and-down">Welcome to the site</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn-toggle  v-if="$store.state.user === true">
        <v-btn small color="error"  @click="logout">Logout</v-btn>
        <v-btn small color="orange darken-2" dark router :to="{name:'boardwrite'}" >
          <v-icon dark left>edit</v-icon>Write
        </v-btn>
      </v-btn-toggle>  
      <v-btn-toggle v-else>
        <v-btn small color="primary"  router :to="{name:'login'}" >Login</v-btn>        
      </v-btn-toggle>
      
    </v-toolbar>
    <v-content>
      <v-container fluid>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>
<script>
  export default {
    data: () => ({
      drawer: null
    }),
    methods: {
      logout(){
        this.$store.dispatch('userLogout')
      }
    },created() {
        this.$store.dispatch('userState')
    },
  }
</script>
