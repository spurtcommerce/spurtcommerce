

## Follow these steps for initial setup and running your angular StoreFront .

Step1 > Unzip your file and open it with your desired ide and then go to terminal and type

`npm install ` 

If npm Install doesn't work, then try the command below:

`npm install --force `

Step2 > Navigate to project folder → src→ environments → environment.ts after that ,

```sh 
export const environment = {
production: false, 
storeUrl: '<Your API Base url>', // eg: 'http:/localhost:8000/backend/api/'
imageUrl:'<Your API url for image resize>', // eg: 'http:/localhost:8000/backend/api/media/image-resize' 
}; 
```

Now, Run your Application 

For running your application in your respective browser run the following command:

`ng serve `


#  ❯ Spurtcommerce 4.8 Community shopping cart Features 
| Angular Store (Version 13) | Description | URL |
| ------ | ------ | ------ |
| Store Front Demo | Get a complete walk through on the demo of the Features in the Community Edition of Spurtcommerce with Angular Storefront.  | [View](https://www.spurtcart.com)
| Documents | Get access to the documents that can help you setup, install and deploy the Community Edition of NodeJS API and Angular Storefront.  | [Guide](https://www.spurtcommerce.dev/getting-started/development-and-setup/store-front-setup/angular-store-front)
| Code Download |You may download the source code of the NodeJS API of Community Edition for free. Then, you can purchase the source code of Angular Storefront for your eCommerce portal. |[Buy](https://addon.spurtcommerce.com/details/angular-storefront-community)





Spurtcommerce, an Open Source NodeJS eCommerce Solution comes with the all the APIs required for running a simple eCommerce portal with all the required basic features.

Here is the list of APIs that are integrated with the Spurtcommerce Community Edition. 


* `Navigation to various categories:` The Customer can navigate to various categories for browsing and search for the products they wish to buy.
* `Product List Page:` The Customer can view the Product List Page from where they can navigate to the Product detail page. 
*	`Product Detail Page:` The Customer can view the details of product that includes title, description and images of the Product. 
*	`Add to Cart:` The Customer can add the products that they wish to buy to the cart. 
*	`Checkout:` The Customer can then check out their cart items. 
*	`Place Order:` The Customer can then place an order by using the cash on delivery mode of payment.  


Spurtcommerce Community Edition’s NodeJS API is publicly available on GitHub and free to download and use. The Angular Storefront Source Code can be purchased to complete your eCommerce portal a Storefront. 



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
