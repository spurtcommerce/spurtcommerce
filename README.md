
<p align="center">
  <a href="https://www.spurtcommerce.com/#gh-light-mode-only">
    <img src="https://www.spurtcommerce.com/spurtcommerce.svg" width="318px" alt="Spurtcommerce logo" />
  </a>
   
</p>
<h3 align="center">Open Source Multi Vendor Marketplace for Ecommerce Solution - Self hosted </h3>
<p align="center"> Build with Nodejs + TypeScript + Angular + React + MySQL and PostgreSQL</p>
<p align="center"><a href="https://www.spurtcommerce.com/price-details"> Support PRO</a> · <a href="https://www.spurtcommerce.com/price-details"> Frontend </a> ·  <a href="https://www.spurtcommerce.com/price-details"> API Suite </a></p>
<br />
<p align="center">
  <a href="https://github.com/spurtcommerce/multivendor-marketplace/releases">
    <img src="https://img.shields.io/github/last-commit/spurtcommerce/deployment" alt="GitHub last commit" />
  </a>
  <a href="https://github.com/spurtcommerce/multivendor-marketplace/issues">
    <img src="https://img.shields.io/github/issues/spurtcommerce/deployment" alt="GitHub issues" />
  </a>

  <a href="https://github.com/spurtcommerce/multivendor-marketplace/releases">
    <img src="https://img.shields.io/github/repo-size/spurtcommerce/deployment?color=orange" alt="GitHub repo size" />
  </a>
</p>
<br />

> [!IMPORTANT]
> 🎉 <strong>Spurtcommerce 4.8.2 is now available!</strong> Read more in the <a target="_blank" href="https://www.spurtcommerce.com/spurtcommerce-change-log" rel="dofollow"><strong>announcement post</strong></a>.
<br />

## ❯  🚀 Easy to Deploy Spurtcommerce API on your server

This is the official repository of Spurtcommerce. Using these Build , you can easily deploy Spurtcommerce Multi-Vendor Marketplace in your local server.

### Step 1:
Navigate to the cloned repository directory “multivendor-marketplace” in the terminal and locate the "api" folder

### Step 2:

Navigate to multivendor-marketplace/api folder and Install node_modules  by executing the following command
```
$ npm install
```

It will take few mins for the npm installation to get finished and once done you will see the completion notification messages in terminal.

### Step 3:
Retrieve the "spurtcommerce_marketplace.sql" file from the "/api" folder and import it into your MySQL server.
### Step 4:
Configure the database settings in the ".env" file located in the "/api" folder, with the name and credentials for the application to connect to your database (imported from spurtcommerce_marketplace.sql)
 
Database Configuration
we are using MySQL database, we need to configure database credentials in the .env file 

```
#
# MySQL DATABASE
#
TYPEORM_CONNECTION=mysql
TYPEORM_HOST=localhost
TYPEORM_PORT=3306
TYPEORM_USERNAME= "testuser"             #--Your MySql Username
TYPEORM_PASSWORD= "spurt123&"		#--Your MySql Password 
TYPEORM_DATABASE= "spurt_commerce"	#--Your Database Name
TYPEORM_SYNCHRONIZE=false
TYPEORM_LOGGING=["query", "error"]
TYPEORM_LOGGER=advanced-console
```

### Step 5:
In terminal, Navigate to multivendor-marketplace/api folder and Start API execution using the following command:
```
$ node dist/src/app.js
```

## ❯  🚀 Deploy Frontend Admin , Vendor and Store (Angular)


### Step 1:

Navigate to "/var/www/html" (assuming Apache installation has created this directory) from your home directory in your local or server

### Step 2:

*  Copy the "vendor" and "admin" folders as-is directly from "multivendor-marketplace/frontend/" to "/var/www/html/".

*  Copy all folders & files of “store” folder from multivendor-marketplace/frontend/ folder and paste it directly into /var/www/html/

Completion of above steps should successfully setup frontend builds of all 3 panels of Spurtcommerce Marketplace solution such as Store Panel, Vendor Panel and Admin Panel.

* marketplace website is ready to use from  http://{your-domian or IP} (or) http://localhost/
* Vendor Panel can be accessed by http://{your-domian or IP}/vendor/#/auth/login 
* Admin panel be accessed by http://{your-domian or IP}:{your-port}/admin/#/auth/login

Above steps concludes successful installation and setup of Spurtcommerce Marketplace solution build in your local (or) server.


## 🤔 Support , Document and Help

Spurtcommerce 4.8.2 is published to npm under the `@spurtcommerce/*` namespace.

You can find our extended documentation on our [www.spurtcommerce.dev](https://www.spurtcommerce.dev), but some quick links that might be helpful:

- Read [Technology](https://www.spurtcommerce.com/opensource-ecommerce-multivendor-nodejs-react-angular) to learn about our vision and what's in the box.

- Our [Discard](https://discord.com/invite/hyW4MXXn8n) Questions, Live Discussions [Spurtcommerce Support](https://accounts.spurtcommerce.com/#/auth/login-client).
- An [API Reference](https://www.spurtcommerce.dev/v/spurtapi/) contains the details on Spurtcommerce foundational building blocks.
- Some [Video](https://www.youtube.com/@Spurtcommerce/videos) Video Tutorials 
- Every [Release](https://github.com/spurtcommerce/multivendor-marketplace/releases) is documented on the Github Releases page.

🐞 If you spot a bug, please [submit a detailed issue](https://github.com/spurtcommerce/multivendor-marketplace/issues/new), and wait for assistance.

🤔 If you have a question or feature request, please [start a new discussion](https://github.com/orgs/spurtcommerce/discussions/new/choose). 


## ❯ Maintainers
Spurtcommerce is developed and maintain by [Piccosoft Software Labs India (P) Limited,](https://www.piccosoft.com).


## ❯ License

Spurtcommerce is released under the [BSD-3-Clause License.](https://github.com/spurtcommerce/spurtcommerce/blob/master/LICENSE).



