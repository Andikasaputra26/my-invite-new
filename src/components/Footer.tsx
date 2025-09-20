export default function Footer() {
  return (
    <footer className="bg-gray-900 py-12 text-center text-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="mb-4 md:mb-0">
            <p className="font-semibold text-white">Undangan Digital</p>
            <p className="text-sm">
              Undangan Elegan & Praktis untuk Momen Spesial Anda.
            </p>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              Kontak:
              <br />
              WhatsApp: +62 812-3456-7890
              <br />
              Email: info@undangan.com
            </p>
          </div>
          <div className="flex space-x-4">
            <a
              href="#"
              aria-label="Facebook"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a
              href="#"
              aria-label="Instagram"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="text-gray-400 hover:text-white"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8">
          <p className="text-sm">
            © 2025 Undangan Digital. Semua Hak Cipta Dilindungi.
          </p>
        </div>
      </div>
    </footer>
  );
}
