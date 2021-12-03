export function appendChildren(element: HTMLElement, ...children: HTMLElement[]): void {
    children.forEach(elem => {
        element.appendChild(elem);
    });
}

export function elementById<T extends HTMLElement>(id: string): T | undefined {
    return document.getElementById(id) as T;
}
