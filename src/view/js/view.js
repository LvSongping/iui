var View = Class.create({

    initialize: function (viewClass) {
        /// <field type = 'String'>View Class Name</field>
        this.viewClass = viewClass;
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