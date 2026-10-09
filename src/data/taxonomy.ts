import { Category } from '@/types';

export const COMPREHENSIVE_TAXONOMY: Category[] = [
  {
    "id": "cat-1",
    "code": "1",
    "name": "ENTERPRISE BUSINESS SYSTEMS",
    "description": "Core enterprise resource management, CRM, HR, BPM, ECM, KMS, DMS, and QMS systems",
    "productTypes": [
      {
        "id": "type-1-1",
        "name": "Enterprise Resource Planning (ERP)",
        "mainModules": [
          {
            "id": "mod-1-1-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-1-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-1-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-1-1-1-2",
                    "name": "SSO (SAML/OAuth2)"
                  },
                  {
                    "id": "ss-1-1-1-1-3",
                    "name": "LDAP"
                  },
                  {
                    "id": "ss-1-1-1-1-4",
                    "name": "Biometric (Fingerprint/Face/Iris)"
                  },
                  {
                    "id": "ss-1-1-1-1-5",
                    "name": "Email OTP"
                  },
                  {
                    "id": "ss-1-1-1-1-6",
                    "name": "SMS OTP"
                  },
                  {
                    "id": "ss-1-1-1-1-7",
                    "name": "TOTP-MFA"
                  },
                  {
                    "id": "ss-1-1-1-1-8",
                    "name": "Social Login (Google/Microsoft)"
                  }
                ]
              },
              {
                "id": "sub-1-1-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-1-1-2-1",
                    "name": "System Admin"
                  },
                  {
                    "id": "ss-1-1-1-2-2",
                    "name": "Module Admin"
                  },
                  {
                    "id": "ss-1-1-1-2-3",
                    "name": "Manager"
                  },
                  {
                    "id": "ss-1-1-1-2-4",
                    "name": "Employee"
                  },
                  {
                    "id": "ss-1-1-1-2-5",
                    "name": "Auditor"
                  },
                  {
                    "id": "ss-1-1-1-2-6",
                    "name": "External User"
                  }
                ]
              },
              {
                "id": "sub-1-1-1-3",
                "name": "Registration Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-1-3-1",
                    "name": "Admin-invited"
                  },
                  {
                    "id": "ss-1-1-1-3-2",
                    "name": "Self-registration with approval"
                  },
                  {
                    "id": "ss-1-1-1-3-3",
                    "name": "Bulk import"
                  }
                ]
              },
              {
                "id": "sub-1-1-1-4",
                "name": "MFA Options",
                "subSubModules": [
                  {
                    "id": "ss-1-1-1-4-1",
                    "name": "SMS"
                  },
                  {
                    "id": "ss-1-1-1-4-2",
                    "name": "Email"
                  },
                  {
                    "id": "ss-1-1-1-4-3",
                    "name": "Authenticator App (Google/Microsoft)"
                  },
                  {
                    "id": "ss-1-1-1-4-4",
                    "name": "Biometric"
                  },
                  {
                    "id": "ss-1-1-1-4-5",
                    "name": "Hardware Token"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-2",
            "name": "Business Information",
            "subModules": [
              {
                "id": "sub-1-1-2-1",
                "name": "Company Profile",
                "subSubModules": [
                  {
                    "id": "ss-1-1-2-1-1",
                    "name": "Name"
                  },
                  {
                    "id": "ss-1-1-2-1-2",
                    "name": "Logo"
                  },
                  {
                    "id": "ss-1-1-2-1-3",
                    "name": "Tagline"
                  },
                  {
                    "id": "ss-1-1-2-1-4",
                    "name": "Description"
                  }
                ]
              },
              {
                "id": "sub-1-1-2-2",
                "name": "Locations",
                "subSubModules": [
                  {
                    "id": "ss-1-1-2-2-1",
                    "name": "Single-branch"
                  },
                  {
                    "id": "ss-1-1-2-2-2",
                    "name": "Multi-branch"
                  },
                  {
                    "id": "ss-1-1-2-2-3",
                    "name": "Regional"
                  },
                  {
                    "id": "ss-1-1-2-2-4",
                    "name": "Global"
                  }
                ]
              },
              {
                "id": "sub-1-1-2-3",
                "name": "Certifications",
                "subSubModules": [
                  {
                    "id": "ss-1-1-2-3-1",
                    "name": "ISO"
                  },
                  {
                    "id": "ss-1-1-2-3-2",
                    "name": "GST"
                  },
                  {
                    "id": "ss-1-1-2-3-3",
                    "name": "Quality certifications"
                  }
                ]
              },
              {
                "id": "sub-1-1-2-4",
                "name": "Organizational Structure",
                "subSubModules": [
                  {
                    "id": "ss-1-1-2-4-1",
                    "name": "Departments"
                  },
                  {
                    "id": "ss-1-1-2-4-2",
                    "name": "Organizational Hierarchy"
                  },
                  {
                    "id": "ss-1-1-2-4-3",
                    "name": "Business Units"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-3",
            "name": "Financial Management",
            "subModules": [
              {
                "id": "sub-1-1-3-1",
                "name": "Accounting Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-1-3-1-1",
                    "name": "Double-Entry"
                  },
                  {
                    "id": "ss-1-1-3-1-2",
                    "name": "Single-Entry"
                  }
                ]
              },
              {
                "id": "sub-1-1-3-2",
                "name": "Ledger Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-3-2-1",
                    "name": "General Ledger"
                  },
                  {
                    "id": "ss-1-1-3-2-2",
                    "name": "Sub-ledger (AP/AR)"
                  },
                  {
                    "id": "ss-1-1-3-2-3",
                    "name": "Consolidated"
                  }
                ]
              },
              {
                "id": "sub-1-1-3-3",
                "name": "Budget Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-3-3-1",
                    "name": "Static"
                  },
                  {
                    "id": "ss-1-1-3-3-2",
                    "name": "Rolling"
                  },
                  {
                    "id": "ss-1-1-3-3-3",
                    "name": "Zero-based"
                  },
                  {
                    "id": "ss-1-1-3-3-4",
                    "name": "Activity-based"
                  }
                ]
              },
              {
                "id": "sub-1-1-3-4",
                "name": "Asset Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-3-4-1",
                    "name": "Fixed Assets (Buildings/Machinery)"
                  },
                  {
                    "id": "ss-1-1-3-4-2",
                    "name": "Intangible Assets (Patents/Goodwill)"
                  }
                ]
              },
              {
                "id": "sub-1-1-3-5",
                "name": "Depreciation Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-1-3-5-1",
                    "name": "Straight-line (SLM)"
                  },
                  {
                    "id": "ss-1-1-3-5-2",
                    "name": "Written Down Value (WDV)"
                  },
                  {
                    "id": "ss-1-1-3-5-3",
                    "name": "Units of Production"
                  }
                ]
              },
              {
                "id": "sub-1-1-3-6",
                "name": "Tax Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-3-6-1",
                    "name": "GST (5/12/18/28%)"
                  },
                  {
                    "id": "ss-1-1-3-6-2",
                    "name": "VAT"
                  },
                  {
                    "id": "ss-1-1-3-6-3",
                    "name": "Sales Tax"
                  },
                  {
                    "id": "ss-1-1-3-6-4",
                    "name": "Income Tax"
                  },
                  {
                    "id": "ss-1-1-3-6-5",
                    "name": "TDS/TCS"
                  },
                  {
                    "id": "ss-1-1-3-6-6",
                    "name": "Customs Duty"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-4",
            "name": "Inventory & Warehouse",
            "subModules": [
              {
                "id": "sub-1-1-4-1",
                "name": "Stock Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-4-1-1",
                    "name": "Raw Material"
                  },
                  {
                    "id": "ss-1-1-4-1-2",
                    "name": "WIP (Work-in-Progress)"
                  },
                  {
                    "id": "ss-1-1-4-1-3",
                    "name": "Finished Goods"
                  },
                  {
                    "id": "ss-1-1-4-1-4",
                    "name": "Consignment"
                  }
                ]
              },
              {
                "id": "sub-1-1-4-2",
                "name": "Transfers",
                "subSubModules": [
                  {
                    "id": "ss-1-1-4-2-1",
                    "name": "Warehouse-to-warehouse"
                  },
                  {
                    "id": "ss-1-1-4-2-2",
                    "name": "Inter-branch transfers"
                  }
                ]
              },
              {
                "id": "sub-1-1-4-3",
                "name": "Batch Management",
                "subSubModules": [
                  {
                    "id": "ss-1-1-4-3-1",
                    "name": "Batch numbers"
                  },
                  {
                    "id": "ss-1-1-4-3-2",
                    "name": "Expiry dates"
                  },
                  {
                    "id": "ss-1-1-4-3-3",
                    "name": "Manufacturing dates"
                  }
                ]
              },
              {
                "id": "sub-1-1-4-4",
                "name": "Valuation Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-1-4-4-1",
                    "name": "FIFO (First-In-First-Out)"
                  },
                  {
                    "id": "ss-1-1-4-4-2",
                    "name": "LIFO (Last-In-First-Out)"
                  },
                  {
                    "id": "ss-1-1-4-4-3",
                    "name": "Weighted Average"
                  },
                  {
                    "id": "ss-1-1-4-4-4",
                    "name": "Specific Identification"
                  }
                ]
              },
              {
                "id": "sub-1-1-4-5",
                "name": "Barcode Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-4-5-1",
                    "name": "QR Code"
                  },
                  {
                    "id": "ss-1-1-4-5-2",
                    "name": "Code128"
                  },
                  {
                    "id": "ss-1-1-4-5-3",
                    "name": "EAN-13"
                  },
                  {
                    "id": "ss-1-1-4-5-4",
                    "name": "UPC"
                  }
                ]
              },
              {
                "id": "sub-1-1-4-6",
                "name": "Warehouse Structure",
                "subSubModules": [
                  {
                    "id": "ss-1-1-4-6-1",
                    "name": "Multi-warehouse"
                  },
                  {
                    "id": "ss-1-1-4-6-2",
                    "name": "Zone-based"
                  },
                  {
                    "id": "ss-1-1-4-6-3",
                    "name": "Bin location"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-5",
            "name": "Supply Chain",
            "subModules": [
              {
                "id": "sub-1-1-5-1",
                "name": "Procurement",
                "subSubModules": [
                  {
                    "id": "ss-1-1-5-1-1",
                    "name": "Purchase Requisition"
                  },
                  {
                    "id": "ss-1-1-5-1-2",
                    "name": "Purchase Order"
                  },
                  {
                    "id": "ss-1-1-5-1-3",
                    "name": "Supplier Quotes"
                  },
                  {
                    "id": "ss-1-1-5-1-4",
                    "name": "RFQ/RFP"
                  },
                  {
                    "id": "ss-1-1-5-1-5",
                    "name": "Tender"
                  }
                ]
              },
              {
                "id": "sub-1-1-5-2",
                "name": "Vendor Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-5-2-1",
                    "name": "Individual Vendor"
                  },
                  {
                    "id": "ss-1-1-5-2-2",
                    "name": "Corporate Vendor"
                  },
                  {
                    "id": "ss-1-1-5-2-3",
                    "name": "Approved Vendor List"
                  },
                  {
                    "id": "ss-1-1-5-2-4",
                    "name": "Vendor Rating"
                  }
                ]
              },
              {
                "id": "sub-1-1-5-3",
                "name": "Logistics",
                "subSubModules": [
                  {
                    "id": "ss-1-1-5-3-1",
                    "name": "In-house Fleet"
                  },
                  {
                    "id": "ss-1-1-5-3-2",
                    "name": "Third-party (Shiprocket, Delhivery, FedEx)"
                  },
                  {
                    "id": "ss-1-1-5-3-3",
                    "name": "Multi-modal"
                  }
                ]
              },
              {
                "id": "sub-1-1-5-4",
                "name": "Supplier Management",
                "subSubModules": [
                  {
                    "id": "ss-1-1-5-4-1",
                    "name": "Onboarding"
                  },
                  {
                    "id": "ss-1-1-5-4-2",
                    "name": "Contracts"
                  },
                  {
                    "id": "ss-1-1-5-4-3",
                    "name": "Performance Scorecards"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-6",
            "name": "Project Management",
            "subModules": [
              {
                "id": "sub-1-1-6-1",
                "name": "Methodologies",
                "subSubModules": [
                  {
                    "id": "ss-1-1-6-1-1",
                    "name": "Waterfall"
                  },
                  {
                    "id": "ss-1-1-6-1-2",
                    "name": "Agile"
                  },
                  {
                    "id": "ss-1-1-6-1-3",
                    "name": "Hybrid"
                  },
                  {
                    "id": "ss-1-1-6-1-4",
                    "name": "Kanban"
                  }
                ]
              },
              {
                "id": "sub-1-1-6-2",
                "name": "Gantt Features",
                "subSubModules": [
                  {
                    "id": "ss-1-1-6-2-1",
                    "name": "Dependencies (FS/SS/SF/FF)"
                  },
                  {
                    "id": "ss-1-1-6-2-2",
                    "name": "Critical Path"
                  },
                  {
                    "id": "ss-1-1-6-2-3",
                    "name": "Milestones"
                  }
                ]
              },
              {
                "id": "sub-1-1-6-3",
                "name": "Time Tracking",
                "subSubModules": [
                  {
                    "id": "ss-1-1-6-3-1",
                    "name": "Manual Entry"
                  },
                  {
                    "id": "ss-1-1-6-3-2",
                    "name": "Timesheet"
                  },
                  {
                    "id": "ss-1-1-6-3-3",
                    "name": "Timer-based (Toggl integration)"
                  },
                  {
                    "id": "ss-1-1-6-3-4",
                    "name": "Auto-track"
                  }
                ]
              },
              {
                "id": "sub-1-1-6-4",
                "name": "Resource Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-6-4-1",
                    "name": "People"
                  },
                  {
                    "id": "ss-1-1-6-4-2",
                    "name": "Equipment"
                  },
                  {
                    "id": "ss-1-1-6-4-3",
                    "name": "Budget"
                  },
                  {
                    "id": "ss-1-1-6-4-4",
                    "name": "Material"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-7",
            "name": "Human Resources",
            "subModules": [
              {
                "id": "sub-1-1-7-1",
                "name": "Attendance Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-1-7-1-1",
                    "name": "Biometric (Fingerprint/Face)"
                  },
                  {
                    "id": "ss-1-1-7-1-2",
                    "name": "Geo-fencing"
                  },
                  {
                    "id": "ss-1-1-7-1-3",
                    "name": "Self-declaration"
                  },
                  {
                    "id": "ss-1-1-7-1-4",
                    "name": "Manual"
                  }
                ]
              },
              {
                "id": "sub-1-1-7-2",
                "name": "Leave Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-7-2-1",
                    "name": "Sick"
                  },
                  {
                    "id": "ss-1-1-7-2-2",
                    "name": "Casual"
                  },
                  {
                    "id": "ss-1-1-7-2-3",
                    "name": "Annual"
                  },
                  {
                    "id": "ss-1-1-7-2-4",
                    "name": "Maternity"
                  },
                  {
                    "id": "ss-1-1-7-2-5",
                    "name": "Paternity"
                  },
                  {
                    "id": "ss-1-1-7-2-6",
                    "name": "Compensatory"
                  }
                ]
              },
              {
                "id": "sub-1-1-7-3",
                "name": "Payroll Frequencies",
                "subSubModules": [
                  {
                    "id": "ss-1-1-7-3-1",
                    "name": "Monthly"
                  },
                  {
                    "id": "ss-1-1-7-3-2",
                    "name": "Bi-weekly"
                  },
                  {
                    "id": "ss-1-1-7-3-3",
                    "name": "Daily wages"
                  }
                ]
              },
              {
                "id": "sub-1-1-7-4",
                "name": "Performance Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-7-4-1",
                    "name": "KPI (Quantitative)"
                  },
                  {
                    "id": "ss-1-1-7-4-2",
                    "name": "OKR (Qualitative)"
                  },
                  {
                    "id": "ss-1-1-7-4-3",
                    "name": "360-degree"
                  },
                  {
                    "id": "ss-1-1-7-4-4",
                    "name": "Self-Appraisal"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-8",
            "name": "Sales & CRM",
            "subModules": [
              {
                "id": "sub-1-1-8-1",
                "name": "Lead Status",
                "subSubModules": [
                  {
                    "id": "ss-1-1-8-1-1",
                    "name": "Cold"
                  },
                  {
                    "id": "ss-1-1-8-1-2",
                    "name": "Warm"
                  },
                  {
                    "id": "ss-1-1-8-1-3",
                    "name": "Hot"
                  },
                  {
                    "id": "ss-1-1-8-1-4",
                    "name": "Qualified"
                  }
                ]
              },
              {
                "id": "sub-1-1-8-2",
                "name": "Pipeline Stages",
                "subSubModules": [
                  {
                    "id": "ss-1-1-8-2-1",
                    "name": "Prospecting"
                  },
                  {
                    "id": "ss-1-1-8-2-2",
                    "name": "Qualification"
                  },
                  {
                    "id": "ss-1-1-8-2-3",
                    "name": "Proposal"
                  },
                  {
                    "id": "ss-1-1-8-2-4",
                    "name": "Negotiation"
                  },
                  {
                    "id": "ss-1-1-8-2-5",
                    "name": "Closed"
                  }
                ]
              },
              {
                "id": "sub-1-1-8-3",
                "name": "Quotation Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-8-3-1",
                    "name": "Standard"
                  },
                  {
                    "id": "ss-1-1-8-3-2",
                    "name": "Proforma"
                  },
                  {
                    "id": "ss-1-1-8-3-3",
                    "name": "Discounted"
                  },
                  {
                    "id": "ss-1-1-8-3-4",
                    "name": "Digital Signature"
                  }
                ]
              },
              {
                "id": "sub-1-1-8-4",
                "name": "Order Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-8-4-1",
                    "name": "B2B (Bulk)"
                  },
                  {
                    "id": "ss-1-1-8-4-2",
                    "name": "B2C (Retail)"
                  },
                  {
                    "id": "ss-1-1-8-4-3",
                    "name": "Subscription"
                  },
                  {
                    "id": "ss-1-1-8-4-4",
                    "name": "Recurring"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-9",
            "name": "Reports & Analytics",
            "subModules": [
              {
                "id": "sub-1-1-9-1",
                "name": "Dashboard Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-9-1-1",
                    "name": "Founder Dashboard"
                  },
                  {
                    "id": "ss-1-1-9-1-2",
                    "name": "Department Dashboard"
                  },
                  {
                    "id": "ss-1-1-9-1-3",
                    "name": "Operational"
                  }
                ]
              },
              {
                "id": "sub-1-1-9-2",
                "name": "Export Formats",
                "subSubModules": [
                  {
                    "id": "ss-1-1-9-2-1",
                    "name": "PDF"
                  },
                  {
                    "id": "ss-1-1-9-2-2",
                    "name": "Excel"
                  },
                  {
                    "id": "ss-1-1-9-2-3",
                    "name": "CSV"
                  },
                  {
                    "id": "ss-1-1-9-2-4",
                    "name": "JSON"
                  }
                ]
              },
              {
                "id": "sub-1-1-9-3",
                "name": "Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-1-1-9-3-1",
                    "name": "Daily"
                  },
                  {
                    "id": "ss-1-1-9-3-2",
                    "name": "Weekly"
                  },
                  {
                    "id": "ss-1-1-9-3-3",
                    "name": "Monthly"
                  },
                  {
                    "id": "ss-1-1-9-3-4",
                    "name": "Quarterly"
                  }
                ]
              },
              {
                "id": "sub-1-1-9-4",
                "name": "Report Types",
                "subSubModules": [
                  {
                    "id": "ss-1-1-9-4-1",
                    "name": "Operational"
                  },
                  {
                    "id": "ss-1-1-9-4-2",
                    "name": "Financial"
                  },
                  {
                    "id": "ss-1-1-9-4-3",
                    "name": "Strategic"
                  },
                  {
                    "id": "ss-1-1-9-4-4",
                    "name": "Compliance"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-1-10",
            "name": "Integration",
            "subModules": [
              {
                "id": "sub-1-1-10-1",
                "name": "APIs",
                "subSubModules": [
                  {
                    "id": "ss-1-1-10-1-1",
                    "name": "REST (JSON/XML)"
                  },
                  {
                    "id": "ss-1-1-10-1-2",
                    "name": "GraphQL"
                  },
                  {
                    "id": "ss-1-1-10-1-3",
                    "name": "Webhooks (Outgoing/Incoming)"
                  }
                ]
              },
              {
                "id": "sub-1-1-10-2",
                "name": "Payment Gateways",
                "subSubModules": [
                  {
                    "id": "ss-1-1-10-2-1",
                    "name": "Stripe"
                  },
                  {
                    "id": "ss-1-1-10-2-2",
                    "name": "Razorpay"
                  },
                  {
                    "id": "ss-1-1-10-2-3",
                    "name": "PayPal"
                  },
                  {
                    "id": "ss-1-1-10-2-4",
                    "name": "PayU"
                  }
                ]
              },
              {
                "id": "sub-1-1-10-3",
                "name": "E-commerce",
                "subSubModules": [
                  {
                    "id": "ss-1-1-10-3-1",
                    "name": "Shopify"
                  },
                  {
                    "id": "ss-1-1-10-3-2",
                    "name": "WooCommerce"
                  },
                  {
                    "id": "ss-1-1-10-3-3",
                    "name": "Magento"
                  }
                ]
              },
              {
                "id": "sub-1-1-10-4",
                "name": "ERP Systems",
                "subSubModules": [
                  {
                    "id": "ss-1-1-10-4-1",
                    "name": "SAP"
                  },
                  {
                    "id": "ss-1-1-10-4-2",
                    "name": "Oracle"
                  },
                  {
                    "id": "ss-1-1-10-4-3",
                    "name": "Microsoft Dynamics"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-2",
        "name": "Customer Relationship Management (CRM)",
        "mainModules": [
          {
            "id": "mod-1-2-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-2-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-2-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-2-1-1-2",
                    "name": "Google"
                  },
                  {
                    "id": "ss-1-2-1-1-3",
                    "name": "Microsoft"
                  },
                  {
                    "id": "ss-1-2-1-1-4",
                    "name": "LinkedIn"
                  },
                  {
                    "id": "ss-1-2-1-1-5",
                    "name": "Email OTP"
                  }
                ]
              },
              {
                "id": "sub-1-2-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-2-1-2-1",
                    "name": "Admin"
                  },
                  {
                    "id": "ss-1-2-1-2-2",
                    "name": "Sales Rep"
                  },
                  {
                    "id": "ss-1-2-1-2-3",
                    "name": "Sales Manager"
                  },
                  {
                    "id": "ss-1-2-1-2-4",
                    "name": "Support Agent"
                  },
                  {
                    "id": "ss-1-2-1-2-5",
                    "name": "Marketing User"
                  },
                  {
                    "id": "ss-1-2-1-2-6",
                    "name": "Viewer"
                  }
                ]
              },
              {
                "id": "sub-1-2-1-3",
                "name": "MFA Options",
                "subSubModules": [
                  {
                    "id": "ss-1-2-1-3-1",
                    "name": "SMS OTP"
                  },
                  {
                    "id": "ss-1-2-1-3-2",
                    "name": "Email OTP"
                  },
                  {
                    "id": "ss-1-2-1-3-3",
                    "name": "Authenticator App"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-2-2",
            "name": "Customer Management",
            "subModules": [
              {
                "id": "sub-1-2-2-1",
                "name": "Profile Types",
                "subSubModules": [
                  {
                    "id": "ss-1-2-2-1-1",
                    "name": "Individual (B2C)"
                  },
                  {
                    "id": "ss-1-2-2-1-2",
                    "name": "Company (B2B)"
                  },
                  {
                    "id": "ss-1-2-2-1-3",
                    "name": "Key Account"
                  }
                ]
              },
              {
                "id": "sub-1-2-2-2",
                "name": "Segmentation",
                "subSubModules": [
                  {
                    "id": "ss-1-2-2-2-1",
                    "name": "Demographic (Age/Location/Gender)"
                  },
                  {
                    "id": "ss-1-2-2-2-2",
                    "name": "Behavioral (Purchase/Engagement)"
                  },
                  {
                    "id": "ss-1-2-2-2-3",
                    "name": "Transaction-based (High Value/Low Value)"
                  }
                ]
              },
              {
                "id": "sub-1-2-2-3",
                "name": "Contact Types",
                "subSubModules": [
                  {
                    "id": "ss-1-2-2-3-1",
                    "name": "Primary Contact"
                  },
                  {
                    "id": "ss-1-2-2-3-2",
                    "name": "Secondary"
                  },
                  {
                    "id": "ss-1-2-2-3-3",
                    "name": "Billing Contact"
                  },
                  {
                    "id": "ss-1-2-2-3-4",
                    "name": "Shipping Contact"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-2-3",
            "name": "Lead Management",
            "subModules": [
              {
                "id": "sub-1-2-3-1",
                "name": "Lead Sources",
                "subSubModules": [
                  {
                    "id": "ss-1-2-3-1-1",
                    "name": "Website (Form/chat)"
                  },
                  {
                    "id": "ss-1-2-3-1-2",
                    "name": "Referral"
                  },
                  {
                    "id": "ss-1-2-3-1-3",
                    "name": "Social Media (LinkedIn/FB/Insta)"
                  },
                  {
                    "id": "ss-1-2-3-1-4",
                    "name": "Cold Call"
                  },
                  {
                    "id": "ss-1-2-3-1-5",
                    "name": "Email Campaign"
                  },
                  {
                    "id": "ss-1-2-3-1-6",
                    "name": "Trade Show"
                  },
                  {
                    "id": "ss-1-2-3-1-7",
                    "name": "Partner"
                  }
                ]
              },
              {
                "id": "sub-1-2-3-2",
                "name": "Scoring Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-2-3-2-1",
                    "name": "BANT (Budget/Authority/Need/Timeline)"
                  },
                  {
                    "id": "ss-1-2-3-2-2",
                    "name": "Predictive AI"
                  }
                ]
              },
              {
                "id": "sub-1-2-3-3",
                "name": "Assignment Types",
                "subSubModules": [
                  {
                    "id": "ss-1-2-3-3-1",
                    "name": "Automatic Round-robin"
                  },
                  {
                    "id": "ss-1-2-3-3-2",
                    "name": "Manual"
                  },
                  {
                    "id": "ss-1-2-3-3-3",
                    "name": "Weighted"
                  },
                  {
                    "id": "ss-1-2-3-3-4",
                    "name": "Territory-based"
                  },
                  {
                    "id": "ss-1-2-3-3-5",
                    "name": "Skills-based"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-2-4",
            "name": "Opportunity Management",
            "subModules": [
              {
                "id": "sub-1-2-4-1",
                "name": "Stages",
                "subSubModules": [
                  {
                    "id": "ss-1-2-4-1-1",
                    "name": "Prospecting"
                  },
                  {
                    "id": "ss-1-2-4-1-2",
                    "name": "Qualification"
                  },
                  {
                    "id": "ss-1-2-4-1-3",
                    "name": "Demo/Meeting"
                  },
                  {
                    "id": "ss-1-2-4-1-4",
                    "name": "Proposal Sent"
                  },
                  {
                    "id": "ss-1-2-4-1-5",
                    "name": "Negotiation"
                  },
                  {
                    "id": "ss-1-2-4-1-6",
                    "name": "Closed Won"
                  },
                  {
                    "id": "ss-1-2-4-1-7",
                    "name": "Closed Lost"
                  }
                ]
              },
              {
                "id": "sub-1-2-4-2",
                "name": "Forecasting",
                "subSubModules": [
                  {
                    "id": "ss-1-2-4-2-1",
                    "name": "Revenue Projection"
                  },
                  {
                    "id": "ss-1-2-4-2-2",
                    "name": "Quota Tracking"
                  },
                  {
                    "id": "ss-1-2-4-2-3",
                    "name": "Probability-weighted"
                  }
                ]
              },
              {
                "id": "sub-1-2-4-3",
                "name": "Product Types",
                "subSubModules": [
                  {
                    "id": "ss-1-2-4-3-1",
                    "name": "Cross-sell"
                  },
                  {
                    "id": "ss-1-2-4-3-2",
                    "name": "Upsell recommendations"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-2-5",
            "name": "Sales Automation",
            "subModules": [
              {
                "id": "sub-1-2-5-1",
                "name": "Workflows",
                "subSubModules": [
                  {
                    "id": "ss-1-2-5-1-1",
                    "name": "If-this-that"
                  },
                  {
                    "id": "ss-1-2-5-1-2",
                    "name": "Multi-step sequences"
                  }
                ]
              },
              {
                "id": "sub-1-2-5-2",
                "name": "Email Sequences",
                "subSubModules": [
                  {
                    "id": "ss-1-2-5-2-1",
                    "name": "Drip campaigns"
                  },
                  {
                    "id": "ss-1-2-5-2-2",
                    "name": "Template-based"
                  },
                  {
                    "id": "ss-1-2-5-2-3",
                    "name": "Personalization tokens"
                  }
                ]
              },
              {
                "id": "sub-1-2-5-3",
                "name": "Tasks",
                "subSubModules": [
                  {
                    "id": "ss-1-2-5-3-1",
                    "name": "Follow-ups"
                  },
                  {
                    "id": "ss-1-2-5-3-2",
                    "name": "Reminders (Email/SMS/Push)"
                  },
                  {
                    "id": "ss-1-2-5-3-3",
                    "name": "Auto-assignment"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-2-6",
            "name": "Customer Portal",
            "subModules": [
              {
                "id": "sub-1-2-6-1",
                "name": "Self-service",
                "subSubModules": [
                  {
                    "id": "ss-1-2-6-1-1",
                    "name": "Knowledge Base"
                  },
                  {
                    "id": "ss-1-2-6-1-2",
                    "name": "FAQ"
                  },
                  {
                    "id": "ss-1-2-6-1-3",
                    "name": "Ticket creation"
                  }
                ]
              },
              {
                "id": "sub-1-2-6-2",
                "name": "Order Features",
                "subSubModules": [
                  {
                    "id": "ss-1-2-6-2-1",
                    "name": "Tracking"
                  },
                  {
                    "id": "ss-1-2-6-2-2",
                    "name": "History"
                  }
                ]
              },
              {
                "id": "sub-1-2-6-3",
                "name": "Support",
                "subSubModules": [
                  {
                    "id": "ss-1-2-6-3-1",
                    "name": "Raise ticket"
                  },
                  {
                    "id": "ss-1-2-6-3-2",
                    "name": "Chat"
                  },
                  {
                    "id": "ss-1-2-6-3-3",
                    "name": "Feedback"
                  }
                ]
              },
              {
                "id": "sub-1-2-6-4",
                "name": "Feedback Types",
                "subSubModules": [
                  {
                    "id": "ss-1-2-6-4-1",
                    "name": "NPS (0-10)"
                  },
                  {
                    "id": "ss-1-2-6-4-2",
                    "name": "CSAT (1-5)"
                  },
                  {
                    "id": "ss-1-2-6-4-3",
                    "name": "CES (1-7)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-2-7",
            "name": "Reports",
            "subModules": [
              {
                "id": "sub-1-2-7-1",
                "name": "Funnel Analysis",
                "subSubModules": [
                  {
                    "id": "ss-1-2-7-1-1",
                    "name": "Conversion Rates (Stage-wise)"
                  },
                  {
                    "id": "ss-1-2-7-1-2",
                    "name": "Lead-to-Opportunity"
                  },
                  {
                    "id": "ss-1-2-7-1-3",
                    "name": "Opportunity-to-Win"
                  }
                ]
              },
              {
                "id": "sub-1-2-7-2",
                "name": "Performance",
                "subSubModules": [
                  {
                    "id": "ss-1-2-7-2-1",
                    "name": "Individual Rep"
                  },
                  {
                    "id": "ss-1-2-7-2-2",
                    "name": "Team"
                  },
                  {
                    "id": "ss-1-2-7-2-3",
                    "name": "Region"
                  },
                  {
                    "id": "ss-1-2-7-2-4",
                    "name": "Product-wise"
                  }
                ]
              },
              {
                "id": "sub-1-2-7-3",
                "name": "Forecast",
                "subSubModules": [
                  {
                    "id": "ss-1-2-7-3-1",
                    "name": "Accuracy"
                  },
                  {
                    "id": "ss-1-2-7-3-2",
                    "name": "Pipeline Velocity"
                  }
                ]
              },
              {
                "id": "sub-1-2-7-4",
                "name": "Export",
                "subSubModules": [
                  {
                    "id": "ss-1-2-7-4-1",
                    "name": "PDF"
                  },
                  {
                    "id": "ss-1-2-7-4-2",
                    "name": "Excel"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-2-8",
            "name": "Integration",
            "subModules": [
              {
                "id": "sub-1-2-8-1",
                "name": "Email",
                "subSubModules": [
                  {
                    "id": "ss-1-2-8-1-1",
                    "name": "Gmail"
                  },
                  {
                    "id": "ss-1-2-8-1-2",
                    "name": "Outlook"
                  },
                  {
                    "id": "ss-1-2-8-1-3",
                    "name": "SendGrid"
                  },
                  {
                    "id": "ss-1-2-8-1-4",
                    "name": "Mailchimp"
                  }
                ]
              },
              {
                "id": "sub-1-2-8-2",
                "name": "Calendar",
                "subSubModules": [
                  {
                    "id": "ss-1-2-8-2-1",
                    "name": "Google Calendar"
                  },
                  {
                    "id": "ss-1-2-8-2-2",
                    "name": "Outlook Calendar"
                  },
                  {
                    "id": "ss-1-2-8-2-3",
                    "name": "iCal"
                  }
                ]
              },
              {
                "id": "sub-1-2-8-3",
                "name": "Telephony",
                "subSubModules": [
                  {
                    "id": "ss-1-2-8-3-1",
                    "name": "Twilio (Voice/SMS)"
                  },
                  {
                    "id": "ss-1-2-8-3-2",
                    "name": "RingCentral"
                  },
                  {
                    "id": "ss-1-2-8-3-3",
                    "name": "VoIP"
                  }
                ]
              },
              {
                "id": "sub-1-2-8-4",
                "name": "Social",
                "subSubModules": [
                  {
                    "id": "ss-1-2-8-4-1",
                    "name": "LinkedIn Sales Navigator"
                  },
                  {
                    "id": "ss-1-2-8-4-2",
                    "name": "Twitter"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-3",
        "name": "Human Resource Management System (HRMS)",
        "mainModules": [
          {
            "id": "mod-1-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-3-1-1-2",
                    "name": "Biometric (Fingerprint, Face ID, Iris)"
                  },
                  {
                    "id": "ss-1-3-1-1-3",
                    "name": "SSO (SAML/OAuth)"
                  },
                  {
                    "id": "ss-1-3-1-1-4",
                    "name": "QR Code"
                  }
                ]
              },
              {
                "id": "sub-1-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-3-1-2-1",
                    "name": "HR Admin"
                  },
                  {
                    "id": "ss-1-3-1-2-2",
                    "name": "Department Manager"
                  },
                  {
                    "id": "ss-1-3-1-2-3",
                    "name": "Employee"
                  },
                  {
                    "id": "ss-1-3-1-2-4",
                    "name": "Payroll Admin"
                  },
                  {
                    "id": "ss-1-3-1-2-5",
                    "name": "Recruiter"
                  }
                ]
              },
              {
                "id": "sub-1-3-1-3",
                "name": "MFA Options",
                "subSubModules": [
                  {
                    "id": "ss-1-3-1-3-1",
                    "name": "SMS OTP"
                  },
                  {
                    "id": "ss-1-3-1-3-2",
                    "name": "Email OTP"
                  },
                  {
                    "id": "ss-1-3-1-3-3",
                    "name": "TOTP"
                  },
                  {
                    "id": "ss-1-3-1-3-4",
                    "name": "Biometric"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-2",
            "name": "Recruitment (ATS)",
            "subModules": [
              {
                "id": "sub-1-3-2-1",
                "name": "Job Posting",
                "subSubModules": [
                  {
                    "id": "ss-1-3-2-1-1",
                    "name": "Internal (Intranet)"
                  },
                  {
                    "id": "ss-1-3-2-1-2",
                    "name": "External (LinkedIn, Naukri, Indeed, Monster)"
                  }
                ]
              },
              {
                "id": "sub-1-3-2-2",
                "name": "Resume Parsing",
                "subSubModules": [
                  {
                    "id": "ss-1-3-2-2-1",
                    "name": "AI-based (Extract skills/experience)"
                  },
                  {
                    "id": "ss-1-3-2-2-2",
                    "name": "Manual"
                  },
                  {
                    "id": "ss-1-3-2-2-3",
                    "name": "OCR"
                  }
                ]
              },
              {
                "id": "sub-1-3-2-3",
                "name": "Interview Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-2-3-1",
                    "name": "On-site"
                  },
                  {
                    "id": "ss-1-3-2-3-2",
                    "name": "Video (Zoom, Google Meet, MS Teams)"
                  },
                  {
                    "id": "ss-1-3-2-3-3",
                    "name": "Phone"
                  },
                  {
                    "id": "ss-1-3-2-3-4",
                    "name": "Panel"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-3",
            "name": "Employee Management",
            "subModules": [
              {
                "id": "sub-1-3-3-1",
                "name": "Profile Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-3-1-1",
                    "name": "Personal Details"
                  },
                  {
                    "id": "ss-1-3-3-1-2",
                    "name": "Professional (Department/Designation)"
                  },
                  {
                    "id": "ss-1-3-3-1-3",
                    "name": "Emergency Contacts"
                  },
                  {
                    "id": "ss-1-3-3-1-4",
                    "name": "Dependents"
                  }
                ]
              },
              {
                "id": "sub-1-3-3-2",
                "name": "Documents",
                "subSubModules": [
                  {
                    "id": "ss-1-3-3-2-1",
                    "name": "Offer Letter"
                  },
                  {
                    "id": "ss-1-3-3-2-2",
                    "name": "Appointment Letter"
                  },
                  {
                    "id": "ss-1-3-3-2-3",
                    "name": "Contracts"
                  },
                  {
                    "id": "ss-1-3-3-2-4",
                    "name": "ID Proof (Aadhaar/PAN)"
                  },
                  {
                    "id": "ss-1-3-3-2-5",
                    "name": "Health Records"
                  }
                ]
              },
              {
                "id": "sub-1-3-3-3",
                "name": "Onboarding",
                "subSubModules": [
                  {
                    "id": "ss-1-3-3-3-1",
                    "name": "Paperless"
                  },
                  {
                    "id": "ss-1-3-3-3-2",
                    "name": "Digital Signatures"
                  },
                  {
                    "id": "ss-1-3-3-3-3",
                    "name": "Task Checklist"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-4",
            "name": "Attendance",
            "subModules": [
              {
                "id": "sub-1-3-4-1",
                "name": "Check-in Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-3-4-1-1",
                    "name": "Biometric (Hardware/App)"
                  },
                  {
                    "id": "ss-1-3-4-1-2",
                    "name": "Mobile GPS (Geo-fencing)"
                  },
                  {
                    "id": "ss-1-3-4-1-3",
                    "name": "Web-based"
                  },
                  {
                    "id": "ss-1-3-4-1-4",
                    "name": "RFID Card"
                  },
                  {
                    "id": "ss-1-3-4-1-5",
                    "name": "Manual (Self-declaration)"
                  }
                ]
              },
              {
                "id": "sub-1-3-4-2",
                "name": "Overtime",
                "subSubModules": [
                  {
                    "id": "ss-1-3-4-2-1",
                    "name": "Automatic (System-calculated)"
                  },
                  {
                    "id": "ss-1-3-4-2-2",
                    "name": "Manual Approval"
                  }
                ]
              },
              {
                "id": "sub-1-3-4-3",
                "name": "Shift Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-4-3-1",
                    "name": "Fixed"
                  },
                  {
                    "id": "ss-1-3-4-3-2",
                    "name": "Rotational (Weekly/Monthly)"
                  },
                  {
                    "id": "ss-1-3-4-3-3",
                    "name": "Flexible (Core hours)"
                  },
                  {
                    "id": "ss-1-3-4-3-4",
                    "name": "Split Shift"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-5",
            "name": "Leave Management",
            "subModules": [
              {
                "id": "sub-1-3-5-1",
                "name": "Leave Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-5-1-1",
                    "name": "Sick (Medical)"
                  },
                  {
                    "id": "ss-1-3-5-1-2",
                    "name": "Casual"
                  },
                  {
                    "id": "ss-1-3-5-1-3",
                    "name": "Annual (Earned)"
                  },
                  {
                    "id": "ss-1-3-5-1-4",
                    "name": "Maternity/Paternity"
                  },
                  {
                    "id": "ss-1-3-5-1-5",
                    "name": "Compensatory Off"
                  },
                  {
                    "id": "ss-1-3-5-1-6",
                    "name": "LOP (Loss of Pay)"
                  },
                  {
                    "id": "ss-1-3-5-1-7",
                    "name": "Study"
                  }
                ]
              },
              {
                "id": "sub-1-3-5-2",
                "name": "Approval Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-5-2-1",
                    "name": "Single-level"
                  },
                  {
                    "id": "ss-1-3-5-2-2",
                    "name": "Multi-level (Chain)"
                  },
                  {
                    "id": "ss-1-3-5-2-3",
                    "name": "Auto-approval"
                  }
                ]
              },
              {
                "id": "sub-1-3-5-3",
                "name": "Balance Management",
                "subSubModules": [
                  {
                    "id": "ss-1-3-5-3-1",
                    "name": "Accrued"
                  },
                  {
                    "id": "ss-1-3-5-3-2",
                    "name": "Carried Forward"
                  },
                  {
                    "id": "ss-1-3-5-3-3",
                    "name": "Lapsed"
                  },
                  {
                    "id": "ss-1-3-5-3-4",
                    "name": "Encashment"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-6",
            "name": "Payroll",
            "subModules": [
              {
                "id": "sub-1-3-6-1",
                "name": "Frequencies",
                "subSubModules": [
                  {
                    "id": "ss-1-3-6-1-1",
                    "name": "Monthly"
                  },
                  {
                    "id": "ss-1-3-6-1-2",
                    "name": "Bi-weekly"
                  },
                  {
                    "id": "ss-1-3-6-1-3",
                    "name": "Weekly"
                  },
                  {
                    "id": "ss-1-3-6-1-4",
                    "name": "Daily"
                  }
                ]
              },
              {
                "id": "sub-1-3-6-2",
                "name": "Components",
                "subSubModules": [
                  {
                    "id": "ss-1-3-6-2-1",
                    "name": "Basic Pay"
                  },
                  {
                    "id": "ss-1-3-6-2-2",
                    "name": "HRA"
                  },
                  {
                    "id": "ss-1-3-6-2-3",
                    "name": "DA"
                  },
                  {
                    "id": "ss-1-3-6-2-4",
                    "name": "Special Allowance"
                  },
                  {
                    "id": "ss-1-3-6-2-5",
                    "name": "Bonus"
                  },
                  {
                    "id": "ss-1-3-6-2-6",
                    "name": "Incentives"
                  },
                  {
                    "id": "ss-1-3-6-2-7",
                    "name": "Reimbursements"
                  }
                ]
              },
              {
                "id": "sub-1-3-6-3",
                "name": "Deductions",
                "subSubModules": [
                  {
                    "id": "ss-1-3-6-3-1",
                    "name": "PF (Employee/Employer)"
                  },
                  {
                    "id": "ss-1-3-6-3-2",
                    "name": "ESI"
                  },
                  {
                    "id": "ss-1-3-6-3-3",
                    "name": "Professional Tax"
                  },
                  {
                    "id": "ss-1-3-6-3-4",
                    "name": "TDS"
                  },
                  {
                    "id": "ss-1-3-6-3-5",
                    "name": "Income Tax"
                  },
                  {
                    "id": "ss-1-3-6-3-6",
                    "name": "Loan Recovery"
                  }
                ]
              },
              {
                "id": "sub-1-3-6-4",
                "name": "Compliance",
                "subSubModules": [
                  {
                    "id": "ss-1-3-6-4-1",
                    "name": "Statutory Reports (PF/ESI/PT returns)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-7",
            "name": "Performance",
            "subModules": [
              {
                "id": "sub-1-3-7-1",
                "name": "Appraisal Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-7-1-1",
                    "name": "Self-Appraisal"
                  },
                  {
                    "id": "ss-1-3-7-1-2",
                    "name": "Manager Review"
                  },
                  {
                    "id": "ss-1-3-7-1-3",
                    "name": "360-degree (Peers/Subordinates/Manager)"
                  },
                  {
                    "id": "ss-1-3-7-1-4",
                    "name": "External (Client)"
                  }
                ]
              },
              {
                "id": "sub-1-3-7-2",
                "name": "Goal Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-7-2-1",
                    "name": "KPI (Quantitative/metrics)"
                  },
                  {
                    "id": "ss-1-3-7-2-2",
                    "name": "OKR (Qualitative/objectives)"
                  },
                  {
                    "id": "ss-1-3-7-2-3",
                    "name": "SMART"
                  }
                ]
              },
              {
                "id": "sub-1-3-7-3",
                "name": "Review Frequencies",
                "subSubModules": [
                  {
                    "id": "ss-1-3-7-3-1",
                    "name": "Quarterly"
                  },
                  {
                    "id": "ss-1-3-7-3-2",
                    "name": "Half-yearly"
                  },
                  {
                    "id": "ss-1-3-7-3-3",
                    "name": "Annual"
                  },
                  {
                    "id": "ss-1-3-7-3-4",
                    "name": "Probationary"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-8",
            "name": "Training (LMS)",
            "subModules": [
              {
                "id": "sub-1-3-8-1",
                "name": "Content Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-8-1-1",
                    "name": "Video (MP4/WebM)"
                  },
                  {
                    "id": "ss-1-3-8-1-2",
                    "name": "Document (PDF/PPT)"
                  },
                  {
                    "id": "ss-1-3-8-1-3",
                    "name": "Quiz (MCQ/TF)"
                  },
                  {
                    "id": "ss-1-3-8-1-4",
                    "name": "Interactive (SCORM)"
                  },
                  {
                    "id": "ss-1-3-8-1-5",
                    "name": "Webinar (Live/Recorded)"
                  }
                ]
              },
              {
                "id": "sub-1-3-8-2",
                "name": "Tracking",
                "subSubModules": [
                  {
                    "id": "ss-1-3-8-2-1",
                    "name": "Completion Rate"
                  },
                  {
                    "id": "ss-1-3-8-2-2",
                    "name": "Scores"
                  },
                  {
                    "id": "ss-1-3-8-2-3",
                    "name": "Time Spent"
                  }
                ]
              },
              {
                "id": "sub-1-3-8-3",
                "name": "Certification",
                "subSubModules": [
                  {
                    "id": "ss-1-3-8-3-1",
                    "name": "Course Completion"
                  },
                  {
                    "id": "ss-1-3-8-3-2",
                    "name": "External Certification (LinkedIn/Others)"
                  },
                  {
                    "id": "ss-1-3-8-3-3",
                    "name": "Renewal"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-9",
            "name": "Exit Management",
            "subModules": [
              {
                "id": "sub-1-3-9-1",
                "name": "Process",
                "subSubModules": [
                  {
                    "id": "ss-1-3-9-1-1",
                    "name": "Resignation Notice"
                  },
                  {
                    "id": "ss-1-3-9-1-2",
                    "name": "Clearance (Assets/Access)"
                  },
                  {
                    "id": "ss-1-3-9-1-3",
                    "name": "Exit Interview"
                  },
                  {
                    "id": "ss-1-3-9-1-4",
                    "name": "Full & Final Settlement"
                  },
                  {
                    "id": "ss-1-3-9-1-5",
                    "name": "NOC Issuance"
                  }
                ]
              },
              {
                "id": "sub-1-3-9-2",
                "name": "Exit Types",
                "subSubModules": [
                  {
                    "id": "ss-1-3-9-2-1",
                    "name": "Voluntary"
                  },
                  {
                    "id": "ss-1-3-9-2-2",
                    "name": "Retirement"
                  },
                  {
                    "id": "ss-1-3-9-2-3",
                    "name": "Termination"
                  },
                  {
                    "id": "ss-1-3-9-2-4",
                    "name": "Layoff"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-3-10",
            "name": "Reports",
            "subModules": [
              {
                "id": "sub-1-3-10-1",
                "name": "HR Analytics",
                "subSubModules": [
                  {
                    "id": "ss-1-3-10-1-1",
                    "name": "Headcount (Department-wise)"
                  },
                  {
                    "id": "ss-1-3-10-1-2",
                    "name": "Turnover Rate"
                  },
                  {
                    "id": "ss-1-3-10-1-3",
                    "name": "Diversity (Gender/Age)"
                  },
                  {
                    "id": "ss-1-3-10-1-4",
                    "name": "Hiring Source Effectiveness"
                  }
                ]
              },
              {
                "id": "sub-1-3-10-2",
                "name": "Payroll",
                "subSubModules": [
                  {
                    "id": "ss-1-3-10-2-1",
                    "name": "Salary Register"
                  },
                  {
                    "id": "ss-1-3-10-2-2",
                    "name": "Bank Transfer Files"
                  },
                  {
                    "id": "ss-1-3-10-2-3",
                    "name": "TDS Reports"
                  },
                  {
                    "id": "ss-1-3-10-2-4",
                    "name": "Form 16"
                  }
                ]
              },
              {
                "id": "sub-1-3-10-3",
                "name": "Attendance",
                "subSubModules": [
                  {
                    "id": "ss-1-3-10-3-1",
                    "name": "Leave Summary"
                  },
                  {
                    "id": "ss-1-3-10-3-2",
                    "name": "Overtime Report"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-4",
        "name": "Business Process Management (BPM)",
        "mainModules": [
          {
            "id": "mod-1-4-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-4-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-4-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-4-1-1-2",
                    "name": "SSO (SAML/OAuth)"
                  },
                  {
                    "id": "ss-1-4-1-1-3",
                    "name": "LDAP"
                  }
                ]
              },
              {
                "id": "sub-1-4-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-4-1-2-1",
                    "name": "Process Owner"
                  },
                  {
                    "id": "ss-1-4-1-2-2",
                    "name": "Process Designer"
                  },
                  {
                    "id": "ss-1-4-1-2-3",
                    "name": "Approver"
                  },
                  {
                    "id": "ss-1-4-1-2-4",
                    "name": "User"
                  },
                  {
                    "id": "ss-1-4-1-2-5",
                    "name": "Auditor"
                  },
                  {
                    "id": "ss-1-4-1-2-6",
                    "name": "Admin"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-4-2",
            "name": "Process Designer",
            "subModules": [
              {
                "id": "sub-1-4-2-1",
                "name": "Notation",
                "subSubModules": [
                  {
                    "id": "ss-1-4-2-1-1",
                    "name": "BPMN 2.0 (Events/Gateways/Tasks)"
                  },
                  {
                    "id": "ss-1-4-2-1-2",
                    "name": "DMN (Decision Tables)"
                  },
                  {
                    "id": "ss-1-4-2-1-3",
                    "name": "CMMN (Cases)"
                  }
                ]
              },
              {
                "id": "sub-1-4-2-2",
                "name": "Builder",
                "subSubModules": [
                  {
                    "id": "ss-1-4-2-2-1",
                    "name": "Drag-and-drop"
                  },
                  {
                    "id": "ss-1-4-2-2-2",
                    "name": "XML/JSON Import"
                  },
                  {
                    "id": "ss-1-4-2-2-3",
                    "name": "Template Library"
                  }
                ]
              },
              {
                "id": "sub-1-4-2-3",
                "name": "Complexity Types",
                "subSubModules": [
                  {
                    "id": "ss-1-4-2-3-1",
                    "name": "Simple (Sequential)"
                  },
                  {
                    "id": "ss-1-4-2-3-2",
                    "name": "Complex (Parallel, Conditional)"
                  },
                  {
                    "id": "ss-1-4-2-3-3",
                    "name": "Sub-processes"
                  },
                  {
                    "id": "ss-1-4-2-3-4",
                    "name": "Event Sub-processes"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-4-3",
            "name": "Workflow Engine",
            "subModules": [
              {
                "id": "sub-1-4-3-1",
                "name": "Execution Types",
                "subSubModules": [
                  {
                    "id": "ss-1-4-3-1-1",
                    "name": "Sequential"
                  },
                  {
                    "id": "ss-1-4-3-1-2",
                    "name": "Parallel"
                  },
                  {
                    "id": "ss-1-4-3-1-3",
                    "name": "Conditional"
                  },
                  {
                    "id": "ss-1-4-3-1-4",
                    "name": "XOR/OR Gateways"
                  }
                ]
              },
              {
                "id": "sub-1-4-3-2",
                "name": "Escalation",
                "subSubModules": [
                  {
                    "id": "ss-1-4-3-2-1",
                    "name": "Time-based (SLA/Deadline)"
                  },
                  {
                    "id": "ss-1-4-3-2-2",
                    "name": "Action-based (Task rejection)"
                  },
                  {
                    "id": "ss-1-4-3-2-3",
                    "name": "Multi-level"
                  }
                ]
              },
              {
                "id": "sub-1-4-3-3",
                "name": "SLA",
                "subSubModules": [
                  {
                    "id": "ss-1-4-3-3-1",
                    "name": "Response Time"
                  },
                  {
                    "id": "ss-1-4-3-3-2",
                    "name": "Resolution Time"
                  },
                  {
                    "id": "ss-1-4-3-3-3",
                    "name": "Breach Notifications"
                  }
                ]
              },
              {
                "id": "sub-1-4-3-4",
                "name": "Priority",
                "subSubModules": [
                  {
                    "id": "ss-1-4-3-4-1",
                    "name": "High"
                  },
                  {
                    "id": "ss-1-4-3-4-2",
                    "name": "Medium"
                  },
                  {
                    "id": "ss-1-4-3-4-3",
                    "name": "Low"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-4-4",
            "name": "Form Builder",
            "subModules": [
              {
                "id": "sub-1-4-4-1",
                "name": "Field Types",
                "subSubModules": [
                  {
                    "id": "ss-1-4-4-1-1",
                    "name": "Text (Short/Long)"
                  },
                  {
                    "id": "ss-1-4-4-1-2",
                    "name": "Number"
                  },
                  {
                    "id": "ss-1-4-4-1-3",
                    "name": "Date/Time"
                  },
                  {
                    "id": "ss-1-4-4-1-4",
                    "name": "Email"
                  },
                  {
                    "id": "ss-1-4-4-1-5",
                    "name": "Phone"
                  },
                  {
                    "id": "ss-1-4-4-1-6",
                    "name": "Dropdown (Single/Multi)"
                  },
                  {
                    "id": "ss-1-4-4-1-7",
                    "name": "Checkbox"
                  },
                  {
                    "id": "ss-1-4-4-1-8",
                    "name": "Radio"
                  },
                  {
                    "id": "ss-1-4-4-1-9",
                    "name": "File Upload"
                  },
                  {
                    "id": "ss-1-4-4-1-10",
                    "name": "Signature"
                  }
                ]
              },
              {
                "id": "sub-1-4-4-2",
                "name": "Logic",
                "subSubModules": [
                  {
                    "id": "ss-1-4-4-2-1",
                    "name": "Conditional Display"
                  },
                  {
                    "id": "ss-1-4-4-2-2",
                    "name": "Field Validation (Required/Format)"
                  },
                  {
                    "id": "ss-1-4-4-2-3",
                    "name": "Formula Calculation"
                  }
                ]
              },
              {
                "id": "sub-1-4-4-3",
                "name": "Layout",
                "subSubModules": [
                  {
                    "id": "ss-1-4-4-3-1",
                    "name": "Sections"
                  },
                  {
                    "id": "ss-1-4-4-3-2",
                    "name": "Tabs"
                  },
                  {
                    "id": "ss-1-4-4-3-3",
                    "name": "Columns (Responsive)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-4-5",
            "name": "Document Management",
            "subModules": [
              {
                "id": "sub-1-4-5-1",
                "name": "Upload",
                "subSubModules": [
                  {
                    "id": "ss-1-4-5-1-1",
                    "name": "Drag-and-drop"
                  },
                  {
                    "id": "ss-1-4-5-1-2",
                    "name": "Bulk upload"
                  },
                  {
                    "id": "ss-1-4-5-1-3",
                    "name": "URL import"
                  }
                ]
              },
              {
                "id": "sub-1-4-5-2",
                "name": "Signatures",
                "subSubModules": [
                  {
                    "id": "ss-1-4-5-2-1",
                    "name": "Digital (DSC)"
                  },
                  {
                    "id": "ss-1-4-5-2-2",
                    "name": "E-sign (Aadhaar-based)"
                  },
                  {
                    "id": "ss-1-4-5-2-3",
                    "name": "Wet Ink"
                  }
                ]
              },
              {
                "id": "sub-1-4-5-3",
                "name": "Versioning",
                "subSubModules": [
                  {
                    "id": "ss-1-4-5-3-1",
                    "name": "Check-in/out"
                  },
                  {
                    "id": "ss-1-4-5-3-2",
                    "name": "Major/Minor"
                  },
                  {
                    "id": "ss-1-4-5-3-3",
                    "name": "Revision History"
                  }
                ]
              },
              {
                "id": "sub-1-4-5-4",
                "name": "Retention",
                "subSubModules": [
                  {
                    "id": "ss-1-4-5-4-1",
                    "name": "Policy-based"
                  },
                  {
                    "id": "ss-1-4-5-4-2",
                    "name": "Legal Hold"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-4-6",
            "name": "Task Management",
            "subModules": [
              {
                "id": "sub-1-4-6-1",
                "name": "Priority",
                "subSubModules": [
                  {
                    "id": "ss-1-4-6-1-1",
                    "name": "High"
                  },
                  {
                    "id": "ss-1-4-6-1-2",
                    "name": "Medium"
                  },
                  {
                    "id": "ss-1-4-6-1-3",
                    "name": "Low"
                  }
                ]
              },
              {
                "id": "sub-1-4-6-2",
                "name": "Delegation",
                "subSubModules": [
                  {
                    "id": "ss-1-4-6-2-1",
                    "name": "Manual (Transfer)"
                  },
                  {
                    "id": "ss-1-4-6-2-2",
                    "name": "Automatic (Rule-based)"
                  }
                ]
              },
              {
                "id": "sub-1-4-6-3",
                "name": "Collaboration",
                "subSubModules": [
                  {
                    "id": "ss-1-4-6-3-1",
                    "name": "Comments (Threaded)"
                  },
                  {
                    "id": "ss-1-4-6-3-2",
                    "name": "Mentions (@User)"
                  },
                  {
                    "id": "ss-1-4-6-3-3",
                    "name": "Attachments"
                  },
                  {
                    "id": "ss-1-4-6-3-4",
                    "name": "Internal Notes"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-4-7",
            "name": "Process Analytics",
            "subModules": [
              {
                "id": "sub-1-4-7-1",
                "name": "Monitoring",
                "subSubModules": [
                  {
                    "id": "ss-1-4-7-1-1",
                    "name": "Real-time Process Tracking"
                  },
                  {
                    "id": "ss-1-4-7-1-2",
                    "name": "Bottleneck Detection"
                  },
                  {
                    "id": "ss-1-4-7-1-3",
                    "name": "Cycle Time Analysis"
                  }
                ]
              },
              {
                "id": "sub-1-4-7-2",
                "name": "Optimization",
                "subSubModules": [
                  {
                    "id": "ss-1-4-7-2-1",
                    "name": "Heatmaps (Task duration)"
                  },
                  {
                    "id": "ss-1-4-7-2-2",
                    "name": "Simulation (What-if)"
                  },
                  {
                    "id": "ss-1-4-7-2-3",
                    "name": "Predictive (AI-based)"
                  }
                ]
              },
              {
                "id": "sub-1-4-7-3",
                "name": "Compliance",
                "subSubModules": [
                  {
                    "id": "ss-1-4-7-3-1",
                    "name": "Audit Trail (Who/When/Action)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-4-8",
            "name": "Integration",
            "subModules": [
              {
                "id": "sub-1-4-8-1",
                "name": "APIs",
                "subSubModules": [
                  {
                    "id": "ss-1-4-8-1-1",
                    "name": "REST (Incoming/Outgoing)"
                  },
                  {
                    "id": "ss-1-4-8-1-2",
                    "name": "Webhooks (Push events)"
                  },
                  {
                    "id": "ss-1-4-8-1-3",
                    "name": "SOAP"
                  }
                ]
              },
              {
                "id": "sub-1-4-8-2",
                "name": "Systems",
                "subSubModules": [
                  {
                    "id": "ss-1-4-8-2-1",
                    "name": "ERP (SAP/Oracle)"
                  },
                  {
                    "id": "ss-1-4-8-2-2",
                    "name": "CRM (Salesforce)"
                  },
                  {
                    "id": "ss-1-4-8-2-3",
                    "name": "Third-party (DocuSign, Adobe Sign)"
                  },
                  {
                    "id": "ss-1-4-8-2-4",
                    "name": "Legacy (Mainframe)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-5",
        "name": "Enterprise Content Management (ECM)",
        "mainModules": [
          {
            "id": "mod-1-5-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-5-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-5-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-5-1-1-2",
                    "name": "SSO"
                  },
                  {
                    "id": "ss-1-5-1-1-3",
                    "name": "LDAP"
                  }
                ]
              },
              {
                "id": "sub-1-5-1-2",
                "name": "Permissions",
                "subSubModules": [
                  {
                    "id": "ss-1-5-1-2-1",
                    "name": "Read"
                  },
                  {
                    "id": "ss-1-5-1-2-2",
                    "name": "Write"
                  },
                  {
                    "id": "ss-1-5-1-2-3",
                    "name": "Delete"
                  },
                  {
                    "id": "ss-1-5-1-2-4",
                    "name": "Share"
                  },
                  {
                    "id": "ss-1-5-1-2-5",
                    "name": "Admin"
                  },
                  {
                    "id": "ss-1-5-1-2-6",
                    "name": "Manager"
                  }
                ]
              },
              {
                "id": "sub-1-5-1-3",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-5-1-3-1",
                    "name": "Content Admin"
                  },
                  {
                    "id": "ss-1-5-1-3-2",
                    "name": "Editor"
                  },
                  {
                    "id": "ss-1-5-1-3-3",
                    "name": "Contributor"
                  },
                  {
                    "id": "ss-1-5-1-3-4",
                    "name": "Viewer"
                  },
                  {
                    "id": "ss-1-5-1-3-5",
                    "name": "Guest"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-5-2",
            "name": "Content Repository",
            "subModules": [
              {
                "id": "sub-1-5-2-1",
                "name": "Storage Types",
                "subSubModules": [
                  {
                    "id": "ss-1-5-2-1-1",
                    "name": "Local (On-prem)"
                  },
                  {
                    "id": "ss-1-5-2-1-2",
                    "name": "Cloud (AWS S3, GCS, Azure Blob)"
                  },
                  {
                    "id": "ss-1-5-2-1-3",
                    "name": "Hybrid"
                  }
                ]
              },
              {
                "id": "sub-1-5-2-2",
                "name": "Folder Structures",
                "subSubModules": [
                  {
                    "id": "ss-1-5-2-2-1",
                    "name": "Hierarchical (Tree)"
                  },
                  {
                    "id": "ss-1-5-2-2-2",
                    "name": "Tag-based (Folksonomy)"
                  },
                  {
                    "id": "ss-1-5-2-2-3",
                    "name": "Virtual"
                  }
                ]
              },
              {
                "id": "sub-1-5-2-3",
                "name": "Metadata",
                "subSubModules": [
                  {
                    "id": "ss-1-5-2-3-1",
                    "name": "Standard (Title/Author/Date)"
                  },
                  {
                    "id": "ss-1-5-2-3-2",
                    "name": "Custom Fields (Department/Project/Client)"
                  }
                ]
              },
              {
                "id": "sub-1-5-2-4",
                "name": "Lifecycle",
                "subSubModules": [
                  {
                    "id": "ss-1-5-2-4-1",
                    "name": "Active"
                  },
                  {
                    "id": "ss-1-5-2-4-2",
                    "name": "Archived"
                  },
                  {
                    "id": "ss-1-5-2-4-3",
                    "name": "Deleted (Soft/Hard)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-5-3",
            "name": "Document Management",
            "subModules": [
              {
                "id": "sub-1-5-3-1",
                "name": "File Types",
                "subSubModules": [
                  {
                    "id": "ss-1-5-3-1-1",
                    "name": "Word (DOCX)"
                  },
                  {
                    "id": "ss-1-5-3-1-2",
                    "name": "PDF (Text/Scan)"
                  },
                  {
                    "id": "ss-1-5-3-1-3",
                    "name": "Excel (XLSX)"
                  },
                  {
                    "id": "ss-1-5-3-1-4",
                    "name": "PowerPoint (PPTX)"
                  },
                  {
                    "id": "ss-1-5-3-1-5",
                    "name": "Images (JPEG/PNG/SVG)"
                  },
                  {
                    "id": "ss-1-5-3-1-6",
                    "name": "Videos (MP4/AVI)"
                  },
                  {
                    "id": "ss-1-5-3-1-7",
                    "name": "Emails (MSG/EML)"
                  }
                ]
              },
              {
                "id": "sub-1-5-3-2",
                "name": "Versioning",
                "subSubModules": [
                  {
                    "id": "ss-1-5-3-2-1",
                    "name": "Major (1.0,2.0)"
                  },
                  {
                    "id": "ss-1-5-3-2-2",
                    "name": "Minor (1.1,1.2)"
                  },
                  {
                    "id": "ss-1-5-3-2-3",
                    "name": "Auto-save"
                  }
                ]
              },
              {
                "id": "sub-1-5-3-3",
                "name": "Retention",
                "subSubModules": [
                  {
                    "id": "ss-1-5-3-3-1",
                    "name": "Time-based (Retention policies)"
                  },
                  {
                    "id": "ss-1-5-3-3-2",
                    "name": "Legal hold"
                  },
                  {
                    "id": "ss-1-5-3-3-3",
                    "name": "Disposition"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-5-4",
            "name": "Workflow",
            "subModules": [
              {
                "id": "sub-1-5-4-1",
                "name": "Approval",
                "subSubModules": [
                  {
                    "id": "ss-1-5-4-1-1",
                    "name": "Draft"
                  },
                  {
                    "id": "ss-1-5-4-1-2",
                    "name": "Review"
                  },
                  {
                    "id": "ss-1-5-4-1-3",
                    "name": "Approved"
                  },
                  {
                    "id": "ss-1-5-4-1-4",
                    "name": "Published"
                  }
                ]
              },
              {
                "id": "sub-1-5-4-2",
                "name": "Collaboration",
                "subSubModules": [
                  {
                    "id": "ss-1-5-4-2-1",
                    "name": "Co-editing (Real-time)"
                  },
                  {
                    "id": "ss-1-5-4-2-2",
                    "name": "Comments (Anchored/General)"
                  },
                  {
                    "id": "ss-1-5-4-2-3",
                    "name": "Track Changes"
                  }
                ]
              },
              {
                "id": "sub-1-5-4-3",
                "name": "Expiry",
                "subSubModules": [
                  {
                    "id": "ss-1-5-4-3-1",
                    "name": "Automatic deletion/archival based on policy"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-5-5",
            "name": "Search",
            "subModules": [
              {
                "id": "sub-1-5-5-1",
                "name": "Search Engines",
                "subSubModules": [
                  {
                    "id": "ss-1-5-5-1-1",
                    "name": "Elasticsearch"
                  },
                  {
                    "id": "ss-1-5-5-1-2",
                    "name": "Solr"
                  },
                  {
                    "id": "ss-1-5-5-1-3",
                    "name": "PostgreSQL Full-text"
                  }
                ]
              },
              {
                "id": "sub-1-5-5-2",
                "name": "Filters",
                "subSubModules": [
                  {
                    "id": "ss-1-5-5-2-1",
                    "name": "Date Range"
                  },
                  {
                    "id": "ss-1-5-5-2-2",
                    "name": "Author"
                  },
                  {
                    "id": "ss-1-5-5-2-3",
                    "name": "Document Type"
                  },
                  {
                    "id": "ss-1-5-5-2-4",
                    "name": "Tags"
                  },
                  {
                    "id": "ss-1-5-5-2-5",
                    "name": "Custom Metadata"
                  }
                ]
              },
              {
                "id": "sub-1-5-5-3",
                "name": "AI Features",
                "subSubModules": [
                  {
                    "id": "ss-1-5-5-3-1",
                    "name": "Semantic Search (Meaning-based)"
                  },
                  {
                    "id": "ss-1-5-5-3-2",
                    "name": "Image Search (OCR)"
                  },
                  {
                    "id": "ss-1-5-5-3-3",
                    "name": "Recommendation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-5-6",
            "name": "Security",
            "subModules": [
              {
                "id": "sub-1-5-6-1",
                "name": "Encryption",
                "subSubModules": [
                  {
                    "id": "ss-1-5-6-1-1",
                    "name": "AES-256 (At-rest)"
                  },
                  {
                    "id": "ss-1-5-6-1-2",
                    "name": "TLS 1.3 (In-transit)"
                  },
                  {
                    "id": "ss-1-5-6-1-3",
                    "name": "End-to-end"
                  }
                ]
              },
              {
                "id": "sub-1-5-6-2",
                "name": "Access Control",
                "subSubModules": [
                  {
                    "id": "ss-1-5-6-2-1",
                    "name": "Role-based (RBAC)"
                  },
                  {
                    "id": "ss-1-5-6-2-2",
                    "name": "Attribute-based (ABAC)"
                  },
                  {
                    "id": "ss-1-5-6-2-3",
                    "name": "IP Restriction"
                  }
                ]
              },
              {
                "id": "sub-1-5-6-3",
                "name": "Audit",
                "subSubModules": [
                  {
                    "id": "ss-1-5-6-3-1",
                    "name": "Access Logs (Who/When/What)"
                  },
                  {
                    "id": "ss-1-5-6-3-2",
                    "name": "Change History"
                  },
                  {
                    "id": "ss-1-5-6-3-3",
                    "name": "Compliance Reports"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-5-7",
            "name": "Records Management",
            "subModules": [
              {
                "id": "sub-1-5-7-1",
                "name": "Classification",
                "subSubModules": [
                  {
                    "id": "ss-1-5-7-1-1",
                    "name": "File Plan (Departments)"
                  },
                  {
                    "id": "ss-1-5-7-1-2",
                    "name": "Retention Schedule"
                  }
                ]
              },
              {
                "id": "sub-1-5-7-2",
                "name": "Legal",
                "subSubModules": [
                  {
                    "id": "ss-1-5-7-2-1",
                    "name": "Litigation Hold"
                  },
                  {
                    "id": "ss-1-5-7-2-2",
                    "name": "eDiscovery"
                  },
                  {
                    "id": "ss-1-5-7-2-3",
                    "name": "FOIA Requests"
                  }
                ]
              },
              {
                "id": "sub-1-5-7-3",
                "name": "Disposition",
                "subSubModules": [
                  {
                    "id": "ss-1-5-7-3-1",
                    "name": "Destroy"
                  },
                  {
                    "id": "ss-1-5-7-3-2",
                    "name": "Transfer to Archive"
                  },
                  {
                    "id": "ss-1-5-7-3-3",
                    "name": "Permanent Retention"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-6",
        "name": "Knowledge Management System (KMS)",
        "mainModules": [
          {
            "id": "mod-1-6-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-6-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-6-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-6-1-1-2",
                    "name": "SSO"
                  }
                ]
              },
              {
                "id": "sub-1-6-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-6-1-2-1",
                    "name": "Knowledge Manager"
                  },
                  {
                    "id": "ss-1-6-1-2-2",
                    "name": "Editor"
                  },
                  {
                    "id": "ss-1-6-1-2-3",
                    "name": "Contributor"
                  },
                  {
                    "id": "ss-1-6-1-2-4",
                    "name": "Reader"
                  },
                  {
                    "id": "ss-1-6-1-2-5",
                    "name": "Approver"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-6-2",
            "name": "Knowledge Repository",
            "subModules": [
              {
                "id": "sub-1-6-2-1",
                "name": "Content Types",
                "subSubModules": [
                  {
                    "id": "ss-1-6-2-1-1",
                    "name": "Articles (How-to/Troubleshooting)"
                  },
                  {
                    "id": "ss-1-6-2-1-2",
                    "name": "SOPs (Standard Operating Procedures)"
                  },
                  {
                    "id": "ss-1-6-2-1-3",
                    "name": "FAQs (Frequently Asked Questions)"
                  },
                  {
                    "id": "ss-1-6-2-1-4",
                    "name": "Wiki (Collaborative)"
                  },
                  {
                    "id": "ss-1-6-2-1-5",
                    "name": "Tutorials (Step-by-step)"
                  },
                  {
                    "id": "ss-1-6-2-1-6",
                    "name": "Videos"
                  },
                  {
                    "id": "ss-1-6-2-1-7",
                    "name": "Case Studies"
                  }
                ]
              },
              {
                "id": "sub-1-6-2-2",
                "name": "Structure",
                "subSubModules": [
                  {
                    "id": "ss-1-6-2-2-1",
                    "name": "Hierarchy (Topics/Sub-topics)"
                  },
                  {
                    "id": "ss-1-6-2-2-2",
                    "name": "Tags"
                  },
                  {
                    "id": "ss-1-6-2-2-3",
                    "name": "Categories"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-6-3",
            "name": "Search",
            "subModules": [
              {
                "id": "sub-1-6-3-1",
                "name": "Search Engines",
                "subSubModules": [
                  {
                    "id": "ss-1-6-3-1-1",
                    "name": "Elasticsearch"
                  },
                  {
                    "id": "ss-1-6-3-1-2",
                    "name": "Algolia"
                  },
                  {
                    "id": "ss-1-6-3-1-3",
                    "name": "Typesense"
                  }
                ]
              },
              {
                "id": "sub-1-6-3-2",
                "name": "Search Features",
                "subSubModules": [
                  {
                    "id": "ss-1-6-3-2-1",
                    "name": "Full-text Search"
                  },
                  {
                    "id": "ss-1-6-3-2-2",
                    "name": "Synonyms"
                  },
                  {
                    "id": "ss-1-6-3-2-3",
                    "name": "Fuzzy Search"
                  },
                  {
                    "id": "ss-1-6-3-2-4",
                    "name": "Auto-complete"
                  },
                  {
                    "id": "ss-1-6-3-2-5",
                    "name": "Did-you-mean"
                  },
                  {
                    "id": "ss-1-6-3-2-6",
                    "name": "Faceted Search"
                  }
                ]
              },
              {
                "id": "sub-1-6-3-3",
                "name": "AI",
                "subSubModules": [
                  {
                    "id": "ss-1-6-3-3-1",
                    "name": "Semantic Search"
                  },
                  {
                    "id": "ss-1-6-3-3-2",
                    "name": "RAG (Retrieval-Augmented Generation)"
                  },
                  {
                    "id": "ss-1-6-3-3-3",
                    "name": "Natural Language Queries"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-6-4",
            "name": "Collaboration",
            "subModules": [
              {
                "id": "sub-1-6-4-1",
                "name": "Contributions",
                "subSubModules": [
                  {
                    "id": "ss-1-6-4-1-1",
                    "name": "Draft"
                  },
                  {
                    "id": "ss-1-6-4-1-2",
                    "name": "Review"
                  },
                  {
                    "id": "ss-1-6-4-1-3",
                    "name": "Publish workflow"
                  }
                ]
              },
              {
                "id": "sub-1-6-4-2",
                "name": "Feedback",
                "subSubModules": [
                  {
                    "id": "ss-1-6-4-2-1",
                    "name": "Comments"
                  },
                  {
                    "id": "ss-1-6-4-2-2",
                    "name": "Ratings (1-5 stars)"
                  },
                  {
                    "id": "ss-1-6-4-2-3",
                    "name": "Usefulness"
                  }
                ]
              },
              {
                "id": "sub-1-6-4-3",
                "name": "Notifications",
                "subSubModules": [
                  {
                    "id": "ss-1-6-4-3-1",
                    "name": "Changes/Updates"
                  },
                  {
                    "id": "ss-1-6-4-3-2",
                    "name": "New Content"
                  },
                  {
                    "id": "ss-1-6-4-3-3",
                    "name": "Comments"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-6-5",
            "name": "Analytics",
            "subModules": [
              {
                "id": "sub-1-6-5-1",
                "name": "Usage",
                "subSubModules": [
                  {
                    "id": "ss-1-6-5-1-1",
                    "name": "Most Viewed"
                  },
                  {
                    "id": "ss-1-6-5-1-2",
                    "name": "Top Searches"
                  },
                  {
                    "id": "ss-1-6-5-1-3",
                    "name": "Zero-result Searches"
                  }
                ]
              },
              {
                "id": "sub-1-6-5-2",
                "name": "Effectiveness",
                "subSubModules": [
                  {
                    "id": "ss-1-6-5-2-1",
                    "name": "Helpfulness Score"
                  },
                  {
                    "id": "ss-1-6-5-2-2",
                    "name": "Time to Resolution"
                  },
                  {
                    "id": "ss-1-6-5-2-3",
                    "name": "Self-service Rate"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-6-6",
            "name": "Integration",
            "subModules": [
              {
                "id": "sub-1-6-6-1",
                "name": "Sources",
                "subSubModules": [
                  {
                    "id": "ss-1-6-6-1-1",
                    "name": "CMS (WordPress)"
                  },
                  {
                    "id": "ss-1-6-6-1-2",
                    "name": "CRM (Salesforce)"
                  },
                  {
                    "id": "ss-1-6-6-1-3",
                    "name": "Helpdesk (Zendesk)"
                  },
                  {
                    "id": "ss-1-6-6-1-4",
                    "name": "ERP"
                  },
                  {
                    "id": "ss-1-6-6-1-5",
                    "name": "External Repositories"
                  }
                ]
              },
              {
                "id": "sub-1-6-6-2",
                "name": "Export",
                "subSubModules": [
                  {
                    "id": "ss-1-6-6-2-1",
                    "name": "RSS"
                  },
                  {
                    "id": "ss-1-6-6-2-2",
                    "name": "JSON API"
                  },
                  {
                    "id": "ss-1-6-6-2-3",
                    "name": "PDF"
                  },
                  {
                    "id": "ss-1-6-6-2-4",
                    "name": "HTML"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-7",
        "name": "Document Management System (DMS)",
        "mainModules": [
          {
            "id": "mod-1-7-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-7-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-7-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-7-1-1-2",
                    "name": "SSO (SAML/OAuth2)"
                  },
                  {
                    "id": "ss-1-7-1-1-3",
                    "name": "LDAP/AD"
                  }
                ]
              },
              {
                "id": "sub-1-7-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-7-1-2-1",
                    "name": "DMS Admin"
                  },
                  {
                    "id": "ss-1-7-1-2-2",
                    "name": "Document Controller"
                  },
                  {
                    "id": "ss-1-7-1-2-3",
                    "name": "Editor"
                  },
                  {
                    "id": "ss-1-7-1-2-4",
                    "name": "Viewer"
                  },
                  {
                    "id": "ss-1-7-1-2-5",
                    "name": "Approver"
                  }
                ]
              },
              {
                "id": "sub-1-7-1-3",
                "name": "Permissions",
                "subSubModules": [
                  {
                    "id": "ss-1-7-1-3-1",
                    "name": "Folder-level"
                  },
                  {
                    "id": "ss-1-7-1-3-2",
                    "name": "Document-level"
                  },
                  {
                    "id": "ss-1-7-1-3-3",
                    "name": "Action-based (Create/Read/Update/Delete/Share)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-7-2",
            "name": "Storage & Organization",
            "subModules": [
              {
                "id": "sub-1-7-2-1",
                "name": "Storage Types",
                "subSubModules": [
                  {
                    "id": "ss-1-7-2-1-1",
                    "name": "On-premise (File Server)"
                  },
                  {
                    "id": "ss-1-7-2-1-2",
                    "name": "Cloud (S3/GCS/Azure)"
                  },
                  {
                    "id": "ss-1-7-2-1-3",
                    "name": "Hybrid"
                  }
                ]
              },
              {
                "id": "sub-1-7-2-2",
                "name": "Folder Structures",
                "subSubModules": [
                  {
                    "id": "ss-1-7-2-2-1",
                    "name": "Hierarchical (Project→Department→Document)"
                  },
                  {
                    "id": "ss-1-7-2-2-2",
                    "name": "Dynamic (Metadata-based)"
                  }
                ]
              },
              {
                "id": "sub-1-7-2-3",
                "name": "Metadata",
                "subSubModules": [
                  {
                    "id": "ss-1-7-2-3-1",
                    "name": "System (Name/Size/Type/Created/Modified)"
                  },
                  {
                    "id": "ss-1-7-2-3-2",
                    "name": "Custom (Contract Number/Client/Project Code)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-7-3",
            "name": "Document Lifecycle",
            "subModules": [
              {
                "id": "sub-1-7-3-1",
                "name": "Check-in/Check-out",
                "subSubModules": [
                  {
                    "id": "ss-1-7-3-1-1",
                    "name": "Locking for editing"
                  }
                ]
              },
              {
                "id": "sub-1-7-3-2",
                "name": "Versioning",
                "subSubModules": [
                  {
                    "id": "ss-1-7-3-2-1",
                    "name": "Auto-increment (1.0,1.1,2.0)"
                  },
                  {
                    "id": "ss-1-7-3-2-2",
                    "name": "Manual version naming"
                  }
                ]
              },
              {
                "id": "sub-1-7-3-3",
                "name": "Workflow",
                "subSubModules": [
                  {
                    "id": "ss-1-7-3-3-1",
                    "name": "Draft"
                  },
                  {
                    "id": "ss-1-7-3-3-2",
                    "name": "Review"
                  },
                  {
                    "id": "ss-1-7-3-3-3",
                    "name": "Approved"
                  },
                  {
                    "id": "ss-1-7-3-3-4",
                    "name": "Published"
                  },
                  {
                    "id": "ss-1-7-3-3-5",
                    "name": "Archived"
                  }
                ]
              },
              {
                "id": "sub-1-7-3-4",
                "name": "Retention",
                "subSubModules": [
                  {
                    "id": "ss-1-7-3-4-1",
                    "name": "Scheduled deletion/archival"
                  },
                  {
                    "id": "ss-1-7-3-4-2",
                    "name": "Legal hold"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-7-4",
            "name": "Collaboration",
            "subModules": [
              {
                "id": "sub-1-7-4-1",
                "name": "Co-authoring",
                "subSubModules": [
                  {
                    "id": "ss-1-7-4-1-1",
                    "name": "Real-time (Google Docs style)"
                  },
                  {
                    "id": "ss-1-7-4-1-2",
                    "name": "Sequential"
                  }
                ]
              },
              {
                "id": "sub-1-7-4-2",
                "name": "Comments",
                "subSubModules": [
                  {
                    "id": "ss-1-7-4-2-1",
                    "name": "Threaded"
                  },
                  {
                    "id": "ss-1-7-4-2-2",
                    "name": "Resolved"
                  }
                ]
              },
              {
                "id": "sub-1-7-4-3",
                "name": "Annotations",
                "subSubModules": [
                  {
                    "id": "ss-1-7-4-3-1",
                    "name": "Highlighting"
                  },
                  {
                    "id": "ss-1-7-4-3-2",
                    "name": "Sticky notes"
                  },
                  {
                    "id": "ss-1-7-4-3-3",
                    "name": "Drawing"
                  }
                ]
              },
              {
                "id": "sub-1-7-4-4",
                "name": "Signatures",
                "subSubModules": [
                  {
                    "id": "ss-1-7-4-4-1",
                    "name": "Digital Signatures (DSC)"
                  },
                  {
                    "id": "ss-1-7-4-4-2",
                    "name": "E-signatures (Aadhaar)"
                  },
                  {
                    "id": "ss-1-7-4-4-3",
                    "name": "Wet ink (Upload)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-7-5",
            "name": "Security",
            "subModules": [
              {
                "id": "sub-1-7-5-1",
                "name": "Encryption",
                "subSubModules": [
                  {
                    "id": "ss-1-7-5-1-1",
                    "name": "AES-256 (At-rest)"
                  },
                  {
                    "id": "ss-1-7-5-1-2",
                    "name": "SSL/TLS (In-transit)"
                  }
                ]
              },
              {
                "id": "sub-1-7-5-2",
                "name": "Access Control",
                "subSubModules": [
                  {
                    "id": "ss-1-7-5-2-1",
                    "name": "Read-only"
                  },
                  {
                    "id": "ss-1-7-5-2-2",
                    "name": "Edit"
                  },
                  {
                    "id": "ss-1-7-5-2-3",
                    "name": "Delete"
                  },
                  {
                    "id": "ss-1-7-5-2-4",
                    "name": "Share"
                  }
                ]
              },
              {
                "id": "sub-1-7-5-3",
                "name": "DRM",
                "subSubModules": [
                  {
                    "id": "ss-1-7-5-3-1",
                    "name": "Watermarking"
                  },
                  {
                    "id": "ss-1-7-5-3-2",
                    "name": "Print restrictions"
                  },
                  {
                    "id": "ss-1-7-5-3-3",
                    "name": "Download restrictions"
                  }
                ]
              },
              {
                "id": "sub-1-7-5-4",
                "name": "Audit",
                "subSubModules": [
                  {
                    "id": "ss-1-7-5-4-1",
                    "name": "Access Logs"
                  },
                  {
                    "id": "ss-1-7-5-4-2",
                    "name": "Download Logs"
                  },
                  {
                    "id": "ss-1-7-5-4-3",
                    "name": "Version History"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-7-6",
            "name": "Integration",
            "subModules": [
              {
                "id": "sub-1-7-6-1",
                "name": "Applications",
                "subSubModules": [
                  {
                    "id": "ss-1-7-6-1-1",
                    "name": "Microsoft Office (Word/Excel/PowerPoint)"
                  },
                  {
                    "id": "ss-1-7-6-1-2",
                    "name": "Google Workspace (Docs/Sheets/Slides)"
                  },
                  {
                    "id": "ss-1-7-6-1-3",
                    "name": "Adobe Acrobat"
                  }
                ]
              },
              {
                "id": "sub-1-7-6-2",
                "name": "Services",
                "subSubModules": [
                  {
                    "id": "ss-1-7-6-2-1",
                    "name": "SharePoint"
                  },
                  {
                    "id": "ss-1-7-6-2-2",
                    "name": "OneDrive"
                  },
                  {
                    "id": "ss-1-7-6-2-3",
                    "name": "Google Drive"
                  },
                  {
                    "id": "ss-1-7-6-2-4",
                    "name": "Dropbox"
                  }
                ]
              },
              {
                "id": "sub-1-7-6-3",
                "name": "APIs",
                "subSubModules": [
                  {
                    "id": "ss-1-7-6-3-1",
                    "name": "REST API"
                  },
                  {
                    "id": "ss-1-7-6-3-2",
                    "name": "WebDAV"
                  },
                  {
                    "id": "ss-1-7-6-3-3",
                    "name": "CMIS"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-8",
        "name": "Enterprise Asset Management (EAM)",
        "mainModules": [
          {
            "id": "mod-1-8-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-8-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-8-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-8-1-1-2",
                    "name": "Biometric"
                  }
                ]
              },
              {
                "id": "sub-1-8-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-8-1-2-1",
                    "name": "Asset Manager"
                  },
                  {
                    "id": "ss-1-8-1-2-2",
                    "name": "Maintenance Manager"
                  },
                  {
                    "id": "ss-1-8-1-2-3",
                    "name": "Technician"
                  },
                  {
                    "id": "ss-1-8-1-2-4",
                    "name": "Auditor"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-8-2",
            "name": "Asset Management",
            "subModules": [
              {
                "id": "sub-1-8-2-1",
                "name": "Asset Types",
                "subSubModules": [
                  {
                    "id": "ss-1-8-2-1-1",
                    "name": "Fixed (Buildings/Machinery)"
                  },
                  {
                    "id": "ss-1-8-2-1-2",
                    "name": "Moveable (Vehicles/Equipment)"
                  },
                  {
                    "id": "ss-1-8-2-1-3",
                    "name": "IT (Servers/Computers)"
                  },
                  {
                    "id": "ss-1-8-2-1-4",
                    "name": "Infrastructure (Roads/Pipelines)"
                  }
                ]
              },
              {
                "id": "sub-1-8-2-2",
                "name": "Lifecycle",
                "subSubModules": [
                  {
                    "id": "ss-1-8-2-2-1",
                    "name": "Acquisition"
                  },
                  {
                    "id": "ss-1-8-2-2-2",
                    "name": "Allocation"
                  },
                  {
                    "id": "ss-1-8-2-2-3",
                    "name": "Maintenance"
                  },
                  {
                    "id": "ss-1-8-2-2-4",
                    "name": "Transfer"
                  },
                  {
                    "id": "ss-1-8-2-2-5",
                    "name": "Disposal"
                  }
                ]
              },
              {
                "id": "sub-1-8-2-3",
                "name": "Tracking Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-8-2-3-1",
                    "name": "Barcode"
                  },
                  {
                    "id": "ss-1-8-2-3-2",
                    "name": "QR Code"
                  },
                  {
                    "id": "ss-1-8-2-3-3",
                    "name": "RFID Tags"
                  },
                  {
                    "id": "ss-1-8-2-3-4",
                    "name": "GPS"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-8-3",
            "name": "Maintenance Management",
            "subModules": [
              {
                "id": "sub-1-8-3-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-1-8-3-1-1",
                    "name": "Preventive (Scheduled)"
                  },
                  {
                    "id": "ss-1-8-3-1-2",
                    "name": "Predictive (Condition-based/IIoT)"
                  },
                  {
                    "id": "ss-1-8-3-1-3",
                    "name": "Corrective (Breakdown)"
                  },
                  {
                    "id": "ss-1-8-3-1-4",
                    "name": "Emergency"
                  }
                ]
              },
              {
                "id": "sub-1-8-3-2",
                "name": "Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-1-8-3-2-1",
                    "name": "Calendar-based"
                  },
                  {
                    "id": "ss-1-8-3-2-2",
                    "name": "Usage-based (Hours/Miles)"
                  },
                  {
                    "id": "ss-1-8-3-2-3",
                    "name": "AI-predicted"
                  }
                ]
              },
              {
                "id": "sub-1-8-3-3",
                "name": "Work Orders",
                "subSubModules": [
                  {
                    "id": "ss-1-8-3-3-1",
                    "name": "Creation"
                  },
                  {
                    "id": "ss-1-8-3-3-2",
                    "name": "Assignment (Technician)"
                  },
                  {
                    "id": "ss-1-8-3-3-3",
                    "name": "Parts"
                  },
                  {
                    "id": "ss-1-8-3-3-4",
                    "name": "Completion"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-8-4",
            "name": "Procurement",
            "subModules": [
              {
                "id": "sub-1-8-4-1",
                "name": "Requisition",
                "subSubModules": [
                  {
                    "id": "ss-1-8-4-1-1",
                    "name": "Asset request"
                  },
                  {
                    "id": "ss-1-8-4-1-2",
                    "name": "Approval workflow"
                  }
                ]
              },
              {
                "id": "sub-1-8-4-2",
                "name": "Purchase",
                "subSubModules": [
                  {
                    "id": "ss-1-8-4-2-1",
                    "name": "Direct purchase"
                  },
                  {
                    "id": "ss-1-8-4-2-2",
                    "name": "Lease/Rental"
                  }
                ]
              },
              {
                "id": "sub-1-8-4-3",
                "name": "Supplier",
                "subSubModules": [
                  {
                    "id": "ss-1-8-4-3-1",
                    "name": "Vendor management"
                  },
                  {
                    "id": "ss-1-8-4-3-2",
                    "name": "Contract management"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-8-5",
            "name": "Financials",
            "subModules": [
              {
                "id": "sub-1-8-5-1",
                "name": "Depreciation Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-8-5-1-1",
                    "name": "Straight-line"
                  },
                  {
                    "id": "ss-1-8-5-1-2",
                    "name": "WDV"
                  },
                  {
                    "id": "ss-1-8-5-1-3",
                    "name": "Units of Production"
                  },
                  {
                    "id": "ss-1-8-5-1-4",
                    "name": "Double Declining"
                  }
                ]
              },
              {
                "id": "sub-1-8-5-2",
                "name": "Costing",
                "subSubModules": [
                  {
                    "id": "ss-1-8-5-2-1",
                    "name": "Acquisition Cost"
                  },
                  {
                    "id": "ss-1-8-5-2-2",
                    "name": "Maintenance Cost"
                  },
                  {
                    "id": "ss-1-8-5-2-3",
                    "name": "Total Cost of Ownership"
                  }
                ]
              },
              {
                "id": "sub-1-8-5-3",
                "name": "Budgeting",
                "subSubModules": [
                  {
                    "id": "ss-1-8-5-3-1",
                    "name": "Capital Budget"
                  },
                  {
                    "id": "ss-1-8-5-3-2",
                    "name": "Maintenance Budget"
                  },
                  {
                    "id": "ss-1-8-5-3-3",
                    "name": "Replacement Planning"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-8-6",
            "name": "Reports",
            "subModules": [
              {
                "id": "sub-1-8-6-1",
                "name": "Dashboards",
                "subSubModules": [
                  {
                    "id": "ss-1-8-6-1-1",
                    "name": "Asset Health (Red/Yellow/Green)"
                  },
                  {
                    "id": "ss-1-8-6-1-2",
                    "name": "Utilization Rate"
                  },
                  {
                    "id": "ss-1-8-6-1-3",
                    "name": "Downtime"
                  }
                ]
              },
              {
                "id": "sub-1-8-6-2",
                "name": "Reports",
                "subSubModules": [
                  {
                    "id": "ss-1-8-6-2-1",
                    "name": "Maintenance History"
                  },
                  {
                    "id": "ss-1-8-6-2-2",
                    "name": "Cost Reports (By asset/Dept)"
                  },
                  {
                    "id": "ss-1-8-6-2-3",
                    "name": "Compliance Reports"
                  }
                ]
              },
              {
                "id": "sub-1-8-6-3",
                "name": "Export",
                "subSubModules": [
                  {
                    "id": "ss-1-8-6-3-1",
                    "name": "PDF"
                  },
                  {
                    "id": "ss-1-8-6-3-2",
                    "name": "Excel"
                  },
                  {
                    "id": "ss-1-8-6-3-3",
                    "name": "CSV"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-9",
        "name": "Facility Management System",
        "mainModules": [
          {
            "id": "mod-1-9-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-9-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-9-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-9-1-1-2",
                    "name": "SSO"
                  }
                ]
              },
              {
                "id": "sub-1-9-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-9-1-2-1",
                    "name": "Facility Manager"
                  },
                  {
                    "id": "ss-1-9-1-2-2",
                    "name": "Maintenance Staff"
                  },
                  {
                    "id": "ss-1-9-1-2-3",
                    "name": "Admin"
                  },
                  {
                    "id": "ss-1-9-1-2-4",
                    "name": "Vendor"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-9-2",
            "name": "Space Management",
            "subModules": [
              {
                "id": "sub-1-9-2-1",
                "name": "Inventory",
                "subSubModules": [
                  {
                    "id": "ss-1-9-2-1-1",
                    "name": "Buildings"
                  },
                  {
                    "id": "ss-1-9-2-1-2",
                    "name": "Floors"
                  },
                  {
                    "id": "ss-1-9-2-1-3",
                    "name": "Rooms"
                  },
                  {
                    "id": "ss-1-9-2-1-4",
                    "name": "Workstations"
                  },
                  {
                    "id": "ss-1-9-2-1-5",
                    "name": "Parking"
                  }
                ]
              },
              {
                "id": "sub-1-9-2-2",
                "name": "Layout",
                "subSubModules": [
                  {
                    "id": "ss-1-9-2-2-1",
                    "name": "Floor plans (Upload)"
                  },
                  {
                    "id": "ss-1-9-2-2-2",
                    "name": "Drag-and-drop placement"
                  }
                ]
              },
              {
                "id": "sub-1-9-2-3",
                "name": "Utilization",
                "subSubModules": [
                  {
                    "id": "ss-1-9-2-3-1",
                    "name": "Occupancy tracking"
                  },
                  {
                    "id": "ss-1-9-2-3-2",
                    "name": "Space allocation"
                  },
                  {
                    "id": "ss-1-9-2-3-3",
                    "name": "Capacity planning"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-9-3",
            "name": "Maintenance",
            "subModules": [
              {
                "id": "sub-1-9-3-1",
                "name": "Preventive",
                "subSubModules": [
                  {
                    "id": "ss-1-9-3-1-1",
                    "name": "HVAC"
                  },
                  {
                    "id": "ss-1-9-3-1-2",
                    "name": "Plumbing"
                  },
                  {
                    "id": "ss-1-9-3-1-3",
                    "name": "Electrical"
                  },
                  {
                    "id": "ss-1-9-3-1-4",
                    "name": "Elevators"
                  }
                ]
              },
              {
                "id": "sub-1-9-3-2",
                "name": "Corrective",
                "subSubModules": [
                  {
                    "id": "ss-1-9-3-2-1",
                    "name": "Break-fix"
                  },
                  {
                    "id": "ss-1-9-3-2-2",
                    "name": "Emergency repairs"
                  }
                ]
              },
              {
                "id": "sub-1-9-3-3",
                "name": "Supplier",
                "subSubModules": [
                  {
                    "id": "ss-1-9-3-3-1",
                    "name": "Vendors"
                  },
                  {
                    "id": "ss-1-9-3-3-2",
                    "name": "Contracts"
                  },
                  {
                    "id": "ss-1-9-3-3-3",
                    "name": "SLA tracking"
                  }
                ]
              },
              {
                "id": "sub-1-9-3-4",
                "name": "Work Orders",
                "subSubModules": [
                  {
                    "id": "ss-1-9-3-4-1",
                    "name": "Create"
                  },
                  {
                    "id": "ss-1-9-3-4-2",
                    "name": "Assign"
                  },
                  {
                    "id": "ss-1-9-3-4-3",
                    "name": "Track"
                  },
                  {
                    "id": "ss-1-9-3-4-4",
                    "name": "Complete"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-9-4",
            "name": "Security",
            "subModules": [
              {
                "id": "sub-1-9-4-1",
                "name": "Access Control",
                "subSubModules": [
                  {
                    "id": "ss-1-9-4-1-1",
                    "name": "RFID cards"
                  },
                  {
                    "id": "ss-1-9-4-1-2",
                    "name": "Biometric"
                  },
                  {
                    "id": "ss-1-9-4-1-3",
                    "name": "Key fobs"
                  }
                ]
              },
              {
                "id": "sub-1-9-4-2",
                "name": "CCTV",
                "subSubModules": [
                  {
                    "id": "ss-1-9-4-2-1",
                    "name": "Camera management"
                  },
                  {
                    "id": "ss-1-9-4-2-2",
                    "name": "Recording"
                  },
                  {
                    "id": "ss-1-9-4-2-3",
                    "name": "Live view"
                  }
                ]
              },
              {
                "id": "sub-1-9-4-3",
                "name": "Incidents",
                "subSubModules": [
                  {
                    "id": "ss-1-9-4-3-1",
                    "name": "Report"
                  },
                  {
                    "id": "ss-1-9-4-3-2",
                    "name": "Investigation"
                  },
                  {
                    "id": "ss-1-9-4-3-3",
                    "name": "Resolution"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-9-5",
            "name": "Energy Management",
            "subModules": [
              {
                "id": "sub-1-9-5-1",
                "name": "Utilities",
                "subSubModules": [
                  {
                    "id": "ss-1-9-5-1-1",
                    "name": "Electricity"
                  },
                  {
                    "id": "ss-1-9-5-1-2",
                    "name": "Water"
                  },
                  {
                    "id": "ss-1-9-5-1-3",
                    "name": "Gas"
                  },
                  {
                    "id": "ss-1-9-5-1-4",
                    "name": "HVAC"
                  }
                ]
              },
              {
                "id": "sub-1-9-5-2",
                "name": "Monitoring",
                "subSubModules": [
                  {
                    "id": "ss-1-9-5-2-1",
                    "name": "Consumption tracking"
                  },
                  {
                    "id": "ss-1-9-5-2-2",
                    "name": "Trends"
                  }
                ]
              },
              {
                "id": "sub-1-9-5-3",
                "name": "Sustainability",
                "subSubModules": [
                  {
                    "id": "ss-1-9-5-3-1",
                    "name": "Carbon footprint"
                  },
                  {
                    "id": "ss-1-9-5-3-2",
                    "name": "Green initiatives"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-10",
        "name": "Quality Management System (QMS)",
        "mainModules": [
          {
            "id": "mod-1-10-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-10-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-10-1-1-1",
                    "name": "Username-Password"
                  }
                ]
              },
              {
                "id": "sub-1-10-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-10-1-2-1",
                    "name": "QA Manager"
                  },
                  {
                    "id": "ss-1-10-1-2-2",
                    "name": "QA Inspector"
                  },
                  {
                    "id": "ss-1-10-1-2-3",
                    "name": "Auditor"
                  },
                  {
                    "id": "ss-1-10-1-2-4",
                    "name": "Admin"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-10-2",
            "name": "Quality Standards",
            "subModules": [
              {
                "id": "sub-1-10-2-1",
                "name": "Frameworks",
                "subSubModules": [
                  {
                    "id": "ss-1-10-2-1-1",
                    "name": "ISO 9001 (Quality)"
                  },
                  {
                    "id": "ss-1-10-2-1-2",
                    "name": "ISO 14001 (Environment)"
                  },
                  {
                    "id": "ss-1-10-2-1-3",
                    "name": "ISO 45001 (Safety)"
                  },
                  {
                    "id": "ss-1-10-2-1-4",
                    "name": "Six Sigma (DMAIC)"
                  },
                  {
                    "id": "ss-1-10-2-1-5",
                    "name": "Lean"
                  }
                ]
              },
              {
                "id": "sub-1-10-2-2",
                "name": "Documentation",
                "subSubModules": [
                  {
                    "id": "ss-1-10-2-2-1",
                    "name": "Quality Manual"
                  },
                  {
                    "id": "ss-1-10-2-2-2",
                    "name": "Procedures"
                  },
                  {
                    "id": "ss-1-10-2-2-3",
                    "name": "Work Instructions"
                  },
                  {
                    "id": "ss-1-10-2-2-4",
                    "name": "Policies"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-10-3",
            "name": "Inspection Management",
            "subModules": [
              {
                "id": "sub-1-10-3-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-1-10-3-1-1",
                    "name": "Incoming (Raw Materials)"
                  },
                  {
                    "id": "ss-1-10-3-1-2",
                    "name": "In-process (WIP)"
                  },
                  {
                    "id": "ss-1-10-3-1-3",
                    "name": "Final (Finished Goods)"
                  },
                  {
                    "id": "ss-1-10-3-1-4",
                    "name": "Outgoing (Shipment)"
                  }
                ]
              },
              {
                "id": "sub-1-10-3-2",
                "name": "Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-10-3-2-1",
                    "name": "100% Inspection"
                  },
                  {
                    "id": "ss-1-10-3-2-2",
                    "name": "Sampling (AQL/ANSI/ASQC)"
                  },
                  {
                    "id": "ss-1-10-3-2-3",
                    "name": "Random"
                  }
                ]
              },
              {
                "id": "sub-1-10-3-3",
                "name": "Results",
                "subSubModules": [
                  {
                    "id": "ss-1-10-3-3-1",
                    "name": "Pass/Fail"
                  },
                  {
                    "id": "ss-1-10-3-3-2",
                    "name": "Quantitative (Measurements)"
                  },
                  {
                    "id": "ss-1-10-3-3-3",
                    "name": "Attribute (Go/No-Go)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-10-4",
            "name": "Non-Conformance (NCR)",
            "subModules": [
              {
                "id": "sub-1-10-4-1",
                "name": "Severity",
                "subSubModules": [
                  {
                    "id": "ss-1-10-4-1-1",
                    "name": "Critical"
                  },
                  {
                    "id": "ss-1-10-4-1-2",
                    "name": "Major"
                  },
                  {
                    "id": "ss-1-10-4-1-3",
                    "name": "Minor"
                  }
                ]
              },
              {
                "id": "sub-1-10-4-2",
                "name": "Root Cause Analysis",
                "subSubModules": [
                  {
                    "id": "ss-1-10-4-2-1",
                    "name": "Fishbone (Ishikawa)"
                  },
                  {
                    "id": "ss-1-10-4-2-2",
                    "name": "5 Whys"
                  },
                  {
                    "id": "ss-1-10-4-2-3",
                    "name": "FMEA"
                  }
                ]
              },
              {
                "id": "sub-1-10-4-3",
                "name": "CAPA",
                "subSubModules": [
                  {
                    "id": "ss-1-10-4-3-1",
                    "name": "Corrective Action"
                  },
                  {
                    "id": "ss-1-10-4-3-2",
                    "name": "Preventive Action"
                  },
                  {
                    "id": "ss-1-10-4-3-3",
                    "name": "Effectiveness Verification"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-10-5",
            "name": "Audit Management",
            "subModules": [
              {
                "id": "sub-1-10-5-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-1-10-5-1-1",
                    "name": "Internal (First-party)"
                  },
                  {
                    "id": "ss-1-10-5-1-2",
                    "name": "External (Supplier)"
                  },
                  {
                    "id": "ss-1-10-5-1-3",
                    "name": "Third-party (Certification)"
                  },
                  {
                    "id": "ss-1-10-5-1-4",
                    "name": "Regulatory"
                  }
                ]
              },
              {
                "id": "sub-1-10-5-2",
                "name": "Schedule",
                "subSubModules": [
                  {
                    "id": "ss-1-10-5-2-1",
                    "name": "Annual"
                  },
                  {
                    "id": "ss-1-10-5-2-2",
                    "name": "Semi-annual"
                  },
                  {
                    "id": "ss-1-10-5-2-3",
                    "name": "Random"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-11",
        "name": "Contract Lifecycle Management (CLM)",
        "mainModules": [
          {
            "id": "mod-1-11-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-11-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-11-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-11-1-1-2",
                    "name": "SSO"
                  }
                ]
              },
              {
                "id": "sub-1-11-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-11-1-2-1",
                    "name": "Contract Manager"
                  },
                  {
                    "id": "ss-1-11-1-2-2",
                    "name": "Legal"
                  },
                  {
                    "id": "ss-1-11-1-2-3",
                    "name": "Approver"
                  },
                  {
                    "id": "ss-1-11-1-2-4",
                    "name": "Viewer"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-11-2",
            "name": "Contract Creation",
            "subModules": [
              {
                "id": "sub-1-11-2-1",
                "name": "Templates",
                "subSubModules": [
                  {
                    "id": "ss-1-11-2-1-1",
                    "name": "Standard (NDA, MSA, SOW, Lease)"
                  },
                  {
                    "id": "ss-1-11-2-1-2",
                    "name": "Custom"
                  }
                ]
              },
              {
                "id": "sub-1-11-2-2",
                "name": "Clause Library",
                "subSubModules": [
                  {
                    "id": "ss-1-11-2-2-1",
                    "name": "Pre-approved clauses"
                  },
                  {
                    "id": "ss-1-11-2-2-2",
                    "name": "Variable clauses"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-11-3",
            "name": "Approval Workflow",
            "subModules": [
              {
                "id": "sub-1-11-3-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-1-11-3-1-1",
                    "name": "Sequential"
                  },
                  {
                    "id": "ss-1-11-3-1-2",
                    "name": "Parallel"
                  },
                  {
                    "id": "ss-1-11-3-1-3",
                    "name": "Conditional"
                  }
                ]
              },
              {
                "id": "sub-1-11-3-2",
                "name": "Signatures",
                "subSubModules": [
                  {
                    "id": "ss-1-11-3-2-1",
                    "name": "Electronic (DocuSign, HelloSign)"
                  },
                  {
                    "id": "ss-1-11-3-2-2",
                    "name": "Digital (DSC)"
                  },
                  {
                    "id": "ss-1-11-3-2-3",
                    "name": "Witness"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-11-4",
            "name": "Contract Repository",
            "subModules": [
              {
                "id": "sub-1-11-4-1",
                "name": "Storage",
                "subSubModules": [
                  {
                    "id": "ss-1-11-4-1-1",
                    "name": "Centralized database"
                  }
                ]
              },
              {
                "id": "sub-1-11-4-2",
                "name": "Search",
                "subSubModules": [
                  {
                    "id": "ss-1-11-4-2-1",
                    "name": "Full-text"
                  },
                  {
                    "id": "ss-1-11-4-2-2",
                    "name": "Clause search"
                  },
                  {
                    "id": "ss-1-11-4-2-3",
                    "name": "Metadata filters"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-1-12",
        "name": "Product Lifecycle Management (PLM)",
        "mainModules": [
          {
            "id": "mod-1-12-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-1-12-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-1-12-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-1-12-1-1-2",
                    "name": "SSO"
                  }
                ]
              },
              {
                "id": "sub-1-12-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-1-12-1-2-1",
                    "name": "Product Manager"
                  },
                  {
                    "id": "ss-1-12-1-2-2",
                    "name": "Engineer"
                  },
                  {
                    "id": "ss-1-12-1-2-3",
                    "name": "Designer"
                  },
                  {
                    "id": "ss-1-12-1-2-4",
                    "name": "Admin"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-12-2",
            "name": "Product Data Management",
            "subModules": [
              {
                "id": "sub-1-12-2-1",
                "name": "BOM",
                "subSubModules": [
                  {
                    "id": "ss-1-12-2-1-1",
                    "name": "Multi-level BOM"
                  },
                  {
                    "id": "ss-1-12-2-1-2",
                    "name": "Configurable"
                  },
                  {
                    "id": "ss-1-12-2-1-3",
                    "name": "Variant"
                  }
                ]
              },
              {
                "id": "sub-1-12-2-2",
                "name": "Documents",
                "subSubModules": [
                  {
                    "id": "ss-1-12-2-2-1",
                    "name": "Specifications"
                  },
                  {
                    "id": "ss-1-12-2-2-2",
                    "name": "Drawings"
                  },
                  {
                    "id": "ss-1-12-2-2-3",
                    "name": "CAD files"
                  },
                  {
                    "id": "ss-1-12-2-2-4",
                    "name": "Datasheets"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-12-3",
            "name": "Change Management",
            "subModules": [
              {
                "id": "sub-1-12-3-1",
                "name": "ECR",
                "subSubModules": [
                  {
                    "id": "ss-1-12-3-1-1",
                    "name": "Change Request (Reason/Impact)"
                  }
                ]
              },
              {
                "id": "sub-1-12-3-2",
                "name": "ECO",
                "subSubModules": [
                  {
                    "id": "ss-1-12-3-2-1",
                    "name": "Change Order (Approvals/Implementation)"
                  }
                ]
              },
              {
                "id": "sub-1-12-3-3",
                "name": "BOM Revision",
                "subSubModules": [
                  {
                    "id": "ss-1-12-3-3-1",
                    "name": "Version tracking"
                  },
                  {
                    "id": "ss-1-12-3-3-2",
                    "name": "Historical comparison"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-1-12-4",
            "name": "Project Management",
            "subModules": [
              {
                "id": "sub-1-12-4-1",
                "name": "NPI",
                "subSubModules": [
                  {
                    "id": "ss-1-12-4-1-1",
                    "name": "New Product Introduction"
                  }
                ]
              },
              {
                "id": "sub-1-12-4-2",
                "name": "Phases",
                "subSubModules": [
                  {
                    "id": "ss-1-12-4-2-1",
                    "name": "Concept"
                  },
                  {
                    "id": "ss-1-12-4-2-2",
                    "name": "Design"
                  },
                  {
                    "id": "ss-1-12-4-2-3",
                    "name": "Development"
                  },
                  {
                    "id": "ss-1-12-4-2-4",
                    "name": "Testing"
                  },
                  {
                    "id": "ss-1-12-4-2-5",
                    "name": "Launch"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-2",
    "code": "2",
    "name": "FINANCE & ACCOUNTING",
    "description": "Accounting software, billing, payroll, tax management, and budget planning",
    "productTypes": [
      {
        "id": "type-2-1",
        "name": "Accounting Software",
        "mainModules": [
          {
            "id": "mod-2-1-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-2-1-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-2-1-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-2-1-1-1-2",
                    "name": "Biometric"
                  },
                  {
                    "id": "ss-2-1-1-1-3",
                    "name": "SSO"
                  }
                ]
              },
              {
                "id": "sub-2-1-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-2-1-1-2-1",
                    "name": "Accountant"
                  },
                  {
                    "id": "ss-2-1-1-2-2",
                    "name": "Accountant Manager"
                  },
                  {
                    "id": "ss-2-1-1-2-3",
                    "name": "Admin"
                  },
                  {
                    "id": "ss-2-1-1-2-4",
                    "name": "Auditor"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-1-2",
            "name": "Chart of Accounts",
            "subModules": [
              {
                "id": "sub-2-1-2-1",
                "name": "Account Types",
                "subSubModules": [
                  {
                    "id": "ss-2-1-2-1-1",
                    "name": "Assets (Current/Fixed)"
                  },
                  {
                    "id": "ss-2-1-2-1-2",
                    "name": "Liabilities (Current/Long-term)"
                  },
                  {
                    "id": "ss-2-1-2-1-3",
                    "name": "Equity (Capital/Retained Earnings)"
                  },
                  {
                    "id": "ss-2-1-2-1-4",
                    "name": "Income (Revenue/Other)"
                  },
                  {
                    "id": "ss-2-1-2-1-5",
                    "name": "Expenses (Operating/Non-operating)"
                  }
                ]
              },
              {
                "id": "sub-2-1-2-2",
                "name": "Hierarchy",
                "subSubModules": [
                  {
                    "id": "ss-2-1-2-2-1",
                    "name": "Parent-child accounts"
                  },
                  {
                    "id": "ss-2-1-2-2-2",
                    "name": "Group level"
                  },
                  {
                    "id": "ss-2-1-2-2-3",
                    "name": "Sub-accounts"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-1-3",
            "name": "Journal Entries",
            "subModules": [
              {
                "id": "sub-2-1-3-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-2-1-3-1-1",
                    "name": "Manual (Debit/Credit)"
                  },
                  {
                    "id": "ss-2-1-3-1-2",
                    "name": "Recurring (Monthly Rent/Depreciation)"
                  },
                  {
                    "id": "ss-2-1-3-1-3",
                    "name": "Reversing (Accruals/Prepayments)"
                  },
                  {
                    "id": "ss-2-1-3-1-4",
                    "name": "Adjusting"
                  }
                ]
              },
              {
                "id": "sub-2-1-3-2",
                "name": "Approval",
                "subSubModules": [
                  {
                    "id": "ss-2-1-3-2-1",
                    "name": "Workflow (Entry→Review→Post)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-1-4",
            "name": "Accounts Receivable",
            "subModules": [
              {
                "id": "sub-2-1-4-1",
                "name": "Invoices",
                "subSubModules": [
                  {
                    "id": "ss-2-1-4-1-1",
                    "name": "Standard"
                  },
                  {
                    "id": "ss-2-1-4-1-2",
                    "name": "Recurring"
                  },
                  {
                    "id": "ss-2-1-4-1-3",
                    "name": "Credit Notes"
                  }
                ]
              },
              {
                "id": "sub-2-1-4-2",
                "name": "Aging",
                "subSubModules": [
                  {
                    "id": "ss-2-1-4-2-1",
                    "name": "30/60/90/120 days"
                  },
                  {
                    "id": "ss-2-1-4-2-2",
                    "name": "Collection Reports"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-1-5",
            "name": "Accounts Payable",
            "subModules": [
              {
                "id": "sub-2-1-5-1",
                "name": "Bills",
                "subSubModules": [
                  {
                    "id": "ss-2-1-5-1-1",
                    "name": "Purchase Bills"
                  },
                  {
                    "id": "ss-2-1-5-1-2",
                    "name": "Expense Bills"
                  }
                ]
              },
              {
                "id": "sub-2-1-5-2",
                "name": "Payments",
                "subSubModules": [
                  {
                    "id": "ss-2-1-5-2-1",
                    "name": "Scheduled"
                  },
                  {
                    "id": "ss-2-1-5-2-2",
                    "name": "Immediate"
                  },
                  {
                    "id": "ss-2-1-5-2-3",
                    "name": "Bulk Vendor"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-1-6",
            "name": "Bank Reconciliation",
            "subModules": [
              {
                "id": "sub-2-1-6-1",
                "name": "Upload Formats",
                "subSubModules": [
                  {
                    "id": "ss-2-1-6-1-1",
                    "name": "CSV"
                  },
                  {
                    "id": "ss-2-1-6-1-2",
                    "name": "OFX"
                  },
                  {
                    "id": "ss-2-1-6-1-3",
                    "name": "MT940"
                  }
                ]
              },
              {
                "id": "sub-2-1-6-2",
                "name": "Matching",
                "subSubModules": [
                  {
                    "id": "ss-2-1-6-2-1",
                    "name": "Automatic (Algorithmic)"
                  },
                  {
                    "id": "ss-2-1-6-2-2",
                    "name": "Manual"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-1-7",
            "name": "Financial Reports",
            "subModules": [
              {
                "id": "sub-2-1-7-1",
                "name": "Statements",
                "subSubModules": [
                  {
                    "id": "ss-2-1-7-1-1",
                    "name": "Balance Sheet (Vertical/Horizontal)"
                  },
                  {
                    "id": "ss-2-1-7-1-2",
                    "name": "P&L"
                  },
                  {
                    "id": "ss-2-1-7-1-3",
                    "name": "Cash Flow (Direct/Indirect)"
                  },
                  {
                    "id": "ss-2-1-7-1-4",
                    "name": "Trial Balance"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-1-8",
            "name": "Tax Management",
            "subModules": [
              {
                "id": "sub-2-1-8-1",
                "name": "GST",
                "subSubModules": [
                  {
                    "id": "ss-2-1-8-1-1",
                    "name": "Registration"
                  },
                  {
                    "id": "ss-2-1-8-1-2",
                    "name": "Filing (GSTR-1/3B/9)"
                  },
                  {
                    "id": "ss-2-1-8-1-3",
                    "name": "Reconciliation (2A vs Books)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-2-2",
        "name": "Billing Software",
        "mainModules": [
          {
            "id": "mod-2-2-1",
            "name": "Invoice Generation",
            "subModules": [
              {
                "id": "sub-2-2-1-1",
                "name": "Templates",
                "subSubModules": [
                  {
                    "id": "ss-2-2-1-1-1",
                    "name": "Standard"
                  },
                  {
                    "id": "ss-2-2-1-1-2",
                    "name": "Tax Invoice"
                  },
                  {
                    "id": "ss-2-2-1-1-3",
                    "name": "Proforma"
                  },
                  {
                    "id": "ss-2-2-1-1-4",
                    "name": "Commercial"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-2-2",
            "name": "Payment Processing",
            "subModules": [
              {
                "id": "sub-2-2-2-1",
                "name": "Gateways",
                "subSubModules": [
                  {
                    "id": "ss-2-2-2-1-1",
                    "name": "Stripe (Cards)"
                  },
                  {
                    "id": "ss-2-2-2-1-2",
                    "name": "Razorpay (Cards/UPI)"
                  },
                  {
                    "id": "ss-2-2-2-1-3",
                    "name": "PayPal (International)"
                  },
                  {
                    "id": "ss-2-2-2-1-4",
                    "name": "PayU (India)"
                  }
                ]
              },
              {
                "id": "sub-2-2-2-2",
                "name": "Methods",
                "subSubModules": [
                  {
                    "id": "ss-2-2-2-2-1",
                    "name": "Card (Credit/Debit)"
                  },
                  {
                    "id": "ss-2-2-2-2-2",
                    "name": "Net Banking"
                  },
                  {
                    "id": "ss-2-2-2-2-3",
                    "name": "UPI"
                  },
                  {
                    "id": "ss-2-2-2-2-4",
                    "name": "NEFT/RTGS"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-2-3",
            "name": "Recurring Billing",
            "subModules": [
              {
                "id": "sub-2-2-3-1",
                "name": "Frequency",
                "subSubModules": [
                  {
                    "id": "ss-2-2-3-1-1",
                    "name": "Daily"
                  },
                  {
                    "id": "ss-2-2-3-1-2",
                    "name": "Weekly"
                  },
                  {
                    "id": "ss-2-2-3-1-3",
                    "name": "Monthly"
                  },
                  {
                    "id": "ss-2-2-3-1-4",
                    "name": "Quarterly"
                  },
                  {
                    "id": "ss-2-2-3-1-5",
                    "name": "Yearly"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-2-4",
            "name": "Tax Compliance",
            "subModules": [
              {
                "id": "sub-2-2-4-1",
                "name": "GST",
                "subSubModules": [
                  {
                    "id": "ss-2-2-4-1-1",
                    "name": "HSN/SAC codes mapping"
                  },
                  {
                    "id": "ss-2-2-4-1-2",
                    "name": "Reverse Charge"
                  },
                  {
                    "id": "ss-2-2-4-1-3",
                    "name": "E-invoice generation"
                  },
                  {
                    "id": "ss-2-2-4-1-4",
                    "name": "E-way bill"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-2-3",
        "name": "Payroll Management System",
        "mainModules": [
          {
            "id": "mod-2-3-1",
            "name": "Salary Structure",
            "subModules": [
              {
                "id": "sub-2-3-1-1",
                "name": "Components",
                "subSubModules": [
                  {
                    "id": "ss-2-3-1-1-1",
                    "name": "Basic Pay"
                  },
                  {
                    "id": "ss-2-3-1-1-2",
                    "name": "House Rent Allowance (HRA)"
                  },
                  {
                    "id": "ss-2-3-1-1-3",
                    "name": "Dearness Allowance (DA)"
                  },
                  {
                    "id": "ss-2-3-1-1-4",
                    "name": "Bonus"
                  },
                  {
                    "id": "ss-2-3-1-1-5",
                    "name": "Incentives"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-3-2",
            "name": "Statutory Compliance",
            "subModules": [
              {
                "id": "sub-2-3-2-1",
                "name": "PF",
                "subSubModules": [
                  {
                    "id": "ss-2-3-2-1-1",
                    "name": "12% (Employee) + 12% (Employer)"
                  },
                  {
                    "id": "ss-2-3-2-1-2",
                    "name": "Form 24Q"
                  }
                ]
              },
              {
                "id": "sub-2-3-2-2",
                "name": "ESI",
                "subSubModules": [
                  {
                    "id": "ss-2-3-2-2-1",
                    "name": "0.75% (Employee) + 3.25% (Employer)"
                  }
                ]
              },
              {
                "id": "sub-2-3-2-3",
                "name": "TDS",
                "subSubModules": [
                  {
                    "id": "ss-2-3-2-3-1",
                    "name": "Tax slabs (Old vs New)"
                  },
                  {
                    "id": "ss-2-3-2-3-2",
                    "name": "Form 16"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-3-3",
            "name": "Salary Slip",
            "subModules": [
              {
                "id": "sub-2-3-3-1",
                "name": "Delivery",
                "subSubModules": [
                  {
                    "id": "ss-2-3-3-1-1",
                    "name": "System download"
                  },
                  {
                    "id": "ss-2-3-3-1-2",
                    "name": "Email"
                  },
                  {
                    "id": "ss-2-3-3-1-3",
                    "name": "Mobile App"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-2-4",
        "name": "Tax Management System",
        "mainModules": [
          {
            "id": "mod-2-4-1",
            "name": "Tax Configuration",
            "subModules": [
              {
                "id": "sub-2-4-1-1",
                "name": "GST",
                "subSubModules": [
                  {
                    "id": "ss-2-4-1-1-1",
                    "name": "Slabs (5%, 12%, 18%, 28%)"
                  },
                  {
                    "id": "ss-2-4-1-1-2",
                    "name": "Composition"
                  },
                  {
                    "id": "ss-2-4-1-1-3",
                    "name": "Reverse Charge"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-4-2",
            "name": "Returns Filing",
            "subModules": [
              {
                "id": "sub-2-4-2-1",
                "name": "GSTR Returns",
                "subSubModules": [
                  {
                    "id": "ss-2-4-2-1-1",
                    "name": "GSTR-1"
                  },
                  {
                    "id": "ss-2-4-2-1-2",
                    "name": "GSTR-2A/2B"
                  },
                  {
                    "id": "ss-2-4-2-1-3",
                    "name": "GSTR-3B"
                  },
                  {
                    "id": "ss-2-4-2-1-4",
                    "name": "GSTR-9"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-2-5",
        "name": "Budget Planning System",
        "mainModules": [
          {
            "id": "mod-2-5-1",
            "name": "Budget Creation",
            "subModules": [
              {
                "id": "sub-2-5-1-1",
                "name": "Approaches",
                "subSubModules": [
                  {
                    "id": "ss-2-5-1-1-1",
                    "name": "Top-down (Executive)"
                  },
                  {
                    "id": "ss-2-5-1-1-2",
                    "name": "Bottom-up (Department)"
                  },
                  {
                    "id": "ss-2-5-1-1-3",
                    "name": "Zero-based (Justification)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-2-5-2",
            "name": "Expense Management",
            "subModules": [
              {
                "id": "sub-2-5-2-1",
                "name": "Tracking",
                "subSubModules": [
                  {
                    "id": "ss-2-5-2-1-1",
                    "name": "Actual vs Budget"
                  },
                  {
                    "id": "ss-2-5-2-1-2",
                    "name": "Variance Analysis"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-3",
    "code": "3",
    "name": "BANKING & FINTECH",
    "description": "Core banking, mobile banking, and payment gateway solutions",
    "productTypes": [
      {
        "id": "type-3-1",
        "name": "Core Banking",
        "mainModules": [
          {
            "id": "mod-3-1-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-3-1-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-3-1-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-3-1-1-1-2",
                    "name": "Biometric"
                  },
                  {
                    "id": "ss-3-1-1-1-3",
                    "name": "UPI PIN"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-3-1-2",
            "name": "Account Management",
            "subModules": [
              {
                "id": "sub-3-1-2-1",
                "name": "Account Types",
                "subSubModules": [
                  {
                    "id": "ss-3-1-2-1-1",
                    "name": "Savings (Regular/Zero-balance)"
                  },
                  {
                    "id": "ss-3-1-2-1-2",
                    "name": "Current (Overdraft)"
                  },
                  {
                    "id": "ss-3-1-2-1-3",
                    "name": "Fixed Deposit"
                  }
                ]
              },
              {
                "id": "sub-3-1-2-2",
                "name": "KYC",
                "subSubModules": [
                  {
                    "id": "ss-3-1-2-2-1",
                    "name": "Aadhaar"
                  },
                  {
                    "id": "ss-3-1-2-2-2",
                    "name": "PAN"
                  },
                  {
                    "id": "ss-3-1-2-2-3",
                    "name": "Passport"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-3-1-3",
            "name": "Transactions",
            "subModules": [
              {
                "id": "sub-3-1-3-1",
                "name": "Funds Transfer",
                "subSubModules": [
                  {
                    "id": "ss-3-1-3-1-1",
                    "name": "NEFT"
                  },
                  {
                    "id": "ss-3-1-3-1-2",
                    "name": "RTGS"
                  },
                  {
                    "id": "ss-3-1-3-1-3",
                    "name": "IMPS"
                  },
                  {
                    "id": "ss-3-1-3-1-4",
                    "name": "UPI"
                  },
                  {
                    "id": "ss-3-1-3-1-5",
                    "name": "SWIFT"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-3-1-4",
            "name": "Loans",
            "subModules": [
              {
                "id": "sub-3-1-4-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-3-1-4-1-1",
                    "name": "Home"
                  },
                  {
                    "id": "ss-3-1-4-1-2",
                    "name": "Personal"
                  },
                  {
                    "id": "ss-3-1-4-1-3",
                    "name": "Auto"
                  },
                  {
                    "id": "ss-3-1-4-1-4",
                    "name": "Business"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-3-2",
        "name": "Mobile Banking",
        "mainModules": [
          {
            "id": "mod-3-2-1",
            "name": "Dashboard",
            "subModules": [
              {
                "id": "sub-3-2-1-1",
                "name": "Features",
                "subSubModules": [
                  {
                    "id": "ss-3-2-1-1-1",
                    "name": "Balance (Quick view)"
                  },
                  {
                    "id": "ss-3-2-1-1-2",
                    "name": "Mini-statement"
                  },
                  {
                    "id": "ss-3-2-1-1-3",
                    "name": "Quick Actions (Transfer/Recharge)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-3-2-2",
            "name": "Bill Payments",
            "subModules": [
              {
                "id": "sub-3-2-2-1",
                "name": "Categories",
                "subSubModules": [
                  {
                    "id": "ss-3-2-2-1-1",
                    "name": "Electricity"
                  },
                  {
                    "id": "ss-3-2-2-1-2",
                    "name": "Water"
                  },
                  {
                    "id": "ss-3-2-2-1-3",
                    "name": "Mobile Recharge"
                  },
                  {
                    "id": "ss-3-2-2-1-4",
                    "name": "Credit Card"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-3-3",
        "name": "Payment Gateway",
        "mainModules": [
          {
            "id": "mod-3-3-1",
            "name": "Merchant Onboarding",
            "subModules": [
              {
                "id": "sub-3-3-1-1",
                "name": "KYC",
                "subSubModules": [
                  {
                    "id": "ss-3-3-1-1-1",
                    "name": "Individual (PAN/Aadhaar)"
                  },
                  {
                    "id": "ss-3-3-1-1-2",
                    "name": "Business (GST/CIN)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-3-3-2",
            "name": "Payment Processing",
            "subModules": [
              {
                "id": "sub-3-3-2-1",
                "name": "Payment Methods",
                "subSubModules": [
                  {
                    "id": "ss-3-3-2-1-1",
                    "name": "Cards"
                  },
                  {
                    "id": "ss-3-3-2-1-2",
                    "name": "Net Banking"
                  },
                  {
                    "id": "ss-3-3-2-1-3",
                    "name": "UPI"
                  },
                  {
                    "id": "ss-3-3-2-1-4",
                    "name": "BNPL"
                  },
                  {
                    "id": "ss-3-3-2-1-5",
                    "name": "Wallet"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-3-3-3",
            "name": "Settlement",
            "subModules": [
              {
                "id": "sub-3-3-3-1",
                "name": "Schedule",
                "subSubModules": [
                  {
                    "id": "ss-3-3-3-1-1",
                    "name": "T+0 (Instant)"
                  },
                  {
                    "id": "ss-3-3-3-1-2",
                    "name": "T+1 (Next day)"
                  },
                  {
                    "id": "ss-3-3-3-1-3",
                    "name": "T+2"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-3-4",
        "name": "FinTech / Digital Banking (Expanded)",
        "mainModules": [
          {
            "id": "mod-type-3-4-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-3-4-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-1-1-1",
                    "name": "Biometric Passkeys (FIDO2)"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-1-1-2",
                    "name": "Mobile App MPIN"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-1-1-3",
                    "name": "Device Binding"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-1-1-4",
                    "name": "TOTP-MFA"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-1-2-1",
                    "name": "Retail Customer"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-1-2-2",
                    "name": "SME Account Admin"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-1-2-3",
                    "name": "Compliance Officer"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-1-2-4",
                    "name": "Risk Underwriter"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-1-2-5",
                    "name": "Platform Admin"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-3-4-2",
            "name": "Digital Onboarding & e-KYC",
            "subModules": [
              {
                "id": "sub-mod-type-3-4-2-1",
                "name": "Identity Verification",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-2-1-1",
                    "name": "OCR ID Extraction (PAN/Passport)"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-2-1-2",
                    "name": "Liveness Face Matching"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-2-1-3",
                    "name": "Video KYC Interview"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-2-2",
                "name": "AML & Fraud Screening",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-2-2-1",
                    "name": "PEP & Sanctions Database Screening"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-2-2-2",
                    "name": "Adverse Media Checks"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-2-3",
                "name": "Account Provisioning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-2-3-1",
                    "name": "Instant Virtual Account Creation"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-2-3-2",
                    "name": "Instant Digital Debit Card Issuance"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-3-4-3",
            "name": "Neo-Banking & Multi-Currency Accounts",
            "subModules": [
              {
                "id": "sub-mod-type-3-4-3-1",
                "name": "Multi-Currency Wallets",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-3-1-1",
                    "name": "Real-time FX Conversion"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-3-1-2",
                    "name": "Local Virtual IBANs / Routing Numbers"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-3-2",
                "name": "Savings Pots & Sub-Accounts",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-3-2-1",
                    "name": "Goal-based Automated Savings"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-3-2-2",
                    "name": "Round-up Spare Change Deposits"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-3-3",
                "name": "Open Banking Integration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-3-3-1",
                    "name": "Account Aggregator Consent Flow"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-3-3-2",
                    "name": "Consolidated Net-worth Dashboard"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-3-4-4",
            "name": "Payments & Instant Rails",
            "subModules": [
              {
                "id": "sub-mod-type-3-4-4-1",
                "name": "Instant Payment Rails",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-4-1-1",
                    "name": "UPI 2.0 / QR Payments"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-4-1-2",
                    "name": "FedNow / SEPA Instant / IMPS"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-4-1-3",
                    "name": "Peer-to-Peer (P2P) Split Bills"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-4-2",
                "name": "Cross-Border Remittance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-4-2-1",
                    "name": "SWIFT gpi Tracking"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-4-2-2",
                    "name": "Mid-market Guaranteed FX Corridor"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-4-3",
                "name": "Bill Pay & Recurring Mandates",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-4-3-1",
                    "name": "Bharat BillPay (BBPS)"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-4-3-2",
                    "name": "E-Mandates (NACH / Standing Orders)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-3-4-5",
            "name": "Digital Lending & Micro-Credit",
            "subModules": [
              {
                "id": "sub-mod-type-3-4-5-1",
                "name": "Alternative Credit Underwriting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-5-1-1",
                    "name": "Cash Flow Transactional Analysis"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-5-1-2",
                    "name": "Utility & Telco Score Modeling"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-5-2",
                "name": "Buy Now Pay Later (BNPL)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-5-2-1",
                    "name": "1-Click Checkout Credit Slice"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-5-2-2",
                    "name": "0% Interest Installment Schedules"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-5-3",
                "name": "Instant Personal Loans",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-5-3-1",
                    "name": "Automated Algorithmic Decisioning"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-5-3-2",
                    "name": "Instant Disbursal to Wallet"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-3-4-6",
            "name": "WealthTech & Micro-Investing",
            "subModules": [
              {
                "id": "sub-mod-type-3-4-6-1",
                "name": "Robo-Advisory Portfolios",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-6-1-1",
                    "name": "Risk Profiling Questionnaire"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-6-1-2",
                    "name": "Automated ETF / Mutual Fund Rebalancing"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-6-2",
                "name": "Fractional Share Trading",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-6-2-1",
                    "name": "Small-ticket Equities Purchasing"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-6-2-2",
                    "name": "Dividend Reinvestment"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-3-4-7",
            "name": "Fraud Detection & Security",
            "subModules": [
              {
                "id": "sub-mod-type-3-4-7-1",
                "name": "Behavioral Biometrics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-7-1-1",
                    "name": "Typing Cadence"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-7-1-2",
                    "name": "Device Gyroscope Fingerprinting"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-7-1-3",
                    "name": "SIM Swap Detection"
                  }
                ]
              },
              {
                "id": "sub-mod-type-3-4-7-2",
                "name": "Transaction Risk Scoring",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-3-4-7-2-1",
                    "name": "Real-time Machine Learning Anomaly Score"
                  },
                  {
                    "id": "ss-sub-mod-type-3-4-7-2-2",
                    "name": "Velocity Rule Triggers"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-4",
    "code": "4",
    "name": "SALES & CUSTOMER MANAGEMENT",
    "description": "Sales CRM, Lead Management, Commission, and Field Sales systems",
    "productTypes": [
      {
        "id": "type-4-1",
        "name": "Sales CRM",
        "mainModules": [
          {
            "id": "mod-4-1-1",
            "name": "Lead Management",
            "subModules": [
              {
                "id": "sub-4-1-1-1",
                "name": "Capture",
                "subSubModules": [
                  {
                    "id": "ss-4-1-1-1-1",
                    "name": "Web forms"
                  },
                  {
                    "id": "ss-4-1-1-1-2",
                    "name": "Bulk import"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-4-1-2",
            "name": "Opportunity",
            "subModules": [
              {
                "id": "sub-4-1-2-1",
                "name": "Stages",
                "subSubModules": [
                  {
                    "id": "ss-4-1-2-1-1",
                    "name": "Prospecting"
                  },
                  {
                    "id": "ss-4-1-2-1-2",
                    "name": "Qualification"
                  },
                  {
                    "id": "ss-4-1-2-1-3",
                    "name": "Demo"
                  },
                  {
                    "id": "ss-4-1-2-1-4",
                    "name": "Proposal"
                  },
                  {
                    "id": "ss-4-1-2-1-5",
                    "name": "Closed Won/Lost"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-4-1-3",
            "name": "Quotation",
            "subModules": [
              {
                "id": "sub-4-1-3-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-4-1-3-1-1",
                    "name": "Standard"
                  },
                  {
                    "id": "ss-4-1-3-1-2",
                    "name": "Proforma"
                  },
                  {
                    "id": "ss-4-1-3-1-3",
                    "name": "Discounted"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-4-2",
        "name": "Lead Management",
        "mainModules": [
          {
            "id": "mod-4-2-1",
            "name": "Lead Capture",
            "subModules": [
              {
                "id": "sub-4-2-1-1",
                "name": "Sources",
                "subSubModules": [
                  {
                    "id": "ss-4-2-1-1-1",
                    "name": "Website"
                  },
                  {
                    "id": "ss-4-2-1-1-2",
                    "name": "Social Media"
                  },
                  {
                    "id": "ss-4-2-1-1-3",
                    "name": "Cold Call"
                  },
                  {
                    "id": "ss-4-2-1-1-4",
                    "name": "Email Campaign"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-4-2-2",
            "name": "Lead Distribution",
            "subModules": [
              {
                "id": "sub-4-2-2-1",
                "name": "Strategies",
                "subSubModules": [
                  {
                    "id": "ss-4-2-2-1-1",
                    "name": "Round Robin"
                  },
                  {
                    "id": "ss-4-2-2-1-2",
                    "name": "Territory"
                  },
                  {
                    "id": "ss-4-2-2-1-3",
                    "name": "Skills-based"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-4-3",
        "name": "Commission Management",
        "mainModules": [
          {
            "id": "mod-4-3-1",
            "name": "Commission Structure",
            "subModules": [
              {
                "id": "sub-4-3-1-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-4-3-1-1-1",
                    "name": "Flat Rate"
                  },
                  {
                    "id": "ss-4-3-1-1-2",
                    "name": "Tiered"
                  },
                  {
                    "id": "ss-4-3-1-1-3",
                    "name": "Revenue-based"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-4-4",
        "name": "Field Sales Management",
        "mainModules": [
          {
            "id": "mod-4-4-1",
            "name": "Visit Planning",
            "subModules": [
              {
                "id": "sub-4-4-1-1",
                "name": "Route Optimization",
                "subSubModules": [
                  {
                    "id": "ss-4-4-1-1-1",
                    "name": "Automatic shortest path"
                  },
                  {
                    "id": "ss-4-4-1-1-2",
                    "name": "Beat Plan"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-4-4-2",
            "name": "Check-in/out",
            "subModules": [
              {
                "id": "sub-4-4-2-1",
                "name": "Methods",
                "subSubModules": [
                  {
                    "id": "ss-4-4-2-1-1",
                    "name": "GPS location"
                  },
                  {
                    "id": "ss-4-4-2-1-2",
                    "name": "QR Code"
                  },
                  {
                    "id": "ss-4-4-2-1-3",
                    "name": "Photo tag"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-5",
    "code": "5",
    "name": "MARKETING",
    "description": "Marketing automation, digital platforms, and customer loyalty programs",
    "productTypes": [
      {
        "id": "type-5-1",
        "name": "Marketing Automation",
        "mainModules": [
          {
            "id": "mod-5-1-1",
            "name": "Campaign Management",
            "subModules": [
              {
                "id": "sub-5-1-1-1",
                "name": "Channels",
                "subSubModules": [
                  {
                    "id": "ss-5-1-1-1-1",
                    "name": "Email"
                  },
                  {
                    "id": "ss-5-1-1-1-2",
                    "name": "SMS"
                  },
                  {
                    "id": "ss-5-1-1-1-3",
                    "name": "WhatsApp"
                  },
                  {
                    "id": "ss-5-1-1-1-4",
                    "name": "Push Notifications"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-5-1-2",
            "name": "Email Marketing",
            "subModules": [
              {
                "id": "sub-5-1-2-1",
                "name": "Sequences",
                "subSubModules": [
                  {
                    "id": "ss-5-1-2-1-1",
                    "name": "Drip campaigns"
                  },
                  {
                    "id": "ss-5-1-2-1-2",
                    "name": "Trigger-based"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-5-1-3",
            "name": "WhatsApp Marketing",
            "subModules": [
              {
                "id": "sub-5-1-3-1",
                "name": "Messages",
                "subSubModules": [
                  {
                    "id": "ss-5-1-3-1-1",
                    "name": "Template pre-approved"
                  },
                  {
                    "id": "ss-5-1-3-1-2",
                    "name": "Interactive buttons"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-5-2",
        "name": "Digital Marketing Platform",
        "mainModules": [
          {
            "id": "mod-5-2-1",
            "name": "SEO Management",
            "subModules": [
              {
                "id": "sub-5-2-1-1",
                "name": "On-page & Technical",
                "subSubModules": [
                  {
                    "id": "ss-5-2-1-1-1",
                    "name": "Meta Tags"
                  },
                  {
                    "id": "ss-5-2-1-1-2",
                    "name": "Sitemap"
                  },
                  {
                    "id": "ss-5-2-1-1-3",
                    "name": "Core Web Vitals"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-5-2-2",
            "name": "Social Media Management",
            "subModules": [
              {
                "id": "sub-5-2-2-1",
                "name": "Platforms",
                "subSubModules": [
                  {
                    "id": "ss-5-2-2-1-1",
                    "name": "Facebook"
                  },
                  {
                    "id": "ss-5-2-2-1-2",
                    "name": "Instagram"
                  },
                  {
                    "id": "ss-5-2-2-1-3",
                    "name": "LinkedIn"
                  },
                  {
                    "id": "ss-5-2-2-1-4",
                    "name": "Twitter"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-5-3",
        "name": "Loyalty Program",
        "mainModules": [
          {
            "id": "mod-5-3-1",
            "name": "Program Setup",
            "subModules": [
              {
                "id": "sub-5-3-1-1",
                "name": "Tiers",
                "subSubModules": [
                  {
                    "id": "ss-5-3-1-1-1",
                    "name": "Gold (5%)"
                  },
                  {
                    "id": "ss-5-3-1-1-2",
                    "name": "Silver (3%)"
                  },
                  {
                    "id": "ss-5-3-1-1-3",
                    "name": "Bronze (1%)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-5-3-2",
            "name": "Points Management",
            "subModules": [
              {
                "id": "sub-5-3-2-1",
                "name": "Earn & Redeem",
                "subSubModules": [
                  {
                    "id": "ss-5-3-2-1-1",
                    "name": "Purchase earn"
                  },
                  {
                    "id": "ss-5-3-2-1-2",
                    "name": "Referral bonus"
                  },
                  {
                    "id": "ss-5-3-2-1-3",
                    "name": "Discount redeem"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-6",
    "code": "6",
    "name": "HUMAN RESOURCES",
    "description": "Recruitment (ATS), Employee Engagement, and Biometric Attendance solutions",
    "productTypes": [
      {
        "id": "type-6-1",
        "name": "Recruitment Management (ATS)",
        "mainModules": [
          {
            "id": "mod-6-1-1",
            "name": "Job Management",
            "subModules": [
              {
                "id": "sub-6-1-1-1",
                "name": "Posting",
                "subSubModules": [
                  {
                    "id": "ss-6-1-1-1-1",
                    "name": "Career page"
                  },
                  {
                    "id": "ss-6-1-1-1-2",
                    "name": "LinkedIn"
                  },
                  {
                    "id": "ss-6-1-1-1-3",
                    "name": "Naukri"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-6-1-2",
            "name": "Application Management",
            "subModules": [
              {
                "id": "sub-6-1-2-1",
                "name": "Resume Parsing",
                "subSubModules": [
                  {
                    "id": "ss-6-1-2-1-1",
                    "name": "AI Parsing"
                  },
                  {
                    "id": "ss-6-1-2-1-2",
                    "name": "Keyword search"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-6-1-3",
            "name": "Interview Scheduling",
            "subModules": [
              {
                "id": "sub-6-1-3-1",
                "name": "Methods",
                "subSubModules": [
                  {
                    "id": "ss-6-1-3-1-1",
                    "name": "Video (Zoom/Meet/Teams)"
                  },
                  {
                    "id": "ss-6-1-3-1-2",
                    "name": "Calendar sync"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-6-2",
        "name": "Employee Engagement",
        "mainModules": [
          {
            "id": "mod-6-2-1",
            "name": "Recognition",
            "subModules": [
              {
                "id": "sub-6-2-1-1",
                "name": "Peer-to-peer",
                "subSubModules": [
                  {
                    "id": "ss-6-2-1-1-1",
                    "name": "Kudos"
                  },
                  {
                    "id": "ss-6-2-1-1-2",
                    "name": "Badges"
                  },
                  {
                    "id": "ss-6-2-1-1-3",
                    "name": "Wall of Fame"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-6-2-2",
            "name": "Surveys",
            "subModules": [
              {
                "id": "sub-6-2-2-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-6-2-2-1-1",
                    "name": "eNPS"
                  },
                  {
                    "id": "ss-6-2-2-1-2",
                    "name": "Pulse Survey"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-6-3",
        "name": "Biometric Attendance",
        "mainModules": [
          {
            "id": "mod-6-3-1",
            "name": "Biometric Devices",
            "subModules": [
              {
                "id": "sub-6-3-1-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-6-3-1-1-1",
                    "name": "Fingerprint"
                  },
                  {
                    "id": "ss-6-3-1-1-2",
                    "name": "Facial Recognition"
                  },
                  {
                    "id": "ss-6-3-1-1-3",
                    "name": "Iris Scanner"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-6-3-2",
            "name": "Check-in Methods",
            "subModules": [
              {
                "id": "sub-6-3-2-1",
                "name": "Channels",
                "subSubModules": [
                  {
                    "id": "ss-6-3-2-1-1",
                    "name": "Hardware Device"
                  },
                  {
                    "id": "ss-6-3-2-1-2",
                    "name": "Mobile App GPS"
                  },
                  {
                    "id": "ss-6-3-2-1-3",
                    "name": "Geofencing"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-6-4",
        "name": "HR & Talent Management (Expanded)",
        "mainModules": [
          {
            "id": "mod-type-6-4-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-6-4-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-1-1-2",
                    "name": "SSO (SAML/OAuth)"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-1-1-3",
                    "name": "Biometric Mobile"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-1-2-1",
                    "name": "HR Executive"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-1-2-2",
                    "name": "Department Employee"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-1-2-3",
                    "name": "Hiring Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-1-2-4",
                    "name": "Candidate Guest"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-6-4-2",
            "name": "Talent Management",
            "subModules": [
              {
                "id": "sub-mod-type-6-4-2-1",
                "name": "Career Pathing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-2-1-1",
                    "name": "Job Framework"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-2-1-2",
                    "name": "Competency Ladders"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-2-1-3",
                    "name": "Promotion Criteria"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-2-2",
                "name": "Succession Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-2-2-1",
                    "name": "Talent Pools"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-2-2-2",
                    "name": "9-Box Grid Mapping"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-2-2-3",
                    "name": "Critical Role Backfills"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-2-3",
                "name": "High-Potential Identification",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-2-3-1",
                    "name": "HiPo Assessments"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-2-3-2",
                    "name": "Accelerated Leadership Tracks"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-2-4",
                "name": "Mentorship Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-2-4-1",
                    "name": "Peer Matching"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-2-4-2",
                    "name": "Goal Cadence Tracking"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-2-5",
                "name": "Internal Talent Marketplace",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-2-5-1",
                    "name": "Internal Job Postings"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-2-5-2",
                    "name": "Cross-department Gigs"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-6-4-3",
            "name": "Performance Management (Advanced)",
            "subModules": [
              {
                "id": "sub-mod-type-6-4-3-1",
                "name": "Continuous Feedback",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-3-1-1",
                    "name": "Pulse Check-ins"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-3-1-2",
                    "name": "Real-time Peer Kudos"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-3-2",
                "name": "360-Degree Feedback",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-3-2-1",
                    "name": "Multi-rater Evaluations"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-3-2-2",
                    "name": "Manager Reviews"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-3-2-3",
                    "name": "Subordinate Upward Feedback"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-3-3",
                "name": "Goal Setting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-3-3-1",
                    "name": "OKRs Alignment"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-3-3-2",
                    "name": "KPI Quantitative Targets"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-3-3-3",
                    "name": "SMART Goals"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-3-4",
                "name": "Performance Improvement Plans",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-3-4-1",
                    "name": "PIP Timelines"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-3-4-2",
                    "name": "Remediation Milestones"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-3-5",
                "name": "Calibration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-3-5-1",
                    "name": "Rating Distribution Normalization"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-3-5-2",
                    "name": "Bell Curve Alignment"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-6-4-4",
            "name": "Rewards & Recognition",
            "subModules": [
              {
                "id": "sub-mod-type-6-4-4-1",
                "name": "Compensation Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-4-1-1",
                    "name": "Salary Bands"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-4-1-2",
                    "name": "Market Benchmarking"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-4-1-3",
                    "name": "Merit Matrix"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-4-2",
                "name": "Total Rewards Statements",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-4-2-1",
                    "name": "Annual Benefit Breakdown"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-4-2-2",
                    "name": "Equity Valuation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-4-3",
                "name": "Merit and Bonus Cycles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-4-3-1",
                    "name": "Discretionary Pool Allocation"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-4-3-2",
                    "name": "Formulaic Bonuses"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-4-4",
                "name": "Long-Term Incentives",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-4-4-1",
                    "name": "Restricted Stock Units (RSUs)"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-4-4-2",
                    "name": "Stock Options (ESOPs)"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-4-4-3",
                    "name": "Vesting Schedules"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-4-5",
                "name": "Peer-to-Peer Recognition",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-4-5-1",
                    "name": "Digital Badges"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-4-5-2",
                    "name": "Spot Monetary Rewards"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-4-5-3",
                    "name": "Wall of Fame"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-6-4-5",
            "name": "HR Operations",
            "subModules": [
              {
                "id": "sub-mod-type-6-4-5-1",
                "name": "Employee Central",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-5-1-1",
                    "name": "Core Master Data"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-5-1-2",
                    "name": "Org Hierarchy Visualization"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-5-1-3",
                    "name": "Global Employee Profiles"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-5-2",
                "name": "Employee Lifecycle",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-5-2-1",
                    "name": "Paperless Onboarding"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-5-2-2",
                    "name": "Internal Transfers"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-5-2-3",
                    "name": "Offboarding Clearance"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-5-3",
                "name": "Document Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-5-3-1",
                    "name": "Digital Personnel Files"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-5-3-2",
                    "name": "Employment Contracts"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-5-3-3",
                    "name": "Credential Verification"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-5-4",
                "name": "Workflow Automation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-5-4-1",
                    "name": "Multi-level Approval Chains"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-5-4-2",
                    "name": "SLA Breach Escalations"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-6-4-6",
            "name": "Workforce Planning",
            "subModules": [
              {
                "id": "sub-mod-type-6-4-6-1",
                "name": "Headcount Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-6-1-1",
                    "name": "Approved Requisition Budgets"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-6-1-2",
                    "name": "Growth Forecasts"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-6-2",
                "name": "Budgeting & Forecasting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-6-2-1",
                    "name": "Payroll Cost Projections"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-6-2-2",
                    "name": "Contractor Cost Modeling"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-6-3",
                "name": "Skills Gap Analysis",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-6-3-1",
                    "name": "Future Skill Demands"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-6-3-2",
                    "name": "Reskilling Curricula"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-6-4",
                "name": "Diversity, Equity & Inclusion (DEI)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-6-4-1",
                    "name": "Gender Parity Metrics"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-6-4-2",
                    "name": "Equal Pay Auditing"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-6-4-7",
            "name": "Analytics & Reporting",
            "subModules": [
              {
                "id": "sub-mod-type-6-4-7-1",
                "name": "HR Executive Dashboard",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-7-1-1",
                    "name": "Headcount Movement"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-7-1-2",
                    "name": "Voluntary Attrition %"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-7-1-3",
                    "name": "Span of Control"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-7-2",
                "name": "Turnover Analysis",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-7-2-1",
                    "name": "Regrettable Leavers"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-7-2-2",
                    "name": "Exit Interview Feedback Themes"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-7-3",
                "name": "Hiring Funnel Analytics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-7-3-1",
                    "name": "Time-to-Hire by Dept"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-7-3-2",
                    "name": "Source Channel Effectiveness"
                  }
                ]
              },
              {
                "id": "sub-mod-type-6-4-7-4",
                "name": "Workforce Productivity",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-6-4-7-4-1",
                    "name": "Revenue per Employee"
                  },
                  {
                    "id": "ss-sub-mod-type-6-4-7-4-2",
                    "name": "Absence & Overtime Trends"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-7",
    "code": "7",
    "name": "MANUFACTURING & INDUSTRIAL",
    "description": "Manufacturing ERP, Bill of Materials (BOM), and Production Scheduling",
    "productTypes": [
      {
        "id": "type-7-1",
        "name": "Manufacturing ERP",
        "mainModules": [
          {
            "id": "mod-7-1-1",
            "name": "Production Planning",
            "subModules": [
              {
                "id": "sub-7-1-1-1",
                "name": "MRP & Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-7-1-1-1-1",
                    "name": "Material Requirements Planning"
                  },
                  {
                    "id": "ss-7-1-1-1-2",
                    "name": "Capacity Planning"
                  },
                  {
                    "id": "ss-7-1-1-1-3",
                    "name": "JIT / Batch"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-7-1-2",
            "name": "BOM Management",
            "subModules": [
              {
                "id": "sub-7-1-2-1",
                "name": "Structure",
                "subSubModules": [
                  {
                    "id": "ss-7-1-2-1-1",
                    "name": "Multi-level BOM"
                  },
                  {
                    "id": "ss-7-1-2-1-2",
                    "name": "Alternative parts"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-7-1-3",
            "name": "Manufacturing Execution (MES)",
            "subModules": [
              {
                "id": "sub-7-1-3-1",
                "name": "Tracking",
                "subSubModules": [
                  {
                    "id": "ss-7-1-3-1-1",
                    "name": "Real-time OEE"
                  },
                  {
                    "id": "ss-7-1-3-1-2",
                    "name": "Serial/Batch tracking"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-7-2",
        "name": "Bill of Materials (BOM)",
        "mainModules": [
          {
            "id": "mod-7-2-1",
            "name": "BOM Creation",
            "subModules": [
              {
                "id": "sub-7-2-1-1",
                "name": "Types",
                "subSubModules": [
                  {
                    "id": "ss-7-2-1-1-1",
                    "name": "Single-level"
                  },
                  {
                    "id": "ss-7-2-1-1-2",
                    "name": "Multi-level"
                  },
                  {
                    "id": "ss-7-2-1-1-3",
                    "name": "Configurable"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-7-2-2",
            "name": "Revision Control",
            "subModules": [
              {
                "id": "sub-7-2-2-1",
                "name": "Version & Approval",
                "subSubModules": [
                  {
                    "id": "ss-7-2-2-1-1",
                    "name": "Major/Minor revision"
                  },
                  {
                    "id": "ss-7-2-2-1-2",
                    "name": "Release approval"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-7-3",
        "name": "Production Scheduling",
        "mainModules": [
          {
            "id": "mod-7-3-1",
            "name": "Scheduling Methods",
            "subModules": [
              {
                "id": "sub-7-3-1-1",
                "name": "Logic",
                "subSubModules": [
                  {
                    "id": "ss-7-3-1-1-1",
                    "name": "Forward scheduling"
                  },
                  {
                    "id": "ss-7-3-1-1-2",
                    "name": "Backward scheduling"
                  },
                  {
                    "id": "ss-7-3-1-1-3",
                    "name": "Gantt drag-and-drop"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-7-4",
        "name": "Manufacturing Operations Management (MOM)",
        "mainModules": [
          {
            "id": "mod-type-7-4-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-7-4-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-1-1-2",
                    "name": "Biometric Terminal"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-1-1-3",
                    "name": "RFID Smart Badge"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-1-2-1",
                    "name": "Plant Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-1-2-2",
                    "name": "Production Supervisor"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-1-2-3",
                    "name": "Machine Operator"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-1-2-4",
                    "name": "Quality Inspector"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-1-2-5",
                    "name": "Maintenance Tech"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-7-4-2",
            "name": "Production Scheduling (Enhanced)",
            "subModules": [
              {
                "id": "sub-mod-type-7-4-2-1",
                "name": "Finite Capacity Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-2-1-1",
                    "name": "Bottleneck Workcenter Constraints"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-2-1-2",
                    "name": "Setup Time Optimization"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-2-2",
                "name": "Resource Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-2-2-1",
                    "name": "Labor Shift Skills"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-2-2-2",
                    "name": "Tooling & Die Allocation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-2-3",
                "name": "Real-Time Work Order Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-2-3-1",
                    "name": "Live Progress Percentage"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-2-3-2",
                    "name": "Material Shortage Flags"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-2-4",
                "name": "Shift Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-2-4-1",
                    "name": "Rotational Crew Rosters"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-2-4-2",
                    "name": "Shift Handover Logs"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-7-4-3",
            "name": "Manufacturing Execution (MES)",
            "subModules": [
              {
                "id": "sub-mod-type-7-4-3-1",
                "name": "Work Order Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-3-1-1",
                    "name": "Order Dispatch"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-3-1-2",
                    "name": "Workcenter Release"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-3-1-3",
                    "name": "Job Closure"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-3-2",
                "name": "Production Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-3-2-1",
                    "name": "Serialized Unit Traceability"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-3-2-2",
                    "name": "Lot Genealogy (Raw to Finished)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-3-3",
                "name": "Operator Guidance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-3-3-1",
                    "name": "Digital Interactive SOPs"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-3-3-2",
                    "name": "Engineering Change Notices (ECN)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-3-4",
                "name": "Data Collection",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-3-4-1",
                    "name": "Machine PLC / IIoT Telemetry"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-3-4-2",
                    "name": "Cycle Counter Integration"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-3-5",
                "name": "Labor Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-3-5-1",
                    "name": "Direct vs Indirect Labor"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-3-5-2",
                    "name": "Standard vs Actual Hours"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-7-4-4",
            "name": "Quality Management (Enhanced)",
            "subModules": [
              {
                "id": "sub-mod-type-7-4-4-1",
                "name": "Statistical Process Control (SPC)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-4-1-1",
                    "name": "X-bar & R Charts"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-4-1-2",
                    "name": "Cp/Cpk Capability Indices"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-4-2",
                "name": "Real-Time Defect Detection",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-4-2-1",
                    "name": "Computer Vision Inspection"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-4-2-2",
                    "name": "Inline Sensor Interlocks"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-4-3",
                "name": "Out-of-Tolerance Alerts",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-4-3-1",
                    "name": "Automated Line Stoppage"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-4-3-2",
                    "name": "Visual Andon Lights"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-4-4",
                "name": "Non-Conformance Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-4-4-1",
                    "name": "Digital NCR Generation"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-4-4-2",
                    "name": "8D Root Cause CAPA"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-4-5",
                "name": "Audit Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-4-5-1",
                    "name": "Shift Quality Checklists"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-4-5-2",
                    "name": "ISO 9001 / IATF 16949 Audits"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-7-4-5",
            "name": "Inventory & Warehouse (Enhanced)",
            "subModules": [
              {
                "id": "sub-mod-type-7-4-5-1",
                "name": "WMS Integration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-5-1-1",
                    "name": "Automated Staging Buffers"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-5-1-2",
                    "name": "Line-side Replenishment"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-5-2",
                "name": "Material Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-5-2-1",
                    "name": "Raw Material Batch Barcoding"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-5-2-2",
                    "name": "WIP Movement Validation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-5-3",
                "name": "Kanban Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-5-3-1",
                    "name": "Electronic E-Kanban"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-5-3-2",
                    "name": "Supplier Direct Pull Signals"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-5-4",
                "name": "Cycle Counting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-5-4-1",
                    "name": "ABC Floor Audits"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-5-4-2",
                    "name": "Physical Inventory Reconciliation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-7-4-6",
            "name": "Maintenance Management (EAM)",
            "subModules": [
              {
                "id": "sub-mod-type-7-4-6-1",
                "name": "Asset Performance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-6-1-1",
                    "name": "Condition Monitoring"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-6-1-2",
                    "name": "Vibration & Thermal Telemetry"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-6-2",
                "name": "Predictive Maintenance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-6-2-1",
                    "name": "Machine Learning Wear Prediction"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-6-2-2",
                    "name": "Failure Signature Detection"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-6-3",
                "name": "Work Order Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-6-3-1",
                    "name": "Emergency Breakdown Dispatch"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-6-3-2",
                    "name": "Preventive Maintenance PMs"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-6-4",
                "name": "Spare Parts Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-6-4-1",
                    "name": "Critical Spares Min-Max"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-6-4-2",
                    "name": "Tool Crib Check-in/out"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-7-4-7",
            "name": "Performance & Analytics",
            "subModules": [
              {
                "id": "sub-mod-type-7-4-7-1",
                "name": "OEE Dashboard",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-7-1-1",
                    "name": "Overall Equipment Effectiveness (OEE)"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-7-1-2",
                    "name": "Availability / Performance / Quality %"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-7-2",
                "name": "Yield Analysis",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-7-2-1",
                    "name": "First Pass Yield (FPY)"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-7-2-2",
                    "name": "Scrap Cost Analysis"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-7-3",
                "name": "Downtime Analysis",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-7-3-1",
                    "name": "Pareto Breakdown Causes"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-7-3-2",
                    "name": "MTBF & MTTR Metrics"
                  }
                ]
              },
              {
                "id": "sub-mod-type-7-4-7-4",
                "name": "Performance Trends",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-7-4-7-4-1",
                    "name": "Line Balancing"
                  },
                  {
                    "id": "ss-sub-mod-type-7-4-7-4-2",
                    "name": "Throughput Velocity"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-8",
    "code": "8",
    "name": "INVENTORY & WAREHOUSE",
    "description": "Inventory management, barcode tracking, and warehouse management systems (WMS)",
    "productTypes": [
      {
        "id": "type-8-1",
        "name": "Inventory Management",
        "mainModules": [
          {
            "id": "mod-8-1-1",
            "name": "Product Master",
            "subModules": [
              {
                "id": "sub-8-1-1-1",
                "name": "Types & Attributes",
                "subSubModules": [
                  {
                    "id": "ss-8-1-1-1-1",
                    "name": "Raw Material"
                  },
                  {
                    "id": "ss-8-1-1-1-2",
                    "name": "Finished Goods"
                  },
                  {
                    "id": "ss-8-1-1-1-3",
                    "name": "SKU dimensions/weights"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-8-1-2",
            "name": "Stock Management",
            "subModules": [
              {
                "id": "sub-8-1-2-1",
                "name": "Tracking",
                "subSubModules": [
                  {
                    "id": "ss-8-1-2-1-1",
                    "name": "Real-time stock"
                  },
                  {
                    "id": "ss-8-1-2-1-2",
                    "name": "FIFO/LIFO Valuation"
                  },
                  {
                    "id": "ss-8-1-2-1-3",
                    "name": "Batch / Expiry dates"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-8-1-3",
            "name": "Barcode/QR",
            "subModules": [
              {
                "id": "sub-8-1-3-1",
                "name": "Scanning & Labels",
                "subSubModules": [
                  {
                    "id": "ss-8-1-3-1-1",
                    "name": "QR code generation"
                  },
                  {
                    "id": "ss-8-1-3-1-2",
                    "name": "Handheld scanner sync"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-8-2",
        "name": "Warehouse Management System (WMS)",
        "mainModules": [
          {
            "id": "mod-8-2-1",
            "name": "Receiving & Putaway",
            "subModules": [
              {
                "id": "sub-8-2-1-1",
                "name": "ASN & Inspection",
                "subSubModules": [
                  {
                    "id": "ss-8-2-1-1-1",
                    "name": "Advance Shipping Notice"
                  },
                  {
                    "id": "ss-8-2-1-1-2",
                    "name": "Best bin putaway algorithm"
                  },
                  {
                    "id": "ss-8-2-1-1-3",
                    "name": "GRN Generation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-8-2-2",
            "name": "Picking & Packing",
            "subModules": [
              {
                "id": "sub-8-2-2-1",
                "name": "Fulfillment",
                "subSubModules": [
                  {
                    "id": "ss-8-2-2-1-1",
                    "name": "Wave picking"
                  },
                  {
                    "id": "ss-8-2-2-1-2",
                    "name": "Zone picking"
                  },
                  {
                    "id": "ss-8-2-2-1-3",
                    "name": "Packing validation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-8-2-3",
            "name": "Shipping & Carriers",
            "subModules": [
              {
                "id": "sub-8-2-3-1",
                "name": "Logistics Sync",
                "subSubModules": [
                  {
                    "id": "ss-8-2-3-1-1",
                    "name": "FedEx / Blue Dart / Delhivery"
                  },
                  {
                    "id": "ss-8-2-3-1-2",
                    "name": "Proof of Delivery"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-9",
    "code": "9",
    "name": "SUPPLY CHAIN & LOGISTICS",
    "description": "End-to-end SCM, vendor procurement, and real-time fleet GPS management",
    "productTypes": [
      {
        "id": "type-9-1",
        "name": "Supply Chain Management (SCM)",
        "mainModules": [
          {
            "id": "mod-9-1-1",
            "name": "Supplier Management",
            "subModules": [
              {
                "id": "sub-9-1-1-1",
                "name": "Onboarding & Scorecards",
                "subSubModules": [
                  {
                    "id": "ss-9-1-1-1-1",
                    "name": "Vendor KYC"
                  },
                  {
                    "id": "ss-9-1-1-1-2",
                    "name": "Performance Scorecard"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-9-1-2",
            "name": "Demand Forecasting",
            "subModules": [
              {
                "id": "sub-9-1-2-1",
                "name": "Forecasting Models",
                "subSubModules": [
                  {
                    "id": "ss-9-1-2-1-1",
                    "name": "AI/ML Time series"
                  },
                  {
                    "id": "ss-9-1-2-1-2",
                    "name": "Seasonality analysis"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-9-1-3",
            "name": "Inventory Optimization",
            "subModules": [
              {
                "id": "sub-9-1-3-1",
                "name": "Optimization",
                "subSubModules": [
                  {
                    "id": "ss-9-1-3-1-1",
                    "name": "Safety Stock calculation"
                  },
                  {
                    "id": "ss-9-1-3-1-2",
                    "name": "EOQ Economic Order Qty"
                  },
                  {
                    "id": "ss-9-1-3-1-3",
                    "name": "ABC Classification"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-9-2",
        "name": "Fleet Management",
        "mainModules": [
          {
            "id": "mod-9-2-1",
            "name": "Vehicle & GPS Tracking",
            "subModules": [
              {
                "id": "sub-9-2-1-1",
                "name": "Live Tracking",
                "subSubModules": [
                  {
                    "id": "ss-9-2-1-1-1",
                    "name": "Real-time GPS"
                  },
                  {
                    "id": "ss-9-2-1-1-2",
                    "name": "Geofencing alerts"
                  },
                  {
                    "id": "ss-9-2-1-1-3",
                    "name": "Route history replay"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-9-2-2",
            "name": "Driver & Fuel Management",
            "subModules": [
              {
                "id": "sub-9-2-2-1",
                "name": "Operations",
                "subSubModules": [
                  {
                    "id": "ss-9-2-2-1-1",
                    "name": "Driver roster"
                  },
                  {
                    "id": "ss-9-2-2-1-2",
                    "name": "Fuel tracking & theft alerts"
                  },
                  {
                    "id": "ss-9-2-2-1-3",
                    "name": "Route optimization"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-9-3",
        "name": "Fleet & Logistics Management (Expanded)",
        "mainModules": [
          {
            "id": "mod-type-9-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-9-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-1-1-2",
                    "name": "SSO"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-1-1-3",
                    "name": "Driver Mobile OTP"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-1-2-1",
                    "name": "Fleet Director"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-1-2-2",
                    "name": "Dispatcher"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-1-2-3",
                    "name": "Commercial Driver"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-1-2-4",
                    "name": "Safety Officer"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-1-2-5",
                    "name": "Mechanic"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-9-3-2",
            "name": "Vehicle Management",
            "subModules": [
              {
                "id": "sub-mod-type-9-3-2-1",
                "name": "Vehicle Profiles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-2-1-1",
                    "name": "VIN & Chassis"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-2-1-2",
                    "name": "Axle Weight Capacity"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-2-1-3",
                    "name": "Reefer Telemetry"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-2-1-4",
                    "name": "Engine Hours"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-2-2",
                "name": "Registration & Permits",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-2-2-1",
                    "name": "National Permits"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-2-2-2",
                    "name": "Pollution (PUC)"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-2-2-3",
                    "name": "Fitness Certificates"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-2-3",
                "name": "Insurance Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-2-3-1",
                    "name": "Comprehensive Fleet Policies"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-2-3-2",
                    "name": "Accident Claims History"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-2-4",
                "name": "Maintenance Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-2-4-1",
                    "name": "Mileage-based Oil Changes"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-2-4-2",
                    "name": "Tire Rotation Cycles"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-9-3-3",
            "name": "Driver Management",
            "subModules": [
              {
                "id": "sub-mod-type-9-3-3-1",
                "name": "Driver Profiles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-3-1-1",
                    "name": "Commercial Heavy Vehicle License"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-3-1-2",
                    "name": "Medical Fitness Exams"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-3-2",
                "name": "Safety Monitoring",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-3-2-1",
                    "name": "Harsh Braking Telemetry"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-3-2-2",
                    "name": "Speeding Violations"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-3-2-3",
                    "name": "Engine Idling"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-3-3",
                "name": "Hours of Service (HOS)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-3-3-1",
                    "name": "ELD (Electronic Logging Device)"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-3-3-2",
                    "name": "Mandatory Rest Intervals"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-3-4",
                "name": "Driver Scorecards",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-3-4-1",
                    "name": "Fuel Efficiency Scores"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-3-4-2",
                    "name": "Safety Bonus Incentives"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-9-3-4",
            "name": "Route & Dispatch",
            "subModules": [
              {
                "id": "sub-mod-type-9-3-4-1",
                "name": "Route Optimization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-4-1-1",
                    "name": "Multi-drop Sequence"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-4-1-2",
                    "name": "Toll vs Distance Optimization"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-4-1-3",
                    "name": "Low-bridge Avoidance"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-4-2",
                "name": "Real-Time Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-4-2-1",
                    "name": "1-Second GPS Telemetry"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-4-2-2",
                    "name": "Cellular & Satellite Backup"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-4-3",
                "name": "Automated Dispatch",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-4-3-1",
                    "name": "Nearest Available Vehicle"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-4-3-2",
                    "name": "Payload Weight & Volume Matching"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-4-4",
                "name": "Proof of Delivery (ePOD)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-4-4-1",
                    "name": "Digital Signature on Glass"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-4-4-2",
                    "name": "Geotagged Photo Verification"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-4-5",
                "name": "Reverse Logistics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-4-5-1",
                    "name": "Empty Pallet Exchange"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-4-5-2",
                    "name": "Customer Return Pickup"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-9-3-5",
            "name": "Fuel Management",
            "subModules": [
              {
                "id": "sub-mod-type-9-3-5-1",
                "name": "Fuel Sensor Telemetry",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-5-1-1",
                    "name": "Tank Level Ultrasonic Sensors"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-5-1-2",
                    "name": "Real-time Consumption Rates"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-5-2",
                "name": "Fuel Card Integration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-5-2-1",
                    "name": "Direct Oil Company Card Sync"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-5-2-2",
                    "name": "POS Geolocation Cross-check"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-5-3",
                "name": "Theft Detection",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-5-3-1",
                    "name": "Rapid Fuel Drop Alarms"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-5-3-2",
                    "name": "Unauthorized Siphoning Alerts"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-5-4",
                "name": "Fuel Efficiency Analytics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-5-4-1",
                    "name": "Km per Liter Benchmarking"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-5-4-2",
                    "name": "Driver Influence Analysis"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-9-3-6",
            "name": "Maintenance & Compliance",
            "subModules": [
              {
                "id": "sub-mod-type-9-3-6-1",
                "name": "Work Order Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-6-1-1",
                    "name": "Roadside Breakdown Dispatch"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-6-1-2",
                    "name": "Internal Workshop Jobs"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-6-2",
                "name": "Spare Parts Inventory",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-6-2-1",
                    "name": "Tire Serial Tracking"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-6-2-2",
                    "name": "Filter & Lubricant Stock"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-6-3",
                "name": "Warranty Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-6-3-1",
                    "name": "OEM Engine Warranty Claims"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-6-3-2",
                    "name": "Battery Replacements"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-9-3-7",
            "name": "Analytics & Reporting",
            "subModules": [
              {
                "id": "sub-mod-type-9-3-7-1",
                "name": "Fleet Utilization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-7-1-1",
                    "name": "Deadhead / Empty Miles %"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-7-1-2",
                    "name": "Vehicle Availability Rate"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-7-2",
                "name": "Total Cost per Km/Mile",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-7-2-1",
                    "name": "Fuel + Maintenance + Driver Cost Rollup"
                  }
                ]
              },
              {
                "id": "sub-mod-type-9-3-7-3",
                "name": "OTIF Compliance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-9-3-7-3-1",
                    "name": "On-Time In-Full Delivery Percentage"
                  },
                  {
                    "id": "ss-sub-mod-type-9-3-7-3-2",
                    "name": "Consignee Delay Causes"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-10",
    "code": "10",
    "name": "RETAIL & COMMERCE",
    "description": "Retail POS billing, shift reconciliation, barcode checkout, and store management",
    "productTypes": [
      {
        "id": "type-10-1",
        "name": "Retail POS",
        "mainModules": [
          {
            "id": "mod-10-1-1",
            "name": "Billing & Cash Counter",
            "subModules": [
              {
                "id": "sub-10-1-1-1",
                "name": "Checkout",
                "subSubModules": [
                  {
                    "id": "ss-10-1-1-1-1",
                    "name": "Barcode Scan sale"
                  },
                  {
                    "id": "ss-10-1-1-1-2",
                    "name": "Cash / Card / UPI / Split bill"
                  },
                  {
                    "id": "ss-10-1-1-1-3",
                    "name": "Discounts & BOGO"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-10-1-2",
            "name": "Shift & Offline Mode",
            "subModules": [
              {
                "id": "sub-10-1-2-1",
                "name": "Operations",
                "subSubModules": [
                  {
                    "id": "ss-10-1-2-1-1",
                    "name": "Z-Report / X-Report"
                  },
                  {
                    "id": "ss-10-1-2-1-2",
                    "name": "Offline billing queue"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-10-2",
        "name": "Store Management",
        "mainModules": [
          {
            "id": "mod-10-2-1",
            "name": "Department & Layout",
            "subModules": [
              {
                "id": "sub-10-2-1-1",
                "name": "Planogram",
                "subSubModules": [
                  {
                    "id": "ss-10-2-1-1-1",
                    "name": "Aisle / Shelf layout"
                  },
                  {
                    "id": "ss-10-2-1-1-2",
                    "name": "Dynamic pricing & tags"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-11",
    "code": "11",
    "name": "E-COMMERCE",
    "description": "Online storefronts, product catalogs, carts, payment gateways, and multi-vendor marketplaces",
    "productTypes": [
      {
        "id": "type-11-1",
        "name": "Online Store Platform",
        "mainModules": [
          {
            "id": "mod-11-1-1",
            "name": "Product Catalog",
            "subModules": [
              {
                "id": "sub-11-1-1-1",
                "name": "Products",
                "subSubModules": [
                  {
                    "id": "ss-11-1-1-1-1",
                    "name": "Simple & Variable Products"
                  },
                  {
                    "id": "ss-11-1-1-1-2",
                    "name": "Digital downloads"
                  },
                  {
                    "id": "ss-11-1-1-1-3",
                    "name": "360° view & images"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-11-1-2",
            "name": "Shopping Cart & Checkout",
            "subModules": [
              {
                "id": "sub-11-1-2-1",
                "name": "Cart & Pay",
                "subSubModules": [
                  {
                    "id": "ss-11-1-2-1-1",
                    "name": "Persistent cart"
                  },
                  {
                    "id": "ss-11-1-2-1-2",
                    "name": "Stripe/Razorpay online checkout"
                  },
                  {
                    "id": "ss-11-1-2-1-3",
                    "name": "COD & Wallets"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-11-1-3",
            "name": "Order & Returns",
            "subModules": [
              {
                "id": "sub-11-1-3-1",
                "name": "Fulfillment",
                "subSubModules": [
                  {
                    "id": "ss-11-1-3-1-1",
                    "name": "Order lifecycle tracking"
                  },
                  {
                    "id": "ss-11-1-3-1-2",
                    "name": "7/15/30-day returns"
                  },
                  {
                    "id": "ss-11-1-3-1-3",
                    "name": "Abandoned cart recovery"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-11-2",
        "name": "Multi-Vendor Marketplace",
        "mainModules": [
          {
            "id": "mod-11-2-1",
            "name": "Seller Dashboard",
            "subModules": [
              {
                "id": "sub-11-2-1-1",
                "name": "Seller Portal",
                "subSubModules": [
                  {
                    "id": "ss-11-2-1-1-1",
                    "name": "Seller KYC & Approval"
                  },
                  {
                    "id": "ss-11-2-1-1-2",
                    "name": "Vendor product management"
                  },
                  {
                    "id": "ss-11-2-1-1-3",
                    "name": "Payout requests"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-11-2-2",
            "name": "Commission & Split Payouts",
            "subModules": [
              {
                "id": "sub-11-2-2-1",
                "name": "Commission",
                "subSubModules": [
                  {
                    "id": "ss-11-2-2-1-1",
                    "name": "Fixed / Percentage commission"
                  },
                  {
                    "id": "ss-11-2-2-1-2",
                    "name": "Multi-vendor cart split"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-12",
    "code": "12",
    "name": "HEALTHCARE",
    "description": "Hospital management, electronic health records (EMR/EHR), and telemedicine platforms",
    "productTypes": [
      {
        "id": "type-12-1",
        "name": "Hospital Management System",
        "mainModules": [
          {
            "id": "mod-12-1-1",
            "name": "Patient Management & EMR",
            "subModules": [
              {
                "id": "sub-12-1-1-1",
                "name": "Records",
                "subSubModules": [
                  {
                    "id": "ss-12-1-1-1-1",
                    "name": "OPD/IPD Registration"
                  },
                  {
                    "id": "ss-12-1-1-1-2",
                    "name": "EMR / EHR records"
                  },
                  {
                    "id": "ss-12-1-1-1-3",
                    "name": "Radiology DICOM & Lab tests"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-12-1-2",
            "name": "Pharmacy & Ward Management",
            "subModules": [
              {
                "id": "sub-12-1-2-1",
                "name": "Operations",
                "subSubModules": [
                  {
                    "id": "ss-12-1-2-1-1",
                    "name": "E-prescription dispensing"
                  },
                  {
                    "id": "ss-12-1-2-1-2",
                    "name": "ICU / Bed allocation"
                  },
                  {
                    "id": "ss-12-1-2-1-3",
                    "name": "Operation Theatre scheduling"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-12-2",
        "name": "Telemedicine Platform",
        "mainModules": [
          {
            "id": "mod-12-2-1",
            "name": "Consultation & Prescription",
            "subModules": [
              {
                "id": "sub-12-2-1-1",
                "name": "Video / Chat",
                "subSubModules": [
                  {
                    "id": "ss-12-2-1-1-1",
                    "name": "WebRTC HD video consult"
                  },
                  {
                    "id": "ss-12-2-1-1-2",
                    "name": "Digital e-Prescription"
                  },
                  {
                    "id": "ss-12-2-1-1-3",
                    "name": "Direct pharmacy integration"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-12-3",
        "name": "Vet & Pet Care Management",
        "mainModules": [
          {
            "id": "mod-type-12-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-12-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-1-1-2",
                    "name": "Pet Parent Mobile OTP"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-1-1-3",
                    "name": "Biometric"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-1-2-1",
                    "name": "Veterinarian"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-1-2-2",
                    "name": "Veterinary Nurse"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-1-2-3",
                    "name": "Receptionist"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-1-2-4",
                    "name": "Groomer"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-1-2-5",
                    "name": "Pet Parent"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-3-2",
            "name": "Pet Profile & Medical History",
            "subModules": [
              {
                "id": "sub-mod-type-12-3-2-1",
                "name": "Patient Records",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-2-1-1",
                    "name": "Species & Breed"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-2-1-2",
                    "name": "Weight History Graphs"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-2-1-3",
                    "name": "Chronic Illnesses & Allergies"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-2-2",
                "name": "Vaccination Tracker",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-2-2-1",
                    "name": "Core Vaccines (Rabies/DHPP/FVRCP)"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-2-2-2",
                    "name": "Automated Due Reminders"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-2-3",
                "name": "Microchip & Identification",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-2-3-1",
                    "name": "Microchip ID Registry"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-2-3-2",
                    "name": "City License Registration"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-2-4",
                "name": "Dietary & Temperament Notes",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-2-4-1",
                    "name": "Prescription Diet Plans"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-2-4-2",
                    "name": "Aggression / Anxiety Flags"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-3-3",
            "name": "Appointment & Visit Scheduling",
            "subModules": [
              {
                "id": "sub-mod-type-12-3-3-1",
                "name": "Online Booking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-3-1-1",
                    "name": "Wellness Checks"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-3-1-2",
                    "name": "Vaccinations"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-3-1-3",
                    "name": "Dental Cleaning"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-3-1-4",
                    "name": "Surgery"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-3-2",
                "name": "Vet Calendars",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-3-2-1",
                    "name": "Species Specialization (Small Animal/Avian/Equine)"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-3-2-2",
                    "name": "Buffer Intervals"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-3-3",
                "name": "Emergency Triage",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-3-3-1",
                    "name": "Critical Admission Triage"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-3-3-2",
                    "name": "ICU Oxygen Kennel Assignment"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-3-4",
                "name": "Tele-Vet Consultations",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-3-4-1",
                    "name": "Video Call Consultations"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-3-4-2",
                    "name": "Follow-up Chat Support"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-3-4",
            "name": "Clinical Treatment & Hospitalization",
            "subModules": [
              {
                "id": "sub-mod-type-12-3-4-1",
                "name": "SOAP Medical Notes",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-4-1-1",
                    "name": "Subjective"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-4-1-2",
                    "name": "Objective Vitals"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-4-1-3",
                    "name": "Assessment"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-4-1-4",
                    "name": "Treatment Plan"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-4-2",
                "name": "In-patient Hospitalization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-4-2-1",
                    "name": "IV Fluid Flow Rates"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-4-2-2",
                    "name": "Scheduled Medication Administrations"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-4-3",
                "name": "Surgical Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-4-3-1",
                    "name": "Pre-anesthetic Bloodwork"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-4-3-2",
                    "name": "Anesthesia Monitoring Logs"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-4-4",
                "name": "Boarding & Kennels",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-4-4-1",
                    "name": "Cage Allocation"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-4-4-2",
                    "name": "Feeding Schedules"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-4-4-3",
                    "name": "Exercise Logs"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-3-5",
            "name": "Pharmacy & Inventory",
            "subModules": [
              {
                "id": "sub-mod-type-12-3-5-1",
                "name": "Veterinary Rx Dispensing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-5-1-1",
                    "name": "Controlled Substance Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-5-1-2",
                    "name": "Dose-by-Weight Calculations"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-5-2",
                "name": "Diagnostics & Consumables",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-5-2-1",
                    "name": "Rapid In-house Test Kits"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-5-2-2",
                    "name": "Surgical Sutures & Syringes"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-5-3",
                "name": "Specialty Diets Stock",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-5-3-1",
                    "name": "Prescription Pet Food"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-5-3-2",
                    "name": "Batch Expiry Control"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-3-6",
            "name": "Invoicing & Pet Insurance",
            "subModules": [
              {
                "id": "sub-mod-type-12-3-6-1",
                "name": "Itemized Billing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-6-1-1",
                    "name": "Lab Tests"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-6-1-2",
                    "name": "Medications"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-6-1-3",
                    "name": "Hospital Stay Per Day"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-6-1-4",
                    "name": "Procedures"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-6-2",
                "name": "Pet Insurance Claims",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-6-2-1",
                    "name": "Direct Claim Submission"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-6-2-2",
                    "name": "Pre-authorization Paperwork"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-6-3",
                "name": "Wellness Preventive Plans",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-6-3-1",
                    "name": "Annual Puppy/Senior Health Packages"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-6-3-2",
                    "name": "Monthly Payments"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-3-7",
            "name": "Analytics & Reports",
            "subModules": [
              {
                "id": "sub-mod-type-12-3-7-1",
                "name": "Clinical Metrics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-7-1-1",
                    "name": "Vaccination Adherence Rates"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-7-1-2",
                    "name": "Surgery Outcomes"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-3-7-2",
                "name": "Practice Revenue",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-3-7-2-1",
                    "name": "Service Revenue vs Pharmacy Retail"
                  },
                  {
                    "id": "ss-sub-mod-type-12-3-7-2-2",
                    "name": "Client Retention %"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-12-4",
        "name": "Pharmacy & Drugstore Retail Management",
        "mainModules": [
          {
            "id": "mod-type-12-4-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-12-4-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-1-1-1",
                    "name": "Licensed Pharmacist Credentials"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-1-1-2",
                    "name": "Cashier PIN"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-1-1-3",
                    "name": "Manager Auth"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-4-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-1-2-1",
                    "name": "Registered Pharmacist"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-1-2-2",
                    "name": "Pharmacy Technician"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-1-2-3",
                    "name": "Store Cashier"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-1-2-4",
                    "name": "Audit Officer"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-4-2",
            "name": "Prescription Dispensing",
            "subModules": [
              {
                "id": "sub-mod-type-12-4-2-1",
                "name": "e-Prescription Verification",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-2-1-1",
                    "name": "Doctor Digital Signature Validation"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-2-1-2",
                    "name": "Drug-to-Drug Interaction Warnings"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-4-2-2",
                "name": "Controlled Narcotics Log",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-2-2-1",
                    "name": "Schedule H/X Strict Batch Tracking"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-2-2-2",
                    "name": "Patient National ID Capture"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-4-2-3",
                "name": "Refill Automation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-2-3-1",
                    "name": "Chronic Medication Auto-sync"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-2-3-2",
                    "name": "SMS Refill Reminders"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-4-3",
            "name": "Batch, Expiry & Cold Chain",
            "subModules": [
              {
                "id": "sub-mod-type-12-4-3-1",
                "name": "Near-Expiry Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-3-1-1",
                    "name": "Automated Shelf Markdown"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-3-1-2",
                    "name": "Return to Vendor (RTV) Workflows"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-4-3-2",
                "name": "Cold-Chain Temperature Logs",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-3-2-1",
                    "name": "Insulin & Vaccine 2-8°C Sensor Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-3-2-2",
                    "name": "Excursion Alarms"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-4-3-3",
                "name": "Serial Barcode Verification",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-3-3-1",
                    "name": "Distributor Batch Traceability"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-3-3-2",
                    "name": "Counterfeit Check"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-12-4-4",
            "name": "POS & Insurance Claims",
            "subModules": [
              {
                "id": "sub-mod-type-12-4-4-1",
                "name": "Pharmacy POS",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-4-1-1",
                    "name": "Generic Drug Alternative Suggestions"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-4-1-2",
                    "name": "OTC vs Rx Billing"
                  }
                ]
              },
              {
                "id": "sub-mod-type-12-4-4-2",
                "name": "Health Insurance Claims",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-12-4-4-2-1",
                    "name": "Instant TPA Pre-authorization"
                  },
                  {
                    "id": "ss-sub-mod-type-12-4-4-2-2",
                    "name": "Co-pay Deductible Calculations"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-13",
    "code": "13",
    "name": "EDUCATION",
    "description": "School / College ERP, automated timetable generation, and Learning Management Systems (LMS)",
    "productTypes": [
      {
        "id": "type-13-1",
        "name": "School ERP",
        "mainModules": [
          {
            "id": "mod-13-1-1",
            "name": "Student & Fee Management",
            "subModules": [
              {
                "id": "sub-13-1-1-1",
                "name": "Administration",
                "subSubModules": [
                  {
                    "id": "ss-13-1-1-1-1",
                    "name": "Admissions & TC"
                  },
                  {
                    "id": "ss-13-1-1-1-2",
                    "name": "Online fee payment & receipts"
                  },
                  {
                    "id": "ss-13-1-1-1-3",
                    "name": "Biometric / RFID Attendance"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-13-1-2",
            "name": "Academic & Parent Portal",
            "subModules": [
              {
                "id": "sub-13-1-2-1",
                "name": "Academics",
                "subSubModules": [
                  {
                    "id": "ss-13-1-2-1-1",
                    "name": "Examination gradebook"
                  },
                  {
                    "id": "ss-13-1-2-1-2",
                    "name": "Auto timetable scheduler"
                  },
                  {
                    "id": "ss-13-1-2-1-3",
                    "name": "Parent portal app"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-13-2",
        "name": "Learning Management System (LMS)",
        "mainModules": [
          {
            "id": "mod-13-2-1",
            "name": "Course & Content Management",
            "subModules": [
              {
                "id": "sub-13-2-1-1",
                "name": "Content",
                "subSubModules": [
                  {
                    "id": "ss-13-2-1-1-1",
                    "name": "Video lectures & SCORM"
                  },
                  {
                    "id": "ss-13-2-1-1-2",
                    "name": "Quiz builder & AI proctoring"
                  },
                  {
                    "id": "ss-13-2-1-1-3",
                    "name": "Automated certificates"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-13-3",
        "name": "Adaptive EdTech & Examination Platform",
        "mainModules": [
          {
            "id": "mod-type-13-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-13-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-1-1-1",
                    "name": "Student ID + Password"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-1-1-2",
                    "name": "Parent Phone OTP"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-1-1-3",
                    "name": "Teacher SSO"
                  }
                ]
              },
              {
                "id": "sub-mod-type-13-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-1-2-1",
                    "name": "Student Learner"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-1-2-2",
                    "name": "Educator / Mentor"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-1-2-3",
                    "name": "Exam Proctor"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-1-2-4",
                    "name": "Academic Dean"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-13-3-2",
            "name": "Adaptive Learning Engine",
            "subModules": [
              {
                "id": "sub-mod-type-13-3-2-1",
                "name": "Knowledge Graph Mapping",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-2-1-1",
                    "name": "Concept Prerequisite Dependencies"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-2-1-2",
                    "name": "Mastery Threshold Tracking"
                  }
                ]
              },
              {
                "id": "sub-mod-type-13-3-2-2",
                "name": "AI Question Recommendation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-2-2-1",
                    "name": "Dynamic Difficulty Adjustment (IRT)"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-2-2-2",
                    "name": "Personalized Revision Sets"
                  }
                ]
              },
              {
                "id": "sub-mod-type-13-3-2-3",
                "name": "Gamified Micro-Learning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-2-3-1",
                    "name": "Daily Learning Streaks"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-2-3-2",
                    "name": "Interactive Spaced Repetition Cards"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-13-3-3",
            "name": "High-Stakes Online Examination",
            "subModules": [
              {
                "id": "sub-mod-type-13-3-3-1",
                "name": "AI Remote Proctoring",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-3-1-1",
                    "name": "Webcam Multi-face & Gaze Tracking"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-3-1-2",
                    "name": "Ambient Audio Whisper Detection"
                  }
                ]
              },
              {
                "id": "sub-mod-type-13-3-3-2",
                "name": "Secure Lockdown Browser",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-3-2-1",
                    "name": "Clipboard & Screen Sharing Blocker"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-3-2-2",
                    "name": "Virtual Machine Detection"
                  }
                ]
              },
              {
                "id": "sub-mod-type-13-3-3-3",
                "name": "Question Bank & Security",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-3-3-1",
                    "name": "Dynamic Equation & Formula Editor"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-3-3-2",
                    "name": "Randomized Question & Option Shuffling"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-13-3-4",
            "name": "Academic Analytics & Parent Insights",
            "subModules": [
              {
                "id": "sub-mod-type-13-3-4-1",
                "name": "Student Performance Diagnostics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-4-1-1",
                    "name": "Weak Area Diagnostic Breakdown"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-4-1-2",
                    "name": "Projected Exam Score Curves"
                  }
                ]
              },
              {
                "id": "sub-mod-type-13-3-4-2",
                "name": "Automated Report Cards",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-13-3-4-2-1",
                    "name": "Competency-based PDF Generation"
                  },
                  {
                    "id": "ss-sub-mod-type-13-3-4-2-2",
                    "name": "Teacher Remarks Matrix"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-14",
    "code": "14",
    "name": "REAL ESTATE",
    "description": "Property management, unit booking, lease contracts, and builder construction ERP",
    "productTypes": [
      {
        "id": "type-14-1",
        "name": "Property Management",
        "mainModules": [
          {
            "id": "mod-14-1-1",
            "name": "Property & Rental Lifecycle",
            "subModules": [
              {
                "id": "sub-14-1-1-1",
                "name": "Management",
                "subSubModules": [
                  {
                    "id": "ss-14-1-1-1-1",
                    "name": "Residential & Commercial listing"
                  },
                  {
                    "id": "ss-14-1-1-1-2",
                    "name": "Lease agreements & rent collection"
                  },
                  {
                    "id": "ss-14-1-1-1-3",
                    "name": "Maintenance tickets"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-14-2",
        "name": "Builder ERP",
        "mainModules": [
          {
            "id": "mod-14-2-1",
            "name": "Project & Construction Planning",
            "subModules": [
              {
                "id": "sub-14-2-1-1",
                "name": "Phases",
                "subSubModules": [
                  {
                    "id": "ss-14-2-1-1-1",
                    "name": "Stage-wise construction (Foundation to Finish)"
                  },
                  {
                    "id": "ss-14-2-1-1-2",
                    "name": "Construction-linked payment plans"
                  },
                  {
                    "id": "ss-14-2-1-1-3",
                    "name": "Site material inventory"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-15",
    "code": "15",
    "name": "CONSTRUCTION",
    "description": "Construction ERP, Bill of Quantities (BOQ), tendering, and site management",
    "productTypes": [
      {
        "id": "type-15-1",
        "name": "Construction ERP",
        "mainModules": [
          {
            "id": "mod-15-1-1",
            "name": "BOQ & Tendering",
            "subModules": [
              {
                "id": "sub-15-1-1-1",
                "name": "Costing",
                "subSubModules": [
                  {
                    "id": "ss-15-1-1-1-1",
                    "name": "BOQ Materials / Labor estimation"
                  },
                  {
                    "id": "ss-15-1-1-1-2",
                    "name": "Subcontractor tendering"
                  },
                  {
                    "id": "ss-15-1-1-1-3",
                    "name": "RA Bills & Retainage"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-15-1-2",
            "name": "Site Management",
            "subModules": [
              {
                "id": "sub-15-1-2-1",
                "name": "Daily Log",
                "subSubModules": [
                  {
                    "id": "ss-15-1-2-1-1",
                    "name": "Daily progress reports with photos"
                  },
                  {
                    "id": "ss-15-1-2-1-2",
                    "name": "Heavy equipment GPS & hours"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-16",
    "code": "16",
    "name": "HOSPITALITY",
    "description": "Hotel room reservations, OTA channel managers, and restaurant KDS management",
    "productTypes": [
      {
        "id": "type-16-1",
        "name": "Hotel Management",
        "mainModules": [
          {
            "id": "mod-16-1-1",
            "name": "Reservation & Front Desk",
            "subModules": [
              {
                "id": "sub-16-1-1-1",
                "name": "Front Office",
                "subSubModules": [
                  {
                    "id": "ss-16-1-1-1-1",
                    "name": "Direct & OTA Booking sync"
                  },
                  {
                    "id": "ss-16-1-1-1-2",
                    "name": "ID verification & Check-in"
                  },
                  {
                    "id": "ss-16-1-1-1-3",
                    "name": "Dynamic pricing (RevPAR)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-16-1-2",
            "name": "Housekeeping & Room POS",
            "subModules": [
              {
                "id": "sub-16-1-2-1",
                "name": "Operations",
                "subSubModules": [
                  {
                    "id": "ss-16-1-2-1-1",
                    "name": "Room dirty/clean status"
                  },
                  {
                    "id": "ss-16-1-2-1-2",
                    "name": "Integrated Room POS & billing"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-16-2",
        "name": "Restaurant Management",
        "mainModules": [
          {
            "id": "mod-16-2-1",
            "name": "Table & Kitchen Management",
            "subModules": [
              {
                "id": "sub-16-2-1-1",
                "name": "KDS & Orders",
                "subSubModules": [
                  {
                    "id": "ss-16-2-1-1-1",
                    "name": "Visual floor plan & waitlist"
                  },
                  {
                    "id": "ss-16-2-1-1-2",
                    "name": "Kitchen Display Screen (KDS)"
                  },
                  {
                    "id": "ss-16-2-1-1-3",
                    "name": "Swiggy / Zomato order sync"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-16-3",
        "name": "Food & Beverage Management",
        "mainModules": [
          {
            "id": "mod-type-16-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-1-1-2",
                    "name": "Server PIN Code"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-1-1-3",
                    "name": "Fingerprint Scan"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-1-2-1",
                    "name": "Head Chef"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-1-2-2",
                    "name": "Bartender"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-1-2-3",
                    "name": "Waitstaff"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-1-2-4",
                    "name": "F&B Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-1-2-5",
                    "name": "Cashier"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-3-2",
            "name": "Menu Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-3-2-1",
                "name": "Item Database",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-2-1-1",
                    "name": "Ingredient Recipes"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-2-1-2",
                    "name": "Modifiers & Add-ons"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-2-1-3",
                    "name": "Allergen Disclaimers"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-2-2",
                "name": "Menu Engineering",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-2-2-1",
                    "name": "Gross Margin Matrix"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-2-2-2",
                    "name": "Stars / Plowhorses Classification"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-2-3",
                "name": "Menu Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-2-3-1",
                    "name": "Seasonal Tasting Menus"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-2-3-2",
                    "name": "Daily Chef Specials"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-2-4",
                "name": "Recipe Costing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-2-4-1",
                    "name": "Ingredient Cost Allocation"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-2-4-2",
                    "name": "Food Cost Percentage Tracking"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-3-3",
            "name": "Inventory Management (F&B)",
            "subModules": [
              {
                "id": "sub-mod-type-16-3-3-1",
                "name": "Purchasing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-3-1-1",
                    "name": "Par-level Automation"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-3-1-2",
                    "name": "Supplier Purchase Orders"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-3-2",
                "name": "Receiving",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-3-2-1",
                    "name": "Cold-chain Temperature Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-3-2-2",
                    "name": "Invoice Line Reconciliation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-3-3",
                "name": "Inventory Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-3-3-1",
                    "name": "FIFO / FEFO Shelf Rotation"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-3-3-2",
                    "name": "Dry / Cold Storage Tracking"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-3-4",
                "name": "Waste Control",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-3-4-1",
                    "name": "Kitchen Spoilage Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-3-4-2",
                    "name": "Portion Shrinkage Recording"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-3-4",
            "name": "Order & Table Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-3-4-1",
                "name": "Table Reservation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-4-1-1",
                    "name": "Interactive Floor Plan"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-4-1-2",
                    "name": "Cover Pacing Control"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-4-2",
                "name": "Table/Order Assignment",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-4-2-1",
                    "name": "Server Section Mapping"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-4-2-2",
                    "name": "Seat Number Ordering"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-4-3",
                "name": "KDS Integration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-4-3-1",
                    "name": "Kitchen Station Routing (Hot/Cold/Bar)"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-4-3-2",
                    "name": "Cook Time Timers"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-4-4",
                "name": "Order Status Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-4-4-1",
                    "name": "Fired"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-4-4-2",
                    "name": "Plated"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-4-4-3",
                    "name": "Expo Cleared"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-4-4-4",
                    "name": "Served"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-4-5",
                "name": "Table Turnover",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-4-5-1",
                    "name": "Average Dwell Duration"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-4-5-2",
                    "name": "Turn Velocity Alerts"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-3-5",
            "name": "Billing & Settlement",
            "subModules": [
              {
                "id": "sub-mod-type-16-3-5-1",
                "name": "Bill Splitting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-5-1-1",
                    "name": "Split Equally"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-1-2",
                    "name": "Split by Seat / Item"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-1-3",
                    "name": "Custom Amount Split"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-5-2",
                "name": "Tax Calculations",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-5-2-1",
                    "name": "Food GST / VAT"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-2-2",
                    "name": "Alcohol Excise Duty"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-2-3",
                    "name": "Service Charges"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-5-3",
                "name": "Payment Processing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-5-3-1",
                    "name": "EMV Contactless Cards"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-3-2",
                    "name": "QR / UPI"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-3-3",
                    "name": "Digital Wallets"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-3-4",
                    "name": "Cash Drawer"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-5-4",
                "name": "Tip Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-5-4-1",
                    "name": "Tip Pooling"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-4-2",
                    "name": "Staff Gratuity Distribution"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-5-5",
                "name": "Promotions & Discounts",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-5-5-1",
                    "name": "Happy Hour Rules"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-5-2",
                    "name": "Corporate Vouchers"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-5-5-3",
                    "name": "Comped Meals"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-3-6",
            "name": "CRM & Guest Loyalty",
            "subModules": [
              {
                "id": "sub-mod-type-16-3-6-1",
                "name": "Guest Profiles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-6-1-1",
                    "name": "Dietary Restrictions"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-6-1-2",
                    "name": "Preferred Seating"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-6-1-3",
                    "name": "Birthday Reminders"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-6-2",
                "name": "Visit History",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-6-2-1",
                    "name": "Historical Spend"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-6-2-2",
                    "name": "Average Check Size"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-6-2-3",
                    "name": "Visit Frequency"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-6-3",
                "name": "Loyalty Program",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-6-3-1",
                    "name": "Dining Points Accrual"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-6-3-2",
                    "name": "Tier Rewards"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-6-3-3",
                    "name": "Complimentary Items"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-6-4",
                "name": "Feedback & Reviews",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-6-4-1",
                    "name": "Digital Tabletop Survey"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-6-4-2",
                    "name": "Social Media Review Aggregation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-3-7",
            "name": "Analytics & Reporting",
            "subModules": [
              {
                "id": "sub-mod-type-16-3-7-1",
                "name": "Sales Reports",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-7-1-1",
                    "name": "Hourly Sales Velocity"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-7-1-2",
                    "name": "Server Sales Productivity"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-7-2",
                "name": "Inventory Reports",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-7-2-1",
                    "name": "Depletion Variance"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-7-2-2",
                    "name": "Cost of Goods Sold (COGS)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-7-3",
                "name": "Cost Analysis",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-7-3-1",
                    "name": "Food vs Beverage Margins"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-7-3-2",
                    "name": "Waste Percentage per Shift"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-3-7-4",
                "name": "Menu Item Popularity",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-3-7-4-1",
                    "name": "Best Sellers"
                  },
                  {
                    "id": "ss-sub-mod-type-16-3-7-4-2",
                    "name": "Deadstock Menu Items"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-16-4",
        "name": "Spa & Wellness Management",
        "mainModules": [
          {
            "id": "mod-type-16-4-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-4-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-1-1-2",
                    "name": "Phone OTP"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-1-1-3",
                    "name": "Social Login"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-1-2-1",
                    "name": "Guest Client"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-1-2-2",
                    "name": "Licensed Therapist"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-1-2-3",
                    "name": "Front Desk Receptionist"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-1-2-4",
                    "name": "Spa Director"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-4-2",
            "name": "Service & Package Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-4-2-1",
                "name": "Service Catalog",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-2-1-1",
                    "name": "Massage Therapies"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-2-1-2",
                    "name": "Facial Treatments"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-2-1-3",
                    "name": "Body Scrubs"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-2-1-4",
                    "name": "Hydrotherapy"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-2-2",
                "name": "Packages & Memberships",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-2-2-1",
                    "name": "Prepaid Credit Packages"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-2-2-2",
                    "name": "Monthly Wellness Subscriptions"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-2-3",
                "name": "Add-Ons & Recommendations",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-2-3-1",
                    "name": "Aromatherapy Oils"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-2-3-2",
                    "name": "Scalp Treatments"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-2-3-3",
                    "name": "Retail Skincare Bundles"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-4-3",
            "name": "Appointment & Scheduling",
            "subModules": [
              {
                "id": "sub-mod-type-16-4-3-1",
                "name": "Online Booking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-3-1-1",
                    "name": "Client Self-Service Portal"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-3-1-2",
                    "name": "Calendar Slot Availability"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-3-2",
                "name": "Therapist Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-3-2-1",
                    "name": "Specialty Certification Matching"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-3-2-2",
                    "name": "Roster Breaks"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-3-2-3",
                    "name": "Shift Rotations"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-3-3",
                "name": "Room & Facility Allocation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-3-3-1",
                    "name": "Treatment Rooms"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-3-3-2",
                    "name": "Sauna / Steam Suites"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-3-3-3",
                    "name": "Couples Suites"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-3-4",
                "name": "Waitlist Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-3-4-1",
                    "name": "Automated Cancellation Backfill"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-3-4-2",
                    "name": "Priority Notifications"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-4-4",
            "name": "Inventory Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-4-4-1",
                "name": "Retail Products",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-4-1-1",
                    "name": "Skincare Creams"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-4-1-2",
                    "name": "Wellness Supplements"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-4-1-3",
                    "name": "Essential Oils"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-4-2",
                "name": "Consumables Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-4-2-1",
                    "name": "Massage Oils per Session"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-4-2-2",
                    "name": "Linen Laundry Cycles"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-4-3",
                "name": "Supplier Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-4-3-1",
                    "name": "Automated Reorders"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-4-3-2",
                    "name": "Vendor Contract Terms"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-4-5",
            "name": "CRM & Client Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-4-5-1",
                "name": "Client Health Profiles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-5-1-1",
                    "name": "Skin Sensitivity"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-5-1-2",
                    "name": "Medical Disclaimers"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-5-1-3",
                    "name": "Pressure Preferences"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-5-2",
                "name": "Treatment History",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-5-2-1",
                    "name": "Therapist Session Notes"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-5-2-2",
                    "name": "Historical Formulas"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-5-3",
                "name": "Client Communication",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-5-3-1",
                    "name": "Automated SMS Confirmations"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-5-3-2",
                    "name": "Post-treatment Care Emails"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-4-6",
            "name": "Sales & Billing",
            "subModules": [
              {
                "id": "sub-mod-type-16-4-6-1",
                "name": "POS Transactions",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-6-1-1",
                    "name": "Combined Service & Retail Checkout"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-6-1-2",
                    "name": "Split Payments"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-6-2",
                "name": "Gift Cards & Vouchers",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-6-2-1",
                    "name": "Digital Gift Cards"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-6-2-2",
                    "name": "Voucher Balance Tracking"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-6-3",
                "name": "Commission Payouts",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-6-3-1",
                    "name": "Therapist Commission by Service"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-6-3-2",
                    "name": "Retail Sales Incentives"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-4-7",
            "name": "Analytics & Reports",
            "subModules": [
              {
                "id": "sub-mod-type-16-4-7-1",
                "name": "Booking Analytics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-7-1-1",
                    "name": "Booking Occupancy %"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-7-1-2",
                    "name": "No-show & Late Cancellation Rates"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-4-7-2",
                "name": "Revenue Reports",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-4-7-2-1",
                    "name": "Revenue per Available Treatment Hour (RevPATH)"
                  },
                  {
                    "id": "ss-sub-mod-type-16-4-7-2-2",
                    "name": "Therapist Productivity"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-16-5",
        "name": "Golf Course Management",
        "mainModules": [
          {
            "id": "mod-type-16-5-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-5-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-1-1-1",
                    "name": "Member ID + PIN"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-1-1-2",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-1-1-3",
                    "name": "SMS OTP"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-1-2-1",
                    "name": "Club Member"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-1-2-2",
                    "name": "Guest Golfer"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-1-2-3",
                    "name": "Pro Shop Attendant"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-1-2-4",
                    "name": "Course Marshal"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-1-2-5",
                    "name": "Head Superintendent"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-5-2",
            "name": "Tee Time Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-5-2-1",
                "name": "Dynamic Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-2-1-1",
                    "name": "8/10-Minute Tee Intervals"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-2-1-2",
                    "name": "Twilight & Weekend Peak Rates"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-2-2",
                "name": "Online Booking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-2-2-1",
                    "name": "Member Booking Windows"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-2-2-2",
                    "name": "Public Guest Slots"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-2-2-3",
                    "name": "Affiliate GDS Sync"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-2-3",
                "name": "Course Availability",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-2-3-1",
                    "name": "Frost Delay Broadcasts"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-2-3-2",
                    "name": "Aerification Maintenance Closures"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-2-4",
                "name": "Pairings & Caddie Allocation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-2-4-1",
                    "name": "Foursome Auto-pairing"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-2-4-2",
                    "name": "Assigned Caddie Roster"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-2-5",
                "name": "Waitlist & Cancellation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-2-5-1",
                    "name": "Auto-fill Standby List"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-2-5-2",
                    "name": "No-show Fee Enforcement"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-5-3",
            "name": "Course Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-5-3-1",
                "name": "Hole Configurations",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-3-1-1",
                    "name": "Par & Stroke Index"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-3-1-2",
                    "name": "Tee Box Yardages (Championship/Member/Forward)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-3-2",
                "name": "Course Conditions",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-3-2-1",
                    "name": "Green Speeds (Stimp Meter)"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-3-2-2",
                    "name": "Fairway Moisture Levels"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-3-3",
                "name": "GPS Cart Fleet Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-3-3-1",
                    "name": "Geofenced Cart Paths"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-3-3-2",
                    "name": "Pace-of-Play Distance Warning"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-3-3-3",
                    "name": "Battery Levels"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-3-4",
                "name": "Pin Placements",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-3-4-1",
                    "name": "Daily Hole Locations"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-3-4-2",
                    "name": "Digital Pin Sheet Generation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-5-4",
            "name": "Tournaments & Events",
            "subModules": [
              {
                "id": "sub-mod-type-16-5-4-1",
                "name": "Tournament Formats",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-4-1-1",
                    "name": "Stroke Play"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-4-1-2",
                    "name": "Stableford"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-4-1-3",
                    "name": "Texas Scramble"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-4-1-4",
                    "name": "Match Play"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-4-2",
                "name": "Live Scoring",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-4-2-1",
                    "name": "Mobile App Digital Scorecards"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-4-2-2",
                    "name": "Clubhouse Leaderboard Screens"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-4-3",
                "name": "Event Logistics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-4-3-1",
                    "name": "Shotgun Start Assignments"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-4-3-2",
                    "name": "Banquet & Awards Coordination"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-5-5",
            "name": "Pro Shop & Inventory",
            "subModules": [
              {
                "id": "sub-mod-type-16-5-5-1",
                "name": "Retail POS",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-5-1-1",
                    "name": "Clubs & Custom Fitting"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-5-1-2",
                    "name": "Balls & Gloves"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-5-1-3",
                    "name": "Golf Apparel"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-5-2",
                "name": "Rental Equipment",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-5-2-1",
                    "name": "Demo Sets"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-5-2-2",
                    "name": "Push Carts"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-5-2-3",
                    "name": "Buggy Rentals"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-5-3",
                "name": "Inventory Purchasing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-5-3-1",
                    "name": "Vendor Seasonal Pre-orders"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-5-3-2",
                    "name": "Shrinkage & Stock Audits"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-5-6",
            "name": "Membership Management",
            "subModules": [
              {
                "id": "sub-mod-type-16-5-6-1",
                "name": "Member Categories",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-6-1-1",
                    "name": "Full Golf"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-6-1-2",
                    "name": "Social / Dining"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-6-1-3",
                    "name": "Corporate"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-6-1-4",
                    "name": "Junior Golfer"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-6-2",
                "name": "Dues & Spending Minimums",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-6-2-1",
                    "name": "Annual Subscription Billing"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-6-2-2",
                    "name": "Quarterly F&B Minimum Tracking"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-6-3",
                "name": "Handicap Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-6-3-1",
                    "name": "WHS / USGA Integration"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-6-3-2",
                    "name": "Score Posting & Index Revisions"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-16-5-7",
            "name": "Analytics & Reports",
            "subModules": [
              {
                "id": "sub-mod-type-16-5-7-1",
                "name": "Course Utilization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-7-1-1",
                    "name": "Total Rounds Played"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-7-1-2",
                    "name": "Pace of Play Bottleneck Analysis"
                  }
                ]
              },
              {
                "id": "sub-mod-type-16-5-7-2",
                "name": "Financial Metrics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-16-5-7-2-1",
                    "name": "Green Fee Revenue"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-7-2-2",
                    "name": "Pro Shop Profitability"
                  },
                  {
                    "id": "ss-sub-mod-type-16-5-7-2-3",
                    "name": "F&B Yield per Round"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-17",
    "code": "17",
    "name": "TRAVEL & TOURISM",
    "description": "Travel agency platforms, GDS flight booking, multi-day itinerary creators, and supplier settlements",
    "productTypes": [
      {
        "id": "type-17-1",
        "name": "Travel Agency Platform",
        "mainModules": [
          {
            "id": "mod-17-1-1",
            "name": "Booking & Itinerary",
            "subModules": [
              {
                "id": "sub-17-1-1-1",
                "name": "Packages",
                "subSubModules": [
                  {
                    "id": "ss-17-1-1-1-1",
                    "name": "Flight GDS & Hotel booking"
                  },
                  {
                    "id": "ss-17-1-1-1-2",
                    "name": "Drag-and-drop itinerary creator"
                  },
                  {
                    "id": "ss-17-1-1-1-3",
                    "name": "Multi-currency part payments"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-18",
    "code": "18",
    "name": "TRANSPORTATION",
    "description": "Taxi booking, ride sharing, real-time rider/driver app flows, and surge pricing",
    "productTypes": [
      {
        "id": "type-18-1",
        "name": "Taxi Booking & Ride Sharing",
        "mainModules": [
          {
            "id": "mod-18-1-1",
            "name": "Rider & Driver Apps",
            "subModules": [
              {
                "id": "sub-18-1-1-1",
                "name": "Ride Dispatch",
                "subSubModules": [
                  {
                    "id": "ss-18-1-1-1-1",
                    "name": "Live GPS map matching"
                  },
                  {
                    "id": "ss-18-1-1-1-2",
                    "name": "Dynamic surge pricing"
                  },
                  {
                    "id": "ss-18-1-1-1-3",
                    "name": "In-app wallet & UPI payments"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-18-2",
        "name": "Aviation / Airline Management",
        "mainModules": [
          {
            "id": "mod-type-18-2-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-18-2-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-1-1-2",
                    "name": "Crew Portal SSO"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-1-1-3",
                    "name": "Biometric Pass"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-1-2-1",
                    "name": "Flight Dispatcher"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-1-2-2",
                    "name": "Captain / First Officer"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-1-2-3",
                    "name": "Cabin Crew Lead"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-1-2-4",
                    "name": "Ground Operations Lead"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-1-2-5",
                    "name": "Fleet Maintenance Engineer"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-2-2",
            "name": "Fleet & Aircraft Management",
            "subModules": [
              {
                "id": "sub-mod-type-18-2-2-1",
                "name": "Aircraft Registry",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-2-1-1",
                    "name": "Tail Registration"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-2-1-2",
                    "name": "Engine Flight Cycles & Hours"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-2-1-3",
                    "name": "Configuration (Seating/Cargo)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-2-2",
                "name": "Airworthiness Directives",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-2-2-1",
                    "name": "FAA / EASA Directives Compliance"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-2-2-2",
                    "name": "Mandatory Service Bulletins"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-2-3",
                "name": "Maintenance Logs",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-2-3-1",
                    "name": "Electronic Technical Logbook (eTLB)"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-2-3-2",
                    "name": "A/B/C/D Heavy Check Schedules"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-2-3",
            "name": "Flight Operations",
            "subModules": [
              {
                "id": "sub-mod-type-18-2-3-1",
                "name": "Flight Dispatch",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-3-1-1",
                    "name": "Computerized Flight Plans"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-3-1-2",
                    "name": "NOTAMs Analysis"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-3-1-3",
                    "name": "Weather Rerouting"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-3-2",
                "name": "Fuel Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-3-2-1",
                    "name": "Trip Fuel Optimization"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-3-2-2",
                    "name": "Contingency & Reserve Calculations"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-3-2-3",
                    "name": "Tankering Analysis"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-3-3",
                "name": "Flight Following",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-3-3-1",
                    "name": "Live ADS-B Radar Tracking"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-3-3-2",
                    "name": "ACARS Communication Messages"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-3-4",
                "name": "Irregular Operations (IROPS)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-3-4-1",
                    "name": "Delay Recovery Engine"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-3-4-2",
                    "name": "Passenger Re-accommodation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-2-4",
            "name": "Crew Management",
            "subModules": [
              {
                "id": "sub-mod-type-18-2-4-1",
                "name": "Crew Rostering",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-4-1-1",
                    "name": "Flight Time Limitations (FTL)"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-4-1-2",
                    "name": "Rest Period Mandates"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-4-2",
                "name": "Crew Qualifications",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-4-2-1",
                    "name": "Aircraft Type Ratings"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-4-2-2",
                    "name": "Simulator Recurrent Training Expiries"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-4-3",
                "name": "Crew Bidding & Layover",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-4-3-1",
                    "name": "Seniority-based Schedule Bidding"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-4-3-2",
                    "name": "Hotel Accommodation Allocations"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-2-5",
            "name": "Passenger & Ground Operations",
            "subModules": [
              {
                "id": "sub-mod-type-18-2-5-1",
                "name": "Departure Control System (DCS)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-5-1-1",
                    "name": "Gate Boarding Reconciliation"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-5-1-2",
                    "name": "Standby Upgrade Allocation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-5-2",
                "name": "Load & Trim Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-5-2-1",
                    "name": "Center of Gravity (CG) Calculation"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-5-2-2",
                    "name": "Automated Loadsheet Generation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-5-3",
                "name": "Baggage Reconciliation (BRS)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-5-3-1",
                    "name": "Baggage Tag Scanning"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-5-3-2",
                    "name": "Hold Container ULD Mapping"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-2-6",
            "name": "Cargo & Baggage Tracking",
            "subModules": [
              {
                "id": "sub-mod-type-18-2-6-1",
                "name": "Air Cargo Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-6-1-1",
                    "name": "Air Waybill (AWB) Processing"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-6-1-2",
                    "name": "Dangerous Goods (IATA DGR) Segregation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-6-2",
                "name": "Baggage Tracing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-6-2-1",
                    "name": "WorldTracer Integration"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-6-2-2",
                    "name": "Property Irregularity Reports (PIR)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-2-7",
            "name": "Analytics & Airline Metrics",
            "subModules": [
              {
                "id": "sub-mod-type-18-2-7-1",
                "name": "Yield & Commercials",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-7-1-1",
                    "name": "RASK (Revenue per Available Seat Km)"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-7-1-2",
                    "name": "CASK (Cost per Available Seat Km)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-2-7-2",
                "name": "Operational Performance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-2-7-2-1",
                    "name": "On-Time Performance (OTP)"
                  },
                  {
                    "id": "ss-sub-mod-type-18-2-7-2-2",
                    "name": "Turnaround Time (TAT) Tracking"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-18-3",
        "name": "Shipping & Maritime Management",
        "mainModules": [
          {
            "id": "mod-type-18-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-18-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-1-1-2",
                    "name": "Satellite Link Auth"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-1-1-3",
                    "name": "Shipboard Offline Mode"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-1-2-1",
                    "name": "Ship Master (Captain)"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-1-2-2",
                    "name": "Chief Engineer"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-1-2-3",
                    "name": "Port Agent"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-1-2-4",
                    "name": "Technical Superintendent"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-1-2-5",
                    "name": "Commercial Charterer"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-3-2",
            "name": "Vessel Management",
            "subModules": [
              {
                "id": "sub-mod-type-18-3-2-1",
                "name": "Vessel Registry",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-2-1-1",
                    "name": "IMO Number"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-2-1-2",
                    "name": "Flag State"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-2-1-3",
                    "name": "Classification Society"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-2-1-4",
                    "name": "Deadweight Tonnage (DWT)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-2-2",
                "name": "Statutory Surveys & Certificates",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-2-2-1",
                    "name": "SOLAS"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-2-2-2",
                    "name": "MARPOL"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-2-2-3",
                    "name": "ISM / ISPS Code Expiry Alerts"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-2-3",
                "name": "Planned Maintenance System (PMS)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-2-3-1",
                    "name": "Main Engine Running Hours"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-2-3-2",
                    "name": "Drydock Overhaul Planning"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-3-3",
            "name": "Crew Management",
            "subModules": [
              {
                "id": "sub-mod-type-18-3-3-1",
                "name": "Crew Compliance Matrix",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-3-1-1",
                    "name": "STCW Competency Certifications"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-3-1-2",
                    "name": "Flag Endorsements"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-3-2",
                "name": "Contracts & Rostering",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-3-2-1",
                    "name": "Sign-on / Sign-off Dates"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-3-2-2",
                    "name": "Repatriation Flights Planning"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-3-3",
                "name": "Shipboard Payroll",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-3-3-1",
                    "name": "Cash to Master (CTM)"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-3-3-2",
                    "name": "Family Allotment Transfers"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-3-3-3",
                    "name": "Overtime Logs"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-3-4",
            "name": "Voyage Planning & Navigation",
            "subModules": [
              {
                "id": "sub-mod-type-18-3-4-1",
                "name": "Passage Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-4-1-1",
                    "name": "Electronic Chart Display (ECDIS) Routes"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-4-1-2",
                    "name": "High-Risk Piracy Areas"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-4-2",
                "name": "Weather Routing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-4-2-1",
                    "name": "Wave & Swell Avoidance"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-4-2-2",
                    "name": "Eco-speed Fuel Conservation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-4-3",
                "name": "Port Call Operations",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-4-3-1",
                    "name": "Notice of Readiness (NOR)"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-4-3-2",
                    "name": "Berthing Schedules"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-4-3-3",
                    "name": "Bunker Fuel Ordering"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-3-5",
            "name": "Cargo & Container Management",
            "subModules": [
              {
                "id": "sub-mod-type-18-3-5-1",
                "name": "Stowage & Stability",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-5-1-1",
                    "name": "Bending Moments & Shear Stress"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-5-1-2",
                    "name": "IMDG Hazardous Goods Separation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-5-2",
                "name": "Container Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-5-2-1",
                    "name": "Bill of Lading (B/L) Numbers"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-5-2-2",
                    "name": "Reefer Temperature Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-5-2-3",
                    "name": "Container Seals"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-5-3",
                "name": "Charter Party Operations",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-5-3-1",
                    "name": "Laytime & Demurrage Calculations"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-5-3-2",
                    "name": "Despatch Accounts"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-3-6",
            "name": "Environmental & Safety",
            "subModules": [
              {
                "id": "sub-mod-type-18-3-6-1",
                "name": "Environmental Compliance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-6-1-1",
                    "name": "Ballast Water Management Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-6-1-2",
                    "name": "Carbon Intensity Indicator (CII) Rating"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-6-2",
                "name": "Safety Drills & Audits",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-6-2-1",
                    "name": "Fire & Abandon Ship Drills"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-6-2-2",
                    "name": "Near-Miss Safety Incident Logs"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-18-3-7",
            "name": "Maritime Financials & Analytics",
            "subModules": [
              {
                "id": "sub-mod-type-18-3-7-1",
                "name": "Voyage Financials",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-7-1-1",
                    "name": "Time Charter Equivalent (TCE) Rates"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-7-1-2",
                    "name": "Port Disbursements Accounting"
                  }
                ]
              },
              {
                "id": "sub-mod-type-18-3-7-2",
                "name": "Fuel & Emissions",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-18-3-7-2-1",
                    "name": "VLSFO / MGO Consumption Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-18-3-7-2-2",
                    "name": "EU ETS Carbon Allowances"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-19",
    "code": "19",
    "name": "GOVERNMENT & PUBLIC SECTOR",
    "description": "eGovernance citizen portals, grievance management, and land records systems",
    "productTypes": [
      {
        "id": "type-19-1",
        "name": "eGovernance Platform",
        "mainModules": [
          {
            "id": "mod-19-1-1",
            "name": "Citizen Services",
            "subModules": [
              {
                "id": "sub-19-1-1-1",
                "name": "Service Catalog",
                "subSubModules": [
                  {
                    "id": "ss-19-1-1-1-1",
                    "name": "Aadhaar / Single Sign-on"
                  },
                  {
                    "id": "ss-19-1-1-1-2",
                    "name": "Digital Locker document upload"
                  },
                  {
                    "id": "ss-19-1-1-1-3",
                    "name": "Grievance redressal SLA"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-19-2",
        "name": "Land Records Management",
        "mainModules": [
          {
            "id": "mod-19-2-1",
            "name": "Registry & Mutation",
            "subModules": [
              {
                "id": "sub-19-2-1-1",
                "name": "GIS & Survey",
                "subSubModules": [
                  {
                    "id": "ss-19-2-1-1-1",
                    "name": "GIS boundary maps"
                  },
                  {
                    "id": "ss-19-2-1-1-2",
                    "name": "E-mutation approval workflow"
                  },
                  {
                    "id": "ss-19-2-1-1-3",
                    "name": "Encumbrance search (EC)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-19-3",
        "name": "Waste Management",
        "mainModules": [
          {
            "id": "mod-type-19-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-19-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-1-1-2",
                    "name": "Driver Mobile OTP"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-1-1-3",
                    "name": "Citizen Portal"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-1-2-1",
                    "name": "Collection Dispatcher"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-1-2-2",
                    "name": "Compactor Truck Driver"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-1-2-3",
                    "name": "Weighbridge Operator"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-1-2-4",
                    "name": "Recycling Facility Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-1-2-5",
                    "name": "Citizen"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-19-3-2",
            "name": "Smart Collection & Route Optimization",
            "subModules": [
              {
                "id": "sub-mod-type-19-3-2-1",
                "name": "Smart Bin Telemetry",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-2-1-1",
                    "name": "Ultrasonic Fill-level Sensors"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-2-1-2",
                    "name": "Tilt & Fire Detection Alerts"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-2-2",
                "name": "Dynamic Route Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-2-2-1",
                    "name": "On-demand Collection Paths"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-2-2-2",
                    "name": "Fuel-efficient Turn Optimization"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-2-3",
                "name": "RFID Bin Verification",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-2-3-1",
                    "name": "Bin Lift RFID Scan"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-2-3-2",
                    "name": "Contaminated Waste Flagging"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-2-4",
                "name": "Vehicle Fleet Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-2-4-1",
                    "name": "Compactor Pressure Telemetry"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-2-4-2",
                    "name": "Real-time GPS Collection Heatmaps"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-19-3-3",
            "name": "Transfer Station & Weighbridge",
            "subModules": [
              {
                "id": "sub-mod-type-19-3-3-1",
                "name": "Weighbridge Automation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-3-1-1",
                    "name": "Gross / Tare Weight Capture"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-3-1-2",
                    "name": "Automatic Number Plate Recognition (ANPR)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-3-2",
                "name": "Waste Manifests",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-3-2-1",
                    "name": "Hazardous Waste Consignment Notes"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-3-2-2",
                    "name": "Municipal Solid Waste (MSW) Categories"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-3-3",
                "name": "Material Recovery Facility (MRF)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-3-3-1",
                    "name": "Optical Sorting Stream Tracking"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-3-3-2",
                    "name": "Baled Plastic & Paper Inventory"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-19-3-4",
            "name": "Processing & Landfill Operations",
            "subModules": [
              {
                "id": "sub-mod-type-19-3-4-1",
                "name": "Landfill Cell Operations",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-4-1-1",
                    "name": "Compaction Density Audits"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-4-1-2",
                    "name": "Leachate Basin Level Monitoring"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-4-2",
                "name": "Waste-to-Energy (WtE)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-4-2-1",
                    "name": "Incinerator Steam Output"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-4-2-2",
                    "name": "Flue Gas Emissions Monitoring"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-4-3",
                "name": "Composting & Organics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-4-3-1",
                    "name": "Temperature Windrow Turning Cycles"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-4-3-2",
                    "name": "Finished Compost Quality Testing"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-19-3-5",
            "name": "Customer Service & Billing",
            "subModules": [
              {
                "id": "sub-mod-type-19-3-5-1",
                "name": "Citizen Service Requests",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-5-1-1",
                    "name": "Bulky Item Pickup Requests"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-5-1-2",
                    "name": "Illegal Dumping Photo Reports"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-5-2",
                "name": "Pay-As-You-Throw (PAYT)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-5-2-1",
                    "name": "Weight-based Household Billing"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-5-2-2",
                    "name": "Commercial Container Billing"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-19-3-6",
            "name": "Environmental Compliance & ESG",
            "subModules": [
              {
                "id": "sub-mod-type-19-3-6-1",
                "name": "Diversion Rate Analytics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-6-1-1",
                    "name": "Total Waste Diverted from Landfill %"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-6-1-2",
                    "name": "Material Recycling Tonnage"
                  }
                ]
              },
              {
                "id": "sub-mod-type-19-3-6-2",
                "name": "Emissions Reporting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-19-3-6-2-1",
                    "name": "Landfill Methane Flaring Capture Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-19-3-6-2-2",
                    "name": "Fleet Carbon Footprint"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-20",
    "code": "20",
    "name": "AGRICULTURE",
    "description": "Smart farm management, plot soil testing, automated irrigation, and Mandi market pricing",
    "productTypes": [
      {
        "id": "type-20-1",
        "name": "Farm Management",
        "mainModules": [
          {
            "id": "mod-20-1-1",
            "name": "Crop & Irrigation Management",
            "subModules": [
              {
                "id": "sub-20-1-1-1",
                "name": "Farm Operations",
                "subSubModules": [
                  {
                    "id": "ss-20-1-1-1-1",
                    "name": "Soil NPK & crop rotation history"
                  },
                  {
                    "id": "ss-20-1-1-1-2",
                    "name": "Automated pump/valve scheduling"
                  },
                  {
                    "id": "ss-20-1-1-1-3",
                    "name": "Mandi e-NAM price tracker"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-21",
    "code": "21",
    "name": "LEGAL",
    "description": "Law firm case management, court date reminders, legal billing, and trust accounting",
    "productTypes": [
      {
        "id": "type-21-1",
        "name": "Law Firm Management",
        "mainModules": [
          {
            "id": "mod-21-1-1",
            "name": "Case & Hearing Management",
            "subModules": [
              {
                "id": "sub-21-1-1-1",
                "name": "Case Docket",
                "subSubModules": [
                  {
                    "id": "ss-21-1-1-1-1",
                    "name": "Court jurisdiction & pleadings"
                  },
                  {
                    "id": "ss-21-1-1-1-2",
                    "name": "Hearing reminders & calendar"
                  },
                  {
                    "id": "ss-21-1-1-1-3",
                    "name": "Hourly billable timesheet"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-22",
    "code": "22",
    "name": "INSURANCE",
    "description": "Policy lifecycle management, automated risk underwriting, and claims processing",
    "productTypes": [
      {
        "id": "type-22-1",
        "name": "Policy Management",
        "mainModules": [
          {
            "id": "mod-22-1-1",
            "name": "Policy & Claims Hub",
            "subModules": [
              {
                "id": "sub-22-1-1-1",
                "name": "Claims & Premium",
                "subSubModules": [
                  {
                    "id": "ss-22-1-1-1-1",
                    "name": "Risk-based premium calculation"
                  },
                  {
                    "id": "ss-22-1-1-1-2",
                    "name": "Digital claim filing & surveyor review"
                  },
                  {
                    "id": "ss-22-1-1-1-3",
                    "name": "Auto-debit recurring renewal"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-22-2",
        "name": "Insurance (Expanded)",
        "mainModules": [
          {
            "id": "mod-type-22-2-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-22-2-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-1-1-1",
                    "name": "Policyholder Mobile OTP"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-1-1-2",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-1-1-3",
                    "name": "Agent Portal SSO"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-1-1-4",
                    "name": "Biometric App"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-1-2-1",
                    "name": "Policyholder"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-1-2-2",
                    "name": "Licensed Insurance Agent"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-1-2-3",
                    "name": "Claims Adjuster"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-1-2-4",
                    "name": "Underwriter"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-1-2-5",
                    "name": "Actuary"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-22-2-2",
            "name": "Product & Policy Administration",
            "subModules": [
              {
                "id": "sub-mod-type-22-2-2-1",
                "name": "Policy Configurator",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-2-1-1",
                    "name": "Parametric Weather Insurance"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-2-1-2",
                    "name": "Usage-based Telematics Insurance (UBI)"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-2-1-3",
                    "name": "Term Life & Health Bundles"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-2-2",
                "name": "Policy Lifecycle",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-2-2-1",
                    "name": "Online Instant Quotation"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-2-2-2",
                    "name": "Digital Policy Binding"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-2-2-3",
                    "name": "Endorsement Modifications"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-2-3",
                "name": "Automated Renewals",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-2-3-1",
                    "name": "Grace Period Management"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-2-3-2",
                    "name": "Auto-debit Premium Collections"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-2-4",
                "name": "Billing Schedules",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-2-4-1",
                    "name": "Monthly Installments"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-2-4-2",
                    "name": "Annual Full-pay Discount Calculations"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-22-2-3",
            "name": "Underwriting Engine",
            "subModules": [
              {
                "id": "sub-mod-type-22-2-3-1",
                "name": "Automated Risk Scoring",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-3-1-1",
                    "name": "Electronic Health Record Ingestion"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-3-1-2",
                    "name": "Driving Telematics Risk Index"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-3-1-3",
                    "name": "Geospatial Flood/Fire Risk"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-3-2",
                "name": "Straight-Through Processing (STP)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-3-2-1",
                    "name": "Zero-touch Auto-approval Thresholds"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-3-2-2",
                    "name": "Medical Underwriting Referrals"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-3-3",
                "name": "Reinsurance Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-3-3-1",
                    "name": "Treaty Quota Share Slicing"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-3-3-2",
                    "name": "Facultative Placement Logging"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-22-2-4",
            "name": "First Notice of Loss (FNOL) & Claims",
            "subModules": [
              {
                "id": "sub-mod-type-22-2-4-1",
                "name": "Digital FNOL",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-4-1-1",
                    "name": "Mobile Photo Accident Capture"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-4-1-2",
                    "name": "AI Vehicle Damage Repair Estimation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-4-2",
                "name": "Claims Adjudication",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-4-2-1",
                    "name": "Surveyor Dispatch Workflow"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-4-2-2",
                    "name": "Third-party Loss Adjuster Reports"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-4-3",
                "name": "Anti-Fraud Claims Engine",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-4-3-1",
                    "name": "Social Network Link Analysis"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-4-3-2",
                    "name": "Prior Claim Duplicate Detection"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-4-4",
                "name": "Fast-Track Payouts",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-4-4-1",
                    "name": "Instant Micro-claim Bank Disbursals"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-4-4-2",
                    "name": "Cashless Hospital Settlement"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-22-2-5",
            "name": "Agency & Broker Management",
            "subModules": [
              {
                "id": "sub-mod-type-22-2-5-1",
                "name": "Broker Hierarchy",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-5-1-1",
                    "name": "General Agents"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-5-1-2",
                    "name": "Independent Sub-brokers"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-5-1-3",
                    "name": "Multi-tier Commission Slabs"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-5-2",
                "name": "Commission Reconciliation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-5-2-1",
                    "name": "Upfront vs Trail Commission Accounting"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-5-2-2",
                    "name": "Lapse Clawback Deductions"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-22-2-6",
            "name": "Actuarial Analytics & Solvency",
            "subModules": [
              {
                "id": "sub-mod-type-22-2-6-1",
                "name": "Loss Reserving",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-6-1-1",
                    "name": "Incurred But Not Reported (IBNR) Calculations"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-6-1-2",
                    "name": "Loss Ratio Projections"
                  }
                ]
              },
              {
                "id": "sub-mod-type-22-2-6-2",
                "name": "Solvency Compliance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-22-2-6-2-1",
                    "name": "IFRS 17 Financial Reporting"
                  },
                  {
                    "id": "ss-sub-mod-type-22-2-6-2-2",
                    "name": "Capital Adequacy Ratios"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-23",
    "code": "23",
    "name": "MEDIA & ENTERTAINMENT",
    "description": "OTT video streaming, DRM content protection, music streaming, and podcast hosting",
    "productTypes": [
      {
        "id": "type-23-1",
        "name": "OTT Platform",
        "mainModules": [
          {
            "id": "mod-23-1-1",
            "name": "Streaming & DRM",
            "subModules": [
              {
                "id": "sub-23-1-1-1",
                "name": "Video Engine",
                "subSubModules": [
                  {
                    "id": "ss-23-1-1-1-1",
                    "name": "Adaptive HLS / 4K streaming"
                  },
                  {
                    "id": "ss-23-1-1-1-2",
                    "name": "Widevine DRM protection"
                  },
                  {
                    "id": "ss-23-1-1-1-3",
                    "name": "Subscription & Freemium ads"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-23-2",
        "name": "Music Streaming",
        "mainModules": [
          {
            "id": "mod-23-2-1",
            "name": "Music Library & Player",
            "subModules": [
              {
                "id": "sub-23-2-1-1",
                "name": "Audio Engine",
                "subSubModules": [
                  {
                    "id": "ss-23-2-1-1-1",
                    "name": "Lossless FLAC playback"
                  },
                  {
                    "id": "ss-23-2-1-1-2",
                    "name": "Algorithmic recommendations"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-23-3",
        "name": "Podcast Platform",
        "mainModules": [
          {
            "id": "mod-23-3-1",
            "name": "Podcast RSS & Playback",
            "subModules": [
              {
                "id": "sub-23-3-1-1",
                "name": "Distribution",
                "subSubModules": [
                  {
                    "id": "ss-23-3-1-1-1",
                    "name": "RSS feed publishing"
                  },
                  {
                    "id": "ss-23-3-1-1-2",
                    "name": "Dynamic ad insertion"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-24",
    "code": "24",
    "name": "SOCIAL & COMMUNITY",
    "description": "Social network feeds, stories, messaging, community forums, and upvote algorithms",
    "productTypes": [
      {
        "id": "type-24-1",
        "name": "Social Network Platform",
        "mainModules": [
          {
            "id": "mod-24-1-1",
            "name": "Feeds & Real-time Messaging",
            "subModules": [
              {
                "id": "sub-24-1-1-1",
                "name": "Engagement",
                "subSubModules": [
                  {
                    "id": "ss-24-1-1-1-1",
                    "name": "Post feeds, Reels & 24h stories"
                  },
                  {
                    "id": "ss-24-1-1-1-2",
                    "name": "1-1 & Group chat with voice notes"
                  },
                  {
                    "id": "ss-24-1-1-1-3",
                    "name": "Threaded comments & reactions"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-24-2",
        "name": "Community Platform",
        "mainModules": [
          {
            "id": "mod-24-2-1",
            "name": "Forums & Karma",
            "subModules": [
              {
                "id": "sub-24-2-1-1",
                "name": "Discussions",
                "subSubModules": [
                  {
                    "id": "ss-24-2-1-1-1",
                    "name": "Reddit-style upvotes/downvotes"
                  },
                  {
                    "id": "ss-24-2-1-1-2",
                    "name": "Q&A Best answer accept"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-25",
    "code": "25",
    "name": "SAAS PLATFORMS",
    "description": "Multi-tenant SaaS architectures, custom subdomains, white-label reseller branding, and billing",
    "productTypes": [
      {
        "id": "type-25-1",
        "name": "Multi-Tenant SaaS Platform",
        "mainModules": [
          {
            "id": "mod-25-1-1",
            "name": "Tenant & Subscription Hub",
            "subModules": [
              {
                "id": "sub-25-1-1-1",
                "name": "Tenant Engine",
                "subSubModules": [
                  {
                    "id": "ss-25-1-1-1-1",
                    "name": "Tenant database / schema isolation"
                  },
                  {
                    "id": "ss-25-1-1-1-2",
                    "name": "Custom domain CNAME mapping"
                  },
                  {
                    "id": "ss-25-1-1-1-3",
                    "name": "Stripe subscription & feature toggles"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-25-2",
        "name": "White Label SaaS",
        "mainModules": [
          {
            "id": "mod-25-2-1",
            "name": "Reseller Management",
            "subModules": [
              {
                "id": "sub-25-2-1-1",
                "name": "Branding",
                "subSubModules": [
                  {
                    "id": "ss-25-2-1-1-1",
                    "name": "Reseller custom logo and colors"
                  },
                  {
                    "id": "ss-25-2-1-1-2",
                    "name": "Wholesale pricing & revenue split"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-26",
    "code": "26",
    "name": "PRODUCTIVITY & COLLABORATION",
    "description": "Agile project management, Gantt charts, live whiteboards, and real-time team workspaces",
    "productTypes": [
      {
        "id": "type-26-1",
        "name": "Project Management",
        "mainModules": [
          {
            "id": "mod-26-1-1",
            "name": "Task & Sprint Management",
            "subModules": [
              {
                "id": "sub-26-1-1-1",
                "name": "Agile Tools",
                "subSubModules": [
                  {
                    "id": "ss-26-1-1-1-1",
                    "name": "Kanban board swimlanes"
                  },
                  {
                    "id": "ss-26-1-1-1-2",
                    "name": "Gantt timeline & critical path"
                  },
                  {
                    "id": "ss-26-1-1-1-3",
                    "name": "Sprint burndown charts"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-26-2",
        "name": "Team Collaboration",
        "mainModules": [
          {
            "id": "mod-26-2-1",
            "name": "Workspace & Whiteboard",
            "subModules": [
              {
                "id": "sub-26-2-1-1",
                "name": "Real-time Hub",
                "subSubModules": [
                  {
                    "id": "ss-26-2-1-1-1",
                    "name": "Real-time collaborative whiteboard"
                  },
                  {
                    "id": "ss-26-2-1-1-2",
                    "name": "Live document wiki"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-26-3",
        "name": "Project & Portfolio Management (PPM)",
        "mainModules": [
          {
            "id": "mod-type-26-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-1-1-2",
                    "name": "SSO/SAML"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-1-1-3",
                    "name": "LDAP"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-1-2-1",
                    "name": "Portfolio Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-1-2-2",
                    "name": "PMO"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-1-2-3",
                    "name": "Project Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-1-2-4",
                    "name": "Resource Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-1-2-5",
                    "name": "Executive"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-1-2-6",
                    "name": "Viewer"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-2",
            "name": "Portfolio Management",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-2-1",
                "name": "Portfolio Definition",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-2-1-1",
                    "name": "Strategic Portfolio"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-1-2",
                    "name": "Operational Portfolio"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-1-3",
                    "name": "IT Portfolio"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-1-4",
                    "name": "R&D Portfolio"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-2-2",
                "name": "Project Scoring",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-2-2-1",
                    "name": "ROI Calculation"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-2-2",
                    "name": "Strategic Alignment"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-2-3",
                    "name": "Risk Scoring"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-2-4",
                    "name": "Benefits Estimation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-2-3",
                "name": "Project Selection",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-2-3-1",
                    "name": "Weighted Scoring"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-3-2",
                    "name": "Pairwise Comparison"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-3-3",
                    "name": "Stage-Gate Evaluation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-2-4",
                "name": "Portfolio Dashboard",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-2-4-1",
                    "name": "Health RAG Status"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-4-2",
                    "name": "ROI Realization"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-4-3",
                    "name": "Resource Utilization"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-2-5",
                "name": "Optimization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-2-5-1",
                    "name": "What-if Scenario Analysis"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-5-2",
                    "name": "Constraint-based Optimization"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-2-5-3",
                    "name": "Budget Allocation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-3",
            "name": "Program Management",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-3-1",
                "name": "Program Definition",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-3-1-1",
                    "name": "Benefits Realization"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-3-1-2",
                    "name": "Stakeholder Governance"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-3-2",
                "name": "Program Roadmap",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-3-2-1",
                    "name": "Milestone Mapping"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-3-2-2",
                    "name": "Timeline View"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-3-2-3",
                    "name": "Phase Gates"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-3-3",
                "name": "Dependency Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-3-3-1",
                    "name": "Inter-project Dependencies"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-3-3-2",
                    "name": "Critical Path Coordination"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-3-4",
                "name": "Benefits Realization Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-3-4-1",
                    "name": "KPI Milestones"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-3-4-2",
                    "name": "Financial Return Audit"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-3-5",
                "name": "Program Governance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-3-5-1",
                    "name": "Steering Committee Review"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-3-5-2",
                    "name": "Risk Register"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-4",
            "name": "Project Initiation",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-4-1",
                "name": "Business Case",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-4-1-1",
                    "name": "Cost-Benefit Analysis"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-4-1-2",
                    "name": "Feasibility Study"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-4-2",
                "name": "Project Charter",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-4-2-1",
                    "name": "Strategic Objectives"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-4-2-2",
                    "name": "Scope Baseline"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-4-2-3",
                    "name": "Deliverables"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-4-3",
                "name": "Stakeholder Register",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-4-3-1",
                    "name": "Influence Matrix"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-4-3-2",
                    "name": "Contact Information"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-4-4",
                "name": "Gate Approval",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-4-4-1",
                    "name": "Stage 0 Gate"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-4-4-2",
                    "name": "Stage 1 Gate"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-4-4-3",
                    "name": "Stage 2 Gate"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-5",
            "name": "Resource Management (Advanced)",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-5-1",
                "name": "Resource Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-5-1-1",
                    "name": "Demand vs Capacity"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-5-1-2",
                    "name": "Headcount Forecasting"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-5-2",
                "name": "Resource Allocation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-5-2-1",
                    "name": "Role-based Allocation"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-5-2-2",
                    "name": "Skill-based Matching"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-5-3",
                "name": "Utilization Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-5-3-1",
                    "name": "Billable vs Non-billable"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-5-3-2",
                    "name": "Over-allocation Alerts"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-5-4",
                "name": "Resource Onboarding/Offboarding",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-5-4-1",
                    "name": "Access Provisioning"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-5-4-2",
                    "name": "Project Roll-off"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-5-5",
                "name": "Skills Inventory",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-5-5-1",
                    "name": "Competency Matrix"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-5-5-2",
                    "name": "Certifications Tracking"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-5-6",
                "name": "Talent Marketplace",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-5-6-1",
                    "name": "Internal Gigs"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-5-6-2",
                    "name": "Project Opportunities Matching"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-6",
            "name": "Agile Management (Advanced)",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-6-1",
                "name": "PI Planning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-6-1-1",
                    "name": "Scaled Agile (SAFe)"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-6-1-2",
                    "name": "Release Train Coordination"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-6-2",
                "name": "ART Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-6-2-1",
                    "name": "Train Sync Cadence"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-6-2-2",
                    "name": "Iteration Retrospectives"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-6-3",
                "name": "DevOps Integration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-6-3-1",
                    "name": "CI/CD Pipeline Linking"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-6-3-2",
                    "name": "Automated Build Status"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-6-4",
                "name": "Feature Toggles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-6-4-1",
                    "name": "Flag Management"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-6-4-2",
                    "name": "Gradual Rollouts"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-6-5",
                "name": "Value Stream Mapping",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-6-5-1",
                    "name": "Lead Time Tracking"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-6-5-2",
                    "name": "Process Cycle Efficiency"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-6-6",
                "name": "Flow Metrics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-6-6-1",
                    "name": "Flow Velocity"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-6-6-2",
                    "name": "Throughput"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-6-6-3",
                    "name": "WIP Limits"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-7",
            "name": "Time & Expense",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-7-1",
                "name": "Timesheets",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-7-1-1",
                    "name": "Weekly Timesheets"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-7-1-2",
                    "name": "Bi-weekly Submission"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-7-1-3",
                    "name": "Approval Workflows"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-7-2",
                "name": "Expense Reports",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-7-2-1",
                    "name": "Receipt Digitization"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-7-2-2",
                    "name": "Corporate Policy Audit"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-7-3",
                "name": "Integration with Payroll/Finance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-7-3-1",
                    "name": "Project Cost Allocation"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-7-3-2",
                    "name": "General Ledger Sync"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-7-4",
                "name": "Overtime Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-7-4-1",
                    "name": "Rate Calculations"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-7-4-2",
                    "name": "Labor Compliance"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-8",
            "name": "Deliverables & Approvals",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-8-1",
                "name": "Document Generation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-8-1-1",
                    "name": "Automated Spec Export"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-8-1-2",
                    "name": "Status PDF Reports"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-8-2",
                "name": "Digital Signatures",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-8-2-1",
                    "name": "Cryptographic DSC"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-8-2-2",
                    "name": "Aadhaar / DocuSign E-sign"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-8-3",
                "name": "Deliverable Review Workflows",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-8-3-1",
                    "name": "Multi-tier Sign-off"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-8-3-2",
                    "name": "Version Comparison"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-9",
            "name": "Collaboration & Communication",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-9-1",
                "name": "Project Workspace",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-9-1-1",
                    "name": "Shared Kanban Boards"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-9-1-2",
                    "name": "Document Repository"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-9-2",
                "name": "Team Chat",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-9-2-1",
                    "name": "Real-time Channels"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-9-2-2",
                    "name": "Direct Messaging"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-9-3",
                "name": "Meeting Minutes",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-9-3-1",
                    "name": "Action Item Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-9-3-2",
                    "name": "Attendance Records"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-9-4",
                "name": "Action Item Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-9-4-1",
                    "name": "SLA Deadlines"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-9-4-2",
                    "name": "Automated Reminders"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-26-3-10",
            "name": "Reporting & Analytics",
            "subModules": [
              {
                "id": "sub-mod-type-26-3-10-1",
                "name": "Executive Dashboards",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-10-1-1",
                    "name": "Portfolio Health RAG"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-10-1-2",
                    "name": "Financial Variance"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-10-2",
                "name": "Resource Utilization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-10-2-1",
                    "name": "Capacity Heatmaps"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-10-2-2",
                    "name": "Skill Gap Analysis"
                  }
                ]
              },
              {
                "id": "sub-mod-type-26-3-10-3",
                "name": "Project Status Reports",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-26-3-10-3-1",
                    "name": "Milestone Burnup"
                  },
                  {
                    "id": "ss-sub-mod-type-26-3-10-3-2",
                    "name": "Executive Summary Export"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-27",
    "code": "27",
    "name": "CUSTOMER SERVICE",
    "description": "Help desk ticketing, SLA escalation engines, AI-assisted live chat, and complaint tracking",
    "productTypes": [
      {
        "id": "type-27-1",
        "name": "Help Desk",
        "mainModules": [
          {
            "id": "mod-27-1-1",
            "name": "Ticket & SLA Management",
            "subModules": [
              {
                "id": "sub-27-1-1-1",
                "name": "Support Flow",
                "subSubModules": [
                  {
                    "id": "ss-27-1-1-1-1",
                    "name": "Multi-channel ticket aggregation"
                  },
                  {
                    "id": "ss-27-1-1-1-2",
                    "name": "SLA breach alerts & escalation"
                  },
                  {
                    "id": "ss-27-1-1-1-3",
                    "name": "AI RAG knowledge base"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-27-2",
        "name": "Complaint Management",
        "mainModules": [
          {
            "id": "mod-27-2-1",
            "name": "Investigation & Redressal",
            "subModules": [
              {
                "id": "sub-27-2-1-1",
                "name": "Complaint Resolution",
                "subSubModules": [
                  {
                    "id": "ss-27-2-1-1-1",
                    "name": "Time-bound complaint tracking"
                  },
                  {
                    "id": "ss-27-2-1-1-2",
                    "name": "Post-resolution CSAT survey"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-27-3",
        "name": "Field Service Management",
        "mainModules": [
          {
            "id": "mod-type-27-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-27-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-1-1-2",
                    "name": "Technician Mobile OTP"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-1-1-3",
                    "name": "Biometric Fingerprint"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-1-2-1",
                    "name": "Dispatcher"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-1-2-2",
                    "name": "Field Service Engineer"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-1-2-3",
                    "name": "Customer Contact"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-1-2-4",
                    "name": "Service Manager"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-27-3-2",
            "name": "Dispatch & Scheduling",
            "subModules": [
              {
                "id": "sub-mod-type-27-3-2-1",
                "name": "Smart Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-2-1-1",
                    "name": "Auto-scheduling Engine"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-2-1-2",
                    "name": "Skill Matrix Matching"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-2-1-3",
                    "name": "SLA Priority"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-2-2",
                "name": "Route Optimization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-2-2-1",
                    "name": "Live Turn-by-Turn Directions"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-2-2-2",
                    "name": "Traffic Delay Adjustments"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-2-3",
                "name": "Real-Time Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-2-3-1",
                    "name": "Technician En-route Map"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-2-3-2",
                    "name": "Customer Live Tracking Link"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-2-4",
                "name": "Capacity & On-Call Rosters",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-2-4-1",
                    "name": "Emergency After-hours Roster"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-2-4-2",
                    "name": "Overtime Approval"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-27-3-3",
            "name": "Work Order Management",
            "subModules": [
              {
                "id": "sub-mod-type-27-3-3-1",
                "name": "Order Generation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-3-1-1",
                    "name": "Preventive Maintenance Calls"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-3-1-2",
                    "name": "Break-Fix Service Requests"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-3-2",
                "name": "SLA Timers",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-3-2-1",
                    "name": "Response Time Countdown"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-3-2-2",
                    "name": "Resolution SLA Breaches"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-3-3",
                "name": "Digital Checklists & SOPs",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-3-3-1",
                    "name": "Safety Protocol Inspection"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-3-3-2",
                    "name": "Mandatory Photo Uploads"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-3-4",
                "name": "Parts Requisition",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-3-4-1",
                    "name": "Van Stock Deduction"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-3-4-2",
                    "name": "Central Warehouse Express Orders"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-27-3-4",
            "name": "Customer & Installed Base",
            "subModules": [
              {
                "id": "sub-mod-type-27-3-4-1",
                "name": "Installed Base Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-4-1-1",
                    "name": "Serialized Asset Records"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-4-1-2",
                    "name": "Warranty Coverage Check"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-4-2",
                "name": "Service Contracts (AMC)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-4-2-1",
                    "name": "Contract Terms"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-4-2-2",
                    "name": "Preventive Visit Entitlements"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-4-3",
                "name": "Customer Sign-off",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-4-3-1",
                    "name": "On-screen Customer Signature"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-4-3-2",
                    "name": "Instant Digital Work Receipt"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-27-3-5",
            "name": "Van Inventory & Parts",
            "subModules": [
              {
                "id": "sub-mod-type-27-3-5-1",
                "name": "Mobile Van Stock",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-5-1-1",
                    "name": "Live Truck-inventory Counts"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-5-1-2",
                    "name": "Barcode Scanning"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-5-2",
                "name": "RMA & Return Logistics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-5-2-1",
                    "name": "Defective Part Tagging"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-5-2-2",
                    "name": "Factory Return Authorizations"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-27-3-6",
            "name": "Analytics & Reporting",
            "subModules": [
              {
                "id": "sub-mod-type-27-3-6-1",
                "name": "First-Time Fix Rate (FTFR)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-6-1-1",
                    "name": "First-visit Resolution %"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-6-1-2",
                    "name": "Repeat Call Reasons"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-6-2",
                "name": "Mean Time to Repair (MTTR)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-6-2-1",
                    "name": "Travel Time vs Wrench Time"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-6-2-2",
                    "name": "Diagnose Duration"
                  }
                ]
              },
              {
                "id": "sub-mod-type-27-3-6-3",
                "name": "Customer Satisfaction",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-27-3-6-3-1",
                    "name": "Post-job CSAT Survey"
                  },
                  {
                    "id": "ss-sub-mod-type-27-3-6-3-2",
                    "name": "NPS Ratings"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-28",
    "code": "28",
    "name": "DEVELOPER & IT",
    "description": "Bug tracking with sprint triage, API Gateway management, rate limiting, and webhook dispatchers",
    "productTypes": [
      {
        "id": "type-28-1",
        "name": "Bug Tracking",
        "mainModules": [
          {
            "id": "mod-28-1-1",
            "name": "Issue & Release Management",
            "subModules": [
              {
                "id": "sub-28-1-1-1",
                "name": "Bugs",
                "subSubModules": [
                  {
                    "id": "ss-28-1-1-1-1",
                    "name": "Severity / Blocker triage"
                  },
                  {
                    "id": "ss-28-1-1-1-2",
                    "name": "Git commit linking & auto-close"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-28-2",
        "name": "API Management",
        "mainModules": [
          {
            "id": "mod-28-2-1",
            "name": "Gateway & Documentation",
            "subModules": [
              {
                "id": "sub-28-2-1-1",
                "name": "API Control",
                "subSubModules": [
                  {
                    "id": "ss-28-2-1-1-1",
                    "name": "Rate limiting & Throttling"
                  },
                  {
                    "id": "ss-28-2-1-1-2",
                    "name": "OpenAPI 3.0 interactive console"
                  },
                  {
                    "id": "ss-28-2-1-1-3",
                    "name": "HMAC signed webhooks"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-28-3",
        "name": "DevOps & CI/CD Platform",
        "mainModules": [
          {
            "id": "mod-type-28-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-28-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-1-1-1",
                    "name": "Developer SSH Key Authentication"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-1-1-2",
                    "name": "OAuth2 (GitHub/GitLab)"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-1-1-3",
                    "name": "SAML SSO"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-1-1-4",
                    "name": "GPG Key Signing"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-1-2-1",
                    "name": "Platform Engineer"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-1-2-2",
                    "name": "DevOps Lead"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-1-2-3",
                    "name": "Software Developer"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-1-2-4",
                    "name": "Release Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-1-2-5",
                    "name": "Security Auditor"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-28-3-2",
            "name": "Source Control & Repository Management",
            "subModules": [
              {
                "id": "sub-mod-type-28-3-2-1",
                "name": "Git Repositories",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-2-1-1",
                    "name": "Branch Protection Rules"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-2-1-2",
                    "name": "Signed Commits Enforce"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-2-1-3",
                    "name": "Webhook Triggers"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-2-2",
                "name": "Code Review Workflows",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-2-2-1",
                    "name": "Required Multi-approvals"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-2-2-2",
                    "name": "Automated Inline Linter Comments"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-2-3",
                "name": "Dependency & SBOM",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-2-3-1",
                    "name": "Software Bill of Materials (SBOM)"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-2-3-2",
                    "name": "Dependency Vulnerability CVE Alerts"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-28-3-3",
            "name": "Continuous Integration (CI) Engine",
            "subModules": [
              {
                "id": "sub-mod-type-28-3-3-1",
                "name": "Pipeline Definition",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-3-1-1",
                    "name": "Declarative YAML Pipelines"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-3-1-2",
                    "name": "DAG (Directed Acyclic Graph) Execution"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-3-2",
                "name": "Distributed Build Runners",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-3-2-1",
                    "name": "Ephemeral Docker Runners"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-3-2-2",
                    "name": "ARM64 & x86_64 Matrix Builds"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-3-3",
                "name": "Test Parallelism",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-3-3-1",
                    "name": "Automated Test Sharding"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-3-3-2",
                    "name": "Flaky Test Quarantine Engine"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-3-4",
                "name": "Artifact Registries",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-3-4-1",
                    "name": "OCI Container Registry"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-3-4-2",
                    "name": "Private NPM / PyPI / Maven Package Caching"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-28-3-4",
            "name": "Continuous Deployment (CD) & GitOps",
            "subModules": [
              {
                "id": "sub-mod-type-28-3-4-1",
                "name": "Deployment Strategies",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-4-1-1",
                    "name": "Canary Gradual Rollouts"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-4-1-2",
                    "name": "Blue-Green Instant Cutover"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-4-1-3",
                    "name": "Rolling Updates"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-4-2",
                "name": "GitOps Synchronization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-4-2-1",
                    "name": "Kubernetes Manifest Reconciliation (ArgoCD style)"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-4-2-2",
                    "name": "Live Cluster Drift Correction"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-4-3",
                "name": "Progressive Delivery",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-4-3-1",
                    "name": "Automated Rollback on Error Spike"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-4-3-2",
                    "name": "Feature Flag Integration"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-4-4",
                "name": "Ephemeral Environments",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-4-4-1",
                    "name": "On-demand PR Preview Environments"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-4-4-2",
                    "name": "Auto-teardown After Merge"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-28-3-5",
            "name": "Infrastructure as Code (IaC)",
            "subModules": [
              {
                "id": "sub-mod-type-28-3-5-1",
                "name": "IaC Automation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-5-1-1",
                    "name": "Terraform / OpenTofu Plan & Apply"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-5-1-2",
                    "name": "Pulumi Multi-cloud Stacks"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-5-2",
                "name": "State & Drift Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-5-2-1",
                    "name": "Remote State Locking"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-5-2-2",
                    "name": "Scheduled Infrastructure Drift Scans"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-5-3",
                "name": "FinOps Cost Guardrails",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-5-3-1",
                    "name": "Pre-merge Cloud Cost Estimates"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-5-3-2",
                    "name": "Idle Resource Auto-shutdown"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-28-3-6",
            "name": "DevSecOps & Compliance",
            "subModules": [
              {
                "id": "sub-mod-type-28-3-6-1",
                "name": "Security Code Scanning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-6-1-1",
                    "name": "Static Application Security Testing (SAST)"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-6-1-2",
                    "name": "Container Image Vulnerability Scans"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-6-2",
                "name": "Secret Detection",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-6-2-1",
                    "name": "Pre-commit API Key Blocker"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-6-2-2",
                    "name": "HashiCorp Vault Secret Injection"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-6-3",
                "name": "Compliance Audit",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-6-3-1",
                    "name": "SOC2 / ISO 27001 Pipeline Audit Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-6-3-2",
                    "name": "Non-repudiation Build Signatures (Sigstore)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-28-3-7",
            "name": "DORA & Pipeline Observability",
            "subModules": [
              {
                "id": "sub-mod-type-28-3-7-1",
                "name": "DORA Metrics Dashboard",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-7-1-1",
                    "name": "Deployment Frequency"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-7-1-2",
                    "name": "Lead Time for Changes"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-7-1-3",
                    "name": "Change Failure Rate"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-7-1-4",
                    "name": "Time to Restore Service (MTTR)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-28-3-7-2",
                "name": "Runner Telemetry",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-28-3-7-2-1",
                    "name": "Queue Latency Bottlenecks"
                  },
                  {
                    "id": "ss-sub-mod-type-28-3-7-2-2",
                    "name": "Build Duration Trends"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-29",
    "code": "29",
    "name": "CYBERSECURITY",
    "description": "Identity & Access Management (IAM), SSO, Active Directory sync, and SIEM security monitoring",
    "productTypes": [
      {
        "id": "type-29-1",
        "name": "Identity & Access Management (IAM)",
        "mainModules": [
          {
            "id": "mod-29-1-1",
            "name": "Identity & Policies",
            "subModules": [
              {
                "id": "sub-29-1-1-1",
                "name": "Access Control",
                "subSubModules": [
                  {
                    "id": "ss-29-1-1-1-1",
                    "name": "SAML / OAuth2 / Okta SSO"
                  },
                  {
                    "id": "ss-29-1-1-1-2",
                    "name": "SCIM automated user provisioning"
                  },
                  {
                    "id": "ss-29-1-1-1-3",
                    "name": "Quarterly access reviews"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-29-2",
        "name": "Security Monitoring",
        "mainModules": [
          {
            "id": "mod-29-2-1",
            "name": "Threat Detection & SIEM",
            "subModules": [
              {
                "id": "sub-29-2-1-1",
                "name": "Monitoring",
                "subSubModules": [
                  {
                    "id": "ss-29-2-1-1-1",
                    "name": "Centralized log aggregation (ELK)"
                  },
                  {
                    "id": "ss-29-2-1-1-2",
                    "name": "CVSS vulnerability scans"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-29-3",
        "name": "Cyber Threat Intelligence & SOAR",
        "mainModules": [
          {
            "id": "mod-type-29-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-29-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-1-1-1",
                    "name": "FIDO2 Hardware Key"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-1-1-2",
                    "name": "Duo Push MFA"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-1-1-3",
                    "name": "SOC Analyst Auth"
                  }
                ]
              },
              {
                "id": "sub-mod-type-29-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-1-2-1",
                    "name": "SOC Tier 1/2 Analyst"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-1-2-2",
                    "name": "Threat Hunter"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-1-2-3",
                    "name": "Incident Commander"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-1-2-4",
                    "name": "CISO"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-29-3-2",
            "name": "Threat Intelligence Feeds",
            "subModules": [
              {
                "id": "sub-mod-type-29-3-2-1",
                "name": "Indicators of Compromise (IOC)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-2-1-1",
                    "name": "Malicious IP Feeds"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-2-1-2",
                    "name": "SHA-256 Malware Hashes"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-2-1-3",
                    "name": "Phishing URL Watchlists"
                  }
                ]
              },
              {
                "id": "sub-mod-type-29-3-2-2",
                "name": "Threat Actor Profiling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-2-2-1",
                    "name": "MITRE ATT&CK Matrix Mapping"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-2-2-2",
                    "name": "APT Group Tactics (TTPs)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-29-3-2-3",
                "name": "Dark Web Monitoring",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-2-3-1",
                    "name": "Leaked Corporate Credentials"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-2-3-2",
                    "name": "Brand Impersonation Alerts"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-29-3-3",
            "name": "Security Orchestration & Automation (SOAR)",
            "subModules": [
              {
                "id": "sub-mod-type-29-3-3-1",
                "name": "Automated Playbooks",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-3-1-1",
                    "name": "Phishing Email Auto-triage"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-3-1-2",
                    "name": "Compromised Host Isolation"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-3-1-3",
                    "name": "Firewall IP Block Injection"
                  }
                ]
              },
              {
                "id": "sub-mod-type-29-3-3-2",
                "name": "Case Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-3-2-1",
                    "name": "Incident Timelines"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-3-2-2",
                    "name": "Digital Forensic Chain of Custody"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-29-3-4",
            "name": "Vulnerability Intelligence",
            "subModules": [
              {
                "id": "sub-mod-type-29-3-4-1",
                "name": "Exploit Prediction",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-4-1-1",
                    "name": "EPSS Exploit Prediction Scores"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-4-1-2",
                    "name": "Zero-day In-the-wild Exploitation Alerts"
                  }
                ]
              },
              {
                "id": "sub-mod-type-29-3-4-2",
                "name": "Asset Exposure Correlation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-4-2-1",
                    "name": "Vulnerabilities Matched with Internal IP Inventory"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-29-3-5",
            "name": "Compliance & Cyber Metrics",
            "subModules": [
              {
                "id": "sub-mod-type-29-3-5-1",
                "name": "Breach Notification",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-5-1-1",
                    "name": "Regulatory 72-Hour Alert Generation (GDPR / CERT-In)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-29-3-5-2",
                "name": "Executive Cyber Risk Metrics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-29-3-5-2-1",
                    "name": "Mean Time to Detect (MTTD)"
                  },
                  {
                    "id": "ss-sub-mod-type-29-3-5-2-2",
                    "name": "Mean Time to Respond (MTTR)"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-30",
    "code": "30",
    "name": "CLOUD & INFRASTRUCTURE",
    "description": "Cloud resource cost management, container orchestration (Kubernetes), and multi-cloud governance",
    "productTypes": [
      {
        "id": "type-30-1",
        "name": "Cloud Management",
        "mainModules": [
          {
            "id": "mod-30-1-1",
            "name": "Compute, Storage & Cost",
            "subModules": [
              {
                "id": "sub-30-1-1-1",
                "name": "Resources",
                "subSubModules": [
                  {
                    "id": "ss-30-1-1-1-1",
                    "name": "AWS / GCP / Azure VM provisioning"
                  },
                  {
                    "id": "ss-30-1-1-1-2",
                    "name": "Auto-scaling policies"
                  },
                  {
                    "id": "ss-30-1-1-1-3",
                    "name": "Cost anomaly & budget alerts"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-30-2",
        "name": "Container Management (Kubernetes)",
        "mainModules": [
          {
            "id": "mod-30-2-1",
            "name": "Cluster & Workloads",
            "subModules": [
              {
                "id": "sub-30-2-1-1",
                "name": "K8s Core",
                "subSubModules": [
                  {
                    "id": "ss-30-2-1-1-1",
                    "name": "EKS / GKE / AKS cluster management"
                  },
                  {
                    "id": "ss-30-2-1-1-2",
                    "name": "Canary rollouts & Service mesh"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-31",
    "code": "31",
    "name": "IOT & SMART SYSTEMS",
    "description": "IoT sensor telemetry, MQTT brokers, firmware OTA updates, and smart building HVAC control",
    "productTypes": [
      {
        "id": "type-31-1",
        "name": "IoT Device Management",
        "mainModules": [
          {
            "id": "mod-31-1-1",
            "name": "Telemetry & Device Control",
            "subModules": [
              {
                "id": "sub-31-1-1-1",
                "name": "Device Hub",
                "subSubModules": [
                  {
                    "id": "ss-31-1-1-1-1",
                    "name": "MQTT / CoAP sensor ingestion"
                  },
                  {
                    "id": "ss-31-1-1-1-2",
                    "name": "Firmware OTA updates"
                  },
                  {
                    "id": "ss-31-1-1-1-3",
                    "name": "Time-series telemetry storage"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-31-2",
        "name": "Smart Building",
        "mainModules": [
          {
            "id": "mod-31-2-1",
            "name": "HVAC & Energy Monitoring",
            "subModules": [
              {
                "id": "sub-31-2-1-1",
                "name": "Automation",
                "subSubModules": [
                  {
                    "id": "ss-31-2-1-1-1",
                    "name": "Smart HVAC & Lighting rules"
                  },
                  {
                    "id": "ss-31-2-1-1-2",
                    "name": "People counting occupancy sensors"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-32",
    "code": "32",
    "name": "DATA & ANALYTICS",
    "description": "Business Intelligence (BI) dashboards, Star Schema data modeling, and ML predictive analytics",
    "productTypes": [
      {
        "id": "type-32-1",
        "name": "Business Intelligence (BI)",
        "mainModules": [
          {
            "id": "mod-32-1-1",
            "name": "Connectors & Visualization",
            "subModules": [
              {
                "id": "sub-32-1-1-1",
                "name": "BI Engine",
                "subSubModules": [
                  {
                    "id": "ss-32-1-1-1-1",
                    "name": "Snowflake / BigQuery / SQL connectors"
                  },
                  {
                    "id": "ss-32-1-1-1-2",
                    "name": "Interactive drill-down dashboards"
                  },
                  {
                    "id": "ss-32-1-1-1-3",
                    "name": "Scheduled PDF report exports"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-32-2",
        "name": "Predictive Analytics",
        "mainModules": [
          {
            "id": "mod-32-2-1",
            "name": "ML Models & Tracking",
            "subModules": [
              {
                "id": "sub-32-2-1-1",
                "name": "ML Pipeline",
                "subSubModules": [
                  {
                    "id": "ss-32-2-1-1-1",
                    "name": "Scikit / PyTorch model registry"
                  },
                  {
                    "id": "ss-32-2-1-1-2",
                    "name": "SHAP feature explainability"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-32-3",
        "name": "AI & Generative Model Operations (LLMOps)",
        "mainModules": [
          {
            "id": "mod-type-32-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-32-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-1-1-1",
                    "name": "Developer API Keys"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-1-1-2",
                    "name": "SSO (Okta/Google)"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-1-1-3",
                    "name": "IAM Service Accounts"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-1-2-1",
                    "name": "AI Engineer"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-1-2-2",
                    "name": "Data Scientist"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-1-2-3",
                    "name": "Prompt Engineer"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-1-2-4",
                    "name": "AI Compliance Auditor"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-32-3-2",
            "name": "Model Registry & Lifecycle",
            "subModules": [
              {
                "id": "sub-mod-type-32-3-2-1",
                "name": "Model Catalog",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-2-1-1",
                    "name": "Versioned Checkpoints"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-2-1-2",
                    "name": "Model Cards"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-2-1-3",
                    "name": "Quantized Formats (GGUF/AWQ/GPTQ)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-2-2",
                "name": "Fine-Tuning Pipelines",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-2-2-1",
                    "name": "LoRA / QLoRA Training Jobs"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-2-2-2",
                    "name": "Hyperparameter Sweep Tracking"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-2-3",
                "name": "Benchmark Evaluations",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-2-3-1",
                    "name": "Automated MMLU / GSM8K Eval"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-2-3-2",
                    "name": "Custom Task Domain Evals"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-32-3-3",
            "name": "RAG & Vector Knowledge Systems",
            "subModules": [
              {
                "id": "sub-mod-type-32-3-3-1",
                "name": "Vector Database Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-3-1-1",
                    "name": "Hybrid Dense & Sparse Search"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-3-1-2",
                    "name": "Dynamic Chunking Strategies"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-3-2",
                "name": "Document Parsing Pipelines",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-3-2-1",
                    "name": "Multi-modal OCR Parsing"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-3-2-2",
                    "name": "Table & Layout Extraction"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-3-3",
                "name": "Retrieval & Reranking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-3-3-1",
                    "name": "Cross-encoder Reranking"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-3-3-2",
                    "name": "Semantic Caching for Fast Response"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-32-3-4",
            "name": "Agentic Workflows & Safety Guardrails",
            "subModules": [
              {
                "id": "sub-mod-type-32-3-4-1",
                "name": "Multi-Agent Orchestration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-4-1-1",
                    "name": "Tool Use & Function Calling"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-4-1-2",
                    "name": "LangChain / LlamaIndex Workflows"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-4-2",
                "name": "Safety & Prompt Defense",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-4-2-1",
                    "name": "PII Redaction Engine"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-4-2-2",
                    "name": "Prompt Injection Firewall"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-4-2-3",
                    "name": "Hallucination Scorer"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-4-3",
                "name": "Human-in-the-Loop",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-4-3-1",
                    "name": "Reviewer Moderation Queues"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-4-3-2",
                    "name": "RLHF Feedback Annotation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-32-3-5",
            "name": "Telemetry & Governance",
            "subModules": [
              {
                "id": "sub-mod-type-32-3-5-1",
                "name": "Token Usage & Cost Analytics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-5-1-1",
                    "name": "Token Count per Query"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-5-1-2",
                    "name": "Cost Allocation by Tenant/Model"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-5-2",
                "name": "Latency & TTFT Monitoring",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-5-2-1",
                    "name": "Time to First Token (TTFT)"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-5-2-2",
                    "name": "Tokens per Second Velocity"
                  }
                ]
              },
              {
                "id": "sub-mod-type-32-3-5-3",
                "name": "AI Ethics & Audit",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-32-3-5-3-1",
                    "name": "Bias & Fairness Audits"
                  },
                  {
                    "id": "ss-sub-mod-type-32-3-5-3-2",
                    "name": "EU AI Act Compliance Logging"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-33",
    "code": "33",
    "name": "COMMUNICATION",
    "description": "Unified communication, WebRTC VoIP calls, cloud PBX, and multi-party video conferencing",
    "productTypes": [
      {
        "id": "type-33-1",
        "name": "Unified Communications",
        "mainModules": [
          {
            "id": "mod-33-1-1",
            "name": "Voice, Video & Channels",
            "subModules": [
              {
                "id": "sub-33-1-1-1",
                "name": "Comm Hub",
                "subSubModules": [
                  {
                    "id": "ss-33-1-1-1-1",
                    "name": "WebRTC VoIP browser calling"
                  },
                  {
                    "id": "ss-33-1-1-1-2",
                    "name": "Cloud PBX & IVR auto-attendant"
                  },
                  {
                    "id": "ss-33-1-1-1-3",
                    "name": "Multi-party video conferencing"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-33-2",
        "name": "Telecom Operations & BSS/OSS",
        "mainModules": [
          {
            "id": "mod-type-33-2-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-33-2-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-1-1-1",
                    "name": "Telco SSO"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-1-1-2",
                    "name": "SIM Agent Biometric"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-1-1-3",
                    "name": "Username-Password"
                  }
                ]
              },
              {
                "id": "sub-mod-type-33-2-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-1-2-1",
                    "name": "NOC Engineer"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-1-2-2",
                    "name": "Customer Care Rep"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-1-2-3",
                    "name": "Retail SIM Agent"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-1-2-4",
                    "name": "Network Architect"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-33-2-2",
            "name": "Business Support Systems (BSS)",
            "subModules": [
              {
                "id": "sub-mod-type-33-2-2-1",
                "name": "Subscriber Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-2-1-1",
                    "name": "Prepaid / Postpaid Account Lifecycle"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-2-1-2",
                    "name": "SIM / eSIM Over-the-air Provisioning"
                  }
                ]
              },
              {
                "id": "sub-mod-type-33-2-2-2",
                "name": "Convergent Billing Engine",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-2-2-1",
                    "name": "Real-time Data Rating"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-2-2-2",
                    "name": "Roaming Tariff Slabs"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-2-2-3",
                    "name": "Invoice Generation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-33-2-2-3",
                "name": "Self-Care Portal",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-2-3-1",
                    "name": "Subscriber Usage Meters"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-2-3-2",
                    "name": "Instant Top-up Gateway"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-2-3-3",
                    "name": "Value-Added Services (VAS)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-33-2-3",
            "name": "Operations Support Systems (OSS)",
            "subModules": [
              {
                "id": "sub-mod-type-33-2-3-1",
                "name": "Network Inventory",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-3-1-1",
                    "name": "Base Station (eNodeB/gNodeB) Registry"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-3-1-2",
                    "name": "Fiber Cable Route GIS Mapping"
                  }
                ]
              },
              {
                "id": "sub-mod-type-33-2-3-2",
                "name": "Service Provisioning",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-3-2-1",
                    "name": "5G Network Slicing Configuration"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-3-2-2",
                    "name": "Bandwidth-on-Demand Provisioning"
                  }
                ]
              },
              {
                "id": "sub-mod-type-33-2-3-3",
                "name": "Fault Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-3-3-1",
                    "name": "Alarms Root-cause Correlation"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-3-3-2",
                    "name": "Automated Field Trouble Ticket Dispatch"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-33-2-4",
            "name": "Performance & QoS",
            "subModules": [
              {
                "id": "sub-mod-type-33-2-4-1",
                "name": "Call Detail Records (CDR)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-4-1-1",
                    "name": "High-speed CDR Mediation"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-4-1-2",
                    "name": "Interconnect Carrier Settlement"
                  }
                ]
              },
              {
                "id": "sub-mod-type-33-2-4-2",
                "name": "Cell Congestion Analytics",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-33-2-4-2-1",
                    "name": "Peak Hour Bandwidth Utilization"
                  },
                  {
                    "id": "ss-sub-mod-type-33-2-4-2-2",
                    "name": "Dropped Call Rate (DCR) Analysis"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-34",
    "code": "34",
    "name": "BOOKING & SCHEDULING",
    "description": "Online appointment booking, provider slot allocation, Google/Outlook calendar 2-way sync",
    "productTypes": [
      {
        "id": "type-34-1",
        "name": "Appointment Booking",
        "mainModules": [
          {
            "id": "mod-34-1-1",
            "name": "Booking & Availability",
            "subModules": [
              {
                "id": "sub-34-1-1-1",
                "name": "Scheduler",
                "subSubModules": [
                  {
                    "id": "ss-34-1-1-1-1",
                    "name": "Interactive calendar free slots"
                  },
                  {
                    "id": "ss-34-1-1-1-2",
                    "name": "Google & Outlook 2-way calendar sync"
                  },
                  {
                    "id": "ss-34-1-1-1-3",
                    "name": "SMS / Email reminders (24h/1h)"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-35",
    "code": "35",
    "name": "EVENT MANAGEMENT",
    "description": "Event ticketing, tiered pricing, QR code check-in badges, and speaker schedule management",
    "productTypes": [
      {
        "id": "type-35-1",
        "name": "Event Management Platform",
        "mainModules": [
          {
            "id": "mod-35-1-1",
            "name": "Tickets & Check-in",
            "subModules": [
              {
                "id": "sub-35-1-1-1",
                "name": "Event Hub",
                "subSubModules": [
                  {
                    "id": "ss-35-1-1-1-1",
                    "name": "Early bird / VIP ticket tiers"
                  },
                  {
                    "id": "ss-35-1-1-1-2",
                    "name": "QR code digital badge check-in"
                  },
                  {
                    "id": "ss-35-1-1-1-3",
                    "name": "Speaker session agenda builder"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-36",
    "code": "36",
    "name": "CONTENT & WEB PLATFORMS",
    "description": "Headless & WYSIWYG CMS website builders, SEO schema generation, and media asset libraries",
    "productTypes": [
      {
        "id": "type-36-1",
        "name": "CMS Website",
        "mainModules": [
          {
            "id": "mod-36-1-1",
            "name": "Page & Blog Builder",
            "subModules": [
              {
                "id": "sub-36-1-1-1",
                "name": "CMS Engine",
                "subSubModules": [
                  {
                    "id": "ss-36-1-1-1-1",
                    "name": "Block / Markdown visual editor"
                  },
                  {
                    "id": "ss-36-1-1-1-2",
                    "name": "Automated XML sitemap & OpenGraph"
                  },
                  {
                    "id": "ss-36-1-1-1-3",
                    "name": "WebP / AVIF media optimization"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-37",
    "code": "37",
    "name": "INDUSTRY-SPECIFIC SOLUTIONS",
    "description": "Specialized ERPs for Textile/Garments, Pharmaceuticals (Cold Chain/Schedule H), and Food Manufacturing",
    "productTypes": [
      {
        "id": "type-37-1",
        "name": "Textile / Garment ERP",
        "mainModules": [
          {
            "id": "mod-37-1-1",
            "name": "Fabric & Production",
            "subModules": [
              {
                "id": "sub-37-1-1-1",
                "name": "Garment Flow",
                "subSubModules": [
                  {
                    "id": "ss-37-1-1-1-1",
                    "name": "Yarn count / Fabric GSM tracking"
                  },
                  {
                    "id": "ss-37-1-1-1-2",
                    "name": "Marker planning & cutting layers"
                  },
                  {
                    "id": "ss-37-1-1-1-3",
                    "name": "AQL inspection & export packing lists"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-37-2",
        "name": "Pharmaceutical ERP",
        "mainModules": [
          {
            "id": "mod-37-2-1",
            "name": "Batch & Cold Chain",
            "subModules": [
              {
                "id": "sub-37-2-1-1",
                "name": "Pharma Compliance",
                "subSubModules": [
                  {
                    "id": "ss-37-2-1-1-1",
                    "name": "Cold chain temperature monitoring (2-8°C)"
                  },
                  {
                    "id": "ss-37-2-1-1-2",
                    "name": "Schedule H narcotics tracking"
                  },
                  {
                    "id": "ss-37-2-1-1-3",
                    "name": "Drug license & recall management"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-37-3",
        "name": "Food Manufacturing ERP",
        "mainModules": [
          {
            "id": "mod-37-3-1",
            "name": "Recipe & FSSAI Compliance",
            "subModules": [
              {
                "id": "sub-37-3-1-1",
                "name": "Food Operations",
                "subSubModules": [
                  {
                    "id": "ss-37-3-1-1-1",
                    "name": "Recipe BOM percentage & pasteurization"
                  },
                  {
                    "id": "ss-37-3-1-1-2",
                    "name": "FSSAI compliance & pathogen testing"
                  },
                  {
                    "id": "ss-37-3-1-1-3",
                    "name": "FEFO refrigerated dispatch"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-37-4",
        "name": "Mining & Extractive Industry ERP",
        "mainModules": [
          {
            "id": "mod-type-37-4-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-37-4-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-1-1-2",
                    "name": "Biometric Mine Entry"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-1-1-3",
                    "name": "RFID Hard Hat Tag"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-1-2-1",
                    "name": "Mine General Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-1-2-2",
                    "name": "Chief Geologist"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-1-2-3",
                    "name": "Drill & Blast Engineer"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-1-2-4",
                    "name": "Safety Superintendent"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-1-2-5",
                    "name": "Process Plant Manager"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-4-2",
            "name": "Exploration & Geology",
            "subModules": [
              {
                "id": "sub-mod-type-37-4-2-1",
                "name": "Geological Modeling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-2-1-1",
                    "name": "Drill Hole Assays Database"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-2-1-2",
                    "name": "3D Orebody Wireframes"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-2-1-3",
                    "name": "Stratigraphy"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-2-2",
                "name": "Resource Estimation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-2-2-1",
                    "name": "Kriging & Block Modeling"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-2-2-2",
                    "name": "Grade Cut-off Calculations"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-2-3",
                "name": "Pit Optimization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-2-3-1",
                    "name": "Ultimate Pit Limit Calculations"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-2-3-2",
                    "name": "Pushback Phase Sequencing"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-4-3",
            "name": "Mine Operations & Fleet Dispatch",
            "subModules": [
              {
                "id": "sub-mod-type-37-4-3-1",
                "name": "Drill & Blast",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-3-1-1",
                    "name": "Blast Hole Pattern Design"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-3-1-2",
                    "name": "Explosives Loading Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-3-1-3",
                    "name": "Vibration Monitoring"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-3-2",
                "name": "Fleet Dispatching",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-3-2-1",
                    "name": "Haul Truck Automated Assignment"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-3-2-2",
                    "name": "Shovel Productivity Optimization"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-3-3",
                "name": "Stockpile Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-3-3-1",
                    "name": "Run of Mine (ROM) Pad Blending"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-3-3-2",
                    "name": "Grade Reclaiming Tracking"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-3-4",
                "name": "Haulage Optimization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-3-4-1",
                    "name": "Cycle Time Telemetry"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-3-4-2",
                    "name": "Weighbridge Payload Sensors"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-4-4",
            "name": "Processing Plant Operations",
            "subModules": [
              {
                "id": "sub-mod-type-37-4-4-1",
                "name": "Crushing & Grinding",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-4-1-1",
                    "name": "Crusher Throughput Rates"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-4-1-2",
                    "name": "Sag / Ball Mill Power Draw"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-4-2",
                "name": "Beneficiation & Recovery",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-4-2-1",
                    "name": "Flotation Circuit Recovery %"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-4-2-2",
                    "name": "Chemical Reagent Consumption"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-4-3",
                "name": "Tailings Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-4-3-1",
                    "name": "Tailings Dam Piezometer Levels"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-4-3-2",
                    "name": "Slurry Density Monitoring"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-4-5",
            "name": "Heavy Equipment Maintenance",
            "subModules": [
              {
                "id": "sub-mod-type-37-4-5-1",
                "name": "Asset Health Telemetry",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-5-1-1",
                    "name": "Haul Truck Engine Temperatures"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-5-1-2",
                    "name": "Vibration & Oil Spectral Analysis"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-5-2",
                "name": "Maintenance Work Orders",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-5-2-1",
                    "name": "Planned Component Changeouts"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-5-2-2",
                    "name": "Track & Tire Wear Tracking"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-4-6",
            "name": "Health, Safety & Environment (HSE)",
            "subModules": [
              {
                "id": "sub-mod-type-37-4-6-1",
                "name": "Underground Mine Safety",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-6-1-1",
                    "name": "Atmospheric Gas Sensors (Methane/CO)"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-6-1-2",
                    "name": "Ventilation on Demand"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-6-2",
                "name": "Incident Reporting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-6-2-1",
                    "name": "Lost Time Injury Frequency Rate (LTIFR)"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-6-2-2",
                    "name": "Near Miss Audits"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-6-3",
                "name": "Environmental Rehabilitation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-6-3-1",
                    "name": "Acid Rock Drainage (ARD) Mitigation"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-6-3-2",
                    "name": "Revegetation Tracking"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-4-7",
            "name": "Mining Commercials & Costing",
            "subModules": [
              {
                "id": "sub-mod-type-37-4-7-1",
                "name": "Production Costing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-7-1-1",
                    "name": "Cash Cost (C1)"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-7-1-2",
                    "name": "All-in Sustaining Costs (AISC) per Tonne"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-4-7-2",
                "name": "Concentrate Sales",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-4-7-2-1",
                    "name": "Off-take Agreement Invoicing"
                  },
                  {
                    "id": "ss-sub-mod-type-37-4-7-2-2",
                    "name": "Smelter Penalty & Deduction Calculations"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-37-5",
        "name": "Renewable Energy Management",
        "mainModules": [
          {
            "id": "mod-type-37-5-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-37-5-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-1-1-2",
                    "name": "SSO"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-1-1-3",
                    "name": "Technician Field App"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-1-2-1",
                    "name": "Solar/Wind Plant Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-1-2-2",
                    "name": "SCADA Performance Engineer"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-1-2-3",
                    "name": "Asset Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-1-2-4",
                    "name": "Grid Dispatcher"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-5-2",
            "name": "Renewable Asset Management",
            "subModules": [
              {
                "id": "sub-mod-type-37-5-2-1",
                "name": "Solar PV Infrastructure",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-2-1-1",
                    "name": "String Inverter Telemetry"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-2-1-2",
                    "name": "Tracker Angle Positioning"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-2-1-3",
                    "name": "PV Panel Degradation"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-2-2",
                "name": "Wind Turbine Fleet",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-2-2-1",
                    "name": "Nacelle Yaw Systems"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-2-2-2",
                    "name": "Blade Pitch Calibration"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-2-2-3",
                    "name": "Gearbox Vibration Telemetry"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-2-3",
                "name": "Battery Storage (BESS)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-2-3-1",
                    "name": "State of Charge (SOC)"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-2-3-2",
                    "name": "State of Health (SOH)"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-2-3-3",
                    "name": "Thermal Management"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-5-3",
            "name": "SCADA Telemetry & Monitoring",
            "subModules": [
              {
                "id": "sub-mod-type-37-5-3-1",
                "name": "Real-Time Telemetry",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-3-1-1",
                    "name": "Active/Reactive Power (MW/MVAR)"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-3-1-2",
                    "name": "Grid Frequency & Voltage"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-3-1-3",
                    "name": "Solar Irradiance (GHI)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-3-2",
                "name": "Weather Station Integration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-3-2-1",
                    "name": "Pyranometer Radiation"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-3-2-2",
                    "name": "Anemometer Wind Speed"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-3-2-3",
                    "name": "Ambient/Module Temperature"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-3-3",
                "name": "Remote Control & Curtailment",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-3-3-1",
                    "name": "Grid Disconnect Commands"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-3-3-2",
                    "name": "Power Factor Inverter Regulation"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-5-4",
            "name": "Operations & Maintenance (O&M)",
            "subModules": [
              {
                "id": "sub-mod-type-37-5-4-1",
                "name": "Predictive O&M",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-4-1-1",
                    "name": "Drone Thermal Infrared Inspection"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-4-1-2",
                    "name": "Hotspot Detection"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-4-1-3",
                    "name": "Blade Delamination Flags"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-4-2",
                "name": "Soiling & Cleaning Schedules",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-4-2-1",
                    "name": "Soiling Ratio Losses"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-4-2-2",
                    "name": "Automated Robotic Cleaning Dispatches"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-4-3",
                "name": "Work Order Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-4-3-1",
                    "name": "Inverter Trip Dispatches"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-4-3-2",
                    "name": "Substation Transformer Preventive Maintenance"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-5-5",
            "name": "Grid Compliance & Trading",
            "subModules": [
              {
                "id": "sub-mod-type-37-5-5-1",
                "name": "Grid Code Adherence",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-5-1-1",
                    "name": "Low Voltage Ride-Through (LVRT)"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-5-1-2",
                    "name": "Harmonics Compliance"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-5-2",
                "name": "Power Purchase Agreements (PPA)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-5-2-1",
                    "name": "Tariff Generation Billing"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-5-2-2",
                    "name": "Time-of-Day (ToD) Export Slabs"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-5-3",
                "name": "Generation Forecasting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-5-3-1",
                    "name": "AI Weather-based Generation Forecasting"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-5-3-2",
                    "name": "Deviation Settlement (DSM)"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-37-5-6",
            "name": "Performance & ESG Analytics",
            "subModules": [
              {
                "id": "sub-mod-type-37-5-6-1",
                "name": "Performance Ratio (PR)",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-6-1-1",
                    "name": "Actual vs Expected PR %"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-6-1-2",
                    "name": "Availability Factor"
                  }
                ]
              },
              {
                "id": "sub-mod-type-37-5-6-2",
                "name": "Carbon Avoidance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-37-5-6-2-1",
                    "name": "Metric Tonnes CO2 Offsets"
                  },
                  {
                    "id": "ss-sub-mod-type-37-5-6-2-2",
                    "name": "Renewable Energy Certificates (RECs)"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "cat-38",
    "code": "38",
    "name": "CONSUMER & MOBILE APPLICATIONS",
    "description": "On-demand food delivery platforms, multi-restaurant menus, live courier GPS, and surge pricing",
    "productTypes": [
      {
        "id": "type-38-1",
        "name": "Food Delivery",
        "mainModules": [
          {
            "id": "mod-38-1-1",
            "name": "Menu & Delivery Dispatch",
            "subModules": [
              {
                "id": "sub-38-1-1-1",
                "name": "Delivery App",
                "subSubModules": [
                  {
                    "id": "ss-38-1-1-1-1",
                    "name": "Dynamic restaurant menu & add-ons"
                  },
                  {
                    "id": "ss-38-1-1-1-2",
                    "name": "Real-time courier GPS tracking"
                  },
                  {
                    "id": "ss-38-1-1-1-3",
                    "name": "Order status (Cooking/Dispatched)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-38-2",
        "name": "Gym & Fitness Management",
        "mainModules": [
          {
            "id": "mod-type-38-2-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-38-2-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-1-1-1",
                    "name": "Mobile App QR Code"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-1-1-2",
                    "name": "Biometric Fingerprint"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-1-1-3",
                    "name": "Username-Password"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-1-2-1",
                    "name": "Gym Member"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-1-2-2",
                    "name": "Certified Trainer"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-1-2-3",
                    "name": "Floor Manager"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-1-2-4",
                    "name": "General Admin"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-2-2",
            "name": "Member Management",
            "subModules": [
              {
                "id": "sub-mod-type-38-2-2-1",
                "name": "Member Profiles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-2-1-1",
                    "name": "Fitness Goals"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-2-1-2",
                    "name": "PAR-Q Health Clearance"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-2-1-3",
                    "name": "Emergency Contact"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-2-2",
                "name": "Membership Plans",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-2-2-1",
                    "name": "Annual Prepaid"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-2-2-2",
                    "name": "Monthly Recurring"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-2-2-3",
                    "name": "Class-only Passes"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-2-2-4",
                    "name": "Off-peak Access"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-2-3",
                "name": "Access Control",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-2-3-1",
                    "name": "RFID Turnstiles"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-2-3-2",
                    "name": "Face Recognition Gates"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-2-3-3",
                    "name": "Mobile NFC Tap"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-2-4",
                "name": "Check-in/out Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-2-4-1",
                    "name": "Peak Hour Footfall Heatmap"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-2-4-2",
                    "name": "Visit Frequency Logs"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-2-3",
            "name": "Class & Schedule Management",
            "subModules": [
              {
                "id": "sub-mod-type-38-2-3-1",
                "name": "Class Catalog",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-3-1-1",
                    "name": "HIIT"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-3-1-2",
                    "name": "Yoga"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-3-1-3",
                    "name": "Indoor Cycling / Spin"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-3-1-4",
                    "name": "CrossFit"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-3-1-5",
                    "name": "Pilates"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-3-2",
                "name": "Instructor Scheduling",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-3-2-1",
                    "name": "Instructor Roster"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-3-2-2",
                    "name": "Substitute Teacher Assignment"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-3-3",
                "name": "Capacity Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-3-3-1",
                    "name": "Studio Slot Reservations"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-3-3-2",
                    "name": "Live Waitlist Queuing"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-3-4",
                "name": "Class Attendance Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-3-4-1",
                    "name": "Mobile Check-in"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-3-4-2",
                    "name": "No-show Penalty Enforcement"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-2-4",
            "name": "Trainer Management",
            "subModules": [
              {
                "id": "sub-mod-type-38-2-4-1",
                "name": "Trainer Profiles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-4-1-1",
                    "name": "Specializations"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-4-1-2",
                    "name": "Certifications & Expiry"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-4-1-3",
                    "name": "Client Reviews"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-4-2",
                "name": "Session Booking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-4-2-1",
                    "name": "1-on-1 Personal Training"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-4-2-2",
                    "name": "Small Group Coaching Slots"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-4-3",
                "name": "Performance Tracking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-4-3-1",
                    "name": "Client Body Composition Changes"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-4-3-2",
                    "name": "Trainer Revenue Share"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-2-5",
            "name": "Equipment & Inventory",
            "subModules": [
              {
                "id": "sub-mod-type-38-2-5-1",
                "name": "Equipment Maintenance",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-5-1-1",
                    "name": "Cardio Machine Odometer"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-5-1-2",
                    "name": "Cable & Pulley Inspection Schedules"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-5-2",
                "name": "Retail & Consumables",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-5-2-1",
                    "name": "Protein Supplements"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-5-2-2",
                    "name": "Hydration Drinks"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-5-2-3",
                    "name": "Branded Apparel"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-5-3",
                "name": "Vendor Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-5-3-1",
                    "name": "OEM Warranty Contracts"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-5-3-2",
                    "name": "Equipment Service Tickets"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-2-6",
            "name": "Billing & Payments",
            "subModules": [
              {
                "id": "sub-mod-type-38-2-6-1",
                "name": "Recurring Billing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-6-1-1",
                    "name": "Auto-debit E-mandates"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-6-1-2",
                    "name": "Credit Card Tokenization"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-6-2",
                "name": "Dunning Management",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-6-2-1",
                    "name": "Automated Retries on Failed Billing"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-6-2-2",
                    "name": "Grace Period Notifications"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-6-3",
                "name": "POS Integration",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-6-3-1",
                    "name": "Smoothie Bar Sales"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-6-3-2",
                    "name": "Pro Shop Checkout"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-2-7",
            "name": "Analytics & Reports",
            "subModules": [
              {
                "id": "sub-mod-type-38-2-7-1",
                "name": "Membership Growth",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-7-1-1",
                    "name": "New Signups vs Churn Rate"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-7-1-2",
                    "name": "Member Lifetime Value (LTV)"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-2-7-2",
                "name": "Facility Utilization",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-2-7-2-1",
                    "name": "Busiest Hours Analysis"
                  },
                  {
                    "id": "ss-sub-mod-type-38-2-7-2-2",
                    "name": "Popular Class Rankings"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "type-38-3",
        "name": "Salon & Spa Management (Expanded)",
        "mainModules": [
          {
            "id": "mod-type-38-3-1",
            "name": "User Management",
            "subModules": [
              {
                "id": "sub-mod-type-38-3-1-1",
                "name": "Login Methods",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-1-1-1",
                    "name": "Username-Password"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-1-1-2",
                    "name": "Client Phone OTP"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-1-1-3",
                    "name": "Social Login"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-1-2",
                "name": "User Roles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-1-2-1",
                    "name": "Master Stylist"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-1-2-2",
                    "name": "Colorist"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-1-2-3",
                    "name": "Nail Technician"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-1-2-4",
                    "name": "Esthetician"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-1-2-5",
                    "name": "Salon Owner"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-3-2",
            "name": "Service & Package Management",
            "subModules": [
              {
                "id": "sub-mod-type-38-3-2-1",
                "name": "Service Menu",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-2-1-1",
                    "name": "Hair Styling & Cut"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-2-1-2",
                    "name": "Balayage & Color Formulation"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-2-1-3",
                    "name": "Manicure/Pedicure"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-2-1-4",
                    "name": "Bridal Packages"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-2-2",
                "name": "Resource Allocation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-2-2-1",
                    "name": "Styling Chairs"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-2-2-2",
                    "name": "Shampoo Bowls"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-2-2-3",
                    "name": "Spa Cabins"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-2-3",
                "name": "Multi-Staff Service Booking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-2-3-1",
                    "name": "Synchronized Dual Services (Hair + Nails)"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-2-3-2",
                    "name": "Assistant Assignments"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-3-3",
            "name": "Appointment Scheduling",
            "subModules": [
              {
                "id": "sub-mod-type-38-3-3-1",
                "name": "Smart Calendar",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-3-1-1",
                    "name": "Processing Time Gap Booking (Double-booking Color)"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-3-1-2",
                    "name": "Stylist Shift Rosters"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-3-2",
                "name": "Client Self-Booking",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-3-2-1",
                    "name": "Web & Mobile App Booking"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-3-2-2",
                    "name": "Advance Deposit Payment"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-3-3",
                "name": "Waitlist Automation",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-3-3-1",
                    "name": "Last-minute Opening SMS Broadcast"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-3-3-2",
                    "name": "Instant Claim"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-3-4",
                "name": "Multi-Location Chains",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-3-4-1",
                    "name": "Centralized Branch Booking"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-3-4-2",
                    "name": "Roaming Client Profiles"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-3-4",
            "name": "Inventory & Retail",
            "subModules": [
              {
                "id": "sub-mod-type-38-3-4-1",
                "name": "Backbar Professional Stock",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-4-1-1",
                    "name": "Color Tubes"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-4-1-2",
                    "name": "Developer Volumes"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-4-1-3",
                    "name": "Keratin Treatments"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-4-2",
                "name": "Retail Products",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-4-2-1",
                    "name": "Take-home Shampoos"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-4-2-2",
                    "name": "Heat Styling Tools"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-4-2-3",
                    "name": "Barcode Scanning"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-4-3",
                "name": "Stylist Retail Commissions",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-4-3-1",
                    "name": "Commission per Retail Sale"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-4-3-2",
                    "name": "Monthly Sales Targets"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-3-5",
            "name": "CRM & Client Portfolio",
            "subModules": [
              {
                "id": "sub-mod-type-38-3-5-1",
                "name": "Client Hair Profiles",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-5-1-1",
                    "name": "Formula History Logs"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-5-1-2",
                    "name": "Before/After Portfolio Photos"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-5-1-3",
                    "name": "Patch Test Records"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-5-2",
                "name": "Automated Re-engagement",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-5-2-1",
                    "name": "4-Week Root Touchup Reminders"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-5-2-2",
                    "name": "Seasonal Promos"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-5-3",
                "name": "Loyalty & Memberships",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-5-3-1",
                    "name": "Blowout Club Subscriptions"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-5-3-2",
                    "name": "Points per Dollar Spent"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-3-6",
            "name": "Billing & POS",
            "subModules": [
              {
                "id": "sub-mod-type-38-3-6-1",
                "name": "Checkout & Split Tender",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-6-1-1",
                    "name": "Cash"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-6-1-2",
                    "name": "Cards"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-6-1-3",
                    "name": "Gift Certificates"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-6-1-4",
                    "name": "Client Account Tab"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-6-2",
                "name": "Booth Rental Accounting",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-6-2-1",
                    "name": "Chair Rental Fees"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-6-2-2",
                    "name": "Product Deductions"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-6-3",
                "name": "Tax Invoicing",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-6-3-1",
                    "name": "GST/VAT Compliant Invoicing"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-6-3-2",
                    "name": "Automatic Tip Split"
                  }
                ]
              }
            ]
          },
          {
            "id": "mod-type-38-3-7",
            "name": "Analytics & Reports",
            "subModules": [
              {
                "id": "sub-mod-type-38-3-7-1",
                "name": "Stylist Productivity",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-7-1-1",
                    "name": "Chair Occupancy %"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-7-1-2",
                    "name": "Average Ticket Size"
                  }
                ]
              },
              {
                "id": "sub-mod-type-38-3-7-2",
                "name": "Client Retention",
                "subSubModules": [
                  {
                    "id": "ss-sub-mod-type-38-3-7-2-1",
                    "name": "Pre-booking Rates at Checkout"
                  },
                  {
                    "id": "ss-sub-mod-type-38-3-7-2-2",
                    "name": "Lapsed Client Analysis"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
];
