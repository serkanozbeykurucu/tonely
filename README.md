# Tonely

> AI-powered recruiter outreach message generator with a ChatGPT-like interface.

Tonely helps recruiters craft compelling, personalized outreach messages for LinkedIn, email, and other platforms — in any tone, in any language. Open-source and self-hostable.
---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Local Development (Manual)](#local-development-manual)
  - [Local Development (Docker)](#local-development-docker)
- [Environment Variables](#environment-variables)
- [API Reference](#api-reference)
- [AI Provider Configuration](#ai-provider-configuration)
- [Plan & Quota System](#plan--quota-system)
- [Deployment](#deployment)
- [Contributing](#contributing)

---

## Overview

Tonely is a conversational AI assistant purpose-built for recruiters. It guides users through a structured flow — gathering position details, candidate info, and preferred tone — then generates a ready-to-send outreach message. Follow-ups like "make it shorter", "translate to Turkish", or "rewrite in Pirate tone" are handled naturally in the same conversation.

**Why Tonely?**
Unlike generic AI chat tools, Tonely enforces a recruiter-specific flow and output format. The AI always produces raw message text — no preamble, no markdown wrappers — making it paste-and-send ready.

---

## Features

- **Guided message generation** — AI collects recruiter context, candidate details, and tone in a structured conversational flow
- **Multi-tone support** — Professional, Warm & Friendly, Direct & Bold, Pirate, Gen Z, Gordon Ramsay Style, Haiku, and more; custom tones also accepted
- **Follow-up editing** — Shorten, translate, change tone, or add emoji in the same conversation
- **Multi-language UI** — English, Turkish, German, Italian (client-side locale switching)
- **Real-time streaming** — Responses stream token-by-token via SignalR
- **Conversation history** — All sessions are persisted and browsable from the sidebar
- **Plan-based quota system** — Configurable conversation and rate limits per role (Free / Pro)
- **Multi-provider AI** — Uses `Microsoft.Extensions.AI` (`IChatClient`) abstraction; switch between Gemini, OpenAI, Claude, or DeepSeek with a single env var
- **API key fallback** — Comma-separated API keys: on a 429 rate-limit, the next key is tried automatically (useful for Gemini free-tier limits)

---

## Tech Stack

### Frontend

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.x | React framework, App Router |
| TypeScript | 5.x | Type safety |
| Tailwind CSS | 4.x | Styling |
| @microsoft/signalr | 10.x | Real-time streaming |
| Zustand | 5.x | Client-side state (locale, auth) |
| Framer Motion | 12.x | Animations |
| Sonner | 2.x | Toast notifications |

### Backend

| Technology | Version | Purpose |
|------------|---------|---------|
| .NET | 10 | Runtime |
| ASP.NET Core | 10 | Web API + SignalR Hub |
| ASP.NET Identity | — | Authentication (opaque bearer tokens) |
| Entity Framework Core | 10 (Npgsql) | ORM, code-first migrations |
| PostgreSQL | 17 | Primary database |
| Microsoft.Extensions.AI | — | AI provider abstraction (`IChatClient`) |
| Mscc.GenerativeAI.Microsoft | — | Gemini adapter |
| Microsoft.Extensions.AI.OpenAI | — | OpenAI + DeepSeek adapter |
| Anthropic | — | Claude adapter (official SDK) |
| FluentValidation | — | Request validation (Business layer) |
| AutoMapper | — | DTO mapping (Business layer) |
| Hangfire + Hangfire.PostgreSql | — | Background job infrastructure |
| Serilog | — | Structured logging |

### Infrastructure

| Technology | Purpose |
|------------|---------|
| Docker + Docker Compose | Local full-stack environment |
| GitHub Actions | CI (build + test on push/PR) |

---

## Architecture

Tonely uses a **monorepo** layout with two independently deployable services:

```
tonely/
├── src/
│   ├── client/   ← Next.js 16 (App Router)
│   └── server/   ← .NET 10 N-Tier API
├── docker-compose.yml
├── .env.example
└── .gitignore
```

### Backend — N-Tier Architecture

The backend follows a strict N-Tier (layered) architecture. Each layer has a single responsibility and a defined dependency direction:

```
┌─────────────────────────────────────────────────────────────┐
│  HttpApi.Host   ← Program.cs, Middlewares, SignalR Hub      │
├─────────────────────────────────────────────────────────────┤
│  HttpApi        ← Controllers (thin, no business logic)     │
├─────────────────────────────────────────────────────────────┤
│  Business       ← Services, Validators, AI orchestration    │
├───────────────────────────┬─────────────────────────────────┤
│  DataAccess               │  Dto                            │
│  (EF Core, Repositories)  │  (Request/Response DTOs)        │
├───────────────────────────┼─────────────────────────────────┤
│  Entity                   │  Shared                         │
│  (Domain entities)        │  (Exceptions, Responses,        │
│                           │   Constants, Utilities)         │
└───────────────────────────┴─────────────────────────────────┘
```

**Layer dependency rules:**

| Layer | May reference |
|-------|--------------|
| `Entity` | _(none)_ |
| `DataAccess` | Entity |
| `Dto` | _(none)_ |
| `Shared` | _(none)_ |
| `Business` | DataAccess, Dto, Shared |
| `HttpApi` | Business (transitive) |
| `HttpApi.Host` | Business, DataAccess, HttpApi |

### Real-time Message Flow

```
Browser
  │
  ├─ POST /api/v1/conversation          ← REST: create conversation
  │
  └─ SignalR: SendMessage(convId, text) ← Hub: stream AI response
       │
       ├─ ReceiveChunk(chunk)           ← token-by-token chunks
       └─ ChatCompleted(messageDto)     ← final persisted message
```

---

## Project Structure

### Backend (`src/server/src/`)

```
Tonely.Entity/
├── Abstract/           IEntity
└── Concrete/           BaseEntity, Conversation, Message, ApplicationUser, ApplicationRole

Tonely.DataAccess/
├── Abstract/           IGenericDal<T>, IConversationDal, IMessageDal
├── Concrete/
│   ├── GenericRepository.cs
│   └── EntityFramework/    EfConversationDal, EfMessageDal
├── Context/            TonelyDbContext (audit + soft-delete via SaveChangesAsync override)
└── Migrations/

Tonely.Business/
├── Abstract/           IConversationService, IMessageService, IAiMessageService,
│                       IAccountService, IUsageLimitService, IRateLimiter
├── Concrete/           ConversationService, MessageService, AiMessageService,
│                       AccountService, UsageLimitService, InMemoryRateLimiter
├── Validators/         ChatRequestValidator, CreateConversationRequestValidator,
│                       RegisterWithNameRequestValidator, UpdateProfileRequestValidator,
│                       ValidationHelper (domain helpers — blocked domain list, etc.)
└── Mappings/           MappingProfile (AutoMapper)

Tonely.Dto/             ConversationDto, MessageDto, ChatRequest, CreateConversationRequest,
                        RegisterWithNameRequest, AccountProfileDto, UpdateProfileRequest

Tonely.Shared/
├── Responses/          Response<T>, PaginatedResponse<T>, ResponseCode
├── Exceptions/         BaseException, NotFoundException, ValidationException,
│                       QuotaExceededException, AiServiceException, ...
├── Constants/          RoleConstants, PolicyConstants
├── Settings/           AiSettings, JwtSettings, PlanLimitsSettings
└── Utilities/          UserUtility

Tonely.HttpApi/
└── Controllers/        ConversationController, MessageController, AccountController

Tonely.HttpApi.Host/
├── Hubs/               MessageHub (SignalR)
├── Middlewares/        ExceptionHandlingMiddleware
├── Extensions/         ApiVersioningExtensions, SwaggerExtensions, AiChatClientExtensions
├── Identity/           TonelyUserClaimsPrincipalFactory
├── Data/
│   ├── Factories/      IChatClientFactory, GeminiChatClientFactory, OpenAiChatClientFactory,
│   │                   ClaudeChatClientFactory, DeepSeekChatClientFactory
│   ├── FallbackChatClient.cs   (multi-key 429 fallback)
│   └── NoOpChatClient.cs       (dev mode, no API key)
└── Program.cs
```

### Frontend (`src/client/`)

```
app/
├── (auth)/             login, register pages
├── (chat)/             chat, history, settings, help, plans pages
└── layout.tsx

components/
├── chat/               HeroSection, GuidedChatView, ChatWindow, ChatComposer,
│                       MessageBubble, MessageContent, PromptInputBar
├── layout/             AppShell, MainHeader, Sidebar, LocaleSwitcher, LegalFooter
├── plans/              PricingCard, PricingGrid, PricingHeader
└── ui/                 Button, Input, BrandMark, NavItem

lib/
├── api/                REST client (conversations, messages, account)
├── hooks/              useChat (SignalR + state), useConversations, useAuth, useSubscription
├── i18n/               Locale store (Zustand), dictionaries (en, tr, de, it)
└── types/              Shared TypeScript types
```

---

## Getting Started

### Prerequisites

| Tool | Version | Notes |
|------|---------|-------|
| .NET SDK | 10.0+ | `dotnet --version` |
| Node.js | 22.x | `node --version` |
| PostgreSQL | 17+ | Or use Docker Compose |
| Docker | 24.x+ | Optional, for full-stack setup |

### Local Development (Manual)

**1. Clone and configure environment**

```bash
git clone https://github.com/serkanozbeykurucu/tonely.git
cd tonely
cp .env.example .env
```

Edit `.env` with your real values (see [Environment Variables](#environment-variables)).

**2. Start the database**

```bash
docker run -d \
  --name tonely-db \
  -e POSTGRES_DB=TonelyDb \
  -e POSTGRES_USER=postgres \
  -e POSTGRES_PASSWORD=yourpassword \
  -p 5432:5432 \
  postgres:17-alpine
```

Or use an existing local PostgreSQL instance.

**3. Run the backend**

```bash
cd src/server
dotnet restore
dotnet run --project src/Tonely.HttpApi.Host
```

The API will start at `https://localhost:5042`. Migrations are applied automatically on startup.

**4. Run the frontend**

```bash
cd src/client
npm install
npm run dev
```

The app will be available at `http://localhost:3000`.

### Local Development (Docker)

```bash
cp .env.example .env
# Edit .env with your AI API key and other values

docker compose up --build
```

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000 |
| PostgreSQL | localhost:5432 |

To run only the database (and develop services locally):

```bash
docker compose up db
```

---

## Environment Variables

Copy `.env.example` to `.env` and fill in the values. The `.env` file is never committed.

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `DB_HOST` | Yes | `localhost` | PostgreSQL host |
| `DB_PORT` | Yes | `5432` | PostgreSQL port |
| `DB_NAME` | Yes | `TonelyDb` | Database name |
| `DB_USER` | Yes | `postgres` | Database user |
| `DB_PASSWORD` | Yes | — | Database password |
| `AI_PROVIDER` | No | `gemini` | AI provider: `gemini`, `openai`, `claude`, `deepseek` |
| `AI_API_KEY` | Yes | — | API key(s) — comma-separate multiple keys for automatic 429 fallback |
| `AI_MODEL` | No | `gemini-2.0-flash` | Model identifier (e.g. `gpt-4o`, `claude-opus-4-7`, `deepseek-chat`) |
| `CORS_ALLOWED_ORIGINS` | Yes | — | Comma-separated allowed origins, e.g. `http://localhost:3000` |
| `PlanLimits__Plans__Free__MaxConversations` | No | `1` | Max AI conversations for Free users (`-1` = unlimited) |
| `PlanLimits__Plans__Free__RateLimitPerMinute` | No | `5` | Max AI messages/minute for Free users |
| `PlanLimits__Plans__Pro__MaxConversations` | No | `-1` | Max AI conversations for Pro users |
| `PlanLimits__Plans__Pro__RateLimitPerMinute` | No | `30` | Max AI messages/minute for Pro users |
| `ASPNETCORE_ENVIRONMENT` | No | `Development` | ASP.NET Core environment |
| `NEXT_PUBLIC_API_URL` | Yes | `https://localhost:5042` | Backend URL (consumed by the Next.js client) |

> **Security note:** Never commit `.env`. Only `.env.example` (with placeholder values) belongs in version control.

---

## API Reference

The backend exposes a versioned REST API at `/api/v1/` and a SignalR hub at `/hubs/messages`.

### Authentication

Tonely uses **ASP.NET Identity bearer tokens** (`AddIdentityApiEndpoints`). Include the access token in the `Authorization` header:

```
Authorization: Bearer <access_token>
```

Built-in Identity endpoints (mounted via `MapIdentityApi`):

| Method | Path | Description |
|--------|------|-------------|
| `POST` | `/register` | Not used directly — use `/api/v1/account/register` instead |
| `POST` | `/login` | Sign in, returns `accessToken` + `refreshToken` |
| `POST` | `/refresh` | Refresh access token |
| `POST` | `/logout` | Invalidate token |

### Account

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/account/register` | No | Register with full name, email, password |
| `GET` | `/api/v1/account/profile` | Yes | Get current user's profile |
| `PUT` | `/api/v1/account/profile` | Yes | Update full name |

**Register request:**
```json
{
  "fullName": "Serkan Özbey Kurucu",
  "email": "serkan@company.com",
  "password": "Str0ngPass",
  "confirmPassword": "Str0ngPass"
}
```

**Password rules (validated server-side + client-side):**
- Minimum 8 characters, maximum 100
- Must contain at least one uppercase letter, one lowercase letter, one digit
- `confirmPassword` must match `password`

**Email rules:**
- Valid email format, maximum 200 characters
- Disposable / placeholder domains are rejected (e.g. `mailinator.com`, `tempmail.com`, `example.com`)

**Update profile request:**
```json
{
  "fullName": "Serkan Özbey Kurucu"
}
```

### Conversations

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/conversation` | Yes | List all conversations for the current user |
| `GET` | `/api/v1/conversation/{id}` | Yes | Get a single conversation |
| `POST` | `/api/v1/conversation` | Yes | Create a new conversation |
| `DELETE` | `/api/v1/conversation/{id}` | Yes | Soft-delete a conversation |

**Create conversation request:**
```json
{
  "title": "Backend Developer Outreach"
}
```

### Messages

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `GET` | `/api/v1/message/conversation/{conversationId}` | Yes | Get all messages in a conversation |

> AI messages are **not** sent via REST. Use the SignalR hub below.

### SignalR Hub — `/hubs/messages`

Connect with the bearer token as a query parameter (required for SignalR):

```
wss://localhost:5042/hubs/messages?access_token=<token>
```

**Client → Server:**

| Method | Parameters | Description |
|--------|------------|-------------|
| `SendMessage` | `conversationId: string, content: string` | Send a user message and start AI streaming |

**Server → Client:**

| Event | Payload | Description |
|-------|---------|-------------|
| `ReceiveChunk` | `chunk: string` | Incremental AI response token |
| `ChatCompleted` | `MessageDto` | Final persisted assistant message |

---

## AI Provider Configuration

Tonely uses `Microsoft.Extensions.AI`'s `IChatClient` abstraction. Switching providers requires **only env var changes** — no code modifications.

The active provider is resolved at startup via the `AI_PROVIDER` variable. Each provider has a concrete `IChatClientFactory` implementation in `HttpApi.Host/Data/Factories/`.

### Supported providers

| `AI_PROVIDER` | Default model | Key source |
|---|---|---|
| `gemini` _(default)_ | `gemini-2.0-flash` | [Google AI Studio](https://aistudio.google.com/app/apikey) |
| `openai` | `gpt-4o` | [OpenAI Platform](https://platform.openai.com/api-keys) |
| `claude` | `claude-opus-4-7` | [Anthropic Console](https://console.anthropic.com/) |
| `deepseek` | `deepseek-chat` | [DeepSeek Platform](https://platform.deepseek.com/) |

### Configuration examples

**Gemini:**
```env
AI_PROVIDER=gemini
AI_API_KEY=your_gemini_api_key
AI_MODEL=gemini-2.0-flash
```

**OpenAI:**
```env
AI_PROVIDER=openai
AI_API_KEY=sk-...
AI_MODEL=gpt-4o
```

**Claude:**
```env
AI_PROVIDER=claude
AI_API_KEY=sk-ant-...
AI_MODEL=claude-opus-4-7
```

**DeepSeek:**
```env
AI_PROVIDER=deepseek
AI_API_KEY=your_deepseek_api_key
AI_MODEL=deepseek-chat
```

### Multiple API keys (rate-limit fallback)

Gemini's free tier has a 20 RPD limit. Provide multiple keys separated by commas — on a `429` response the next key is tried automatically:

```env
AI_API_KEY=key_one,key_two,key_three
```

This works for any provider, not just Gemini.

### Adding a new provider

1. Create a class implementing `IChatClientFactory` in `HttpApi.Host/Data/Factories/`
2. Add a case to the `switch` in `AiChatClientExtensions.AddAiChatClient()`

No other layers need to change.

### No-op mode (development without an API key)

If `AI_API_KEY` is empty or unset, a `NoOpChatClient` is registered that returns a placeholder response. This lets you develop and test the full UI flow without an API key.

---

## Plan & Quota System

Quotas are role-based and fully configurable via environment variables — no code changes needed.

| Setting | Free | Pro | Description |
|---------|------|-----|-------------|
| `MaxConversations` | `1` | `-1` (unlimited) | Max distinct conversations that have received an AI reply |
| `RateLimitPerMinute` | `5` | `30` | Max AI messages per user per minute (in-memory sliding window) |

Quota enforcement happens in `UsageLimitService` before each AI call. When exceeded, `QuotaExceededException` (HTTP 429) is thrown and the frontend disables the composer and shows a quota message.

To add a new plan (e.g., Enterprise), add a new role in the database seeding and configure:

```env
PlanLimits__Plans__Enterprise__MaxConversations=-1
PlanLimits__Plans__Enterprise__RateLimitPerMinute=120
```

> **Note:** The in-memory rate limiter (`InMemoryRateLimiter`) resets on app restart and is not shared across multiple instances. For multi-instance deployments, replace it with a Redis-backed implementation by implementing `IRateLimiter`.

---

## Deployment

### Environment

Set all variables from [Environment Variables](#environment-variables) in your hosting platform (Railway, Render, Fly.io, Azure App Service, etc.).

Key production settings:

```env
ASPNETCORE_ENVIRONMENT=Production
CORS_ALLOWED_ORIGINS=https://yourdomain.com
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

### Backend Docker image

A `Dockerfile` is located at `src/server/Dockerfile`. Build and run:

```bash
docker build -t tonely-server ./src/server
docker run -p 8080:8080 --env-file .env tonely-server
```

The server listens on port `8080` inside the container (mapped to `5000` in Docker Compose).

### Frontend Docker image

A `Dockerfile` is located at `src/client/Dockerfile`. Build-time env vars must be provided at build time for Next.js public variables:

```bash
docker build \
  --build-arg NEXT_PUBLIC_API_URL=https://api.yourdomain.com \
  -t tonely-client ./src/client
```

### Full stack with Docker Compose

```bash
docker compose up -d
```

Services auto-start in dependency order: PostgreSQL → Backend (waits for healthy DB) → Frontend.

### Database migrations

Migrations run automatically on backend startup via:

```csharp
await db.Database.MigrateAsync();
```

No manual migration step is required in CI/CD.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Follow the existing architecture conventions (see backend layer structure above)
4. Ensure CI passes: `dotnet build` + `dotnet test` for backend, `npm run lint && npm run build` for frontend
5. Open a pull request

For significant changes, open an issue first to discuss the approach.

---

## License

MIT — see [LICENSE](LICENSE) for details.
