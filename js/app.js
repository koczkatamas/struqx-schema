$(() => {
    LayoutUtils.addEditor("model", "yaml", refresh);
    LayoutUtils.addEditor("schema", "json", refresh);
    LayoutUtils.addEditor("template", "yaml", refresh);
    LayoutUtils.addEditor("code", "javascript", refresh);
    LayoutUtils.addEditor("output", "javascript");
    function refresh(origin, newValue) {
        qxSchema.model.model = jsyaml.load(qxSchema.model.editors.model);
        qxSchema.model.validation = new Ajv().compile(JSON.parse(qxSchema.model.editors.schema));
        var valid = qxSchema.model.validation(qxSchema.model.model);
        if (!valid)
            console.log(qxSchema.model.validation.errors);
        else
            console.log("model is valid");
    }
    refresh('init', null);
});
//# sourceMappingURL=app.js.map