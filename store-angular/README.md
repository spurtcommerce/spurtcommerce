

## Follow these steps for initial setup and running your angular StoreFront .

Step1 > Unzip your file and open it with your desired ide and then go to terminal and type

`npm install ` 

If npm Install doesn't work, then try the command below:

`npm install --force `

Step2 > Navigate to project folder → src→ environments → environment.ts after that ,

`export const environment = {
production: false, 
storeUrl: '<Your API Base url>', // eg: 'http:/localhost:8000/backend/api/'
imageUrl:'<Your API url for image resize>', // eg: 'http:/localhost:8000/backend/api/media/image-resize' 
};`

Now, Run your Application 

For running your application in your respective browser run the following command:

`ng serve `

| Angular Store (Version 13) | Description | URL |
| ------ | ------ | ------ |
| StoreFront Demo | Get the best eCommerce solution with the state-of-the-art tech stack – the NodeJS Back-end API and the Angular front end and customize a standard eCommerce portal.| [View](https://www.spurtcart.com)
| Documents | Looking for a solution that can result in a sophisticated React Storefront with a powerful back-end API on NodeJS Express Framework? | [Refer](https://www.spurtcommerce.dev/getting-started/development-and-setup/store-front-setup/angular-store-front)
| Code Download |If you want to customize a Flutter Mobile App and have a robust back-end API on the latest NodeJS, you are here now at the right place. Go for it.|[Buy Request](https://addon.spurtcommerce.com/details/angular-storefront-community)



#  ❯ Spurtcommerce 4.8 Community API Integrated 

Spurtcommerce, an Open Source NodeJS and Angular eCommerce comes with full Source Code. The Community Edition comes with the basic and necessary features of a standard eCommerce platform. We welcome contributors to the Community and Developers to join us in constantly improving the solution and bringing new upgrades. Spurtcommerce comes with complete online documentation.

*	Spurtcommerce Admin Control Panel 
*	Spurtcommerce Store Front
*	Spurtcommerce API 

Spurtcommerce Community Edition is publicly available on GitHub and free to download and use. 



#  ❯ For SSR Build (Server Side Rendering) 


Step-1 > Build and run the project with the below mentioned command

```sh
npm run dev-build:ssr && npm run serve:ssr

```

Step-2 > Open the browser and navigate to
```sh
http://localhost:4000
```

Step-3> For configuring the SSR, check the existence of this line in your Apache Server. If not, then add 
this line in your server. 

```sh
ProxyRequests off
<Proxy *> 
            Order deny,allow 
      Allow from all
</Proxy>

</Location>
ProxyPass http://127.0.0.1:4000/ 
ProxyPassReverse http://127.0.0.1:4000/
</Location>
```





