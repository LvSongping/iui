var Page = Class.create(View, {

    initialize: function () {
        $super("Page");//����ViewClass
    },
    getView: function (id) {
        /// <summary>
        /// ����Id��ȡView����
        /// </summary>
        /// <param name="id" type="String">
        /// View����Id
        /// </param>
        /// <returns type="View" />
        return id;
    }
});