import Navbar from "@/components/Navbar";
import Countdown from "@/components/Countdown";
import Trailers from "@/components/Trailers";
import Carousel from "@/components/HeroCarousel";
import ControlParallax3D from "@/components/ControlParallax3D";

export default function Page() {
  return (
    <>
      <section id="home" aria-label="Home">
        <Navbar />
      </section>

      <main id="conteudo">
        <section>
          <Countdown />
        </section>

        <Carousel
          intervalMs={4000}
          images={[
            { src: "/slide-1.jpg", alt: "Slide 1" },
            { src: "/slide-2.jpg", alt: "Slide 2" },
            { src: "/slide-3.jpg", alt: "Slide 3" },
            { src: "/slide-4.jpg", alt: "Slide 4" },
            { src: "/slide-5.jpg", alt: "Slide 5" },
            { src: "/slide-6.jpg", alt: "Slide 6" }
          ]}
        />

        <ControlParallax3D />

        <Trailers />
      </main>

      <footer className="footer">
        <p>
          Projeto independente de portfólio. GTA é marca registrada de seus respectivos
          proprietários
        </p>
      </footer>
    </>
  );
}
