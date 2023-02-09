
## Kindly note that Storefront's Angular Code and Store APIs are not free to download. Kindly click on the link below to make the purchase. 

https://addon.spurtcommerce.com/details/angular-storefront-community

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


##  ❯ Spurtcommerce 4.8 Community shopping cart Features 
| Angular Store (Version 13) | Description | URL |
| ------ | ------ | ------ |
| Store Front Demo | Get a complete walk through on the demo of the Features in the Community Edition of Spurtcommerce with Angular Storefront.  | [View](https://www.spurtcart.com)
| Documents | Get access to the documents that can help you setup, install and deploy the Community Edition of NodeJS API and Angular Storefront.  | [Guide](https://www.spurtcommerce.dev/getting-started/development-and-setup/store-front-setup/angular-store-front)
| Code Download |You may download the source code of the NodeJS API of Community Edition for free. Then, you can purchase the source code of Angular Storefront for your eCommerce portal. |[Buy](https://addon.spurtcommerce.com/details/angular-storefront-community)




Spurtcommerce, an Open Source NodeJS eCommerce Solution comes with the all the APIs required for running a simple eCommerce portal with all the required basic features.


Here is the list of APIs that are integrated with the Spurtcommerce Community Edition. 
 


* `Sign-Up / Sign-In ` – For signing up as a customer and then signing in with their user Id and password. 

* `View Categories` - The Customer can navigate to various categories for browsing and search for the products they wish to buy.

* `View Product List page` - The Customer can view the Product List Page from where they can navigate to the Product detail page.

* `View Product Details` - The Customer can view the Product List Page from where they can navigate to the Product detail page.

* `View Product Discount` – If the product is offered at discounted price, then it will show them the reduced price. 

* `View Special Discount Products` – If the product is offered at special price, then the Customer can view it on the product detail page.
 
* `Guest Checkout` – This is for the Customer to do a guest checkout, without having to register on the portal. 

* `PWA` – For downloading the PWA app from the website. 

* `Multi language` – To view the labels and static content in website in their preferred language. 

* `Apply Coupons` – For availing coupon code to avail discount/offer on a product. 

* `Add to Cart` – For adding products into the cart for checkout. 

* `My Orders` – To view the orders placed by them. 

* `Order Tracking` – To track the orders they have placed. 

* `Checkout through Cash on Delivery` – To check out the cart using cash on delivery mode of payment.

* `Add to Wish list` – To add products to the wish list to buy later. 

* `Place Order` – To place the order for the items in their cart. 

* `Product search` – Keyword based search for finding the right product. 

* `Product Quick View` – To directly view the product title and the image in a popup, from the home page, without having to navigate anywhere else.  

* `Sorting and Filters Product List` – Sort and filter options of the product based on brand, categories and price high to low and low to high.
 
* `Product and Brand Search` – Searching products based on brand name. 

* `Featured and Top Selling Products` – To view the featured and top selling products. 

* `Add Multiple Delivery Address` – For customer to add multiple addresses for delivery to different places. 

* `Change Password `– To change the password of their account on the eCommerce portal. 

* `Email Notification` – To get email notifications in various scenarios like when order placed, when order delivered, etc. 
* `Download and Printable Invoice` – To download the invoice for their order and to print them. 
* `Categories Wise Product List – To view the list of products in a particular category.

* `Shipping and Billing Address` – To have different addresses for shipping and billing. 

* `View Banners` – To view different displayed banners on the storefront. 

* `My Order History` – To view history of their orders placed. 

* `Change and Forgot Password` – For changing existing password and for recovering forgotten password. 


Spurtcommerce Community Edition’s NodeJS API is publicly available on GitHub and free to download and use. The Angular Storefront Source Code can be purchased to complete your eCommerce portal a Storefront.

For getting more features and to make your eCommerce portal more feature-rich, visit https://addon.spurtcommerce.com/




##  ❯ For SSR Build (Server Side Rendering) 


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
