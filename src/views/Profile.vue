<template>
  <v-flex xs12 sm6 offset-sm3>
    <v-card
      class="mx-auto"
    >
      <v-img
        class="white--text"
        :aspect-ratio="16/9"
        :src="profileimg"
      >
        <v-card-title class="align-end fill-height">text title</v-card-title>
      </v-img>

      <v-card-text>
        <span ondragstart="return false" ondragend="return false" draggable="true" ><v-icon>perm_identity</v-icon> Name</span><br>
        <span ondragstart="return false" ondragend="return false" draggable="true" ><v-icon>phonelink_ring</v-icon> Phone</span><br>
        <span ondragstart="return false" ondragend="return false" draggable="true" ><v-icon>email</v-icon> Email</span><br>
      </v-card-text>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data(){
    return {
      profileimg:"static/images/logo.png"
    }
  }
}
</script>