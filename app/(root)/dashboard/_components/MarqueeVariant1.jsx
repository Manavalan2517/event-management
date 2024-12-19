import { cn } from "@/lib/utils";
import Marquee from "./Marquee";
import { useEffect, useState } from "react";
import axios from "axios";

const ReviewCard = ({ name, body }) => {
  return (
    <figure
      className={cn(
        "relative w-[150px] cursor-pointer overflow-hidden rounded-xl border px-4 py-2",
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium dark:text-white">
            {name}
          </figcaption>
        </div>
      </div>
      <blockquote className="text-sm">{body}</blockquote>
    </figure>
  );
};
const MarqueeDemo = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await axios.get("/api/testimonials");
        setTestimonials(response.data.testimonials);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setError("Failed to fetch testimonials");
      }
    };

    fetchTestimonials();
  }, []);
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background md:shadow-xl">
      <Marquee pauseOnHover className="[--duration:20s]">
        {testimonials.map((review) => (
          <ReviewCard key={review.username} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
};
export default MarqueeDemo;
