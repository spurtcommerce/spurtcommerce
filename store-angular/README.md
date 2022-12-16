
# Spurtcommerce  Angular Version 13 - StoreFront
Spurtcommerce, an Open Source NodeJS and Angular eCommerce comes with full Source Code. The Community Edition comes with the basic and necessary features of a standard eCommerce platform. We welcome contributors to the Community and Developers to join us in constantly improving the solution and bringing new upgrades. Spurtcommerce comes with complete online documentation.
| Community Version 4.8.0 | Feature | URL |
| ------ | ------ | ------ |
| StoreFront Demo | Get the best eCommerce solution with the state-of-the-art tech stack – the NodeJS Back-end API and the Angular front end and customize a standard eCommerce portal.| [View](https://www.spurtcommerce.com/nodejs-shoppingcart-ecommerce-download)
| Documents | Looking for a solution that can result in a sophisticated React Storefront with a powerful back-end API on NodeJS Express Framework? | [Refer](https://www.spurtcommerce.com/nodejs-shoppingcart-ecommerce-download)
| Code Downlaod |If you want to customize a Flutter Mobile App and have a robust back-end API on the latest NodeJS, you are here now at the right place. Go for it.|[Buy Request](https://www.spurtcommerce.com/nodejs-shoppingcart-ecommerce-download)

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





