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
        v-model.trim="boardTitle"
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
        수정
      </v-btn>
    </v-form>
  </v-container>
</div>
</template>

<script>
  import VueQuill from '@/components/Editor'
  import firebase from '@/firebase'
  export default {
    components: {
        VueQuill
    },
    data: () => ({
      valid: false,
      boardTitle:'',
      boardTitleRules: [
        v => !!v || '제목을 확인해주세요.'
      ],
      content:'',
      editorOption:[],      
      key: null,
      board: {}
    }),
    created () {        
        const ref = firebase.firestore().collection('boards').doc(this.$route.params.id);
        ref.get().then((doc) => {
             if (doc.exists) {
                 this.key = this.$route.params.id
                 this.boardTitle = doc.data().title
                 this.content = doc.data().content
                 this.board = doc.data()
             } else {
                 alert('잘못된 접근입니다. ')
             }
        });
    },    
    methods: {
      savedata () {
        if(this.$store.state.user !== true){
                alert('잘못된 접근입니다. ')
                this.$router.push({name:"home"})
        }else{
          if(!this.boardTitle || this.boardTitle===null || !this.content || !this.key) 
          alert('게시글을 확인해주세요.') 
          else{
            const updateRef = firebase.firestore().collection('boards').doc(this.key);
            this.board.title = this.boardTitle
            this.board.content = this.content

            updateRef.set(this.board).then((docRef) => {
                this.key = ''
                this.board = {}
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