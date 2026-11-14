# Next.js Route Handlers & API Documentation (API.md)
**Project:** Harsh Thanki Portfolio & Engineering Systems Showcase  
**Base URL:** `/api`  
**Status:** Production Ready  

---

## 1. Contact Form Dispatcher (`POST /api/contact`)

### 1.1 Overview
Handles contact form submissions with Zod schema validation, an anti-bot honeypot field, sliding-window IP rate limiting, and email dispatch via Resend.

### 1.2 Rate Limiting
- **Window:** 15 minutes (900,000 ms)
- **Max Requests:** 5 submissions per IP
- **Response Headers:**
  - `X-RateLimit-Limit`: `5`
  - `X-RateLimit-Remaining`: Remaining submissions in current window
  - `Retry-After`: Seconds to wait when rate-limited (HTTP 429)

### 1.3 Request Schema (`application/json`)
```json
{
  "name": "Jane Doe",
  "email": "jane@company.com",
  "message": "Discussing local LLM speculative decoding architecture for enterprise ERP integration.",
  "_hp": ""
}
```

| Field | Type | Required | Constraints | Description |
| :--- | :--- | :--- | :--- | :--- |
| `name` | string | Yes | Min 2, max 100 chars | Inquirer's full name |
| `email` | string | Yes | Valid email format, max 100 chars | Sender's contact email |
| `message` | string | Yes | Min 10, max 2000 chars | Engineering project brief or query |
| `_hp` | string | Optional | Must be empty | **Honeypot field.** Hidden from humans; if populated by bots, request is silently dropped with HTTP 200 to prevent retry flooding. |

### 1.4 Response Codes
- `200 OK`: Message dispatched successfully.
  ```json
  { "success": true, "message": "Message dispatched successfully." }
  ```
- `400 Bad Request`: Validation failure (e.g. invalid email or message too short).
  ```json
  { "error": "Invalid email address" }
  ```
- `429 Too Many Requests`: IP rate limit exceeded.
  ```json
  { "error": "Rate limit exceeded. Please wait 15 minutes before sending another inquiry." }
  ```
- `500 Internal Server Error`: Unexpected handler failure.

---

## 2. Speculative Inference Streaming Demo (`POST /api/demo`)

### 2.1 Overview
Simulates a live streaming token generation pass through an on-premise speculative decoding pipeline (`Draft Model 1.5B` -> `Verification Model 70B` -> `AST Guardrail Check`).

### 2.2 Rate Limiting
- **Window:** 15 minutes
- **Max Requests:** 10 requests per IP
- **Safety Cap:** Maximum 500 characters per prompt input.

### 2.3 Request Schema (`application/json`)
```json
{
  "prompt": "Generate an optimized ERP purchase order query with relational join."
}
```

### 2.4 Streaming Response
Returns `text/plain; charset=utf-8` using chunked transfer encoding (`ReadableStream`).
Chunks emit real-time pipeline status:
```
Token Ingestion: Completed in 2.1ms.
Draft Model (DeepSeek-1.5B): Generating k=5 candidate tokens...
Target Verification (DeepSeek-7B): Evaluating logits in parallel...
Accepted 4 of 5 speculative tokens (80% acceptance rate).
Guardrail AST Check: Clean syntax, 0 ungrounded symbols.
Result Chunk: Speculative stream verified for prompt: "..."
```

---

## 3. Verification & Automated Test Script

To verify both endpoints locally or in CI:

```bash
# 1. Test Valid Contact Submission
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Tester","email":"test@example.com","message":"Hello from engineering validation."}'

# 2. Test Honeypot Bot Interception (Expect 200 OK without email dispatch)
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Bot","email":"bot@spam.com","message":"Buy crypto!","_hp":"filled_by_spambot"}'

# 3. Test Live Inference Streaming Endpoint
curl -X POST http://localhost:3000/api/demo \
  -H "Content-Type: application/json" \
  -d '{"prompt":"Explain 7-tier failover DAG architecture."}'
```
