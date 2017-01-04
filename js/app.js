var ajv = new Ajv();
var validate = ajv.compile({ "type": "string" });
var valid = validate({ a: 1 });
if (!valid)
    console.log(validate.errors);
else
    console.log("valid");
//# sourceMappingURL=app.js.map