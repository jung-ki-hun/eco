import "https://code.jquery.com/jquery-3.4.1.slim.min.js"

import "https://cdn.jsdelivr.net/npm/summernote@0.8.18/dist/summernote-lite.min.js"

const note_obj = $('#note').summernote({
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

const sub = document.querySelector(".submit")
sub.addEventListener('click', function(evt){
    console.log($($('#note').summernote("code")).text())        
})

export default note_obj
//# sourceMappingURL=boardWrite.js.map