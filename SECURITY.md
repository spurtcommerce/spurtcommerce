# Security Policy

The SpurtCommerce team takes the security and integrity of our software and community seriously. This document outlines our security policy, supported versions, and how to report vulnerabilities responsibly.

---

## Supported Versions

Only the current major release branch actively receives security updates.

| Version | Supported          | Notes                                     |
| ------- | ------------------ | ----------------------------------------- |
| 6.x     | :white_check_mark: | Current active release (v6.0.0+)          |
| 5.x     | :x:                | Unsupported; upgrade to v6.x recommended  |
| < 5.0   | :x:                | Unsupported                               |

If you are using an older version, we strongly recommend upgrading to the latest release to ensure you have all security patches.

---

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues, pull requests, discussions, or social media channels.**

To report a vulnerability privately, use one of the following methods:

### 1. GitHub Private Vulnerability Reporting (Recommended)
If you are viewing this repository on GitHub:
1. Navigate to the **Security** tab of the repository.
2. Under "Reporting", click on **Report a vulnerability** to open an advisory draft.
3. Submit the details. This creates a secure, private advisory where maintainers can collaborate with you directly.

### 2. Email Disclosure
If GitHub Private Vulnerability Reporting is unavailable, you can contact the maintainers via email:
- **Security Contact Placeholder:** `[security@spurtcommerce.com]` *(Official security mailbox)*
- **General Project Support:** `support@spurtcommerce.com` / `support@piccosoft.com`

When sending sensitive information via email, please request an encryption key or ask for a secure channel if necessary.

---

## What to Include in a Report

To help us triage and resolve the issue quickly, please provide as much information as possible:

1. **Vulnerability Type**: A description of the issue (e.g., authentication bypass, SQL injection, remote code execution, sensitive data exposure, cross-site scripting).
2. **Affected Components**:
   - Specific API routes or endpoints (e.g., `POST /api/webhook-client`).
   - Relevant source files, controllers, or middlewares.
   - Project version(s) affected.
3. **Steps to Reproduce**:
   - Clear, step-by-step instructions.
   - Proof-of-concept (PoC) scripts, cURL commands, or HTTP requests/responses (with sensitive data redacted).
4. **Impact Assessment**:
   - Potential impact on the system, customer data, or infrastructure.
   - Conditions required for exploitation (e.g., specific privileges or configurations).
5. **Suggested Fix / Remediation** (Optional):
   - Any proposed patch, configuration change, or mitigation.

---

## Responsible Disclosure Guidelines

We ask researchers and community members to adhere to responsible disclosure principles:

* **Grace Period**: Give maintainers reasonable time (up to 90 days or a mutually agreed timeline) to investigate, develop, test, and release a patch before disclosing details publicly.
* **Do No Harm**: Do not exploit the vulnerability beyond what is strictly necessary to verify its existence.
* **Data Privacy**: Do not view, download, modify, delete, or exfiltrate customer, vendor, or user data.
* **System Availability**: Do not execute Denial of Service (DoS/DDoS) attacks, flood endpoints, or degrade system availability.
* **Confidentiality**: Keep all vulnerability details confidential until an official patch and advisory have been published.

---

## Vulnerability Handling Process

Once a vulnerability report is received:

1. **Acknowledgment**: Maintainers aim to acknowledge receipt within 3 business days.
2. **Investigation & Triage**: Maintainers will confirm the issue, assess severity, and determine affected versions.
3. **Remediation**: A fix will be developed in a private branch or advisory fork and tested.
4. **Release & Advisory**: A security patch release will be published along with a public security advisory detailing the issue and acknowledging the reporter (if desired).
