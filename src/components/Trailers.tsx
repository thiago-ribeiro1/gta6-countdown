const TRAILER_1_ID = "QdBZY2fkU-0";
const TRAILER_2_ID = "VQRLujxTm3c";

function YouTubeEmbed({ id, title }: { id: string; title: string }) {
  const src = `https://www.youtube.com/embed/${id}?rel=0&modestbranding=1`;
  return (
    <div className="videoCinema">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export default function Trailers() {
  return (
    <section id="trailers" className="sectionCinema" aria-label="Trailers">
      <div className="sectionHead">
        <h2 className="sectionTitle">Trailers</h2>
        <p className="sectionSub">Assista aos Trailers 1 e 2</p>
      </div>

      <article className="cinemaBlock">
        <h3 className="cinemaTitle">Trailer 1</h3>
        <YouTubeEmbed id={TRAILER_1_ID} title="GTA VI Trailer 1" />
      </article>

      <article className="cinemaBlock">
        <h3 className="cinemaTitle">Trailer 2</h3>
        <YouTubeEmbed id={TRAILER_2_ID} title="GTA VI Trailer 2" />
      </article>
    </section>
  );
}
