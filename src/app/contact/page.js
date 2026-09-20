import PageHeader from "@/componet/pageHeader";

export const metadata = { title: "Contact | lemlem." };

const inputClass = "w-full border border-gray-300 rounded-md px-3 py-2";

export default function ContactPage() {
  return (
    <>
      <PageHeader title="Contact us" blurb="Questions about an order, a product or a shade? We're here to help." />
      <section className="max-w-4xl mx-auto px-4 sm:px-10 py-8 sm:py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-4 text-gray-700">
          <div>
            <h2 className="font-semibold">Customer care</h2>
            <p>Monday–Friday, 9:00–18:00</p>
          </div>
          <div>
            <h2 className="font-semibold">Delivery</h2>
            <p>Within 3–6 days. Free shipping from €35.00.</p>
          </div>
          <div>
            <h2 className="font-semibold">Returns</h2>
            <p>See our right of withdrawal policy in the footer.</p>
          </div>
        </div>
        {/* No backend yet: submitting opens the visitor's email client. */}
        <form action="mailto:hello@lemlem.example" method="post" encType="text/plain" className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm mb-1">Name</label>
            <input id="name" name="name" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm mb-1">Email</label>
            <input id="email" name="email" type="email" required className={inputClass} />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm mb-1">Message</label>
            <textarea id="message" name="message" rows={5} required className={inputClass} />
          </div>
          <button type="submit" className="bg-black text-white px-6 py-2 rounded-md">Send message</button>
        </form>
      </section>
    </>
  );
}
