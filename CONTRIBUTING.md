# Contributing

Thanks for considering a contribution. This project is intentionally small, practical, and beginner-friendly.

## Ways to contribute

- Report bugs with a minimal reproduction.
- Suggest useful CLI flags or safety checks.
- Improve docs, examples, and error messages.
- Add tests for edge cases.
- Fix issues marked `good first issue`.

## Development

```bash
npm install
npm run build
npm test
npm audit --audit-level=high
```

## Pull request checklist

Before opening a PR, please make sure:

- The change is focused and easy to review.
- Tests pass locally.
- New behavior is documented in the README when relevant.
- Safety defaults are preserved.
- No secrets, tokens, or private data are committed.

## Project principles

- Safe by default.
- Useful without heavy setup.
- Clear CLI output.
- Small scope beats feature creep.
- Prefer boring, maintainable code.
