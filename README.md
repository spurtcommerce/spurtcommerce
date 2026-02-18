<h1 align="center" style="border-bottom: none">
    <div>
       <a style="color:#36f" href="https://www.spurtcommerce.com/#gh-light-mode-only">
            <img src="https://www.spurtcommerce.com/spurtcommerce.svg" width="318px" alt="Spurtcommerce logo" />
            <br>
           🎉 <a target="_blank" href="https://www.spurtcommerce.com/spurtcommerce-change-log" rel="dofollow"> <strong>Spurtcommerce v5.3 is now available!</strong> 
        </a>
    </div>
    Opensource Multi Vendor Marketplace for B2C , B2B  <br>
</h1>

<p align="center">
 Build with Nodejs + TypeScript + Angular + React + MySQL and PostgreSQL
</p>


<p align="center">
    <a href="http://www.spurtcommerce.com"><b>Website</b></a> •
    <a href="https://discord.com/invite/hyW4MXXn8n"><b>Discord</b></a> •
    <a href="https://www.spurtcommerce.com/price-details"><b>Community</b></a> •
    <a href="https://x.com/Spurtcommerce"><b>Twitter</b></a> •
    <a href="https://www.reddit.com/r/Spurtcommerce/"><b>Reddit</b></a> •
    <a href="https://www.spurtcommerce.dev"><b>Documentation</b></a>
</p>

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

![video avi](https://raw.githubusercontent.com/spurtcommerce/spurtcommerce/refs/heads/master/assets/spurt.gif)

![video avi](https://raw.githubusercontent.com/spurtcommerce/spurtcommerce/refs/heads/master/assets/spurt2.gif)

<br />

# Join Our Community

<a href="https://discord.com/invite/hyW4MXXn8n" target="_blank">
<img src="https://raw.githubusercontent.com/spurtcommerce/spurtcommerce/refs/heads/master/assets/spurtcommerce-discord.jpg" alt="">
</a>

> [!IMPORTANT]
> 🎉 <strong>Spurtcommerce 5.3.0 is now available!</strong> Read more in the <a target="_blank" href="https://www.spurtcommerce.com/spurtcommerce-change-log" rel="dofollow"><strong>announcement post</strong></a>.
<br />

## ❯  🚀 Updated: Run & deploy (mono-repo)

This repository contains multiple apps. The sections below explain how to run each app from the workspace — no compilation is required because compiled assets are included for admin/seller and the API.

### Prerequisites

- Node.js (v22.14.0)
- npm (recommended >= 9.6.0)
- MySQL server (for the API database)

### API (backend)

1. Change to the API folder and install dependencies:

```bash
cd api
npm install
```

2. Configure the environment: create and edit `api/.env` with your DB credentials and app settings. Import the sample SQL if needed:

```bash
mysql -u <user> -p <database> < spurtcommerce-demo.sql
```

3. Start the API (compiled files are included):

```bash
npm start
```

The `start` script runs the compiled server (typically `node dist/src/app.js`). The API listens on the port set in your `.env`.

### Admin frontend

1. Install dependencies and ensure `admin/.env` is present:

```bash
cd admin
npm install
```

2. Start the admin server (the `prestart` script runs `scripts/generate-env.js`):

```bash
npm start
```

The app is served from `dist/admin`. Set `PORT` in `.env` to change the port (default 4200).

### Seller (vendor) frontend

1. Install dependencies:

```bash
cd seller
npm install
```

2. Start the seller server (prestart runs `scripts/generate-env.js`):

```bash
npm start
```

The app is served from `dist/vendor`.

### Store (Next.js storefront)

1. Install dependencies:

```bash
cd store
npm install
```

2. (Optional) Populate runtime config from `runtime-config.json.template`:

```bash
npm run generate-env
```

3. Run in development:

```bash
npm start
```

The storefront reads runtime configuration from `store/public/runtime-config.json` — run `npm run generate-env` before building for production if you use template placeholders.

Completion of the above steps sets up and runs the backend and frontends on your machine.

## Default Admin Panel Login Details

<br />
Username : "marketplace@spurtcart.com" 
<br />
Password : "Piccosoft2012"

Above steps concludes successful installation and setup of Spurtcommerce Marketplace solution build in your local (or) server.

<!-- # Screenshots
![2](https://raw.githubusercontent.com/spurtcommerce/spurtcommerce/refs/heads/master/assets/spurtcommerce-github-2.jpg)
![3](https://raw.githubusercontent.com/spurtcommerce/spurtcommerce/refs/heads/master/assets/spurtcommerce-github-3.jpg)
![4](https://raw.githubusercontent.com/spurtcommerce/spurtcommerce/refs/heads/master/assets/spurtcommerce-github-6.jpg)
![5](https://raw.githubusercontent.com/spurtcommerce/spurtcommerce/refs/heads/master/assets/spurtcommerce-github-1.jpg) -->


## 🤔 Support , Document and Help

Spurtcommerce 5.3.0 is published to npm under the `@spurtcommerce/*` namespace.

You can find our extended documentation on our [www.spurtcommerce.dev](https://www.spurtcommerce.dev), but some quick links that might be helpful:

- Read [Technology](https://www.spurtcommerce.com/opensource-ecommerce-multivendor-nodejs-react-angular) to learn about our vision and what's in the box.

- Our [Discard](https://discord.com/invite/hyW4MXXn8n) Questions, Live Discussions [Spurtcommerce Support](https://accounts.spurtcommerce.com/#/auth/login-client).
- An [API Reference](https://www.spurtcommerce.dev/v/spurtapi/) contains the details on Spurtcommerce foundational building blocks.
- Some [Video](https://www.youtube.com/@Spurtcommerce/videos) Video Tutorials 
- Every [Release](https://github.com/spurtcommerce/multivendor-marketplace/releases) is documented on the Github Releases page.

🐞 If you spot a bug, please [submit a detailed issue](https://github.com/spurtcommerce/multivendor-marketplace/issues/new), and wait for assistance.

🤔 If you have a question or feature request, please [start a new discussion](https://github.com/orgs/spurtcommerce/discussions/new/choose). 
  
🤔 This project is tested with BrowserStack

## ❯ Maintainers
Spurtcommerce is developed and maintain by [Piccosoft Software Labs India (P) Limited,](https://www.piccosoft.com).


## ❯ License

Spurtcommerce is released under the [BSD-3-Clause License.](https://github.com/spurtcommerce/spurtcommerce/blob/master/LICENSE).


