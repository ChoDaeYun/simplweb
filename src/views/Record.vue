<template>
  <v-timeline>
    <v-timeline-item
      v-for="(list,index) in recodedata"
      :key="index"
      :color="bgcolor[index]"
      large
    >
      <v-card>
        <v-card-title class="headline" :class="bgcolor[index]">
          <h2 class="display-1 white--text font-weight-light">
            {{list.title}} 
            {{list.datetxt}}
          </h2>
          <h5>
          </h5>
        </v-card-title>
        <v-container>
          <v-layout>
            <v-flex xs10 >
            <span v-for="(v,i) in list.rlist"
            :key=i>
            {{v.text}}<br/>
            </span>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </v-timeline-item>
  </v-timeline>
</template>
<script>
export default{
  data(){
    return {
      bgcolor:['purple lighten-2','amber lighten-2','cyan lighten-2','red lighten-2','green lighten-2','blue lighten-2'],
      recodedata:[
        {datetxt:"2xxx.xx ~2xxx.xx ",title:"profile 1",rlist:[
          {text:'child text 01'},
          {text:'child text 02'}
        ]},
        {datetxt:"2xxx.xx ~2xxx.xx ",title:"profile 2",rlist:[
          {text:'child text 01'},
          {text:'child text 02'}
        ]}
      ]
    }
  }
}
</script>