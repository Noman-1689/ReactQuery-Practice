import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Brand Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-blue-400">BrandName</h2>
          <p className="text-slate-400 max-w-xs">
            Building the future of the web with speed, style, and a touch of
            wit.
          </p>
        </div>

        {/* Quick Links */}
        <div className="grid grid-cols-2 gap-8 md:col-span-2 md:justify-items-end">
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm">
              Product
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  Integrations
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-blue-400 transition">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4 uppercase tracking-wider text-sm">
              Company
            </h3>
            <ul className="space-y-2 text-slate-400">
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-blue-400 transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} BrandName Inc. All rights reserved.</p>
        <div className="flex gap-6 mt-4 md:mt-0">
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
