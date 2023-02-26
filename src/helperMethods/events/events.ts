export function addEventListenerForClass(eventTargetClass: HTMLCollectionOf<Element>, 
                                         event: string, 
                                         eventFunc: (i: number) => void) {

    Array.from(eventTargetClass).forEach((eventTargetElement, i) => {
        eventTargetElement.addEventListener(event, () => 
            eventFunc(i));
    })
}


export function addEventListenerForDocumentExcludeClass(excludedClass: HTMLCollectionOf<Element>,
                                                        event: string,
                                                        eventFunc: (i: number) => void) {
    
    Array.from(excludedClass).forEach((classItem, i) => {
        document.addEventListener(event, (e) => {
            if (!classItem.contains(e.target as Element)) 
                eventFunc(i);
        });
    });
}


export function toggleColorOnclick(eventTarget: HTMLElement | null, color: string) {

    if (!eventTarget) return;

    const baseColor = eventTarget.style.backgroundColor;

    eventTarget.addEventListener("mousedown", () => {
        eventTarget.style.backgroundColor = color;
    });

    eventTarget.addEventListener("mouseup", () => {
        eventTarget.style.backgroundColor = baseColor;
    });
}