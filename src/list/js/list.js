Inovout.Widgets.List = Class.create(Inovout.View, {
    initialize: function ($super, element) {
        $super(element);
        this.selectedChanged = new Event("selectedChanged", this);
        return this;
    },
    bindData: function (data) {
        if (Object.isJSON(data)) {
            element.empty();
            $.each(data, function (i, item) {
                this.add(item);
            });

        } else {
            $.getJSON(data).done(function (result) {
                this.bindData(result);
            });
        }
    },
    wrapEventArgs: function (selectedItem) {
        var eventArgs = {
            text: selectedItem.text()
        }
        //if (!this.valueKeys) {
        //    this.valueKeys = [];
        //    var attributes = selectedItem.getAttributes();
        //    for (var i = 0; i < attributes.length; i++) {
        //        var attrName = attributes[i].name;
        //        var dataAttrIndex = attrName.indexOf("data-");
        //        if (dataAttrIndex > -1) {
        //            this.valueKeys.push(attrName.substring(5, attrName.length));
        //        }
        //    }
        //}
        //for (var i = 0; i < this.valueKeys.length; i++) {
        //    eventArgs[this.valueKeys[i]] = selectedItem.data(this.valueKeys[i]);
        //}
        Object.extend(eventArgs, selectedItem.data());
        eventArgs.value = eventArgs.value || selectedItem.val() || selectedItem.text();
        return eventArgs;
    },
    valueKeys: undefined
});
Inovout.Widgets.DropDownList = Class.create(Inovout.Widgets.List, {
    initialize: function ($super, element) {
        $super(element);
        var me = this;
        element.change.addListener(function (sender, args) {
            var selectedOption = me.element.children("option:selected")[0];
            me.selectedChanged.fire(me, me.wrapEventArgs(selectedOption));
        });
        return this;
    },
    add: function (item) {
        this.element.append("<option value=\""+item.value+"\">"+item.value+"</option>");
    }
});

Inovout.Widgets.TabList = Class.create(Inovout.Widgets.List, {
    initialize: function ($super, element) {
        $super(element);
        this.selectedChanged = new Event("selectedChanged", this);
        var me = this;
        this.element.children().each(function (liElement) {
            liElement.click.addListener(function (sender, args) {
                var clickItem = sender;//点击的li
                var activeItem = me.element.find("li.selected")[0];//当前活动的li
                if (!clickItem.equals(activeItem)) {
                    activeItem.removeClass("selected");
                    clickItem.addClass("selected");
                    var eventArgs = {
                        text: clickItem.text()
                    }
                    if (!me.valueKeys) {
                        me.valueKeys = [];
                        var attributes = clickItem.getAttributes();
                        for (var i = 0; i < attributes.length; i++) {
                            var attrName = attributes[i].name;
                            var dataAttrIndex = attrName.indexOf("data-");
                            if (dataAttrIndex > -1) {
                                me.valueKeys.push(attrName.substring(5, attrName.length));
                            }
                        }
                    }
                    for (var i = 0; i < me.valueKeys.length; i++) {
                        eventArgs[me.valueKeys[i]] = clickItem.attr("data-" + me.valueKeys[i]);
                    }
                    eventArgs.value = eventArgs.value || clickItem.text();

                    me.selectedChanged.fire(me, eventArgs);
                }
            });
        });
        return this;
    },
    valueKeys: undefined
});
