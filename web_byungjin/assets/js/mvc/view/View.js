/**
 *
 * @param el 등록할 View 노드
 * @returns {View} View를 반환
 */
export function getView(el = new HTMLElement()) {
    return {
        el,
        emit(evt, data) {
            const customEvt = new CustomEvent(evt, { detail: data });
            el.dispatchEvent(customEvt);
        },
        on(evt, action) {
            el.addEventListener(evt, (ev) => action(ev));
        },
        setEl(el) {
            this.el = el;
        },
        getEl() {
            return el;
        }
    };
}
//# sourceMappingURL=View.js.map