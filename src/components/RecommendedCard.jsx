import { useEffect, useState } from "react";

export default function Recommended(props) {
  const { favourites, details } = props;
  const [recommended, setRecommended] = useState([]);

  function countSegments(favourites) {
    const segmentCounts = {};
    for (const favourite of favourites) {
      const segment = favourite.classifications?.[0]?.segment?.name;
      if (segment) {
        if (segmentCounts[segment]) {
          segmentCounts[segment] += 1;
        } else {
          segmentCounts[segment] = 1;
        }
      }
    }
    console.log(segmentCounts);
    let maxSegment = null;
    let maxCount = 0;

    for (const segment in segmentCounts) {
      if (segmentCounts[segment] > maxCount) {
        maxSegment = segment;
        maxCount = segmentCounts[segment];
      }
    }
    return maxSegment;
  }

  const topSegment = countSegments(favourites);
  console.log("Top segment:", topSegment);

  async function fetchRecommended() {
    try {
      const response = await fetch("/api/events/foryou/recommendations");
      const data = await response.json();
      //first 10 recos only
      const recommendations = data.slice(0, 10);
      setRecommended(recommendations);
      console.log("10 recos", recommendations);
    } catch (error) {
      console.error("Error fetching recommended:", error);
    }
  }
  useEffect(() => {
    fetchRecommended();
  }, []);

  return (
    <>
      <div className="flex flex-col items-left justify-center h-screen">
        <div className="text-2xl font-extrabold">
          Recommended based on your favourites
        </div>
        {recommended.map((reco) => (
          <div key={reco._id}>{reco.name}</div>
        ))}
      </div>
    </>
  );
}
