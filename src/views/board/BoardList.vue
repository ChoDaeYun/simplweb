<template>
    <v-layout row wrap>
      <v-expansion-panel
       v-model="panel"
       expand
       focusable
       >
        <v-expansion-panel-content v-for="(board) of boards" :key=board.key>
          <div slot="header">
            {{board.title}} ({{ board.createAt}})       
            <v-icon 
              large 
              @click.stop="editboard(board.key)" 
              color="blue darken-2" 
              v-if="$store.state.user === true"
            >edit</v-icon>
            <v-icon 
              large 
              @click.stop="dialogshow(board.key)" 
              color="red darken-2" 
              v-if="$store.state.user === true"
            >delete</v-icon>
          </div>
          <v-card>
            <v-card-text>
              <VueQuill 
                :content="board.content"
                />
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-dialog
      v-model="dialog"
      max-width="320"
    >
      <v-card>
        <v-card-title class="headline">글을 삭제 하시겠습니까?</v-card-title>

        <v-card-text>
          삭제 할 경우 복구가 불가능 합니다. 삭제 하시겠습니까?
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialoghide()"
          >
            취소
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click.stop="deleteboard(selectid)"
          >
            삭제
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    </v-layout>
</template>

<script>
import moment from 'moment'
import VueQuill from '@/components/EditorView'
import firebase from '@/firebase'

export default {
    components: {
        VueQuill
    },
    data() {
        return {
            dialog:false,
            selectid:null,
            panel:[true],
            boards: [],
            errors: [],
            ref: firebase.firestore().collection('boards').orderBy("createAt","desc"),
        }
    },
    created () {
      this.ref.onSnapshot((querySnapshot) => {
        this.boards = [];
        querySnapshot.forEach((doc) => {
          this.boards.push({
            key: doc.id,
            title: doc.data().title,
            content: doc.data().content,
            createAt:moment(doc.data().createAt.toDate()).format("YYYY.MM.DD")
          });            
        });
      });
    },
    methods: {
      dialogshow(id){
          this.dialog = true
          this.selectid = id
      },
      dialoghide(){
          this.dialog = false
          this.selectid = null
      },
      editboard (id) {
        this.$router.push({
          name: 'boardedit',
          params: { id: id }
        })
      },
      deleteboard(id){
        firebase.firestore().collection('boards').doc(id).delete().then(() => {
          this.dialoghide()
        }).catch((error) => {
          alert("Error removing document: ", error);
        });
      }
    }
}
</script>

