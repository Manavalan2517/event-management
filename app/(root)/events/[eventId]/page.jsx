"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, LucideLocate } from "lucide-react";
import Link from "next/link";

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State to manage button transitions
  const [isRegistering, setIsRegistering] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const response = await fetch(`/api/events/${eventId}`);
        if (!response.ok) throw new Error("Event not found or failed to load.");
        const data = await response.json();
        setEventData(data.event);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (eventId) fetchEvent();
  }, [eventId]);

  // Handle Register button click
  const handleRegisterClick = () => {
    setIsRegistering(true); // Trigger downward animation for Register
    setTimeout(() => {
      setShowConfirm(true); // Show Confirm button after Register disappears
    }, 300); // Transition duration
  };

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
          <ArrowLeft className="text-white" />
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

        {/* About Event */}
        <div className="mt-5 mb-20">
          <h1 className="font-semibold text-lg">About Event</h1>
          <p>{eventData.eventDescription}</p>
        </div>
      </div>

      {/* Register Button */}
      <div
        className={`fixed bottom-0 left-0 w-full px-4 py-3 transition-transform duration-500 ${
          isRegistering ? "translate-y-full" : "translate-y-0"
        }`}
      >
        <button
          onClick={handleRegisterClick}
          className="w-full text-white py-3 bg-gradient-to-r from-[#5669FF] to-[#3A49F9] rounded-2xl font-semibold shadow-lg"
        >
          Register
        </button>
      </div>

      {/* Confirm Button */}
      <div
        className={`fixed bottom-[-100px] left-0 w-full px-4 py-3 transition-transform duration-500 ${
          showConfirm ? "translate-y-[-100px]" : "translate-y-full"
        }`}
      >
        <button className="w-full text-white py-3 bg-[#3A49F9] rounded-2xl font-semibold shadow-lg">
          Confirm
        </button>
      </div>
    </div>
  );
}
