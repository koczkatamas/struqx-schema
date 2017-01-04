$(() => {
    LayoutUtils.addEditor("model", "yaml", refresh);
    LayoutUtils.addEditor("schema", "json", refresh);
    LayoutUtils.addEditor("template", null, refresh);
    LayoutUtils.addEditor("code", "javascript", refresh);
    LayoutUtils.addEditor("output", "csharp");
    function refresh(origin, newValue) {
        qxSchema.model.model = jsyaml.load(qxSchema.model.editors.model);
        qxSchema.model.validation = new Ajv().compile(JSON.parse(qxSchema.model.editors.schema));
        var valid = qxSchema.model.validation(qxSchema.model.model);
        if (!valid)
            console.log(qxSchema.model.validation.errors);
        else
            console.log("model is valid");
        qxSchema.model.output = Mustache.render(qxSchema.model.editors.template, qxSchema.model.model);
        qxSchema.ui.outputEditor.setValue(qxSchema.model.output, -1);
    }
    refresh('init', null);
});
//# sourceMappingURL=app.js.map