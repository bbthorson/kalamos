import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-warm-200 bg-warm-50 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="font-bold text-lg text-primary-700 font-[family-name:var(--font-heading)]">
              Kalamos
            </Link>
            <p className="mt-2 text-sm text-warm-500">
              Integrated behavioral health for HIV care. Making sexual wellness
              approachable and accessible for everyone.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-900 mb-3">Learn More</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/for-clinics" className="text-warm-500 hover:text-warm-700">
                  For Clinics
                </Link>
              </li>
              <li>
                <Link href="/for-therapists" className="text-warm-500 hover:text-warm-700">
                  For Therapists
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-warm-500 hover:text-warm-700">
                  About
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-warm-900 mb-3">Get in Touch</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="mailto:contact@kalamos.care" className="text-warm-500 hover:text-warm-700">
                  contact@kalamos.care
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-warm-500 hover:text-warm-700">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-warm-200">
          <p className="text-xs text-warm-400 text-center">
            &copy; {new Date().getFullYear()} Kalamos Care, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
