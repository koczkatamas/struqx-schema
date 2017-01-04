declare var qxSchema: any;

qxSchema.ui = qxSchema.ui || {};

class LayoutUtils {
    static removeIndent(code) {
        console.log(code);
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

    static addEditor(name, lang, onChanged) {
        var editor = qxSchema.ui[name] = ace.edit(name);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode(`ace/mode/${lang}`);
        editor.$blockScrolling = Infinity; // TODO: remove this line after they fix ACE not to throw warning to the console

        var localStorageKey = `uiState_${name}_value`;
        var value = localStorage.getItem(localStorageKey) || this.removeIndent(editor.getValue());
        editor.setValue(value, -1);

        var editorDelay = new Delayed(500);
        editor.on('change', () => editorDelay.do(() => {
            localStorage.setItem(localStorageKey, editor.getValue());
            onChanged && onChanged();
        }));
    }    
}
