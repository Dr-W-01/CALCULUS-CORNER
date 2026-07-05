window.CCKatex = (function () {
    const MACROS = {
        '\\arcsec': '\\operatorname{arcsec}',
        '\\arccsc': '\\operatorname{arccsc}',
        '\\arccot': '\\operatorname{arccot}',
        '\\sech': '\\operatorname{sech}',
        '\\csch': '\\operatorname{csch}',
        '\\arcsech': '\\operatorname{arcsech}',
        '\\arccsch': '\\operatorname{arccsch}',
        '\\arccot': '\\operatorname{arccot}',
        '\\arccsc': '\\operatorname{arccsc}',
    };

    function options(overrides = {}) {
        return {
            throwOnError: false,
            ...overrides,
            macros: { ...MACROS, ...(overrides.macros || {}) },
        };
    }

    function render(el, tex, overrides = {}) {
        if (!el || typeof katex === 'undefined') return;
        katex.render(tex, el, options(overrides));
    }

    return { MACROS, options, render };
})();