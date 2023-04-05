/**
 * Iterate all elements of given class and add an event listener to each element.
 * 
 * @param eventTargetClass elements to add the event listener to
 * @param eventAction the event
 * @param eventFunc the callback for given event holding the current index
 * @since 0.0.1
 */
export function addEventListenerForClass(eventTargetClass: HTMLCollectionOf<Element>, 
                                         eventAction: string, 
                                         eventFunc: (i: number, event?: Event) => void): void {

    Array.from(eventTargetClass).forEach((eventTargetElement, i) => {
        eventTargetElement.addEventListener(eventAction, (event) => 
            eventFunc(i, event));
    })
}


/**
 * Adds event listener to the document excluding all elements of given class.
 * 
 * @param excludedClass class to NOT add the event listener to
 * @param eventAction the event
 * @param eventFunc the callback for given event holding the current index
 * @since 0.0.1
 */
export function addEventListenerForDocumentExcludeClass(excludedClass: HTMLCollectionOf<Element>,
                                                        eventAction: string,
                                                        eventFunc: (i: number) => void): void {
    
    Array.from(excludedClass).forEach((classItem, i) => {
        document.addEventListener(eventAction, (e) => {
            if (!classItem.contains(e.target as Element)) 
                eventFunc(i);
        });
    });
}


/**
 * Switches the color of given event target on mousedown and switches it back on mouse up.
 * 
 * @param eventTarget the target of the event (e.g. a button)
 * @param color to switch to
 * @since 0.0.1
 */
export function toggleColorOnclick(eventTarget: HTMLElement | null, color: string): void {

    if (!eventTarget) return;

    const baseColor = eventTarget.style.backgroundColor;

    eventTarget.addEventListener("mousedown", () => {
        eventTarget.style.backgroundColor = color;
    });

    document.addEventListener("mouseup", () => {
        eventTarget.style.backgroundColor = baseColor;
    });
}


export function setTitle(title: string): void {
    
    const titleElement = document.getElementById("title");

    titleElement!.innerHTML = title;
}