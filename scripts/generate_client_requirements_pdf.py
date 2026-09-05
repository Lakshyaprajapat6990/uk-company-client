"""Generate client requirements & workflow PDF for UK.company project."""

from datetime import date
from pathlib import Path

from fpdf import FPDF

OUTPUT = Path(__file__).resolve().parent.parent / "Client-Requirements-And-Workflow.pdf"


class ReportPDF(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "B", 9)
        self.set_text_color(100, 116, 139)
        self.cell(0, 8, "UK.company - Client Requirements & Workflow Brief", align="R")
        self.ln(3)
        self.set_draw_color(226, 232, 240)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(6)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(148, 163, 184)
        self.cell(0, 10, f"Page {self.page_no()}  |  Confidential - For Client Review", align="C")

    def h1(self, text):
        self.ln(3)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(15, 23, 42)
        self.multi_cell(0, 8, text)
        self.ln(2)

    def h2(self, text):
        self.ln(2)
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "B", 11)
        self.set_text_color(30, 58, 138)
        self.multi_cell(0, 7, text)
        self.ln(1)

    def p(self, text):
        self.set_x(self.l_margin)
        self.set_font("Helvetica", "", 10)
        self.set_text_color(51, 65, 85)
        self.multi_cell(0, 5.6, text)
        self.ln(2)

    def bullet(self, text, indent=0):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(51, 65, 85)
        left = self.l_margin + indent
        self.set_x(left)
        self.cell(5, 5.6, "-")
        self.multi_cell(self.epw - indent - 5, 5.6, text)
        self.ln(1)

    def note(self, text):
        self.set_x(self.l_margin)
        self.set_fill_color(241, 245, 249)
        self.set_font("Helvetica", "I", 9)
        self.set_text_color(71, 85, 105)
        self.multi_cell(0, 5.4, text, fill=True)
        self.ln(3)


def build():
    pdf = ReportPDF()
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.add_page()

    # Cover
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(15, 23, 42)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 11, "UK.company Platform")
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 11, "Client Requirements & Workflow Brief")
    pdf.ln(4)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(71, 85, 105)
    pdf.cell(0, 7, f"Date: {date.today().strftime('%d %B %Y')}", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "Prepared by: Development Team", new_x="LMARGIN", new_y="NEXT")
    pdf.cell(0, 7, "Purpose: Explain why client credentials are required and how the live system will work", new_x="LMARGIN", new_y="NEXT")
    pdf.ln(6)

    pdf.h1("1. Purpose of this document")
    pdf.p(
        "Dear Client, this document explains in detail why we need certain business accounts, "
        "API keys, and decisions from your side before we can complete the live company formation "
        "platform. The website frontend and Phase 1 backend foundation are already in progress. "
        "To move from a presentation website into a real online business system (orders, payments, "
        "emails, and Companies House processes), we require access and approvals that only the "
        "business owner can provide."
    )
    pdf.p(
        "This is normal for any regulated online formation platform. Payments must go to your "
        "business. Emails must send from your brand domain. Company filings must be submitted under "
        "your authorised business identity. The development team can build and integrate everything, "
        "but we cannot create those legal/business accounts on your behalf without your ownership."
    )

    pdf.h1("2. Current project status (summary)")
    pdf.bullet("Frontend website structure and service pages are largely completed.")
    pdf.bullet("Phase 1 backend API is started: authentication, services catalogue, orders, admin APIs, MongoDB database.")
    pdf.bullet("Still pending for go-live: Stripe live payments, frontend login/order connection, Companies House API, email notifications.")
    pdf.p(
        "In short: the product shell is ready. The business engines (pay, notify, file, and account login) "
        "need your credentials and approvals to become fully operational."
    )

    pdf.h1("3. Why we need details from you (not the developer)")
    pdf.p(
        "There is a clear separation of responsibility. The developer builds software. The client owns "
        "the business identity, money flow, brand domain, and legal filing rights. Without your details, "
        "we can continue coding in test mode, but we cannot take real customer payments, send official "
        "customer emails, or submit real Companies House applications under your business."
    )
    pdf.h2("3.1 What only you (the client) can provide")
    pdf.bullet("Stripe account and payment keys (money settles into your business).")
    pdf.bullet("Domain DNS access for email authentication (SPF/DKIM) and production domain.")
    pdf.bullet("Email provider approval/API key so messages send as your company.")
    pdf.bullet("Companies House developer access / ACSP or filing credentials.")
    pdf.bullet("Business decisions: login required before order? live launch date? name-search first or full filing?")
    pdf.h2("3.2 What the development team will do")
    pdf.bullet("Design and implement secure integrations.")
    pdf.bullet("Connect frontend login, order flow, and payment buttons to the backend.")
    pdf.bullet("Configure webhooks, templates, validation, and error handling.")
    pdf.bullet("Test in sandbox/test mode first, then switch to live with your approval.")
    pdf.bullet("Document handover and support go-live.")

    pdf.add_page()
    pdf.h1("4. Deep explanation of each required item")

    pdf.h2("4.1 Stripe live payments - why needed")
    pdf.p(
        "Customers must pay online for formation packages and add-on services. Stripe is the payment "
        "gateway that securely collects card payments and deposits funds into your business account. "
        "We cannot use a personal developer Stripe account for your live business, because:"
    )
    pdf.bullet("Customer payments must legally belong to your company.")
    pdf.bullet("Refunds, chargebacks, and tax records must be under your merchant profile.")
    pdf.bullet("Stripe verification requires your legal business details and bank account.")
    pdf.bullet("Live keys are confidential business assets and must remain under your ownership.")
    pdf.p(
        "What we need from you: Stripe account access (or keys), publishable key, secret key, and "
        "webhook signing secret. We recommend starting with Stripe TEST keys for development, then "
        "switching to LIVE keys after successful test payments."
    )
    pdf.note(
        "Workflow impact: Without Stripe, customers can browse and create draft orders, but cannot "
        "complete paid checkout. Orders will remain unpaid and cannot move into processing."
    )

    pdf.h2("4.2 Frontend login / order wiring - why needed")
    pdf.p(
        "The website currently presents services and information. To take real orders, the frontend "
        "must connect to the backend authentication and order APIs. Login is important because:"
    )
    pdf.bullet("Each order must belong to a customer account for tracking and support.")
    pdf.bullet("Customers need a place to view order status and documents later.")
    pdf.bullet("Admin staff need to see who placed each order.")
    pdf.bullet("Security and compliance improve when identity is linked to every formation request.")
    pdf.p(
        "What we need from you: a business decision on whether login is mandatory before checkout "
        "(recommended: Yes), and confirmation of account-related wording (support email/phone shown "
        "on login and order pages)."
    )
    pdf.note(
        "Workflow impact: This is mostly development work, but your decision on mandatory login "
        "affects UX and conversion. Once decided, we wire Register/Login, My Orders, and Save & Continue."
    )

    pdf.h2("4.3 Companies House API - why needed")
    pdf.p(
        "Your platform is a UK company formation service. To match industry platforms, we need "
        "Companies House connectivity for:"
    )
    pdf.bullet("Company name availability checks (prevent invalid/duplicate names before payment).")
    pdf.bullet("Later: electronic incorporation filing and status updates (if you have filing rights).")
    pdf.bullet("Later: company maintenance actions via customer portal.")
    pdf.p(
        "Important: name search and full filing are different levels. Name search can start with a "
        "Companies House API key. Full electronic incorporation usually requires authorised filing "
        "credentials and ACSP / agent authorisation under your business. The development team can "
        "integrate whichever level you are legally approved for."
    )
    pdf.p(
        "What we need from you: Companies House developer API key; confirmation whether you currently "
        "have ACSP / software filing rights; and priority choice - start with name search only, or "
        "full filing in the same phase."
    )
    pdf.note(
        "Workflow impact: Without Companies House access, we can still sell packages, but name checks "
        "and automated filing cannot be completed end-to-end. Manual processing would be slower and less competitive."
    )

    pdf.h2("4.4 Email notifications - why needed")
    pdf.p(
        "Customers expect automatic emails after registration, order placement, payment success, "
        "and document readiness. Email is also required for password reset and admin alerts. "
        "Emails must come from your verified domain (for example orders@yourdomain) so they are trusted "
        "and do not go to spam."
    )
    pdf.bullet("Welcome email after account creation")
    pdf.bullet("Order received confirmation")
    pdf.bullet("Payment successful confirmation")
    pdf.bullet("Order status updates (processing / completed)")
    pdf.bullet("Password reset and security notices")
    pdf.p(
        "What we need from you: preferred email provider (Resend/SendGrid/SES/Mailgun), API key, "
        "and DNS access (or IT contact) to verify SPF/DKIM for your domain. Also confirm the from-name "
        "and from-email address."
    )
    pdf.note(
        "Workflow impact: Without email setup, customers will not receive automatic confirmations. "
        "Support load increases and trust decreases."
    )

    pdf.add_page()
    pdf.h1("5. End-to-end workflow after you provide details")
    pdf.p(
        "Once your credentials and decisions are received, the platform workflow will work as follows."
    )

    pdf.h2("Step 1 - Customer creates account / logs in")
    pdf.p(
        "Customer opens the website, registers or logs in. Backend validates credentials and issues "
        "a secure token. Email service sends a welcome message from your brand address."
    )

    pdf.h2("Step 2 - Customer selects package and add-ons")
    pdf.p(
        "Customer chooses a formation or additional service page, selects optional services, and "
        "reviews pricing. Frontend sends selected service items to the backend order API."
    )

    pdf.h2("Step 3 - Company name check (Companies House)")
    pdf.p(
        "Customer enters a proposed company name. System checks availability through Companies House "
        "API and shows clear feedback (available / conflict / sensitive word guidance)."
    )

    pdf.h2("Step 4 - Order created in database")
    pdf.p(
        "Backend creates an order linked to the customer account, calculates totals (including VAT "
        "rules as agreed), and sets status to pending payment. Customer receives order confirmation email."
    )

    pdf.h2("Step 5 - Stripe payment")
    pdf.p(
        "Customer clicks Pay. Frontend opens Stripe Checkout/Elements using your publishable key. "
        "Payment is processed by Stripe. Stripe webhook notifies our backend. Order is marked paid. "
        "Customer receives payment confirmation email. Funds settle to your Stripe/business account."
    )

    pdf.h2("Step 6 - Processing and fulfilment")
    pdf.p(
        "Admin/staff can see paid orders in the admin API/panel. Depending on your Companies House "
        "rights, the system either prepares data for electronic filing or supports your internal "
        "processing workflow. Status updates can be emailed automatically."
    )

    pdf.h2("Step 7 - Completion and documents")
    pdf.p(
        "When formation/service is completed, customer can view status in their account area and "
        "receive completion email with next steps/documents. This builds the long-term customer portal foundation."
    )

    pdf.h1("6. Recommended delivery sequence")
    pdf.bullet("1) Frontend login + order wiring (can start immediately with current backend).")
    pdf.bullet("2) Email notifications (as soon as provider + domain verification are ready).")
    pdf.bullet("3) Stripe test mode, then Stripe live mode after successful tests.")
    pdf.bullet("4) Companies House name search.")
    pdf.bullet("5) Companies House full filing (only after legal/authorisation readiness).")
    pdf.p(
        "This sequence reduces risk: we validate user journeys and communications before enabling "
        "live money movement and regulated filing."
    )

    pdf.h1("7. Exact checklist - please provide")
    pdf.h2("A. Stripe")
    pdf.bullet("Stripe account created and business verified (or timeline for verification)")
    pdf.bullet("Test keys first: publishable key + secret key")
    pdf.bullet("Later live keys: publishable key + secret key")
    pdf.bullet("Webhook signing secret")
    pdf.bullet("Confirmation of settlement bank account readiness")

    pdf.h2("B. Email")
    pdf.bullet("Preferred provider (or approval for developer-recommended provider)")
    pdf.bullet("API key")
    pdf.bullet("From email and display name (example: UK.company Orders <orders@yourdomain>)")
    pdf.bullet("DNS access or IT contact for SPF/DKIM verification")

    pdf.h2("C. Companies House")
    pdf.bullet("Developer Hub API key")
    pdf.bullet("Confirmation of ACSP / filing rights (Yes/No/In progress)")
    pdf.bullet("Priority: Name search only first, or full filing in same phase")

    pdf.h2("D. Business decisions")
    pdf.bullet("Is login mandatory before placing an order? (Recommended: Yes)")
    pdf.bullet("Support contact email and phone to show on account/order pages")
    pdf.bullet("Preferred go-live target date")
    pdf.bullet("Production domain and hosting access when ready")

    pdf.add_page()
    pdf.h1("8. What happens if details are delayed")
    pdf.bullet("Development can continue in demo/test mode.")
    pdf.bullet("Real customer payments cannot be accepted.")
    pdf.bullet("Automatic branded emails cannot be sent reliably.")
    pdf.bullet("Companies House automated checks/filing cannot go live.")
    pdf.bullet("Launch date may shift because integrations need credentials before final testing.")
    pdf.p(
        "Providing credentials early does not mean we go live immediately. We first integrate in "
        "secure test environments, demonstrate the flow to you, then switch to live with your approval."
    )

    pdf.h1("9. Security and ownership assurance")
    pdf.p(
        "All keys and passwords should be shared securely (not in public chat if possible). "
        "Secrets will be stored in server environment variables, not in frontend code and not in "
        "public repositories. You remain the owner of Stripe, domain, email, and Companies House accounts. "
        "The development team only integrates them into the platform."
    )
    pdf.bullet("Do not place secret keys in the website frontend.")
    pdf.bullet("Use separate test and live environments.")
    pdf.bullet("Rotate keys if accidentally exposed.")
    pdf.bullet("Limit admin access to trusted staff only.")

    pdf.h1("10. Closing request")
    pdf.p(
        "To proceed efficiently, please review this document and share the checklist items in Section 7. "
        "Even partial delivery helps: for example, Stripe test keys and email provider approval allow us "
        "to complete major integration work while Companies House authorisation continues in parallel."
    )
    pdf.p(
        "We are ready to continue development immediately. With your credentials and decisions, we can "
        "connect login, orders, payments, notifications, and Companies House workflows into one complete "
        "customer journey that matches the expectations of a professional UK company formation platform."
    )
    pdf.ln(4)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(15, 23, 42)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 6, "Thank you for your collaboration.")
    pdf.ln(2)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(51, 65, 85)
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 6, "Development Team")
    pdf.set_x(pdf.l_margin)
    pdf.multi_cell(0, 6, "UK.company Platform Project")
    pdf.ln(8)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(100, 116, 139)
    pdf.set_x(pdf.l_margin)
    pdf.cell(0, 6, "- End of Document -", align="C")

    pdf.output(str(OUTPUT))
    return OUTPUT


if __name__ == "__main__":
    print(build())
