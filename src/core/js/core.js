Inovout = {};
var inits = {};

//main $(function)=$(document).ready(function)
//�뷽������document.load�¼���Ŀǰ����jQery��
jQuery(function () {
    for (initKey in inits) {
        inits[initKey](initKey);
    }
});
