# Toolvaya API Documentation

## Base URL

```
http://localhost:8000
```

## Overview

Toolvaya is a PDF processing API that provides the following tools:

| Tool | Description |
|------|-------------|
| Merge | Combine multiple PDF files into one |
| Split | Split a PDF into multiple files by page ranges |
| Compress | Reduce PDF file size |
| Reorder | Rearrange pages in a PDF |
| Remove Pages | Drop specific pages from a PDF |

---

## Response Format

All API responses follow a consistent format:

### Success Response

```json
{
  "success": true,
  "data": { ... }
}
```

### Error Response

```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "User-friendly error message",
    "details": {
      "field_name": ["Specific error for this field"]
    }
  }
}
```

### Error Codes

| Code | Description |
|------|-------------|
| `VALIDATION_ERROR` | Invalid input data |
| `NOT_FOUND` | Resource not found |
| `UNAUTHORIZED` | Authentication required |
| `FORBIDDEN` | Insufficient permissions |
| `CONFLICT` | Resource conflict (e.g., result not ready) |
| `THROTTLED` | Rate limit exceeded |
| `JOB_EXPIRED` | Job has expired |
| `RESULT_NOT_READY` | PDF is still being processed |
| `SERVER_ERROR` | Internal server error |

---

## Rate Limiting

| Endpoint Type | Rate Limit |
|---------------|------------|
| Anonymous users | 60 requests/minute |
| Authenticated users | 120 requests/minute |
| PDF tool endpoints | 30 requests/minute |

---

## Endpoints

### 1. Home

Returns basic service information.

**URL:** `GET /`

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "service": "toolvaya-backend",
    "status": "ok",
    "version": "0.1.0"
  }
}
```

---

### 2. Health Check

Returns service health status.

**URL:** `GET /health/`

**Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "status": "ok"
  }
}
```

---

### 3. Merge PDFs

Combines multiple PDF files into a single PDF.

**URL:** `POST /api/pdf/merge/`

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `files` | File[] | Yes | Array of PDF files (minimum 2, maximum 10) |

**Request Example (cURL):**

```bash
curl -X POST http://localhost:8000/api/pdf/merge/ \
  -F "files=@file1.pdf" \
  -F "files=@file2.pdf"
```

**Success Response (202 Accepted):**

```json
{
  "success": true,
  "data": {
    "id": "7d01ead9-9849-4ed3-bcdf-7903129008ab",
    "tool": "merge",
    "status": "pending",
    "input_count": 2,
    "page_count": null,
    "result_filename": "",
    "error_message": "",
    "created_at": "2026-08-26T10:30:00Z",
    "updated_at": "2026-08-26T10:30:00Z",
    "started_at": null,
    "completed_at": null,
    "expires_at": "2026-08-27T10:30:00Z",
    "download_count": 0,
    "download_url": null,
    "status_url": "http://localhost:8000/api/pdf/jobs/7d01ead9-9849-4ed3-bcdf-7903129008ab/",
    "is_expired": false
  }
}
```

**Error Responses:**

| Status | Code | Message |
|--------|------|---------|
| 400 | VALIDATION_ERROR | "Please upload at least 2 PDF files to merge." |
| 400 | VALIDATION_ERROR | "Only PDF files are accepted. You uploaded 'image.jpg'. Please upload a PDF file." |
| 400 | VALIDATION_ERROR | "File 'document.pdf' exceeds the maximum size of 50MB. Please upload a smaller file." |
| 400 | VALIDATION_ERROR | "Password-protected PDFs are not supported. Please upload a PDF without password protection." |
| 429 | THROTTLED | "Request was throttled. Please try again later." |

---

### 4. Split PDF

Splits a PDF file into multiple files based on page ranges.

**URL:** `POST /api/pdf/split/`

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | PDF file to split |
| `ranges` | String | No | Page ranges (e.g., "1-3, 4-6"). Leave empty to split into individual pages. |

**Range Format:**
- `1-3` → Pages 1 to 3
- `1-3, 5-5` → Pages 1-3 and page 5
- `1-3, 5-7, 10-10` → Multiple ranges
- Empty → Split into individual pages

**Request Example (cURL):**

```bash
# Split with specific ranges
curl -X POST http://localhost:8000/api/pdf/split/ \
  -F "file=@document.pdf" \
  -F "ranges=1-3, 5-7"

# Split into individual pages
curl -X POST http://localhost:8000/api/pdf/split/ \
  -F "file=@document.pdf"
```

**Success Response (202 Accepted):**

```json
{
  "success": true,
  "data": {
    "id": "070ad4cb-332b-495b-863b-210570293770",
    "tool": "split",
    "status": "pending",
    "input_count": 1,
    "page_count": null,
    "result_filename": "",
    "error_message": "",
    "created_at": "2026-08-26T10:30:00Z",
    "updated_at": "2026-08-26T10:30:00Z",
    "started_at": null,
    "completed_at": null,
    "expires_at": "2026-08-27T10:30:00Z",
    "download_count": 0,
    "download_url": null,
    "status_url": "http://localhost:8000/api/pdf/jobs/070ad4cb-332b-495b-863b-210570293770/",
    "is_expired": false
  }
}
```

**Error Responses:**

| Status | Code | Message |
|--------|------|---------|
| 400 | VALIDATION_ERROR | "Please upload a PDF file to split." |
| 400 | VALIDATION_ERROR | "Invalid page range 'abc'. Use format like '1-3' or '1-3, 5-7'." |
| 400 | VALIDATION_ERROR | "Page range '1-20' exceeds the document's 10 pages. Please enter a valid range." |
| 400 | VALIDATION_ERROR | "The file 'image.png' is not a valid PDF. It may be corrupted. Please try uploading again." |

---

### 5. Compress PDF

Reduces the file size of a PDF.

**URL:** `POST /api/pdf/compress/`

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | PDF file to compress |

**Request Example (cURL):**

```bash
curl -X POST http://localhost:8000/api/pdf/compress/ \
  -F "file=@document.pdf"
```

**Success Response (202 Accepted):**

```json
{
  "success": true,
  "data": {
    "id": "f3d0d8d6-ed40-4472-a82b-8179a9446c41",
    "tool": "compress",
    "status": "pending",
    "input_count": 1,
    "page_count": null,
    "result_filename": "",
    "error_message": "",
    "created_at": "2026-08-26T10:30:00Z",
    "updated_at": "2026-08-26T10:30:00Z",
    "started_at": null,
    "completed_at": null,
    "expires_at": "2026-08-27T10:30:00Z",
    "download_count": 0,
    "download_url": null,
    "status_url": "http://localhost:8000/api/pdf/jobs/f3d0d8d6-ed40-4472-a82b-8179a9446c41/",
    "is_expired": false
  }
}
```

**Error Responses:**

| Status | Code | Message |
|--------|------|---------|
| 400 | VALIDATION_ERROR | "Please upload a PDF file to compress." |
| 400 | VALIDATION_ERROR | "The PDF file 'empty.pdf' has no pages. Please upload a valid PDF." |

---

### 6. Reorder PDF

Rearranges the pages of a PDF in a specified order.

**URL:** `POST /api/pdf/reorder/`

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | PDF file to reorder |
| `order` | String | Yes | Comma-separated page numbers (e.g., "3, 1, 2") |

**Order Format:**
- `3, 1, 2` → Page 3 first, then page 1, then page 2
- Must include all pages exactly once
- Pages are 1-indexed

**Request Example (cURL):**

```bash
curl -X POST http://localhost:8000/api/pdf/reorder/ \
  -F "file=@document.pdf" \
  -F "order=3, 1, 2"
```

**Success Response (202 Accepted):**

```json
{
  "success": true,
  "data": {
    "id": "1d6dafa3-acab-435b-884f-4e4c4165cb27",
    "tool": "reorder",
    "status": "pending",
    "input_count": 1,
    "page_count": null,
    "result_filename": "",
    "error_message": "",
    "created_at": "2026-08-26T10:30:00Z",
    "updated_at": "2026-08-26T10:30:00Z",
    "started_at": null,
    "completed_at": null,
    "expires_at": "2026-08-27T10:30:00Z",
    "download_count": 0,
    "download_url": null,
    "status_url": "http://localhost:8000/api/pdf/jobs/1d6dafa3-acab-435b-884f-4e4c4165cb27/",
    "is_expired": false
  }
}
```

**Error Responses:**

| Status | Code | Message |
|--------|------|---------|
| 400 | VALIDATION_ERROR | "Please upload a PDF file to reorder." |
| 400 | VALIDATION_ERROR | "Please provide the page order." |
| 400 | VALIDATION_ERROR | "Page order must contain only numbers separated by commas (e.g., '3, 1, 2')." |
| 400 | VALIDATION_ERROR | "Page order must include all 5 pages exactly once. You provided 3 page(s)." |
| 400 | VALIDATION_ERROR | "Page order must include all pages from 1 to 5 with no duplicates or missing pages." |

---

### 7. Remove Pages

Removes specific pages from a PDF, returning the rest as a new document.

**URL:** `POST /api/pdf/remove-pages/`

**Content-Type:** `multipart/form-data`

**Request Body:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | File | Yes | PDF file to remove pages from |
| `pages` | String | Yes | Pages to remove, e.g. "2" or "2, 4-6" |

**Pages Format:**
- Comma-separated page numbers and/or ranges, e.g. `2, 4-6`
- Pages are 1-indexed
- At least one page must remain in the result

**Request Example (cURL):**

```bash
curl -X POST http://localhost:8000/api/pdf/remove-pages/ \
  -F "file=@document.pdf" \
  -F "pages=2, 4-6"
```

**Success Response (202 Accepted):**

```json
{
  "success": true,
  "data": {
    "id": "b2b1...uuid",
    "tool": "remove_pages",
    "status": "completed",
    "input_count": 1,
    "page_count": 2,
    "result_filename": "remove_pages-b2b1....pdf",
    "error_message": "",
    "created_at": "2026-08-26T10:30:00Z",
    "updated_at": "2026-08-26T10:30:00Z",
    "started_at": "2026-08-26T10:30:00Z",
    "completed_at": "2026-08-26T10:30:00Z",
    "expires_at": "2026-08-27T10:30:00Z",
    "download_count": 0,
    "download_url": "http://localhost:8000/api/pdf/jobs/b2b1.../download/",
    "status_url": "http://localhost:8000/api/pdf/jobs/b2b1.../",
    "is_expired": false
  }
}
```

`status` may also come back as `pending`/`processing`/`failed` — poll `status_url` and use `download_url` once it's ready.

**Error Responses:**

| Status | Code | Message |
|--------|------|---------|
| 400 | VALIDATION_ERROR | "Please upload a PDF file." |
| 400 | VALIDATION_ERROR | "Please provide the pages to remove." |

---

### 8. Get Job Status

Returns the current status and details of a PDF processing job.

**URL:** `GET /api/pdf/jobs/{job_id}/`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `job_id` | UUID | The job ID returned from a create endpoint |

**Request Example (cURL):**

```bash
curl http://localhost:8000/api/pdf/jobs/7d01ead9-9849-4ed3-bcdf-7903129008ab/
```

**Success Response (200 OK):**

```json
{
  "success": true,
  "data": {
    "id": "7d01ead9-9849-4ed3-bcdf-7903129008ab",
    "tool": "merge",
    "status": "completed",
    "input_count": 2,
    "page_count": 10,
    "result_filename": "merge-7d01ead9-9849-4ed3-bcdf-7903129008ab.pdf",
    "error_message": "",
    "created_at": "2026-08-26T10:30:00Z",
    "updated_at": "2026-08-26T10:30:05Z",
    "started_at": "2026-08-26T10:30:01Z",
    "completed_at": "2026-08-26T10:30:05Z",
    "expires_at": "2026-08-27T10:30:00Z",
    "download_count": 0,
    "download_url": "http://localhost:8000/api/pdf/jobs/7d01ead9-9849-4ed3-bcdf-7903129008ab/download/",
    "status_url": "http://localhost:8000/api/pdf/jobs/7d01ead9-9849-4ed3-bcdf-7903129008ab/",
    "is_expired": false
  }
}
```

**Status Values:**

| Status | Description |
|--------|-------------|
| `pending` | Job created, waiting to be processed |
| `processing` | Currently being processed |
| `completed` | Ready to download |
| `failed` | An error occurred |
| `expired` | Job has expired (files deleted) |

**Error Responses:**

| Status | Code | Message |
|--------|------|---------|
| 404 | NOT_FOUND | "No PDFJob matches the given query." |

---

### 9. Download Result

Downloads the processed PDF or ZIP file.

**URL:** `GET /api/pdf/jobs/{job_id}/download/`

**Path Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| `job_id` | UUID | The job ID returned from a create endpoint |

**Request Example (cURL):**

```bash
# Download file
curl -O http://localhost:8000/api/pdf/jobs/7d01ead9-9849-4ed3-bcdf-7903129008ab/download/

# Or save with custom filename
curl -o merged.pdf http://localhost:8000/api/pdf/jobs/7d01ead9-9849-4ed3-bcdf-7903129008ab/download/
```

**Success Response (200 OK):**
- Content-Type: `application/pdf` or `application/zip`
- Returns the file as an attachment

**Error Responses:**

| Status | Code | Message |
|--------|------|---------|
| 404 | NOT_FOUND | "No PDFJob matches the given query." |
| 404 | JOB_EXPIRED | "This job has expired and the files have been deleted. Please upload your files again to start a new job." |
| 409 | RESULT_NOT_READY | "Your PDF is still being processed. Please check again in a few moments." |

---

## Job Lifecycle

```
Client uploads files
        ↓
POST /api/pdf/merge/ (or split/compress/reorder)
        ↓
Returns 202 with job_id and status_url
        ↓
Client polls GET /api/pdf/jobs/{job_id}/
        ↓
Status: pending → processing → completed
        ↓
Client downloads GET /api/pdf/jobs/{job_id}/download/
        ↓
Job expires after 24 hours (files deleted)
```

---

## Validation Rules

### File Validation

| Rule | Error Message |
|------|---------------|
| File must not be empty | "The file '{filename}' is empty. Please upload a valid PDF." |
| File must be PDF | "Only PDF files are accepted. You uploaded '{filename}'. Please upload a PDF file." |
| File max size 50MB | "File '{filename}' exceeds the maximum size of 50MB. Please upload a smaller file." |
| PDF must not be encrypted | "Password-protected PDFs are not supported. Please upload a PDF without password protection." |
| PDF must have pages | "The PDF file '{filename}' has no pages. Please upload a valid PDF." |
| PDF must be valid | "The file '{filename}' is not a valid PDF. It may be corrupted. Please try uploading again." |

### Merge Validation

| Rule | Error Message |
|------|---------------|
| Minimum 2 files | "Please upload at least 2 PDF files to merge." |
| Maximum 10 files | "Too many files. You can upload up to 10 files at once." |

### Split Validation

| Rule | Error Message |
|------|---------------|
| Valid range format | "Invalid page range '{token}'. Use format like '1-3' or '1-3, 5-7'." |
| Range within page count | "Page range '{token}' exceeds the document's {total_pages} pages. Please enter a valid range." |

### Reorder Validation

| Rule | Error Message |
|------|---------------|
| Order required | "Please provide the page order." |
| Numbers only | "Page order must contain only numbers separated by commas (e.g., '3, 1, 2')." |
| All pages included | "Page order must include all {total_pages} pages exactly once. You provided {len(order)} page(s)." |
| No duplicates/missing | "Page order must include all pages from 1 to {total_pages} with no duplicates or missing pages." |

### Remove Pages Validation

| Rule | Error Message |
|------|---------------|
| Pages required | "Please provide the pages to remove." |

---

## Interactive API Documentation

| Format | URL |
|--------|-----|
| Swagger UI | http://localhost:8000/api/docs/ |
| ReDoc | http://localhost:8000/api/redoc/ |
| OpenAPI Schema | http://localhost:8000/api/schema/ |

---

## Quick Start (Postman)

### Merge PDFs

1. Create a new request
2. Method: `POST`
3. URL: `http://localhost:8000/api/pdf/merge/`
4. Body → form-data
5. Add key `files` (type: File)
6. Upload 2+ PDF files
7. Send

### Check Job Status

1. Create a new request
2. Method: `GET`
3. URL: `http://localhost:8000/api/pdf/jobs/{job_id}/`
4. Send

### Download Result

1. Create a new request
2. Method: `GET`
3. URL: `http://localhost:8000/api/pdf/jobs/{job_id}/download/`
4. Send
5. Save the response as a file
