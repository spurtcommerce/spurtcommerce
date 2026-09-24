<h1 align="center" style="border-bottom: none">
    <div>
        <a href="https://www.spurtcommerce.com">
            <img src="https://www.spurtcommerce.com/spurtcommerce.svg" width="318px" alt="SpurtCommerce logo" />
        </a>
        <br>
        🚀 <strong>SpurtCommerce v5.4</strong>
        <br>
        B2C Single Vendor API
    </div>
</h1>

<p align="center">
    Backend API built with Node.js + TypeScript + TypeORM + MySQL
</p>

<p align="center">
    <a href="https://www.spurtcommerce.com"><b>Website</b></a> •
    <a href="https://www.spurtcommerce.dev"><b>Documentation</b></a> •
    <a href="https://discord.com/invite/hyW4MXXn8n"><b>Discord</b></a> •
    <a href="https://github.com/spurtcommerce"><b>GitHub</b></a>
</p>

<br />

> [!IMPORTANT]
> 🎉 <strong>SpurtCommerce 5.4 — B2C Single Vendor API</strong>
>
> This documentation explains how to install, configure, run, and deploy the B2C Single Vendor backend API.

---

## ❯ 🚀 B2C Single Vendor API

SpurtCommerce **5.4 B2C Single Vendor API** is a backend application built using:

* Node.js
* TypeScript
* TypeORM
* MySQL

This guide covers the complete backend setup including:

* Prerequisites
* Backend installation
* Environment configuration
* Database setup
* Tenant identification
* API startup
* API access
* Troubleshooting

---

## ❯ Prerequisites

Before setting up the SpurtCommerce 5.4 B2C Single Vendor API, make sure the following software is installed.

* Node.js (v22.23.1)
* npm  (recommended >= 10.9.8)
* MySQL Server (for the API database)
* Git

### Check Installed Versions

```bash
node -v
npm -v
mysql --version
git --version
```

---

## ❯ 🚀 Backend Setup

### 1. Navigate to Backend

Navigate to the SpurtCommerce 5.4 backend project directory.

```bash
cd <BACKEND_DIRECTORY>
```

### 2. Install Dependencies

Install all required Node.js dependencies.

```bash
npm install
```

### 3. Configure Environment

Create or update the `.env` file in the backend project root.

```env
APP_TYPE=local

APP_ID=<YOUR_APP_ID>
TENANT_ID=<YOUR_TENANT_ID>

TYPEORM_HOST=<YOUR_DB_HOST>
TYPEORM_PORT=<YOUR_DB_PORT>
TYPEORM_USERNAME=<YOUR_DB_USERNAME>
TYPEORM_PASSWORD=<YOUR_DB_PASSWORD>
TYPEORM_DATABASE=<YOUR_DB_NAME>

APP_PORT=<YOUR_API_PORT>
```

> [!NOTE]
> Replace all placeholder values with the configuration values from your own environment.

---

## ❯ 🗄️ Database Configuration

### 1. Create Database

Create the MySQL database used by the SpurtCommerce 5.4 backend.

```sql
CREATE DATABASE <YOUR_DB_NAME>;
```

### 2. Import SQL Backup

If a SQL backup is provided, import it using:

```bash
mysql -u <YOUR_DB_USERNAME> -p <YOUR_DB_NAME> < <YOUR_SQL_BACKUP_FILE>
```

### 3. Run Migrations

If the project uses TypeORM migrations, run the migration command configured in the backend `package.json`.

```bash
<TYPEORM_MIGRATION_COMMAND>
```

> [!NOTE]
> Use the migration command configured in the SpurtCommerce 5.4 project. The exact command may vary depending on the project configuration.

---

## ❯ ▶️ Start Backend

Start the SpurtCommerce 5.4 B2C Single Vendor API using the configured start command.

```bash
npm start
```

The API listens on the port configured through:

```env
APP_PORT=<YOUR_API_PORT>
```

### Example

```env
APP_PORT=8000
```

The backend API will then be available at:

```text
http://localhost:8000
```

---

## ❯ 🏗️ Backend Architecture

The request flow for the SpurtCommerce 5.4 B2C Single Vendor backend is:

```text
B2C API Request
       │
       ▼
TenantValidationMiddleware
       │
       ▼
Static APP_ID / Application ID
       │
       ▼
Vendor Lookup
       │
       ▼
Tenant ID
       │
       ▼
Controller
       │
       ▼
Service
       │
       ▼
TypeORM
       │
       ▼
MySQL Database
```

### Request Flow

```text
Client
  ↓
B2C API
  ↓
TenantValidationMiddleware
  ↓
APP_ID
  ↓
Vendor
  ↓
Tenant ID
  ↓
Controller
  ↓
Service
  ↓
TypeORM
  ↓
MySQL
```

---

## ❯ ⚙️ Environment Configuration

The following environment variables are used by the B2C Single Vendor API.

| Configuration      | Purpose                                                       |
| ------------------ | ------------------------------------------------------------- |
| `APP_TYPE`         | Application environment or application type                   |
| `APP_ID`           | Application identifier used for application/vendor resolution |
| `TENANT_ID`        | Configured tenant identifier                                  |
| `TYPEORM_HOST`     | MySQL database host                                           |
| `TYPEORM_PORT`     | MySQL database port                                           |
| `TYPEORM_USERNAME` | MySQL database username                                       |
| `TYPEORM_PASSWORD` | MySQL database password                                       |
| `TYPEORM_DATABASE` | MySQL database name                                           |
| `APP_PORT`         | Port on which the backend API runs                            |

---

## ❯ 🔐 Tenant Identification

`TenantValidationMiddleware` is responsible for resolving vendor and tenant information for incoming API requests.

In the SpurtCommerce 5.4 single-vendor setup, the configured `APP_ID` can be used as the application identifier.

Depending on the middleware implementation, the application ID can be obtained from:

```text
app-id
```

request header or from the configured:

```env
APP_ID
```

environment variable.

After resolving the vendor, the middleware assigns the tenant identifier to:

```typescript
req.tenantId
```

Controllers and services can then use the resolved tenant ID for database operations.

> [!IMPORTANT]
> For a single-vendor deployment, keep the `APP_ID`, `TENANT_ID`, and corresponding vendor/application database records consistent.

---

## ❯ 🌐 Referer Header

The `referer` header represents the frontend/store URL.

It should not be used as the primary tenant identifier in a single-vendor backend.

### Email

`getVendorDomainOrDefault()` can use:

```text
vendorSettings.storeUrl
```

from the database.

---
## ❯ 🔐 Login Credentials

Use the following credentials to test the login flow.

Field	Value
Email ID	community@spurtcart.com
password	Demo1234

[!NOTE]

The password Demo1234 is provided for local/development testing.

Login Flow
Open the B2C application.
Enter the registered email address:
community@spurtcart.com
Enter the password:
Demo1234
Complete the login process.
Continue with the authenticated API requests.

---
## ❯ 🔌 API Access

Once the SpurtCommerce 5.4 backend is running, the API can be accessed using the configured backend URL.

```text
http://localhost:<YOUR_API_PORT>
```

### Example

```text
http://localhost:8000
```

---

## ❯ 📚 API Documentation

If API documentation is enabled in the project, it can be accessed through:

```text
http://localhost:<YOUR_API_PORT>/apidoc/
```

### Example

```text
http://localhost:8000/apidoc/
```

---

## ❯ 🛠️ Troubleshooting

| Problem                            | What to Check                                                             |
| ---------------------------------- | ------------------------------------------------------------------------- |
| Dependency installation fails      | Check Node.js version, npm version, `package.json`, and npm dependencies  |
| Database connection fails          | Check MySQL status, host, port, username, password, and database name     |
| Unknown database or missing tables | Check database name, SQL backup, or TypeORM migrations                    |
| Invalid tenant                     | Check `APP_ID`, `TENANT_ID`, and matching vendor/application records      |
| API connection fails               | Check `APP_PORT`, API URL, and backend server status                      |
| OAuth redirect fails               | Check Google redirect URI, OAuth state, referer, and configured store URL |

---

## ❯ 🚀 Quick Start

For a quick local setup:

### 1. Navigate to Backend

```bash
cd <BACKEND_DIRECTORY>
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure `.env`

Configure the following values:

```env
APP_TYPE=local

APP_ID=<YOUR_APP_ID>
TENANT_ID=<YOUR_TENANT_ID>

TYPEORM_HOST=<YOUR_DB_HOST>
TYPEORM_PORT=<YOUR_DB_PORT>
TYPEORM_USERNAME=<YOUR_DB_USERNAME>
TYPEORM_PASSWORD=<YOUR_DB_PASSWORD>
TYPEORM_DATABASE=<YOUR_DB_NAME>

APP_PORT=<YOUR_API_PORT>
```

### 4. Start Backend

```bash
npm start serve
```

### 5. Open API

```text
http://localhost:<YOUR_API_PORT>
```

### 6. Open API Documentation

```text
http://localhost:<YOUR_API_PORT>/apidoc/
```

---

## ❯ 📋 Project Information

| Property        | Value                 |
| --------------- | --------------------- |
| **Platform**    | SpurtCommerce         |
| **Version**     | 5.4                   |
| **Application** | B2C Single Vendor API |
| **Backend**     | Node.js               |
| **Language**    | TypeScript            |
| **ORM**         | TypeORM               |
| **Database**    | MySQL                 |

---

## ❯ 🤔 Support, Documentation and Help

For additional information and documentation:

* [SpurtCommerce Website](https://www.spurtcommerce.com)
* [SpurtCommerce Documentation](https://www.spurtcommerce.dev)
* [SpurtCommerce GitHub](https://github.com/spurtcommerce)
* [SpurtCommerce Discord](https://discord.com/invite/hyW4MXXn8n)

For API documentation, use the `/apidoc/` endpoint available in the running backend.

Example:

```text
http://localhost:8000/apidoc/
```

---

## ❯ 🐞 Troubleshooting and Issues

If you encounter an issue while installing or running the SpurtCommerce 5.4 B2C Single Vendor API, check:

1. Node.js and npm versions
2. Database credentials
3. MySQL server status
4. `.env` configuration
5. `APP_ID`
6. `TENANT_ID`
7. `APP_PORT`
8. Database tables and migrations
9. OAuth configuration
10. API server logs

---

## ❯ 📦 Version

**SpurtCommerce 5.4**

**Application:** B2C Single Vendor API

**Backend:** Node.js + TypeScript + TypeORM + MySQL

---

<p align="center">
    <strong>SpurtCommerce 5.4 — B2C Single Vendor API</strong>
    <br>
    Backend Run &amp; Deploy Guide
</p>