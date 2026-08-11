# applications

Role-specific application dossiers. One Vercel project per company.

## Vercel setup (per dossier)

Import this repo into Vercel **four times** (or once per company you need). Each project:

| Vercel project | `DOSSIER_COMPANY` | Domain |
|---|---|---|
| openai-application | `openai` | `openai.terencela.com` |
| google-application | `google` | `google.terencela.com` |
| anthropic-application | `anthropic` | `anthropic.terencela.com` |
| salesforce-application | `salesforce` | `salesforce.terencela.com` |

1. New Project → import `terencela/applications`
2. Environment variable: `DOSSIER_COMPANY` = company key (e.g. `openai`)
3. Add custom domain
4. Deploy

The dossier renders at `/`. No subdomain middleware.

## Local dev

```bash
npm install
npm run dev
```

- `http://localhost:3000` — index with links
- `http://localhost:3000/openai` — direct route (still works)

Or single dossier at root:

```bash
DOSSIER_COMPANY=google npm run dev
```

## Portfolio repo

Personal site and labs: [terencela/terencela](https://github.com/terencela/terencela)
