# env-doctor Plan

## Goal
A safe, fast CLI for checking `.env` files before local runs, CI, or deployment.

## MVP Scope
- Parse `.env` with static dotenv parsing.
- Compare against `.env.example`.
- Detect missing keys, duplicate keys, empty values, invalid URL-like values, and weak-looking secrets.
- Never print raw secret values.
- Exit non-zero on missing required/example keys.

## Non-goals for MVP
- No framework-specific config execution.
- No secret scanning of the whole repository yet.
- No cloud provider validation calls.

## Roadmap
- JSON output for CI.
- Schema rules: required, optional, regex, enum, URL, number, boolean.
- Git tracking check for `.env` files.
- Stronger redaction tests.
- GitHub Action wrapper.

## Safety Notes
- Never log values from `.env`.
- Do not generate reports containing secrets.
- Keep config static; do not execute user JS config.
