// /components/Footer.js
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2">
      <div className="container mx-auto text-center">
        <p className="text-lg font-semibold">
          © 2025 💖 <span className="text-yellow-300">Emotions & Sympathy</span>.
        </p>
        {/* <div className="mt-4 flex justify-center items-center gap-4">
          <Link href="/privacy" className="text-pink-100 hover:text-yellow-200 transition-colors duration-200">
            🛡️ Privacy Policy
          </Link>
          <Link href="/terms" className="text-pink-100 hover:text-yellow-200 transition-colors duration-200">
            📜 Terms of Service
          </Link>
        </div> */}
        <div className="mt-2">
          <p className="text-sm text-pink-100">Made with 💕 for a world full of emotions.</p>
        </div>
      </div>
    </footer>
  );
}
