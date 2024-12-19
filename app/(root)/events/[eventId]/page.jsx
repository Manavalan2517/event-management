"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, LucideLocate } from "lucide-react";
import Link from "next/link";

export default function EventDetailsPage() {
  const { eventId } = useParams(); // Extract eventId from the URL
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the event data when the component mounts
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);

        if (!response.ok) {
          throw new Error("Event not found or failed to load.");
        }

        const data = await response.json();
        setEventData(data.event); // Set the event data
      } catch (err) {
        console.error("Error fetching event:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-gray-500">
        Loading event details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center mt-20 text-red-500">Error: {error}</div>;
  }

  if (!eventData) {
    return (
      <div className="text-center mt-20 text-gray-500">
        No event data available.
      </div>
    );
  }

  return (
    <div className="relative w-screen">
      {/* Back Button */}
      <div className="absolute top-5 left-3 z-10">
        <Link href="/dashboard">
          <div className="h-[35px] w-[35px] bg-slate-700 flex justify-center items-center rounded-full cursor-pointer shadow-2xl">
            <ArrowLeft className="text-white" />
          </div>
        </Link>
      </div>

      {/* Event Image with Title Overlay */}
      <div className="relative mb-10">
        <img
          src={eventData.eventImage}
          alt="Event"
          className="brightness-50 w-full h-auto max-md:h-[240px]"
        />
        <div className="absolute inset-0 flex justify-center items-center">
          <p className="text-gray-100 text-center text-3xl font-semibold">
            {eventData.eventName}
          </p>
        </div>
        <div className="absolute opacity-80 z-[0]" />
        <div className="z-[1] absolute bottom-[-20px] max-md:left-[31%] mx-2 text-center bg-white px-4 py-3 shadow-md rounded-2xl">
          <h1 className="font-semibold">Event Details</h1>
        </div>
      </div>

      {/* Event Details */}
      <div className="m-5">
        {/* Date & Time */}
        <div className="w-full flex items-center mb-3">
          <div className="w-12 h-12 bg-[#ebedff] rounded-xl flex justify-center items-center">
            <Calendar className="text-[#5669FF]" />
          </div>
          <div className="my-2 ml-3">
            <p className="text-[14px] font-semibold">{eventData.eventDate}</p>
            <p className="text-[12px] text-[#747688]">
              {eventData.eventTime || "N/A"}
            </p>
          </div>
        </div>

        {/* Place & Address */}
        <div className="w-full flex items-center mb-2">
          <div className="w-12 h-12 bg-[#ebedff] rounded-xl flex justify-center items-center">
            <LucideLocate className="text-[#5669FF]" />
          </div>
          <div className="my-2 ml-3">
            <p className="text-[14px] font-semibold">{eventData.eventPlace}</p>
            <p className="text-[12px] text-[#747688]">
              {eventData.eventAddress || "N/A"}
            </p>
          </div>
        </div>

        {/* Organizer */}
        <div className="w-full flex items-center mb-2">
          <div className="w-12 h-12 bg-[#ebedff] rounded-2xl flex justify-center items-center"></div>
          <div className="my-2 ml-3">
            <p className="text-[14px] font-semibold">
              {eventData.eventOrganizer || "Unknown"}
            </p>
            <p className="text-[12px] text-[#747688]">Organizer</p>
          </div>
        </div>

        {/* Location */}
        <div className="my-5">
          <div className="relative">
            <div className="flex justify-center ">
              <iframe
                title="Google Map Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.286255654467!2d80.0441051745444!3d12.824769818081506!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a52f70c95688435%3A0xfb2355e047e8b473!2sDr.%20T.P%20Ganesan%20Auditorium!5e0!3m2!1sen!2sin!4v1734546607774!5m2!1sen!2sin"
                height="200"
                className=" border-black rounded-md w-full"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        {/* About Event */}
        <div className="mt-5 mb-20">
          <h1 className="font-semibold text-lg">About Event</h1>
          <p>{eventData.eventDescription}</p>
        </div>

        {/* Register Button */}
        <div className="fixed bottom-0 left-0 w-full bg-opacity-70 px-5 bg-custom-gradient py-2">
          <Link href={`/events/${eventId}/ticket`}>
            <button className="w-full text-white py-3 bg-[#5669FF] rounded-2xl font-semibold shadow-lg">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
