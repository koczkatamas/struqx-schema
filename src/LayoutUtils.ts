declare var qxSchema: any;

qxSchema.ui = qxSchema.ui || {};
qxSchema.model = qxSchema.model || {};
qxSchema.model.editors = qxSchema.model.editors || {};

class LayoutUtils {
    static removeIndent(code) {
        var lines = code.split('\n');

        // remove empty lines at the beginning
        while (lines.length && /^\s*$/.test(lines[0]))
            lines.shift();

        // remove empty lines at the end
        while (lines.length && /^\s*$/.test(lines[lines.length - 1]))
            lines.pop();

        // calculate minimum indent which can be found at every line
        var indentLens = lines.map(line => /^ */.exec(line)[0].length);
        var indentLen = Math.min(...indentLens);
        if (indentLen)
            lines = lines.map(line => line.substr(indentLen));

        return lines.join('\n').trim();
    }

    static addEditor(name, lang, onChanged: (origin:string, newValue:string) => void = null) {
        var editorName = `${name}Editor`;
        var editor = qxSchema.ui[editorName] = ace.edit(editorName);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode(`ace/mode/${lang}`);
        editor.setOption('tabSize', 2);
        editor.$blockScrolling = Infinity; // TODO: remove this line after they fix ACE not to throw warning to the console

        var localStorageKey = `model_${name}_value`;
        var value = localStorage.getItem(localStorageKey) || this.removeIndent(editor.getValue());
        qxSchema.model.editors[name] = value;
        editor.setValue(value, -1);

        var editorDelay = new Delayed(750);
        editor.on('change', () => editorDelay.do(() => {
            var newValue = editor.getValue();
            localStorage.setItem(localStorageKey, newValue);
            qxSchema.model.editors[name] = newValue;
            onChanged && onChanged(name, newValue);
        }));
    }    
}
