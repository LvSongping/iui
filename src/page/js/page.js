var Page =  Class.create({

    initialize: function () {
    }};
});

Page.fn = Page.prototype = {
    init: function () {

        ///	<summary>
        ///		��ʼ�� Page �����ʵ����
        ///	</summary>

        //����Domain���⣬���ΪIP�򲻴���
        var domianRegex = /(?:[\w_-]+)(?:\.(?:cn|com|gov|edu|mil|net|org|uk|us|tw|se|ru|mo|kr|jp|it|hk|gb|ca|au))+/;
        if (location.hostname) {
            var documnetDomain = location.hostname.match(domianRegex);
            if (documnetDomain) {
                window.document.domain = documnetDomain;
            }
        }

        $(document).ready(function () {

            //��ʱ���ajaxpro��ʱ����
            if (typeof AjaxPro != "undefined") {
                AjaxPro.timeoutPeriod = 20 * 60 * 1000;
            }
            //����ǣɣţ�����input�ģ�������Ŀ��
            if ($.browser.msie && $.browser.version == "6.0") {
                $("form input:text").not(".isFreeWidth").css("width", "99%");
            }
            $("body").hidden();
            //HidCtl('tableRow_XYDTJZSH,tableRow_TDZSBH,');
            //����ؼ�Ȩ�ޣ����⻹�账���Զ��������ؼ����磺����
            if (page.permissionControlIDs && page.permissionControlIDs.length) {
                var pagePermission = new PagePermission();
                pagePermission.beforePermission = function (dom, state) {
                    var domJQ = $(dom);
                    var id = dom.id;
                    if (id && id.substr(0, 9) == "divHeader") {
                        var parent = domJQ.parent();
                        var rowParent = parent.parent().parent().find("[name='view']");
                        var index = parent.children().index(domJQ[0]);
                        if (index > -1) {
                            rowParent.children().eq(index).html("&nbsp");
                        }
                        return false;
                    }
                };
                pagePermission.checkPermission(page.permissionControlIDs);
            }

            if (document.URL.toUpperCase().indexOf("KCDJBG/VIEW.ASPX", 0) > 0) {
                //setTimeout(delayFunction, 3000);
                //Ϊ�˿��ⶨ�籨��ҳ��Ľ�ַ���ĵؿ�Ȧ�б�����ע����setTimeout(delayFunction, 3000);
                delayFunction();
            } else {
                delayFunction();
            }
            function delayFunction() {
                if (page.pageModel == "readOnly") {
                    var pagePermission2 = new PagePermission();
                    $.each($(":input:visible"), function (i, n) {
                        pagePermission2.controlReadOnly($(n));
                    });
                    $.each($("div.blockFly.target"), function (i, n) {
                        pagePermission2.controlHide($(n));
                    });
                    $("[id$='Tip']").remove();
                }
                //������߶�
                $(".tableRow").each(function () {
                    $(this).adjustTableHeight();
                });
                $("body").css("visibility", "inherit");
                $("body").visit();
                //������ύ����֤
                $("form").each(function () {
                    if (!$.formValidator) {
                        return;
                    }
                    //��֤
                    //var dataValid = DataDetailsView(this.id);
                    DataDetailsView({ formid: this.id });

                    //dataValid.extraFnValid(test);
                    //�ύ�¼�����
                    var form = this;
                    var submitButton = $(this).find("input[type='submit']");
                    submitButton.bind("click", function (event, actionName) {
                        var formJQ = $(form);
                        var formId = formJQ.attr("id");
                        page.submit(formId, actionName);
                        $(this).unbind("submit");
                        return false;
                    });
                });
            }
            //            $(":text,textarea").showTip();
            var globalShowTip = false;
            //���п������������Ƿ���Ҫ������ʾ��
            if (typeof globalShowTip != "undefined")
                $(":text,textarea").showTip({ isWork: globalShowTip });
            else
                $(":text,textarea").showTip({ isWork: true });


            //����ajax����
            $(document).ajaxSend(function (evt, request, settings) {

                page.ajaxSettings.add(settings);
            }).ajaxComplete(function (evt, request, settings) {
                page.ajaxSettings.remove(settings);
            });
            var tabPage = new TabPage("tab");
            tabPage.clickedClassName = "clickedClassName";
            tabPage.dataSource = ".formPage";
            tabPage.dataBind();
            //�������а�ť���Ƴ��ƽ�Ч��
            changeBgImage();
            // �󶨴������ô�С�¼�.δ������ͨ��ĳ�ֻ��Ƽ����¼�������Ƶ��.
            if (page.onResize) $(window).resize(page.onResize);
            $(window).resize(page.subWindowArea);

            //�����ģ̬���壬��ִ��һд

            if (window.dialogArguments) {
                if (typeof (window.dialogArguments.data) != "undefined") { //��ʱ�������ƽ̨����ĳ�ͻ
                    window.isFromFloatWindow = true;
                    var toolBar = new ModalDialogToolbar("ModalDialogToolbar");
                    toolBar.dataSource = window.dialogArguments.btns;
                    toolBar.dataBind();

                    FloatWindow.fn.toolBar = toolBar;
                    if (typeof (setValue) == "function") {
                        setValue(window.dialogArguments.data);
                    }

                    $("a:first").trigger("focus");
                }
            }
            page.subWindowArea();
            //��ʼ���ؼ�
            if (page.onInitControl) page.onInitControl();
            //��ʼ��������
            if (page.onInitController) page.onInitController();
            //��ʼ����ǰ�¼�
            if (page.onBeforeRun) page.onBeforeRun();
            if (page.initControl.items) {
                page.initControl.excute();
            }
            $("#form1").visit();
        });

        return this;
    },
    ajaxSettings: new ArrayList(),  ///	<summary>ҳ�����Ŀؼ�����</summary>
    permissionControlIds: "",       ///	<summary>�账��Ȩ�޵Ŀؼ�Id���ַ���</summary>
    permissionRegionControlIds: "",       ///	<summary>�账��Ȩ�޵Ŀؼ�Id���ַ���</summary>
    pageMode: undefined,           ///	<summary>ҳ��ģʽ��View��ʾֻ��</summary>
    controls: new ArrayList(),       ///	<summary>ҳ�����Ŀؼ�����</summary>
    onInitControl: undefined,        ///	<summary>��ʼ���ؼ��¼�</summary>
    onInitController: undefined,     ///	<summary>��ʼ���ؼ��¼�</summary>
    onBeforeRun: undefined,           ///	<summary>��ʼ�������¼�</summary>
    onUnload: undefined,            ///	<summary>ҳ��ж���¼�</summary>
    onResize: undefined,             ///	<summary>ҳ���С�����¼�</summary>
    initControl: function (fn) {
        if (!this.initControl.items) {
            this.initControl.items = new ArrayList();
            this.initControl.excute = function () {
                for (var i = 0; i < this.items.length; i++) {
                    this.items[i]();
                }
            }
        }

        this.initControl.items.add(fn);
    },
    beforeSubmit: function (fn) {
        ///	<summary>
        ///		�����ύǰ�¼���
        ///	</summary>
        if (!this.beforeSubmit.items) {
            this.beforeSubmit.items = new ArrayList();
            this.beforeSubmit.excute = function () {
                if (!this.items) {
                    return;
                }
                for (var i = 0; i < this.items.length; i++) {
                    if (!this.items[i]()) {
                        return false;
                    };
                }
                return true;
            }
        }
        this.beforeSubmit.items.add(fn);
    },
    addControl: function (control) {
        ///	<summary>
        ///		��ӿؼ�
        ///	</summary>
        ///	<param name="control" type="Control">
        ///     �Զ���ؼ����ʵ��
        ///</param>
        this.controls.add(control);
    },
    getControl: function (controlId) {
        ///	<summary>
        ///		��ȡ�ؼ�
        ///	</summary>
        ///	<param name="controlId" type="String">
        ///     �ؼ�Id
        ///</param>
        return this.controls.find(function (control) {
            if (control && control.controlId === controlId) return true;
        });
    },
    submit: function (formId, actionName, isSkipValidation) {
        ///	<summary>
        ///		�ύ��
        ///	</summary>
        //Ĭ�ϲ���������֤
        if (!isSkipValidation) {
            isSkipValidation = false;
        }
        var form = $("#" + formId)[0];
        //��֤ͨ���󣬲����ύ
        if (!isSkipValidation) {
            if (page.getControl("DataDetailsView") && !page.getControl("DataDetailsView").groupIsValid("1")) {
                return false;
            }
        }
        var submitBtn = $("#" + formId).find(":submit")[0];
        var actionUrl = "";
        if (actionName) {
            actionUrl = "Action=" + actionName;
        } else {
            actionUrl = "Action=" + submitBtn.id;
        }
        var url = document.location.toString();
        if (url.lastIndexOf("#") > 0) {
            url = url.substring(0, url.lastIndexOf("#"));
        }
        if (url.indexOf("?") > -1) {
            form.action = url + "&" + actionUrl;
        } else {
            form.action = url + "?" + actionUrl;
        }
        if (page.ajaxSettings.length) {
            $.blockUI({
                message: "���ڼ�����..."
            });
            var intervalId = setInterval(function () {
                if (!page.ajaxSettings.length) {
                    clearInterval(intervalId);
                    $("#" + formId)[0].submit();
                }
            }, 50);
        }
        else {
            $("#" + formId)[0].submit();
        }
    },
    lock: function () {
        if (page.isLock) return;
        page.isLock = true;
        var showmsg = "���ڴ��������У����Ժ�...";
        var width = 400;
        var height = 100;
        $.blockUI({
            message: '<div class="progressbarbox">' + showmsg + '</div>',
            css: {
                left: ($(window).width() - width) / 2 + "px",
                top: ($(window).height() - height) / 2 + "px",
                width: width + "px",
                height: height + "px",
                cursor: "default",
                border: "0px",
                background: "Transparent"
            }
        });
    },
    unLock: function () {
        if (page.isLock) {
            page.isLock = false;
            $.unblockUI();
        }
    },
    subWindowArea: function () {
        page.subWindowArea.height = $(window).height() - 50;
        $(".formPage").height($.windowHeight() - $("#tab").height() - ($("#ModalDialogToolbar").height() ? $("#ModalDialogToolbar").height() + 10 : 16));

    },
    version: "1.0.0"///	<summary>�汾��</summary>
});
