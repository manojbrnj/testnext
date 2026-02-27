import Link from "next/link";

export default function Home() {
  return (
    <main className="font-[family-name:var(--font-geist-sans)]">
      <nav className="flex items-center justify-between px-6 py-4 border-b-[1px] border-black g-white shadow-sm text-black ">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-2xl font-bold tracking-tighter">
            Voam
          </Link>
          <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
           
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Link href="/signin" className="text-sm text-gray-600 hover:text-black">
            Sign in
          </Link>
          <Link 
            href="/get-started" 
            className="bg-black text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            Get started
          </Link>
        </div>
      </nav>

      <section className="px-6 py-20 md:py-32 border-b border-black bg-[rgb(247 244 237)]">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-2xl space-y-8">
            <h1 className="text-7xl text-black md:text-8xl font-serif leading-tight tracking-tight">
              Stay curious.
            </h1>
            <p className="text-2xl leading-snug text-gray-800 max-w-md">
              Explore narratives, insights, and perspectives from writers everywhere.
            </p>
            <button className="bg-black text-white text-xl px-10 py-3 rounded-full font-medium hover:bg-gray-900 transition-colors">
              Start reading
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
