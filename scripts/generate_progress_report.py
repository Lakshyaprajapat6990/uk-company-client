"""Generate UK.company website progress report PDF."""

from datetime import date
from pathlib import Path

from fpdf import FPDF

OUTPUT = Path(__file__).resolve().parent.parent / "UK-Company-Website-Progress-Report.pdf"


class ReportPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(100, 116, 139)
        self.cell(0, 8, "UK.company - Website Development Progress Report", align="R")
        self.ln(4)
        self.set_draw_color(226, 232, 240)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(6)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, f"Page {self.page_no()}", align="C")

    def section_title(self, title):
        self.ln(4)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(15, 23, 42)
        self.cell(0, 10, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(2)

    def sub_title(self, title):
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(30, 58, 138)
        self.cell(0, 8, title, new_x="LMARGIN", new_y="NEXT")
        self.ln(1)

    def body_text(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(51, 65, 85)
        self.multi_cell(0, 5.5, text)
        self.ln(2)

    def bullet(self, text, indent=0):
        x = self.get_x()
        self.set_font("Helvetica", "", 10)
        self.set_text_color(51, 65, 85)
        self.set_x(10 + indent)
        self.cell(4, 5.5, chr(149))
        self.multi_cell(0, 5.5, text)
        self.ln(1)

    def status_row(self, item, status):
        self.set_font("Helvetica", "", 9)
        if status == "Done":
            self.set_text_color(22, 101, 52)
            status_text = "Completed"
        elif status == "Partial":
            self.set_text_color(180, 83, 9)
            status_text = "In Progress"
        else:
            self.set_text_color(185, 28, 28)
            status_text = "Pending"
        self.cell(130, 6, item)
        self.cell(0, 6, status_text, align="R")
        self.ln(5)


def build_pdf():
    pdf = ReportPDF()
    pdf.set_auto_page_break(auto=True, margin=15)
    pdf.add_page()

    # Cover block
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(0, 12, "UK.company Website", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 12, "Development Progress Report", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(4)

    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 7, f"Report Date: {date.today().strftime('%d %B %Y')}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "Project: UK Company Formation Platform (Frontend Phase)", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "Brand: UK.company", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "Prepared by: Development Team", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(6)

    pdf.section_title("1. Executive Summary")
    pdf.body_text(
        "This report summarises the current status of the UK.company website development project. "
        "The frontend application has been built using React and Vite, styled to align with the reference "
        "company formation platform. The public-facing website structure, navigation, service pages, and "
        "content sections are substantially complete. The next major phase is backend development, payment "
        "integration, and customer account functionality."
    )

    pdf.section_title("2. Technology Stack (Completed)")
    pdf.bullet("React 19 with Vite build tool")
    pdf.bullet("React Router for multi-page routing")
    pdf.bullet("Responsive CSS layout (desktop, tablet, and mobile)")
    pdf.bullet("Reusable components: Navbar, Footer, Logo, Reveal animations")
    pdf.bullet("Centralised content and page data files")

    pdf.section_title("3. Completed Frontend Work")

    pdf.sub_title("3.1 Home Page")
    pdf.bullet("Hero section with pricing and call-to-action buttons")
    pdf.bullet("Trust points and welcome section")
    pdf.bullet("Why choose us and about sections")
    pdf.bullet("Formation packages with tabbed service categories")
    pdf.bullet("What's included and optional services sections")
    pdf.bullet("Pricing cards and featured packages")
    pdf.bullet("Information guides preview grid")
    pdf.bullet("FAQs, blogs, and contact sections")
    pdf.bullet("Registered office and restoration information blocks")

    pdf.sub_title("3.2 Navigation & Layout")
    pdf.bullet("Header with logo, phone numbers, and contact CTA")
    pdf.bullet("Mega menu: Company Formations (12 services)")
    pdf.bullet("Mega menu: Additional Services (4 services)")
    pdf.bullet("Mega menu: Information (11 guides)")
    pdf.bullet("Mobile responsive drawer menu")
    pdf.bullet("Footer with newsletter form, links, and contact details")

    pdf.sub_title("3.3 Company Formation Pages (12 Pages)")
    pdf.bullet("Dedicated route: /formation/:slug")
    pdf.bullet("Service selection with optional add-ons")
    pdf.bullet("Order summary sidebar with pricing calculation")
    pdf.bullet("Business bank partner section")
    pdf.bullet("What's included and optional free services")
    pdf.bullet("Additional checkout items listing")
    pdf.bullet("Detailed informational content sections")
    pdf.bullet("Pages: LTD, LTD+Registered Office, LTD+VAT, Non-UK LTD/LLP, LLP, LBG, CIC, multi-class shares, bespoke articles")

    pdf.add_page()
    pdf.section_title("3. Completed Frontend Work (continued)")

    pdf.sub_title("3.4 Additional Service Pages (4 Pages)")
    pdf.bullet("Dedicated route: /additional/:slug")
    pdf.bullet("UK Company Restoration Service")
    pdf.bullet("Registered Office Services")
    pdf.bullet("Sole Traders Address Service")
    pdf.bullet("Digital ID Verification Service")
    pdf.bullet("Service summary, pricing display, and content sections")

    pdf.sub_title("3.5 Information Guide Pages (11 Pages)")
    pdf.bullet("Dedicated route: /info/:slug")
    pdf.bullet("Why Use a Company Formation Agent")
    pdf.bullet("Choosing a Company Name")
    pdf.bullet("Shares and Statement of Capital")
    pdf.bullet("Money Laundering Regulations")
    pdf.bullet("Company Secretaries")
    pdf.bullet("Company SIC Code")
    pdf.bullet("Before You Start")
    pdf.bullet("Directors and Shareholders")
    pdf.bullet("Bank Options for Non-UK Residents")
    pdf.bullet("Banking Referrals")
    pdf.bullet("Free Company Admin Portal")

    pdf.sub_title("3.6 UI / UX Improvements")
    pdf.bullet("Formation page styling aligned with reference site layout")
    pdf.bullet("Heading and text colour fixes for light-background sections")
    pdf.bullet("Button and outline contrast improvements")
    pdf.bullet("Breadcrumb navigation on service pages")
    pdf.bullet("Read more links from home page to formation pages")
    pdf.bullet("External reference content files prepared in public/external-pages")

    pdf.section_title("4. Work In Progress / Partially Complete")
    pdf.status_row("Full exact content copy from reference site for all pages", "In Progress")
    pdf.status_row("Virtual address / mail forwarding standalone page", "In Progress")
    pdf.status_row("Home page company name search functionality", "In Progress")
    pdf.status_row("Account Login and Post Login pages", "In Progress")
    pdf.status_row("ID Requirements page", "In Progress")
    pdf.status_row("Videos page", "In Progress")
    pdf.status_row("Dynamic blog system", "In Progress")
    pdf.status_row("Legal pages (Terms, Privacy, Cookies, Refund)", "In Progress")

    pdf.section_title("5. Remaining Work - Backend & Platform")
    pdf.body_text(
        "The reference website is a full business platform, not only a marketing site. "
        "The following backend and platform features are required for a production-ready system:"
    )

    pdf.sub_title("5.1 Phase 1 - MVP Backend")
    pdf.bullet("Backend API server (Node.js / Express or similar)")
    pdf.bullet("PostgreSQL database design and setup")
    pdf.bullet("User registration and login (JWT authentication)")
    pdf.bullet("Services and pricing API")
    pdf.bullet("Order creation and cart management")
    pdf.bullet("Payment gateway integration (Stripe recommended)")
    pdf.bullet("Order confirmation emails")
    pdf.bullet("Admin panel to view and manage orders")

    pdf.sub_title("5.2 Phase 2 - Formation Processing")
    pdf.bullet("Companies House company name availability API")
    pdf.bullet("Multi-step order form (directors, shareholders, PSC, SIC codes)")
    pdf.bullet("ID document upload and verification workflow")
    pdf.bullet("Companies House incorporation submission integration")
    pdf.bullet("Order status tracking for customers")
    pdf.bullet("PDF document generation and delivery (Certificate, MOA, share certs)")

    pdf.add_page()
    pdf.section_title("5. Remaining Work - Backend & Platform (continued)")

    pdf.sub_title("5.3 Phase 3 - Customer Portal")
    pdf.bullet("Client dashboard after login")
    pdf.bullet("View and manage registered companies")
    pdf.bullet("Import existing company via Companies House authentication code")
    pdf.bullet("Purchase additional services after formation")
    pdf.bullet("Download company documents")
    pdf.bullet("Invoice and payment history")

    pdf.sub_title("5.4 Phase 4 - Advanced Services")
    pdf.bullet("Registered office and mail handling system")
    pdf.bullet("Mail scanning and DocuStore document portal")
    pdf.bullet("Mail forwarding and post box services")
    pdf.bullet("VAT registration workflow")
    pdf.bullet("Confirmation statement filing service")
    pdf.bullet("Company restoration case management")
    pdf.bullet("Annual renewal billing for address services")
    pdf.bullet("Bank and accountant referral integrations")
    pdf.bullet("AML / KYC compliance workflows")

    pdf.sub_title("5.5 Deployment & Operations")
    pdf.bullet("Production hosting setup (frontend + backend)")
    pdf.bullet("SSL certificate and domain configuration")
    pdf.bullet("Environment variables and secrets management")
    pdf.bullet("Database backups and monitoring")
    pdf.bullet("SEO optimisation and analytics")
    pdf.bullet("Cross-browser and device testing")
    pdf.bullet("Performance optimisation")

    pdf.section_title("6. Progress Overview")
    pdf.ln(2)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(15, 23, 42)
    pdf.cell(90, 8, "Area")
    pdf.cell(50, 8, "Status")
    pdf.cell(0, 8, "Estimate", align="R")
    pdf.ln(8)

    rows = [
        ("Frontend website structure", "Completed", "~85%"),
        ("Service & information pages", "Completed", "~80%"),
        ("Content migration (exact copy)", "In Progress", "~40%"),
        ("Backend API & database", "Pending", "0%"),
        ("Payments & checkout", "Pending", "0%"),
        ("Customer account portal", "Pending", "0%"),
        ("Companies House integration", "Pending", "0%"),
        ("Admin panel", "Pending", "0%"),
        ("Mail / address services", "Pending", "0%"),
        ("Production deployment", "Pending", "0%"),
    ]
    for area, status, est in rows:
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(90, 6, area)
        if status == "Completed":
            pdf.set_text_color(22, 101, 52)
        elif status == "In Progress":
            pdf.set_text_color(180, 83, 9)
        else:
            pdf.set_text_color(185, 28, 28)
        pdf.cell(50, 6, status)
        pdf.set_text_color(51, 65, 85)
        pdf.cell(0, 6, est, align="R")
        pdf.ln(5)

    pdf.ln(4)
    pdf.section_title("7. Recommended Next Steps")
    pdf.bullet("1. Finalise remaining page content from reference website")
    pdf.bullet("2. Approve backend technology stack and database schema")
    pdf.bullet("3. Build MVP backend: auth, orders, payments, admin")
    pdf.bullet("4. Integrate Companies House name check API")
    pdf.bullet("5. Implement full order and formation workflow")
    pdf.bullet("6. Launch customer portal and production deployment")

    pdf.ln(4)
    pdf.section_title("8. Conclusion")
    pdf.body_text(
        "The frontend foundation of the UK.company website is well established with a professional layout, "
        "full navigation structure, and dedicated pages for company formations, additional services, and "
        "information guides. The project is ready to move into the backend development phase to enable "
        "live orders, payments, company registrations, and customer account management as per the "
        "reference platform requirements."
    )

    pdf.ln(6)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(100, 116, 139)
    pdf.cell(0, 6, "- End of Report -", align="C")

    pdf.output(str(OUTPUT))
    return OUTPUT


if __name__ == "__main__":
    path = build_pdf()
    print(path)
