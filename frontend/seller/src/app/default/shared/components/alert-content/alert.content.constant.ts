export const imagesList = {
    success: 'assets/imgs/info-circle-green.svg',
    failed: 'assets/imgs/info-circle-orange.svg'
};

export const contentTranslate = {
    success: 'content.productListcontentSuccess',
    failed: 'content.orderfaild'
};

export const className ={
    failed: 'faild'
}


export function configureAlertConfig(content = contentTranslate.success, image = imagesList.success, className = '') {
    return {
        content: content,
        image: image,
        class: className
    };
};