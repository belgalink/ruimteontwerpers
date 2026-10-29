import type { Metadata } from "next";
import SiteFooter from "@/components/SiteFooter";
import SiteHeader from "@/components/SiteHeader";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "ORO — open ruimte ontwerpers, Antoon Sanderusstraat 32, 9000 Gent. mail@openruimteontwerpers.be",
};

export default function ContactPage() {
  return (
    <div className="page-shell">
      <SiteHeader />
      <main className="main-content">
        <div className="page-text">
          <header>
            <h1>Contact</h1>
          </header>

          <div className="text-content">
            <section>
              <h2>Kantoor</h2>
              <span className="contact-line">ORO — open ruimte ontwerpers</span>
              <span className="contact-line">Antoon Sanderusstraat 32</span>
              <span className="contact-line">9000 Gent, België</span>
              <span className="contact-line">
                <a href="tel:+3292339322">+32 (0)9 233 93 22</a>
              </span>
            </section>

            <section>
              <h2>Algemene vragen</h2>
              <span className="contact-line">
                <a href="mailto:mail@openruimteontwerpers.be">
                  mail@openruimteontwerpers.be
                </a>
              </span>

              <h2 style={{ marginTop: "30px" }}>Zaakvoerder</h2>
              <span className="contact-line">Thomas Janssens</span>
              <span className="contact-line">
                Landschapsarchitect en stedenbouwkundige
              </span>

              <h2 style={{ marginTop: "30px" }}>Volg ons</h2>
              <span className="contact-line">
                <a
                  href="https://www.instagram.com/openruimteontwerpers/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Instagram
                </a>
              </span>
              <span className="contact-line">
                <a
                  href="https://www.facebook.com/openruimteontwerpers/"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  Facebook
                </a>
              </span>
            </section>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
