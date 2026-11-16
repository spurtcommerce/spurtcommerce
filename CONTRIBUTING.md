# Contributing to SpurtCommerce

Thank you for your interest in contributing to SpurtCommerce! Contributions from the community help make this project better for everyone.

Please take a moment to review this document before submitting contributions.

---

## Code of Conduct

All contributors and maintainers are expected to adhere to our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before participating in project spaces.

---

## Development Environment Setup

### Prerequisites

Ensure you have the following installed on your development machine (matching project requirements in [README.md](README.md)):

* **Node.js**: v22.23.1 (recommended)
* **npm**: >= 10.9.8
* **MySQL Server**: 8.x or compatible
* **Git**: >= 2.x

Verify your environment:
```bash
node -v
npm -v
mysql --version
git --version
```

### 1. Clone the Repository

```bash
git clone https://github.com/spurtcommerce/spurtcommerce-api.git
cd spurtcommerce-api
```

### 2. Install Dependencies

Install all dependencies using `npm install` (or the configured `presetup` script):

```bash
npm install
```

### 3. Environment Configuration

Copy the example environment configuration file:

```bash
cp .env.example .env
```

Open `.env` and configure your local settings:
* Database connection (`TYPEORM_HOST`, `TYPEORM_PORT`, `TYPEORM_USERNAME`, `TYPEORM_PASSWORD`, `TYPEORM_DATABASE`)
* Application settings (`APP_TYPE=local`, `APP_PORT=8000`, `APP_ID`, `TENANT_ID`)
* Security secrets (`JWT_SECRET`, `CRYPTO_SECRET`, `WEBHOOK_TOKEN`)

### 4. Database Setup

Create the database in MySQL:
```sql
CREATE DATABASE spurtcommerce_db;
```

Import your database schema/backup or run setup scripts:
```bash
# Setup database configuration
npm run setup

# Optional: seed sample data if needed
npm run dbseed
```

---

## Working with Project Scripts

All lifecycle commands are configured in `package.json` and `package-scripts.js`:

| Command | Description |
| --- | --- |
| `npm start` | Builds index and starts the application via `nps` |
| `npm start serve` | Starts application in development mode with `nodemon` file-watching |
| `npm run build` | Builds the production bundle in `dist/` |
| `npm run create-index` | Generates entity, controller, middleware, and migration index files |
| `npm run tslint` | Runs TSLint across the project |
| `npm run test:jest` | Runs unit tests using Jest |
| `npm run generatedoc` | Generates REST API documentation into `src/public/apidoc` |
| `npm run adminBuild` | Builds admin microservice assets into `dist/` |
| `npm run vendorBuild` | Builds vendor microservice assets into `dist/` |
| `npm run storeBuild` | Builds store microservice assets into `dist/` |

---

## Branch and Commit Guidelines

### Branch Naming Conventions

All development should occur on topic branches branched from `master`:

* `feature/<feature-name>`: New functionality or enhancements (e.g., `feature/api-key-auth`)
* `fix/<bug-name>`: Bug fixes (e.g., `fix/cart-item-deletion`)
* `docs/<doc-name>`: Documentation improvements (e.g., `docs/update-readme`)
* `refactor/<refactor-name>`: Code restructuring without functional changes

### Commit Message Guidelines

Follow the concise, descriptive style used throughout the repository history:

* Write commit messages in the imperative, present tense (e.g., `Fixed keyword search issue`, `Implement vendor featured product`).
* Keep the first line concise (under 72 characters).
* If the commit addresses an issue, reference it (e.g., `Fix order process issue (#123)`).
* Avoid generic commit messages such as `fix`, `update`, or `changes`.

---

## Code Style and Linting

The project enforces TypeScript linting rules configured in `tslint.json`.

* **Pre-commit Hook**: Husky automatically runs `tslint --project .` before each commit.
* **Manual Lint Check**: Run `npm run tslint` before pushing changes.

Key stylistic rules:
* **Quotes**: Use single quotes (`'`) for string literals.
* **Line Length**: Max line length is 400 characters (`tslint.json`).
* **Imports**: Group imports logically (external libraries first, then internal services/models).
* **Logging**: Use the project's `@Logger(__filename)` decorator rather than raw `console.log` / `console.debug`.
* **Member Ordering**: Follow class member ordering defined in `tslint.json` (`public static` -> `protected static` -> `private static` -> `public instance` -> methods).

---

## Testing Instructions

* Run Jest unit tests:
  ```bash
  npm run test:jest
  ```
* Before submitting a pull request, ensure:
  1. All new or modified logic includes corresponding tests where applicable.
  2. `npm run tslint` passes with zero errors.
  3. `npm run build` completes successfully.

---

## Pull Request Submission Guidelines

1. **Fork & Branch**: Create a feature or bugfix branch on your fork from `master`.
2. **Focus**: Keep pull requests focused on a single responsibility or bug fix. Avoid bundling unrelated refactoring.
3. **Documentation**: If adding or altering API endpoints, add or update `@api` comments and run `npm run generatedoc`.
4. **Clean Git History**: Rebase against the latest `master` before opening a pull request.
5. **PR Description**: Include a clear description of:
   * The problem being addressed.
   * The approach taken to solve it.
   * How the changes were tested.
   * Breaking changes or new environment variables introduced (if any).
6. **Review Process**: Maintainers will review your pull request, request changes if necessary, and merge once all checks pass.
