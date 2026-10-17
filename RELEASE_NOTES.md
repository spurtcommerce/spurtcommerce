# Spurtcommerce v6.0

**Release Date:** October 16, 2026  
**Version:** 6.0  
**Platform:** SpurtCommerce  
<!-- **Application:** B2C Single Vendor API   -->
**Backend:** Node.js + TypeScript + TypeORM + MySQL

---

## 🎉 Overview

SpurtCommerce v6.0 introduces significant improvements to the B2C Single Vendor API, focusing on codebase optimization, security enhancements, and removal of unused legacy code. This release delivers a leaner, more maintainable, and secure backend API for single-vendor e-commerce deployments.

---

## ✨ What's New

### 🔧 Codebase Optimization & Cleanup
- **Removed unused industry-specific demo data** — Eliminated 10 industry datasets (Agriculture, Automotive, Books, Construction, Electronics, Fashion, Food, Leather, Network, Pharma, Textiles) including images, product JSON files, and associated assets (~500MB+ reduction)
- **Cleaned up unused models & repositories** — Removed `VendorDocument`, `VendorDocumentLog`, `VendorSettingsDomain` models and their corresponding repositories
- **Eliminated unused controllers & services** — Removed redundant code paths and consolidated functionality

### 🐛 Bug Fixes
- **Fixed Page & Page Group issues** — Resolved inconsistencies in page management and page group functionality
- **Fixed product creation issues** — Addressed bugs preventing proper product creation workflows
- **Resolved store management issues** — Fixed problems in store configuration and management

### 🔒 Security Enhancements
- **Fixed API security vulnerabilities** — Patched potential security issues in API endpoints
- **Cleaned up SQL queries** — Improved query safety and performance by removing raw/unused SQL

### 📦 Dependency Updates
- Updated to **TypeORM v0.3.26** for improved ORM performance and compatibility
- Updated **Node.js** to v22.23.1 (recommended)
- Updated **npm** to >= 10.9.8
- Various dependency upgrades for security and stability

---

## 📋 Detailed Changes

### Files Modified
| Category | Files Changed |
|----------|--------------|
| Core Models | `Document.ts`, `VendorDocument.ts` (removed), `VendorDocumentLog.ts` (removed), `VendorSettingsDomain.ts` (removed) |
| Repositories | `VendorDocumentRepository.ts` (removed), `VendorDocumentLogRepository.ts` (removed), `VendorSettingsDomainRepository.ts` (removed) |
| Services | `PageService.ts` (updated) |
| Controllers | `OrderController.ts`, `PageController.ts`, `PageGroupController.ts` (updated) |
| Entity Index | `entities-index.ts` (updated) |
| API Documentation | `apidoc/api_data.js`, `apidoc/api_data.json`, `apidoc/api_project.js`, `apidoc/api_project.json` (updated) |
| Tests | `CustomerDocument.test.ts` (removed) |
| Database | `spurtcommerce.sql` (updated) |

### Files Removed
- 189 files total (primarily demo industry data assets and unused code)
- ~5,500+ lines of code removed
- ~500MB of demo images and assets removed

---

## 🚀 Installation & Upgrade

### Fresh Installation
```bash
# Clone the repository
git clone https://github.com/spurtcommerce/spurtcommerce.git
cd spurtcommerce

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your configuration

# Import database
mysql -u <username> -p <database_name> < spurtcommerce.sql

# Start the API
npm start serve
```

### Upgrading from v5.3
1. Backup your database and `.env` file
2. Pull latest changes: `git pull origin main`
3. Install new dependencies: `npm install`
4. Run database migrations (if any): Check `package.json` for migration commands
5. Update `.env` with any new required variables
6. Restart the API: `npm start serve`

---

## ⚙️ Requirements

| Requirement | Version |
|-------------|---------|
| Node.js | v22.23.1 (recommended) |
| npm | >= 10.9.8 |
| MySQL | 8.0+ |
| TypeScript | ^5.9.3 |
| TypeORM | ^0.3.26 |

---

## 📚 Documentation

- **API Documentation:** Available at `http://localhost:<PORT>/apidoc/` when running
- **Project Documentation:** [https://docs.spurtcommerce.com](https://www.spurtcommerce.dev)
- **Website:** [https://www.spurtcommerce.com](https://www.spurtcommerce.com)

---

## 🐛 Known Issues

- None reported at release time

---

## 🤝 Contributors

Special thanks to the SpurtCommerce team and community contributors for this release.

---

## 📄 License

MIT License — See [LICENSE](LICENSE) for details.

---

## 🔗 Links

- **GitHub Repository:** [https://github.com/spurtcommerce](https://github.com/spurtcommerce)
- **Discord Community:** [https://discord.com/invite/hyW4MXXn8n](https://discord.com/invite/hyW4MXXn8n)
- **Issues & Bug Reports:** [GitHub Issues](https://github.com/spurtcommerce/spurtcommerce/issues)

---

**Full Changelog:** [Compare v5.3...v6.0](https://github.com/spurtcommerce/spurtcommerce/compare/v5.3...v6.0)