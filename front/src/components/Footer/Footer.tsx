import Link from "next/link";

export function Footer() {
  return (
    <div>
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
        <div className="mr-10"></div>

        <div className="flex items-center gap-10">
          {/* Instagram */}
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-pink-500"
            >
              <path d="M7.75 2h8.5A5.75 5.75 0 0 1 22 7.75v8.5A5.75 5.75 0 0 1 16.25 22h-8.5A5.75 5.75 0 0 1 2 16.25v-8.5A5.75 5.75 0 0 1 7.75 2Zm0 1.5A4.25 4.25 0 0 0 3.5 7.75v8.5A4.25 4.25 0 0 0 7.75 20.5h8.5A4.25 4.25 0 0 0 20.5 16.25v-8.5A4.25 4.25 0 0 0 16.25 3.5h-8.5Zm4.25 4a5.25 5.25 0 1 1 0 10.5 5.25 5.25 0 0 1 0-10.5Zm0 1.5a3.75 3.75 0 1 0 0 7.5 3.75 3.75 0 0 0 0-7.5ZM18 6a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0Z" />
            </svg>
          </a>

          {/* Facebook */}
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-blue-500"
            >
              <path d="M11.25 12.75H9.5v-2.5h1.75v-.875C11.25 7.6 12.1 6.75 14 6.75h1.75v2.5H14c-.6 0-.75.15-.75.75v.75H16l-.25 2.5H13.25v7h-2v-7ZM12 2a10 10 0 1 1 0 20 10 10 0 0 1 0-20Z" />
            </svg>
          </a>

          {/* X (Twitter) */}
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter)"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-blue-400"
            >
              <path d="M7.67 7.69a2.59 2.59 0 0 1-1.15-.33.87.87 0 0 0-.54-.1c-.16.03-.3.15-.42.27-.49.5-.95 1-1.36 1.6-.12.18-.22.36-.31.55a.52.52 0 0 0 .08.51c.03.04.1.09.15.09l.48-.09a5.2 5.2 0 0 0 .66-.13c.1-.03.2-.03.3.03.03.03.06.06.08.09-1.64 1.25-2.78 2.75-3.15 4.58-.04.15-.06.3-.1.46-.02.1 0 .22.03.31.03.1.1.22.2.27.1.07.25.06.36 0 .74-.25 1.46-.52 2.2-.8-.48.5-1 1-1.43 1.57-.2.27-.37.57-.51.87-.1.24-.15.48-.1.73.05.22.2.42.4.52.22.1.48.07.7-.02a7.94 7.94 0 0 0 3.38-2.64c.04-.05.08-.08.14-.12.3.22.6.43.92.61.87.5 1.8.85 2.77 1.09 1.12.28 2.27.42 3.43.43h.08c.23 0 .45-.07.64-.2a.6.6 0 0 0 .25-.52v-.09a6.8 6.8 0 0 0-2.34-4.15c.2-.04.42-.06.62-.12 1.33-.4 2.5-1.15 3.5-2.15.16-.16.31-.32.48-.48.08-.08.13-.2.14-.33v-.4c-.25.08-.5.16-.76.23-.1.03-.2.06-.3.08-.08.02-.16.01-.22-.03-.02-.03-.05-.06-.07-.1.23-.28.44-.58.62-.9.16-.27.32-.54.5-.83.08-.13.15-.3.11-.45-.04-.16-.18-.26-.33-.27a.96.96 0 0 0-.28.02c-.63.18-1.2.5-1.77.82-.42.23-.85.47-1.32.62a4.03 4.03 0 0 0-1.23.56c-.05.03-.1.07-.16.07-.05 0-.11 0-.16-.03-1.42-.75-2.97-.96-4.5-.62-1.24.27-2.26.9-3.16 1.7Z" />
            </svg>
          </a>
        </div>
        <div className="flex flex-col gap-4">
          <p>15 6006 9979</p>
          <a
            href="mailto:empresa@gmail.com"
            className="text-blue-500 hover:underline"
          >
            empresa@gmail.com
          </a>
          <a
            href="https://wa.me/1560069979"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:underline"
          >
            WhatsApp
          </a>
          <Link href="/help" className="text-blue-500 hover:underline">
            Asistencia
          </Link>
        </div>
      </div>
    </div>
  );
}
