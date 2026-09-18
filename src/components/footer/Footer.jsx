import { Link } from "react-router-dom";

export default function Footer() {
  return (
    // MELTED FOOTER: No borders, no background colors. It blends directly into the bg-moon-950 void.
    <footer className="w-full py-8 mt-auto text-slate-500">
      <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">

        {/* Left Side: Minimal Branding */}
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold tracking-widest uppercase text-slate-600">
            Organic<span className="text-moon-800">.</span>Flow
          </span>
          <span className="text-xs font-medium text-moon-800">
            v1.0
          </span>
        </div>

        {/* Right Side: Copyright & Minimal Links */}
        <div className="flex items-center gap-6 text-xs font-medium">
          <Link
            to="/docs"
            className="hover:text-electric transition-colors duration-300 outline-none"
          >
            Documentation
          </Link>
          <a
            href="https://github.com/starling-king"
            target="_blank"
            rel="noreferrer"
            className="hover:text-electric transition-colors duration-300 outline-none"
          >
            GitHub
          </a>
          <span>
            © {new Date().getFullYear()} Ayush Mishra
          </span>
        </div>

      </div>
    </footer>
  );
}