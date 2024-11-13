export function getImageUrl(baseUrl, path, name, width = 40, height = 40) {
    return `${baseUrl}?path=${path}&name=${name}&width=${width}&height=${height}`;
}

export function getImageUrlNew(baseUrl, path, name, width = 40, height = 40) {
    return `${baseUrl}?name=${name}&path=${path}&width=${width}&height=${height}`;
}