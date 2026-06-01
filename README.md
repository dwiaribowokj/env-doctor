# env-doctor

Safe CLI checker for `.env` files. It finds missing keys, duplicate keys, empty values, invalid URL-like values, and weak-looking secrets **without printing secret values**.

## Usage

```bash
npm install -g env-doctor
env-doctor --env .env --example .env.example
```

## Safety

- Secret values are never printed.
- `.env` files are ignored by default.
- `--strict` exits non-zero on warnings.

## Development

```bash
npm install
npm run build
npm test
```
