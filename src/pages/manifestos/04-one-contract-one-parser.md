---
layout: ../../layouts/Manifesto.astro
number: 4
slug: one-contract-one-parser
title: "One Contract, One Parser"
tagline: "A program's public option surface is a contract file, not an accident of its argument-parsing code."
---

Most programs describe their own interface three times: once in the argument parser, once in the
`--help` text, and once in the README. The three drift, and the parser wins by default — so the
real contract becomes whatever the code happens to accept.

We invert that. The public command and flag surface lives in a repository-root `.cli-flags.toml`:
commands, option aliases, types, defaults, environment keys, help text, and precedence. One
authority. The runtime parses argv **through** that contract.

## The rules

- Every executable — CLI, web server, API server, admin servers — parses argv through the
  canonical [flags-2-env](https://github.com/flags-2-env/flags-2-env) binding at its argv boundary.
- Unknown options and invalid typed values are **rejected**, not warned about and continued past.
- Contract audit failures and parse failures are **startup failures**. There is no partially
  configured process.
- The resolved configuration is immutable and passed inward. Nothing re-reads the environment
  halfway down the call stack.
- Libraries like clap, argparse and commander may project already-resolved values into
  application types. They must not remain a second, independent option schema.
- `.env` precedence goes through the same parser. Adding a second dotenv loader re-creates the
  drift the contract exists to remove.

## Credentials are not flags

Argv is visible in process listings and shell history. Secrets arrive through the environment or
a secret store, never as a command-line option — see [Secrets Have One Home](/manifestos/secrets-have-one-home).

## Why a file and not a library call

Because a file can be read by something that is not the program: a documentation generator, a
shell-completion generator, a fleet audit that checks 160 repositories for the same flag spelling,
or a human deciding whether a change is breaking. An option schema that only exists as executable
code can only be queried by running it.
