export default function Home() {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <main>
        <div className="perspective-distant">
          <div className="transform-3d animate-book aspect-book w-sm">
            <div
              id="back-cover"
              className="w-full h-full -translate-z-8 absolute bg-gradient-to-br from-amber-900 to-amber-950"
            />
            <div
              id="spine"
              className="absolute -translate-z-8 origin-left -rotate-y-90 h-full w-16 bg-gradient-to-bl from-amber-900 to-amber-950 overflow-clip"
            >
              <div className="absolute inset-0 noise-large" />
              <div className="absolute w-full h-4 top-1/6 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400 drop-shadow-amber-900 drop-shadow" />
              <div className="absolute w-full h-4 top-1/3 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400 drop-shadow-amber-900 drop-shadow" />
              <div className="absolute w-full h-4 top-1/2 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400 drop-shadow-amber-900 drop-shadow" />
              <div className="absolute w-full h-4 top-2/3 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400 drop-shadow-amber-900 drop-shadow" />
              <div className="absolute w-full h-4 top-5/6 -translate-y-1/2 outline-amber-400 outline-2 outline-offset-4 bg-amber-400 drop-shadow-amber-900 drop-shadow" />
            </div>
            <div
              id="pages-right"
              className="absolute top-2 bottom-2 right-2 -translate-z-8 origin-right rotate-y-90 w-16 bg-gradient-to-bl from-stone-200 to-stone-400"
            />
            <div
              id="pages-top"
              className="absolute top-2 left-0 right-2 -translate-z-8 origin-top rotate-x-90 h-16 bg-gradient-to-tr from-stone-200 to-stone-400"
            />
            <div
              id="pages-bottom"
              className="absolute bottom-2 left-0 right-2 -translate-z-8 origin-bottom -rotate-x-90 h-16 bg-gradient-to-tr from-stone-200 to-stone-400"
            />
            <div
              id="page-sticking-out-1"
              className="absolute top-4 left-1/4 right-0 bottom-0 -translate-z-2 rotate-z-3 bg-gradient-to-br from-stone-200 to-stone-400"
            />
            <div
              id="page-sticking-out-2"
              className="absolute top-4 left-1/4 right-0 bottom-2 -translate-z-2 rotate-z-1 bg-gradient-to-br from-stone-200 to-stone-400"
            />
            <div
              id="page-sticking-out-3"
              className="absolute top-2 left-1/4 right-0 bottom-4 translate-z-2 -rotate-z-1 bg-gradient-to-br from-stone-200 to-stone-400"
            />
            <div
              id="page-sticking-out-4"
              className="absolute top-0 left-1/4 right-0 bottom-4 translate-z-2 -rotate-z-3 bg-gradient-to-br from-stone-200 to-stone-400"
            />
            <div
              id="cover"
              className="w-full h-full translate-z-8 absolute bg-gradient-to-br from-amber-900 to-amber-950"
            >
              <div className="absolute inset-0 noise-large" />
              <div className="absolute inset-1 border-4 border-amber-400 drop-shadow-amber-900 drop-shadow" />
              <div className="absolute inset-0 p-8 flex flex-col justify-between">
                <div>
                  <p className="font-byline text-xl mb-1 text-amber-400 drop-shadow-amber-900 drop-shadow">
                    Violet&rsquo;s
                  </p>
                  <h1 className="font-headline text-4xl text-amber-400 drop-shadow-amber-900 drop-shadow">
                    Grotto Bestiary
                  </h1>
                </div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 size-10 drop-shadow-amber-900 drop-shadow">
                  <div className="absolute outline-4 outline-amber-950 outline-offset-[calc(var(--spacing)*16)] -translate-y-1/2 bg-radial-[at_25%_25%] from-green-500 via-25% to-green-600 via-green-800 rounded-full size-10 border-green-700 border-2" />
                  <div className="absolute pt-16 origin-top w-10">
                    <div className="bg-radial-[at_25%_25%] outline-4 outline-amber-950 outline-offset-[calc(var(--spacing)*5)] from-eternity-100 via-25% to-eternity-200 via-eternity-400 rounded-full size-10 border-eternity-300 border-2" />
                  </div>
                  <div className="absolute pt-16 origin-top w-10 -rotate-[120deg]">
                    <div className="bg-radial-[at_25%_25%] outline-4 outline-amber-950 outline-offset-[calc(var(--spacing)*5)] from-blue-500 via-25% to-blue-600 via-blue-800 rounded-full size-10 rotate-[120deg] border-blue-700 border-2" />
                  </div>
                  <div className="absolute pt-16 origin-top w-10 rotate-[120deg]">
                    <div className="bg-radial-[at_25%_25%] outline-4 outline-amber-950 outline-offset-[calc(var(--spacing)*5)] from-red-400 via-25% to-red-500 via-red-700 rounded-full size-10 -rotate-[120deg] border-red-600 border-2" />
                  </div>
                </div>
                <div>
                  <p className="font-byline text-lg mb-1 text-amber-400 drop-shadow-amber-900 drop-shadow">
                    Vol. 1
                  </p>
                  <p className="font-byline mb-1 text-amber-400 drop-shadow-amber-900 drop-shadow">
                    Documenting the grottos, beasts, champions, and wishes of
                    the world
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
