import Vue from "vue"
import Vuex from "vuex"
import firebase from 'firebase'
import router from '@/router'


Vue.use(Vuex)


export default new Vuex.Store({
  state: {
    user: null,
    menuList:[
      {icon:"account_balance",text:"Home",url:"home"},
      {icon:"account_box",text:"Profile",url:"profile"},
      {icon:"theaters",text:"Record",url:"record"},
      {icon:"list",text:"Board",url:"board"},
      {icon:"comment",text:"Comment",url:"comment"}
    ] 
  },
  mutations: {
    userStateUpdate(state,s) {
      state.user = s
    },
  },
  actions: {
    userJoin({commit},{ email, password }) {      
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(currentUser => {              
        firebase.auth().currentUser.getIdToken()
          .then((idToken) => {
            router.push({name:'home'})            
            commit("userStateUpdate",true)
          })
          .catch((error) => {
            alert('입력 정보를 확인해주세요[1].'+error.message)
          });
      })
      .catch((err) => {
          alert('입력 정보를 확인해주세요[2].'+err.message)
      })      
    },
    userLogout({commit}){
      firebase.auth().signOut()
        .then(() => {
          commit("userStateUpdate",true)
          router.push({name:'login'})
      }).catch((error) => {
        alert('오류가 발생하였습니다.')
      });
    },
    userState({commit}){
      firebase.auth().onAuthStateChanged(function(u) {
        if (u) {
          commit("userStateUpdate",true)
        } else {          
          commit("userStateUpdate",null)    
        }
      })
    }
  }
})
