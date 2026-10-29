export default function SiteFooter() {
  return (
    <footer className="footer-page">
      <section>
        <p>© {new Date().getFullYear()} Open Ruimte Ontwerpers</p>
      </section>
      <section>
        <p>
          <a
            href="https://www.instagram.com/openruimteontwerpers/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Instagram
          </a>
        </p>
        <p>
          <a
            href="https://www.facebook.com/openruimteontwerpers/"
            target="_blank"
            rel="noreferrer noopener"
          >
            Facebook
          </a>
        </p>
      </section>
    </footer>
  );
}
