# Mutual Fund TER Portal

Express/EJS portal for AMFI mutual-fund TER and NAV data, brokerage and commission management, launch dates, and AMC documents.

## Quick start

For a fresh install, copy `.env.example` to `.env` and change the admin password
and session secret before starting the app:

```powershell
Copy-Item .env.example .env
```

If `.env` already exists, keep it and update its values instead of replacing it.

```powershell
npm install
npm start
```

Open the URL printed by the server. Development mode uses Nodemon:

```powershell
npm run dev
```

Run tests:

```powershell
npm test
```

## Documentation

See [docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md) for setup, configuration, architecture, data flow, roles, API endpoints, persistence, uploads, security, troubleshooting, and the source map.

## Runtime requirements

- Node.js `>=22.5.0`
- npm
- AMFI network access for live refreshes

The default port is `3000`; the server automatically tries subsequent ports when the configured port is busy. Production deployments must set `SESSION_SECRET` and should use HTTPS with a valid certificate.

## Data and credentials

Git contains the application code and bundled reference data, not the live
installation's database or runtime changes. On first startup, TER/NAV data is
fetched from AMFI. The SQLite user database (`data/app.db`), user accounts,
commission and brokerage overrides, saved sync snapshot, cache files, and
uploaded AMC documents are local runtime data and are intentionally excluded
from Git. A fresh install therefore does not inherit another install's users,
passwords, overrides, or uploaded documents.

To use the same login on a fresh, independent install, set the same
`ADMIN_USERNAME` and `ADMIN_PASSWORD` in that install's `.env` **before its
first startup**. This seeds that install's own database; it does not copy user
accounts or make the databases stay in sync. To preserve the existing accounts
and all saved data, restore a backup of the runtime data to persistent storage.
For multiple people to use one shared, continuously updated dataset, run one
hosted instance backed by persistent storage and have everyone access that
instance rather than running separate clones.

Never commit `.env`, `data/app.db`, cache/override files, or uploaded documents.
They can contain secrets, password hashes, or business data. Back them up and
transfer them through a private, access-controlled channel. See
[docs/PROJECT_DOCUMENTATION.md](docs/PROJECT_DOCUMENTATION.md) for the full
persistence layout and deployment notes.
