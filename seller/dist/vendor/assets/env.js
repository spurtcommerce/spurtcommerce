(function (window) {
  window.__env = window.__env || {};

  // Environment
  window.__env.environment = 'development';

  // API URLs
  window.__env.apiBaseUrl = 'http://localhost:8000/api';
  window.__env.chatUrl = 'http://localhost:4001/';
  window.__env.imageUrl = 'http://localhost:8000/api/media/image-resize/';
  window.__env.videoUrl = '';

  // Image configuration
  window.__env.imageSupportFile = '120 x 120px PNG or JPG file.';
  window.__env.imageType = /(\.jpg|\.jpeg|\.png)$/i;
  window.__env.imageTypeSupport =
    'Please upload image only(.png,.jpg,.jpeg)';
  window.__env.imageSizeSupport = 'Image should be less than 2MB';

  // Logo
  window.__env.logo = 'assets/images/logologin.png';

  // Store URLs
  window.__env.storeUrlRelatedProduct =
    '';
  window.__env.shopurl = '';

  // Limits
  window.__env.folderNameLength = 40;
  window.__env.ImageManager = 4096;
  window.__env.filesize = 2048;
  window.__env.maxImage = 8;

  // My Shop screen
  window.__env.videoUpload = 4096;
  window.__env.documentSize = 2048;
  window.__env.documentType = /\.pdf$/;
  window.__env.documentMessage = 'Accept only .pdf extension';

})(this);
