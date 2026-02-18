(function (window) {
  window.__env = window.__env || {};
  // Existing values
  window.__env.apiBaseUrl = 'http://localhost:8000/api';
  window.__env.environment = 'development';
  // URLs
  window.__env.chatUrl = 'http://localhost:4001/';
  window.__env.imageUrl = 'http://localhost:8000/api/media/image-resize/';
  window.__env.storeUrl = 'http://localhost:3003';
  window.__env.pluginUrl = 'https://localhost:8000/api';

  // Image upload config
  window.__env.maxImage = 5;
  window.__env.filesize = 2048;
  window.__env.imageType = /(\.jpg|\.jpeg|\.png)$/i;
  window.__env.imageTypeSupport = 'Please upload image only(.png,.jpg,.jpeg)';
  window.__env.imageSizeSupport = 'Image should be less than 2MB';
  window.__env.imageSupportFile =
    'Support (.png .jpg .jpeg) Format & below 2MB Files allowed.';
  window.__env.imageSupportSize = '120 x 120px PNG or JPG file.';

  // Logo
  window.__env.logo = 'assets/images/logoImage.png';

  // Document upload config
  window.__env.documentSize = 4096;
  window.__env.documentType = /\.pdf$/;
  window.__env.documentMessage = 'Accept only .pdf extension';

  // Footer
  window.__env.footerCopyRight = {
    app: 'footer.Spurtcommerce',
    appVersion: 'v5.2',
    appCopyRight: 'footer.Copyrights',
  };
})(this);
