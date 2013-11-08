//һ��JS�ļ���ʾһ��module��
//һ��module����������һ��component�����ࡣ
//������ϵֻ������componentû��module��������
//��û������componet����componet��������ģ������ͬ�������������Ӧ����Խ��١�
iui.define({
    name: "jQuery",
    path: "../../../lib/jQuery.js"
});
iui.define({
    name: "prototype-lang",
    path: "../../jslang/prototype-lang.js",
    components: [
        { name: "Object" },
        { name: "Class" }
    ]
});
iui.define({
    name: "iui-lang",
    path: "../../jslang/iui-lang.js",
    components: [
        { name: "Event", depens: ["Class"] },
        { name: "EventAdapter" },
        { name: "HashMap", depens: ["Class"] }
    ]
});
iui.define({
    name: "element",
    path: "../../element/js/element.js",
    components: [
        {
            name: "Inovout.Element",
            depens: ["jQuery", "Class", "HashMap"]
        }
    ]
});
iui.define({
    name: "view",
    path: "../../view/js/view.js",
    //loaded: "Inovout.View.loadWidget",
    components: [
        {
            name: "Inovout.View",
            depens: ["Inovout.Element"],
        }
    ]
});
iui.define({
    name: "page",
    path: "../../page/js/page.js",
    components: [
        {
            name: "Page",
            depens: ["Inovout.View"]
        }
    ]
});
iui.define({
    name: "list",
    path: "../../list/js/list.js",
    components: [
                {
                    name: "Inovout.View.List",
                    depens: ["Inovout.View", "Page"]
                },
                {
                    name: "Inovout.View.TabList",
                    test: function (ele) { return ele.find(".tabList").length > 0; },
                    depens: ["Inovout.View.List"]
                }
    ]
});