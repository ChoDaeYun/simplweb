<template>
    <div>
    <v-container fluid>
        <quill-editor 
                v-model="contentedit"
                :config="editorOption"
                @change="onEditorChange($event)"
                >
        </quill-editor>
    </v-container>
    </div>
</template>
<script>
    import { quillEditor } from 'vue-quill-editor'
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    export default {        
        props:{
            content:{
                type:String,
                default:'',
                required: true
            }
        },
        components: {
            quillEditor
        },
        data () {
            return {
                editorOption: {                   
                    modules: {'toolbar': false},
                    boundary: document.body,
                    placeholder:' 작성된 내용이 없습니다.',
                    readOnly: false,
                    theme: 'bubble',
                }
            }
        },
        methods:{
            onEditorChange({quill,html,text}){
                this.$emit('setContents',html)
            }
        },
        computed: {
            contentedit:{
                get: function(){
                    return this.content;
                },
                set: function(newValue){
                    
                }   
            }
        }
    }
</script>
