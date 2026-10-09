# Functional Requirements Document Generator (FRDG) Portal
### Nutz Technovation Private Limited

An enterprise-grade Functional Requirements Document (FRD) Gathering & Generation Platform built with **Next.js 14 (App Router)**, **Tailwind CSS**, **Framer Motion**, **Sequelize ORM**, and **NVIDIA NIM AI Engine** (`meta/llama-3.3-70b-instruct`).

---

## 🌟 Key Features

1. **Dual Role Access**:
   - **Client Portal**: Interactive conversational **Q&A Wizard** guiding clients step-by-step through business requirements, 38 enterprise domains, cascading product types, and granular sub-modules.
   - **Admin Hub**: Real-time monitoring of all client FRDs, live editor modal to modify any client requirements / architecture diagrams / phase timelines, and taxonomy manager.
2. **Comprehensive 38-Category Taxonomy**:
   - Enterprise Resource Planning (ERP), CRM, HRMS, BPM, Banking, FinTech, Healthcare, Supply Chain, Logistics, Real Estate Builder ERP, Hospitality, and more.
   - Cascading dynamic drill-down: Categories → Product Types → Main Modules → Sub-Modules → Sub-Sub-Modules.
   - **"+ Add Custom"** feature enabled at every single level for total flexibility.
3. **NVIDIA NIM AI Architecture Engine**:
   - Integrated with NVIDIA NIM (`meta/llama-3.3-70b-instruct`) using your API key.
   - Automatically drafts:
     - **Overall System Flow**
     - **High-Level Architecture Flow**
     - **Admin Flow**
     - **Phase-wise Flow**
     - **4-Phase Implementation Schedule** (Outcomes, Durations, and Module Feature Breakdown Tables)
     - **Excluded Scope Definition** (based on unselected items + standard exclusions)
4. **Exact Nutz Technovation Company PDF Standard**:
   - Strict 1-to-1 adherence to the 10-section official company document format:
     1. Project Requirements (Fixed table)
     2. Project Deliverables (Fixed table)
     3. Scope Breakdown & Technologies / Tools Specification Table
     4. Communication Plan (Fixed table)
     5. Additional Pricing Table
     6. Architecture & System Flow Diagrams
     7. Implementation Phases 1–4
     8. Payments, Splitups & Duration (40-30-30, 50-50, 40-20-20-20, or custom milestones)
     9. Excluded Scope List
     10. Other Project Agreements (Standard 13 points)
   - PDF Renaming capability before export.
   - Printable & downloadable with high-resolution layout.

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+ or 20+
- npm

### 2. Environment Configuration
The `.env` file is pre-configured with your NVIDIA NIM API key:
```env
NVIDIA_API_KEY=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
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_MODEL=meta/llama-3.3-70b-instruct
JWT_SECRET=frdg_nutz_enterprise_jwt_secret_2026_x89f
DATABASE_DIALECT=sqlite
DATABASE_STORAGE=./data/frdg.sqlite
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 4. Build & Production Start
```bash
npm run build
npm run start
```

---

## 🔑 Demo Account Credentials

| Role | Email | Password |
|---|---|---|
| **Nutz Admin** | `admin@nutz.in` | `admin123` |
| **Demo Client** | `client@example.com` | `client123` |

*Both can be logged into with 1-click from the login page!*

---

## 📂 Project Structure
```
src/
├── app/
│   ├── layout.tsx              # Root layout with Inter font and global styling
│   ├── globals.css             # Tailwind CSS + Print styling for Nutz PDF
│   ├── page.tsx                # Landing page & wizard launchpad
│   ├── login/page.tsx          # Dual-role Auth with 1-click switcher
│   ├── wizard/page.tsx         # Flagship 10-step Framer Motion Q&A Wizard
│   ├── projects/page.tsx       # FRD Documents list
│   ├── projects/[id]/page.tsx  # Document details, renamer, and preview
│   ├── projects/[id]/pdf/page.tsx # Exact 1-to-1 Nutz PDF printable layout
│   ├── admin/page.tsx          # Admin control hub & live modifier
│   └── api/
│       ├── auth/               # Login, register, me, logout
│       ├── ai/generate/        # NVIDIA NIM AI generator
│       ├── taxonomy/           # Full 38-category dataset API
│       └── projects/           # Project CRUD & persistence
├── components/
│   ├── Navbar.tsx              # Dynamic navigation bar
│   └── NutzLogo.tsx            # Nutz Technovation SVG/branding
├── data/
│   ├── taxonomy.ts             # 38 enterprise categories, types & modules
│   └── nutzTemplate.ts         # Company fixed tables, agreements, and splits
├── lib/
│   ├── auth.ts                 # JWT, hashing, cookie helpers
│   ├── db.ts                   # Sequelize ORM models & database layer
│   └── nvidia.ts               # NVIDIA NIM AI integration & fallback engine
└── types/
    └── index.ts                # TypeScript interfaces
```
# FRDG
