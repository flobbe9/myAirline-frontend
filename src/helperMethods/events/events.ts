// TODO: add docs


export function addEventListenerForClass(eventTargetClass: HTMLCollectionOf<Element>, 
                                         event: string, 
                                         eventFunc: (i: number) => void) {

    Array.from(eventTargetClass).forEach((eventTargetElement, i) => {
        eventTargetElement.addEventListener(event, () => 
            eventFunc(i));
    })
}