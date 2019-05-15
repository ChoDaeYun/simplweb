<template>
<div>
    <v-form
    ref="form"
    v-model="valid"
    class="mx-auto"
    >
    <v-container>
      <v-layout row wrap>
            <v-flex xs12 sm6 md2>
                <v-text-field 
                    prepend-icon="person" 
                    name="author" 
                    label="Author" 
                    type="text" 
                    v-model="author" 
                    :rules="authorRules" 
                    required 
                ></v-text-field>
            </v-flex>
            <v-flex xs12 sm6 md2>
            <v-text-field 
                    prepend-icon="lock" 
                    name="password" 
                    label="Password" 
                    id="password" 
                    type="password" 
                    required 
                    v-model="password" 
                    :rules="passwordRules">
                </v-text-field>  
            </v-flex> 
            <v-flex xs12 sm6 md6>
                <v-text-field 
                    prepend-icon="comment" 
                    name="content" 
                    label="Content" 
                    type="text" 
                    v-model="content" 
                    :rules="contentRules" 
                    required>
                </v-text-field>
            </v-flex>
            <div class="text-xs-center" >
                <v-btn color="primary" fab small :disabled="!valid" @click="submit">
                    <v-icon>edit</v-icon>
                </v-btn>
            </div>
        </v-layout>
      </v-container>
    </v-form>
    <v-flex>
        <v-card>
            <v-toolbar color="cyan" dark>
            <v-toolbar-title>한줄쓰기</v-toolbar-title>
            </v-toolbar>
            <v-list two-line>
                <template v-for="(comment, index) in comments">
                <v-divider :key=index v-if="index > 0"></v-divider>
                <v-list-tile
                    :key="comment.key"
                >
                    <v-list-tile-content>
                    <v-list-tile-title v-html="comment.author"></v-list-tile-title>
                    <v-list-tile-sub-title v-html="comment.content"></v-list-tile-sub-title>
                    </v-list-tile-content>
                    <v-list-tile-action>
                        <v-btn icon ripple>
                            <v-icon color="red lighten-1" @click.stop="dialogshow(comment.key)" >delete</v-icon>
                        </v-btn>
                    </v-list-tile-action>
                </v-list-tile>
                </template>
            </v-list>
        </v-card>
    </v-flex>
    <v-dialog
      v-model="dialog"
      max-width="320"
    >
      <v-card>
        <v-card-title class="headline">삭제를 하시겠습니까?</v-card-title>

        <v-card-text>
          작성시 등록한 비밀번호를 입력해주세요.
          <v-flex xs12 >
                <v-text-field 
                    prepend-icon="lock"
                    label="비밀번호를 작성해주세요." 
                    type="password" 
                    v-model="passworddel" 
                    :rules="passwordRules" 
                    required>
                </v-text-field>
            </v-flex>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click="dialog = false"
          >
            취소
          </v-btn>

          <v-btn
            color="green darken-1"
            flat="flat"
            @click.stop="deletecomment(passworddel)"
          >
            삭제
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
</div>
</template>

<script>
import moment from 'moment'
import firebase from '@/firebase'
import { timestamp } from '@/firebase'

export default {
    data() {
        return {
            dialog: false,
            passworddel:'',
            selectid:null,
            valid: false,
            comments: [],
            errors: [],
            ref: firebase.firestore().collection('comments'),
            author:'',
            authorRules:[
                v => !!v || '작성자를 확인해주세요.'
            ],
            content:'',
            contentRules: [
                v => !!v || '내용을 확인해주세요.'
            ],
            password:'',
            passwordRules: [
                v => !!v || '비밀번호를 확인해주세요.',
                v =>
                    v.length === 4 ||
                    '비밀번호는 4자리로 설정가능합니다.'
            ],
            saveData:{}
        }
    },
    created () {
      this.ref.orderBy("createAt","desc").onSnapshot((querySnapshot) => {
        this.comments = [];
        querySnapshot.forEach((doc) => {
            if(doc.id){
                console.log(doc.id)
                this.comments.push({
                key: doc.id,
                author: doc.data().author+"<span class='grey--text text--lighten-1 caption'>("+moment(doc.data().createAt.toDate()).format("YYYY.MM.DD HH:mm:ss")+")</span>",
                content: doc.data().content
                });        
            }          
        });
      });
    },
    methods: {
        dialogshow(id){
            this.passworddel = ''
            this.dialog = true
            this.selectid = id
        },
        dialoghide(){
            this.dialog = false
            this.selectid = null
            this.passworddel = ''
        },
        submit(){
            if (this.$refs.form.validate()) {
                this.saveData.author = this.author
                this.saveData.content = this.content
                this.saveData.password = this.password
                this.saveData.createAt = timestamp
                this.ref.add(this.saveData).then((docRef) => {
                    this.saveData = []
                    this.$refs.form.reset()
                })
                .catch((error) => {
                    alert("Error adding document: ", error);
                });
            }            
        },
        deletecomment(p){
            if(p.length !== 4){
                alert('비밀번호를 확인해주세요.')
                this.dialoghide()
            }
            firebase.firestore().collection('comments').doc(this.selectid).get().then((doc) => {
                if (doc.exists) {
                    if(doc.data().password === p){
                        this.deletego()
                    }else{
                        alert('비밀번호를 확인해주세요.')
                        this.dialoghide()                  
                    }
                } else {
                    alert('잘못된 접근입니다. ')
                    this.dialoghide()
                }
            })         
          
        },
        deletego(){
            firebase.firestore().collection('comments').doc(this.selectid).delete().then(() =>{
                
            }).catch((error) => {
                alert("Error removing document: ", error);
            })
            this.dialoghide()
        }
    }
}
</script>

