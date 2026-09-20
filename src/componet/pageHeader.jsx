export default function PageHeader({ title, blurb }) {
  return (
    <section className="bg-gray-100 border-b border-gray-300 px-4 sm:px-10 py-8 sm:py-12 text-center">
      <h1 className="text-3xl sm:text-4xl font-serif font-medium text-gray-700">{title}</h1>
      {blurb && <p className="mt-3 text-gray-500 max-w-2xl mx-auto">{blurb}</p>}
    </section>
  );
}
