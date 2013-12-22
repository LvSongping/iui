var Inovout = {};
Inovout.XAML = {};
Inovout.XAML.EventAdapter = Class.create({
    initialize: function (event, buildFunction) {
        this.event = event;
        buildFunction = buildFunction || Function.wrap;
        this.buildFunction = buildFunction;
        return this;
    },
    listen: function (sender, args) {
        this.buildFunction("sender,args", this.fnExpression).call(this.scope, sender, args);
     },
    addListener: function (fnExpression, scope, options) {
        this.fnExpression = fnExpression;
        this.scope = scope;
        this.event.addListener(this.listen, this, options);
    }
});
