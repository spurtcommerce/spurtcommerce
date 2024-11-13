// Spurtcommerce Multi Vendor marketplace v5

export const environment = {
  production: false,
  baseUrl: '<Your api_base_url>', // eg:'https://your-marketplace.com/api'
  chatUrl: '<Your Chat base url>',        // eg:'https://your-chaturl.com/'
  imageUrl: '<Your API url for image resize>',   //eg:'https://your-marketplace.com-image/',
  videoUrl: '<Your API url for video url>', //eg:'https://your-marketplace.com-videourl/
  imageSupportFile: "120 x 120px PNG or JPG file.", // 'Reference for Image types & size handled in UI. Changing this will not impact file dimension or file extension validations' 
  imageType: /(\.jpg|\.jpeg|\.png)$/i,  // 'List of allowed image file extensions. This config when changed here, should be updated in backend config as well.'
  imageTypeSupport: "Please upload image only(.png,.jpg,.jpeg)", // 'This is the error message displayed in UI.'
  imageSizeSupport: "Image should be less than 2MB", // 'This is the error message displayed in UI.'
  logo: 'assets/imgs/spurtv5-logo-new.svg', // Your logo to appear in sign-in screen. Replace your own file with the same name in the folder path /assets/imgs/
  storeUrlRelatedProduct: '<Your store base url>',  //eg:'https://your-store_url/products/'
  shopurl: '<Your store base url>',  //eg:'https://your-store_url/shop/'
  folderNameLength: 40, // Image Manager folder name length in characters
  ImageManager: 4096,  // 'Max Image size allowed in Image Manager uploads in KB.This config when changed here, should be updated in backend config as well.',
  filesize: 2048,  // 'Max file size allowed for file uploads metioned in KB.This config when changed here, should be updated in backend config as well.'
  maxImage: 8,   // 'Max bulk insert count allowed in Image Manager'

  //My Shop screen configuration section
  videoUpload: 4096,  // 'Max Image size allowed in Image Manager uploads in KB.This config when changed here, should be updated in backend config as well.',
  documentSize: 2048,  // 'Max file size allowed for file uploads metioned in KB.This config when changed here, should be updated in backend config as well.'
  documentType: /\.pdf$/, // 'List of allowed file type. Curently system supports only pdf. Further extensions should be updated in backend as well'
  documentMessage: 'Accept only .pdf extension', // Message for file type restriction 
};

