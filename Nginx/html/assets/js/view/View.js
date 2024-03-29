/**
 * @param el {HTMLElement}
 * @returns {View} View를 반환
 */
export function getView(el) {
    return {
        el,
        emit(evt, data) {
            this.debug(`emit - ${evt}`);
            const customEvt = new CustomEvent(evt, { detail: data });
            this.el.dispatchEvent(customEvt);
        },
        on(evt, action) {
            this.el.addEventListener(evt, (ev) => action(ev));
        },
        setEl(el) {
            this.el = el;
        },
        getEl() {
            return this.el;
        },
        selEl(sel) {
            return this.el.querySelector(sel);
        },
        getTargetEl(el, limit, o) {
            for (; el.tagName != limit; el = el.parentElement)
                if (el.tagName == o)
                    return el;
            return null;
        },
        debug(msg) {
            if (window.DEBUG != null && window.DEBUG == true) {
                console.log("[View]" + msg);
            }
        }
    };
}
//# sourceMappingURL=View.js.map