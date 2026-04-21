# NexusAI Roadmap

> Tracking high-level tasks and milestones for the NexusAI project.

---

## ✅ Completed

### Task 1: Thiết lập Infrastructure .cursor
**Status:** `DONE` — 2026-04-19

- [x] Created `.cursor/context.md` — Project context & monorepo map
- [x] Created `.cursor/rules.md` — Non-negotiable constitution
- [x] Created `.cursor/agents/architect.md` — Architect agent profile
- [x] Created `.cursor/skills/database/generate-prisma-model.md` — Prisma model skill
- [x] Created `.cursor/memory/decisions.md` — Architecture decision log
- [x] Created `.cursor/workflows/add-new-feature.md` — Feature development workflow
- [x] Created directory tree: agents, skills, prompts, workflows, memory, templates

### Task 2: Phase 1 — Core Commerce Schema
**Status:** `DONE` — 2026-04-19

- [x] Designed 8 commerce models: User, Product, Category, Inventory, Cart, CartItem, Order, OrderItem
- [x] Designed 4 enums: UserRole, OrderStatus, PaymentStatus, InventoryAction
- [x] Added pgvector embedding on Product for AI recommendation
- [x] Added soft delete on User and Product
- [x] Added snapshot pricing on CartItem and OrderItem
- [x] Added self-referencing Category tree
- [x] Preserved behavioral models: UserEvent, UserPersona
- [x] Updated `packages/types/index.ts` with all shared interfaces
- [x] Followed `generate-prisma-model.md` skill checklist

---

## 🔲 Backlog

### Task 2: Core Backend — Auth Module
- [ ] Implement JWT authentication in `core-backend`
- [ ] Add User registration/login endpoints
- [ ] Add auth guard middleware
- [ ] Update shared types

### Task 3: Storefront — Product Catalog
- [ ] Build product listing page (Server Components)
- [ ] Build product detail page
- [ ] Implement search with pgvector similarity
- [ ] Add tracking events (product_click, product_view)

### Task 4: AI Brain — Persona Engine
- [ ] Build persona classification endpoint
- [ ] Implement embedding generation pipeline
- [ ] Connect to RabbitMQ for event consumption
- [ ] Store embeddings in PostgreSQL via pgvector

### Task 5: Dashboard — Analytics MVP
- [ ] Revenue dashboard
- [ ] User funnel visualization
- [ ] Real-time event feed
