# applications

Role-specific application dossiers for Terence La.

## Live

- [openai.terencela.com](https://openai.terencela.com)
- [google.terencela.com](https://google.terencela.com)
- [anthropic.terencela.com](https://anthropic.terencela.com)
- [salesforce.terencela.com](https://salesforce.terencela.com)

## Dev

```bash
npm run install:ci
npm run dev
```

Routes: `/openai`, `/google`, `/anthropic`, `/salesforce`

Subdomain routing is handled in `middleware.ts` for production deploys.

## Repo split

Personal portfolio and labs live in [terencela/terencela](https://github.com/terencela/terencela).
This repo is dossiers only.
