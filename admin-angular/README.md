# Spurtcommerce Admin Panel Setup

Follow these steps for initial setup and running your angular admin application.
Before you get started with the initial setup of Angular admin and running your application, make sure you have your are in place. 



## Follow these steps for initial setup and running your angular admin application.

Step1 > Unzip your file and open it with your desired ide and then go to terminal and type

`npm install ` 

If npm Install doesn't work, then try the command below:

`npm install --force `

Step2 > Navigate to project folder → src→ environments → environment.ts after that ,

`export const environment = { 
production: false, 
baseUrl: '<Your API base url>', // eg: 'http://localhost:8000/backend/api/' 
imageUrl: '<Your API url for image resize>', // eg: 'http://localhost:8000/backend/api/media/image-resize/' 
productUrl: '<Your store base url>', // eg: 'http://yourip.com/' 
relatedproductUrl : '<Your store base url>', // eg: 'http://yourip.com/' 
blogUrl : '<Your store base url>', // eg: 'http://yourip.com/' 
pluginUrl: '<Your API url>' // eg: 'http://yourip.com/'
}; `



## Run your Application: 
To run application in your respective browser, run the following command:

 `npm run large-serve` 

