"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { CardElement } from "@/components/cardElement";
import { events } from "@/data/data";
import MarqueeDemo from "./_components/MarqueeVariant1";
import { useSession } from "next-auth/react";

export default function Dashboard() {
  const [inputValue, setInputValue] = useState("");
  const [submittedValue, setSubmittedValue] = useState(null);
  const [name, setName] = useState(""); // Optional: You can add a name field as well
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/testimonials", {
        name: session?.user?.name || "Anonymous", // Use the value from your input field
        body: inputValue, // Use the input field value for the testimonial body
      });

      console.log("Testimonial submitted successfully:", response.data);

      // Update the UI or clear the input fields
      setSubmittedValue(inputValue);
      setInputValue(""); // Clear the input field
    } catch (error) {
      console.error("Error submitting testimonial:", error);
    }
  };

  return (
    <div>
      {/* Header Section */}
      <div>
        <div className="w-screen h-[100px] bg-[#4A43EC] flex justify-between p-4 pt-6 rounded-b-3xl z-[-1] relative mb-10">
          <div>
            <Image src="/Menu.svg" alt="menu" width={40} height={40} />
          </div>
          <div>
            <div className="w-[40px] h-[40px] border border-black rounded-full bg-yellow-500"></div>
          </div>
          <div className="z-[0] absolute bottom-[-20px] max-md:left-[32%] text-center bg-white px-4 py-3 shadow-lg rounded-2xl">
            <h1 className="font-semibold">Explore Events</h1>
          </div>
        </div>

        {/* Event Cards */}
        <div className="flex justify-center m-5">
          <div className="grid grid-cols-2 gap-5">
            {events.map((event, index) => (
              <Link href={`/events/${event.eventId}`} key={index}>
                <CardElement event={event} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Marquee and Input Section */}
      <div className="absolute w-screen bottom-0">
        <MarqueeDemo />
        <div className="px-5 py-2">
          <form onSubmit={handleSubmit} className="flex flex-col items-center">
            <textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Write something..."
              className="w-full max-w-md h-20 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              href="#"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
