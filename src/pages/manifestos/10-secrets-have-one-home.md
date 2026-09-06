---
layout: ../../layouts/Manifesto.astro
number: 10
slug: secrets-have-one-home
title: "Secrets Have One Home"
tagline: "A credential seen outside its store is not a credential you have. It is an incident you have."
---

Credentials leak through convenience. Someone pastes a token into a chat to unblock a colleague,
another passes it as a command-line argument, a third commits a decrypted `.env` because the
service would not start without it. Each step is locally reasonable and the aggregate is a secret
in six systems with no revocation story.

## Where credentials live

- **Encrypted at rest, in version control.** `env/enc/*.env.enc`, managed with SOPS, age, Just and
  Nix. These are the versioned source of truth.
- **Decrypted only into an ignored runtime directory** — `env/dec/` — which is never committed.
- **Resolved at runtime from a keychain or approved credential helper**: the platform CLI's own
  keyring, SSH for git, a scoped secret-manager entry for everything else.
- **Injected through the environment**, never through argv, because argv is visible in process
  listings and shell history.
- A small number of centrally managed runtime secrets come from the shared keystore. CI secrets
  are a backup delivery path, not the source of truth.

## Where credentials do not live

Not in a repository file. Not in an `AGENTS.md` or any other instruction document. Not in chat
history, a transcript, a pull request, an issue, a ticket, a commit message, a remote URL, or
object metadata.

**A token found in any of those is exposed material, not a fallback.** The correct response is to
report it and ask the owner to rotate it — never to use it because it was there and it worked.

## Rotation is a human decision

Do not revoke, rotate, or delete a credential without explicit authorization from its owner. An
unannounced rotation is an outage with extra steps, and "I was being careful" does not restore the
service. Report, then wait.

## Test the path without printing the secret

Verifying that authentication works never requires seeing the value:

```bash
gh auth token >/dev/null
gh api user --jq .login
aws s3api head-bucket --bucket "$BUCKET" --endpoint-url "$ENDPOINT" >/dev/null
```

Each proves the credential resolves and is accepted, and none of them puts it on a terminal, in a
log, or into a transcript that will outlive the session.
