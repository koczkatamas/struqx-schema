class LayoutUtils {
    static addEditor(name, lang, onChanged) {
        var editor = qxSchema.ui[name] = ace.edit(name);
        editor.setTheme("ace/theme/monokai");
        editor.getSession().setMode(`ace/mode/${lang}`);
        editor.$blockScrolling = Infinity; // TODO: remove this line after they fix ACE not to throw warning to the console
        var localStorageKey = `uiState_${name}_value`;
        var savedValue = localStorage.getItem(localStorageKey);
        if (savedValue)
            editor.setValue(savedValue, -1);
        var editorDelay = new Delayed(500);
        editor.on('change', () => editorDelay.do(() => {
            localStorage.setItem(localStorageKey, editor.getValue());
            onChanged();
        }));
    }
}
//# sourceMappingURL=layout_utils.js.map