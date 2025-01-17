import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Página no encontrada</h1>
      <Link
        href="/"
        className="mt-6 text-customGreen hover:underline hover:text-teal-800"
      >
        Ir al inicio
      </Link>
    </div>
  );
}
