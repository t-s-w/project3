import { useEffect, useState } from "react";

export default function RecommendedCard(recommended) {
  return (
    <>
      <div className="media-scroller">
        {recommended.recommended.map((reco) => (
          <div key={reco?._id} className="item">
            <img className="image" src={reco?.images[0].url} />
            <Link to={`/events/${reco?._id}`} className="font-bold">
              {reco?.name}
            </Link>
            <p>
              {reco?._embedded.venues[0]?.city?.name}
              {reco?._embedded.venues[0]?.state
                ? `, ${reco?._embedded.venues[0]?.state?.name}`
                : null}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
