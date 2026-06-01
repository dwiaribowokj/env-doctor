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

## Contributing

Contributions are welcome. Please read [CONTRIBUTING.md](./CONTRIBUTING.md) before opening an issue or pull request.

This project uses the [MIT License](./LICENSE), which means you can use, copy, modify, and distribute it freely as long as the license notice is included.

## Community

- Bug reports: use the GitHub issue template.
- Feature ideas: keep them small, practical, and safe by default.
- Security issues: please follow [SECURITY.md](./SECURITY.md).

