Inovout.HAML.CommandBinder = Class.create(Inovout.HAML.EventAdapter, {
    initialize: function ($super, event, buildFunction) {
        $super(event, buildFunction);
        return this;
    }
});

Inovout.HAML.Parsers.CommandBinderParser = {
    parse: function (scopeElement) {
        Inovout.Element.eventNames.each(function (eventName) {
            scopeElement.find("[data-" + eventName + "-command]").each(function (seletedElement) {
                //����data-*-command��ʶ
                var eventAdapterExpression = seletedElement.attr("data-" + eventName + "-command");
                //��ȡevent
                var event = seletedElement[eventName];
                var eventAdapter = new Inovout.HAML.CommandBinder(event, Inovout.View.buildFunction);
                //��ȡ��������
                eventAdapter.addListener(eventAdapterExpression, seletedElement);
            });
        })
    }
}