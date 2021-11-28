/**
 * View's Interface
 */
export interface View {
    el : HTMLElement,
    emit(evt : string, data : object) : void,
    on(evt : string, action : (event : Event)=>void) : void,
    setEl(el : HTMLElement) : void
    getEl() : HTMLElement,
    selEl(sel : any) : HTMLElement,
    getTargetEl(el : Element, limit : string, o : string) : Element,
    debug(msg : string) : void,
}
/**
 * @param el {HTMLElement}
 * @returns {View} View를 반환
 */
export function getView(el? : HTMLElement): View {
    return {
        el,
        emit(evt : string, data : object) : void{            
            this.debug(`emit - ${evt}`)
            const customEvt = new CustomEvent(evt, {detail : data});
            this.el.dispatchEvent(customEvt);
        },
        on(evt : string, action : (event : Event)=>void) : void{
            this.el.addEventListener(evt, (ev)=>action(ev));
        },
        setEl(el : HTMLElement) : void{
            this.el = el;
        },
        getEl() : HTMLElement {
            return this.el;
        },
        selEl(sel : any){
            return this.el.querySelector(sel)
        },
        getTargetEl(el : Element, limit : string, o : string) : Element{
            for(; el.tagName != limit; el = el.parentElement)
                if(el.tagName == o) return el
            return null
        },
        debug(msg : string){
            if((window as any).DEBUG != null && (window as any).DEBUG == true){
                console.log("[View]" + msg)
            }
        }
    };
}

