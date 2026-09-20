import Link from "next/link";

export default function NotFound() {
  return (
    <section className="px-4 sm:px-10 py-16 sm:py-32 text-center">
      <h1 className="text-3xl sm:text-5xl font-serif text-gray-700">Page not found</h1>
      <p className="mt-4 text-gray-500">The page you&apos;re looking for doesn&apos;t exist or has moved.</p>
      <Link href="/" className="inline-block mt-8 bg-black text-white px-6 py-2 rounded-md">Back to home</Link>
    </section>
  );
}
