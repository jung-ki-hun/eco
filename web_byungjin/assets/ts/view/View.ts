/**
 * View's Interface
 */
export interface View {
    el : HTMLElement,
    emit(evt : string, data : object) : void,
    on(evt : string, action : (data : Event)=>void) : void,
    setEl(el : HTMLElement) : void
    getEl() : HTMLElement
}
/**
 * 
 * @param el 등록할 View 노드
 * @returns {View} View를 반환
 */
export function getView(el : HTMLElement = new HTMLElement()): View {
    return {
        el,
        emit(evt : string, data : object) : void{
            const customEvt = new CustomEvent(evt, {detail : data});
            el.dispatchEvent(customEvt);
        },
        on(evt : string, action : (data : Event)=>void) : void{
            el.addEventListener(evt, (ev)=>action(ev));
        },
        setEl(el : HTMLElement) : void{
            this.el = el;
        },
        getEl() : HTMLElement {
            return el;
        }
    };
}

