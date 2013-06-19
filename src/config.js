//һ��JS�ļ���ʾһ��module��
//һ��module����������һ��component�����ࡣ
//������ϵֻ������componentû��module��������
//��û������componet����componet��������ģ������ͬ�������������Ӧ����Խ��١�
iui.define({
    name: "jQuery",
    path: "../lib/jQuery.js"
});


iui.define({
    name: "element",
    path: "../src/element/js/element.js",
    components: [
        {
            name: "Inovout.Element",
            depens: ["jQuery"]
        }
    ]
});
iui.define({
    name: "view",
    path: "../src/view/js/view.js",
    loaded: "Inovout.View.loadWidget",
    components: [
        {
            name: "Inovout.View",
            depens: ["Inovout.Element"],
        }
    ]
});
iui.define({
    name: "page",
    path: "../src/page/js/page.js",
    components: [
        {
            name: "Page",
            depens: ["Inovout.View"]
        }
    ]
});
iui.define({
    name: "list",
    path: "../src/list/js/list.js",
    components: [
        {
            name: "Inovout.View.List",
            test: function (ele) { return ele.find(".list").length > 0; },
            depens: ["Inovout.View"]
        }
    ]
});
iui.define({
    name: "tip",
    path: "../src/tip/js/tip.js",
    components: [
        {
            name: "Inovout.View.Tip",
            test: function (ele) { return ele.find(".tip").length > 0; },
            depens: ["Inovout.View"]
        }
    ]
});