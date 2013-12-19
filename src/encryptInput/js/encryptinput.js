Inovout.XAML.EncryptInput = Class.create({
    initialize: function (element) {
        var name = element.attr("name");
        var reg_pk = element.data("encrypt");
        //ȥ��element��name���� 
        element.removeAttr("name");
        //���ͬ��������
        var hiden = $("<input type='hidden' name=" + name + " />");
        element.append(hiden);

        //����Ԫ�ص�change�¼�
        element.change.addListener(function (sender, args) {
            var inputValue = element.val();
            var itemEncrypted = cryptico.encrypt(inputValue, reg_pk);
            hiden.text(itemEncrypted.cipher);
        });
        return this;
    }
})