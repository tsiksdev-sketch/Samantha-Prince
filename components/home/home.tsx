


import { ParallaxSection } from "../parallax";
import Image from "next/image";





export default function Home () {
const memoryImages = [
  { src: "/lobola-2.jpg", alt: "Memory 1" },
  { src: "/lobola-9.jpg", alt: "Memory 2" },
  { src: "/lobola-10.jpg", alt: "Memory 3" },
  { src: "/lobola-11.jpg", alt: "Memory 4" },
  { src: "/lobola-12.jpg", alt: "Memory 5" },
  { src: "/lobola-13.jpg", alt: "Memory 6" },
  { src: "/lobola-14.jpg", alt: "Memory 7" },
  { src: "/lobola-15.jpg", alt: "Memory 8" },
];



  return (
    <main className="relative">
      {/* 1. Hero — Our Story */}
      <ParallaxSection image='/couple-1.jpg'>
        <p className="script mb-4 text-3xl md:text-5xl" style={{ color: "var(--accent)" }}>
          Samantha &amp; Prince
        </p>
        <h1 className="text-6xl md:text-8xl">Our Story</h1>
        <div className="mx-auto my-8 h-px w-24 bg-white/60" />
        <p className="text-sm uppercase tracking-[0.4em] md:text-base">October 4, 2026</p>
        <p className="mt-4 text-xs uppercase tracking-[0.3em] text-white/80">
          A love story, told in chapters
        </p>
      </ParallaxSection>

      {/* 2. Where they met */}
      <section className="bg-background px-6 py-28 md:py-40">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Chapter One</p>
          <h2 className="mt-4 text-4xl md:text-6xl">Where We Met</h2>
          <div className="mx-auto my-8 h-px w-16" style={{ backgroundColor: "var(--accent)" }} />
          <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
             The beautiful love story of Prince and Sam begins in August 2020 in the colllege cafeteria. Two strangers, sitting alone , find each other sharing a cute conversation at length bonding over
         food and ending with a shared slice of Caramel swirl cake. We were inseparable from that day and a few weeks later , we confessed our love for each other. A million dates and "I love you's" later, we are ready for our next chapter on the 4th of October where we cant wait to spend the rest of our lives together living our story.
          </p>
         
        </div>
      </section>

      {/* 3. Best Friends parallax */}
      <ParallaxSection image='/best-friends.jpg'>
        <p className="text-xs uppercase tracking-[0.4em] text-white/80">Chapter Two</p>
        <h2 className="mt-4 text-5xl md:text-7xl">Best Friends</h2>
        <div className="mx-auto my-8 h-px w-24 bg-white/60" />
      
      </ParallaxSection>

      {/* 4. Gallery */}
      <section className="bg-background px-6 py-28 md:py-40">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Chapter Three</p>
            <h2 className="mt-4 text-4xl md:text-6xl">Moments</h2>
            <div className="mx-auto my-8 h-px w-16" style={{ backgroundColor: "var(--accent)" }} />
            <p className="mx-auto max-w-xl text-muted-foreground">
              A few frames from the years in between.
            </p>
          </div>

       <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-6">
      {memoryImages.map((img) => (
        <div key={img.alt} className="overflow-hidden rounded-sm">
          <div className="relative aspect-square w-full">
            <Image
              src={img.src}
              alt={img.alt}
              loading="lazy"
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
            />
          </div>
        </div>
      ))}
    </div>
        </div>
      </section>

      {/* 5. He Proposed */}
      <ParallaxSection image='/he-proposed.jpg'>
        <p className="text-xs uppercase tracking-[0.4em] text-white/80">Chapter Three</p>
        <h2 className="mt-4 text-5xl md:text-7xl">He Proposed</h2>
        <div className="mx-auto my-8 h-px w-24 bg-white/60" />
        
      </ParallaxSection>

      {/* 5. She Said Yes */}
      <ParallaxSection image='/she-said-yes.jpg'>
        <p className="text-xs uppercase tracking-[0.4em] text-white/80">Chapter Four</p>
        <h2 className="mt-4 text-6xl md:text-8xl">
          <span className="script text-7xl md:text-9xl" style={{ color: "var(--accent)" }}>
            She Said
          </span>
          <br />
          Yes.
        </h2>
        <div className="mx-auto my-8 h-px w-24 bg-white/60" />
       
      </ParallaxSection>

  
    </main>
  );
}
