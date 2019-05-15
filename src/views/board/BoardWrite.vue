<template>
<div>
  <v-container
    fluid
    grid-list-lg
  >
    <v-form
      ref="form"
      v-model="valid"
      class="mx-auto"
    >
      <v-text-field
        v-model="boardTitle"
        :rules="boardTitleRules"
        label="제목"
        required
      ></v-text-field>

      
      <VueQuill
        :content="content"
        :editorOption="editorOption"
        @setContents="getContent"
        text-left
        />
      
      <v-btn
        color="success"
        @click="savedata"
      >
        저장
      </v-btn>
    </v-form>
  </v-container>
</div>
</template>

<script>
  import VueQuill from '@/components/Editor'
  import { timestamp } from '@/firebase'
  import firebase from '@/firebase'
  export default {
    components: {
        VueQuill
    },
    data: () => ({
      valid: false,
      boardTitle: null,
      boardTitleRules: [
        v => !!v || '제목을 확인해주세요.'
      ],
      content:'',
      editorOption:[],      
      ref: firebase.firestore().collection('boards'),
      board: {}  
    }),
    methods: {
      savedata () {
        if(this.$store.state.user !== true){
                alert('잘못된 접근입니다. ')
                this.$router.push({name:"home"})
        }else{
          if(!this.boardTitle || this.boardTitle===null || !this.content) 
          alert('게시글을 확인해주세요.') 
          else{
            this.board.title = this.boardTitle
            this.board.content = this.content
            this.board.createAt = timestamp
            this.ref.add(this.board).then((docRef) => {
              this.board = []
              this.$router.push({ name: 'board'})
            })
            .catch((error) => {
              alert("Error adding document: ", error);
            });
          }        
        }
      },
      getContent(v){
        this.content = v
      }
    }
  }
</script>