export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer-new">
      <div className="footer-new-inner">
        <p className="footer-new-text">
          © {year} Yohan Christazel Jeffry. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
