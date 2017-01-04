declare var Ajv: any, jsyaml: any, Mustache: any;

$(() => {
    LayoutUtils.addEditor("model", "yaml", refresh);
    LayoutUtils.addEditor("schema", "json", refresh);
    LayoutUtils.addEditor("template", "csharp", refresh);
    LayoutUtils.addEditor("code", "javascript", refresh);
    LayoutUtils.addEditor("output", "csharp", null, true);

    function refresh(origin: 'model' | 'schema' | 'template' | 'code' | 'init', newValue: string) {
        qxSchema.model.model = jsyaml.load(qxSchema.model.editors.model);

        qxSchema.model.validation = new Ajv().compile(JSON.parse(qxSchema.model.editors.schema));
        var valid = qxSchema.model.validation(qxSchema.model.model);
        if (!valid)
            console.log(qxSchema.model.validation.errors);
        else
            console.log("model is valid");

        qxSchema.model.processedModel = eval(`(function(model){ ${qxSchema.model.editors.code} })(qxSchema.model.model)`);

        qxSchema.model.output = Mustache.render(qxSchema.model.editors.template, qxSchema.model.processedModel);
        qxSchema.ui.outputEditor.setValue(qxSchema.model.output, -1);
    }

    refresh('init', null);
});