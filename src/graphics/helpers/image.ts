export async function loadImage(imageUrl: string): Promise<void> {
    return new Promise((resolve) => {
        const imageLoaderElem = document.createElement('img');
        imageLoaderElem.src = imageUrl;

        imageLoaderElem.addEventListener('load', () => {
            resolve();
        });
    });
}
