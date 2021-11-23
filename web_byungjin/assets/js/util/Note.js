import "https://code.jquery.com/jquery-3.4.1.slim.min.js"

import "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"

/**
 * @module NoteAPIs
 */

/**
 * @typedef {Object} NoteAPIs
 * @property {string} note_target_str
 * @property {function} getTextHTML
 * @property {function} getTextPlain
 * @property {function} setup
 */
/**
 * 글쓰기 영역 설정 및 기본 API 반환
 * @returns {NoteAPIs}
 */
export function getNoteApi(){
    return {
        note_target_str : null,
        setup(t){
            //Start
            if(!document.querySelector(t))
                throw new Error(`No Note Target!!`)

            this.note_target_str = t
            //Init SummerNote
            $(this.note_target_str).summernote({
                placeholder: '',
                tabsize: 2,
                minHeight: 450,
                height: null,
                focus : true,
                lang : 'ko-KR',
                toolbar: [
                    ['style', ['style']],
                    ['font', ['bold', 'underline', 'clear']],
                    ['color', ['color']],
                    ['para', ['ul', 'ol', 'paragraph']],
                    ['table', ['table']],
                    ['insert', ['link']],
                    ['view', ['fullscreen', 'codeview', 'help']]
                ]
            })
        },
        /**
         * HTML data
         * @returns {string}
         */
        getTextHTML(){
            if(this.note_target_str == null) return null

            return $(this.note_target_str).summernote("code")
        },
        /**
         * PlainText
         * @returns {string}
         */
        getTextPlain(){
            if(this.note_target_str == null) return null

            return $($(this.note_target_str).summernote("code")).text()
        }
    }
}