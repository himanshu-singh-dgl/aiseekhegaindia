# Migration progress

Sequential execution of `aiseekhegaindia/migration-plan.html`.

## Done

- [x] Phase 0: lock Next.js; defer secondaries (`DEFERRED.md`)
- [x] Create repos: `aiseekhegaindia-front`, `aiseekhegaindia-backend`
- [x] Phase 1 front: Next.js scaffold + MDX + KaTeX
- [x] Phase 1 backend: Express health/meta stub
- [x] Phase 2 spike: AI for Leaders docs + CurriculumTree
- [x] Port Machine Learning docs
- [x] Port Deep Learning docs (+ images)
- [x] Port Language Models docs (21 pages + images)
- [x] Port Tutorials + LogisticRegression + Resources
- [x] Port homepage + fellowship (`/`, `/fellowship`)

## Loop stopped

Content migration sequential loop is **complete**. Remaining items are deferred (see `DEFERRED.md`):

- [ ] Search / sitemap / redirects polish
- [ ] Visual redesign / Infima button class cleanup
- [ ] Contribute page (currently Discord/GitHub links)
- [ ] Blog
- [ ] KaTeX strict-mode warnings cleanup
- [ ] Production hosting cutover

## Verify locally

```bash
cd aiseekhegaindia-front && npm run dev   # http://localhost:3000
cd aiseekhegaindia-backend && npm run dev # http://localhost:4000/health
```
