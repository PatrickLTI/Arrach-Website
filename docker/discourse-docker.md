# Discourse Docker template & notes

Discourse is a robust forum. Official installation uses the `discourse` Docker image with `discourse_docker` tooling. Below are starter notes and a minimal `docker-compose` template — adapt for your VPS.

Important: Discourse requires a full install (PostgreSQL, Redis, mail setup, and domain). Follow official docs: https://github.com/discourse/discourse/blob/main/docs/INSTALL-cloud.md

Minimal docker-compose (illustrative only):

```yaml
version: '3'
services:
  web:
    image: discourse/discourse:latest
    restart: always
    env_file: .env # contains DISCOURSE_HOSTNAME, SMTP settings, etc.
    volumes:
      - ./data:/var/discourse/shared
    ports:
      - "80:80"
```

Single Sign-On (SSO):
- We will implement Discourse SSO where the forum delegates auth to the Next.js site. That requires adding a `sso` endpoint on this site and configuring Discourse admin > Settings > Login > enable "enable_sso" and set the provider URL.

I'll add a starter `pages/api/sso.js` in the Next.js app when you confirm to proceed with SSO implementation.
