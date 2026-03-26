# Sistem Bilete de Vacanță - Monorepo

Monorepo:
- /backend (NestJS + Sequelize + PostgreSQL)
- /frontend (React + Vite)
- /infra/caddy (reverse proxy + HTTPS)
- /docs (documentație în română)

## Rulare locală cu Docker
1. Copiază `.env.example` în `.env` și completează valorile.
2. Rulează:
   docker compose up -d --build
3. Acces:
   - Frontend: http://localhost
   - API: http://localhost/api

## CI/CD
Fluxul GitHub Actions este în `.github/workflows/ci-cd.yml`.

## Deploy DigitalOcean
Vezi ghidul complet în `docs/deploy-digitalocean.md`.
