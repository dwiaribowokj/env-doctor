# env-doctor

[![CI](https://github.com/dwiaribowokj/env-doctor/actions/workflows/ci.yml/badge.svg)](https://github.com/dwiaribowokj/env-doctor/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

Safe CLI checker for `.env` files. It finds missing keys, duplicate keys, empty values, invalid URL-like values, and weak-looking secrets **without printing secret values**.

## Why

Environment bugs are annoying: missing variables, typoed keys, invalid URLs, and accidentally weak secrets usually fail late. `env-doctor` catches the common stuff early while keeping secret values out of terminal logs and CI output.

## Usage

```bash
npm install -g env-doctor
env-doctor --env .env --example .env.example
env-doctor --env .env --example .env.example --json
```

Local development:

```bash
npm install
npm run build
node dist/cli.js --env examples/.env.example
```

## Example output

```txt
Env Doctor
i Loaded 3 variables from examples/.env.example
! Possible weak secret length: JWT_SECRET
```

## Features

- Static dotenv parsing; no user config execution.
- Compare `.env` against `.env.example`.
- Detect duplicate keys.
- Detect empty values.
- Validate URL-like keys.
- Warn on weak-looking secret values without displaying them.
- `--strict` can fail on warnings for CI.

- Machine-readable `--json` output for CI and automation.

## Safety

- Secret values are never printed.
- `.env` files are ignored by default.
- Generated reports should not contain secret values.

## Development

```bash
npm install
npm run build
npm test
npm audit --audit-level=high
```

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening an issue or pull request.

This project uses the [MIT License](./LICENSE), which means you can use, copy, modify, and distribute it freely as long as the license notice is included.

## Community

- Bug reports: use the GitHub issue template.
- Feature ideas: keep them small, practical, and safe by default.
- Security issues: please follow [SECURITY.md](./SECURITY.md).
