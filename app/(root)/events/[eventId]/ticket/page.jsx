"use client";

import { data } from "autoprefixer";
import { ArrowLeft, Calendar, Locate, Timer, User } from "lucide-react";
import { useSession } from "next-auth/react";
import { useQRCode } from "next-qrcode";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const RegisterEventForm = () => {
  const [ticketStatus, setTicketStatus] = useState("confirmed");
  const [message, setMessage] = useState("");
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { eventId } = useParams();
  const { data: session } = useSession();
  const email = session?.user?.email;
  const { Canvas } = useQRCode();
    
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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!email) {
      setMessage("User email is missing. Please log in.");
      return;
    }

    try {
      const response = await fetch(`/api/register-event`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, eventId, ticketStatus }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Event registered successfully!");
        console.log("Updated User:", data.user);
      } else {
        setMessage(data.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Failed to register the event.");
    }
  };

  return (
    <div className="relative w-screen">
      <div>
        <div className="absolute top-5 left-3 z-10">
          <Link href={`/events/${eventId}`}>
            <div className="h-[35px] w-[35px] bg-slate-700 flex justify-center items-center rounded-full cursor-pointer">
              <ArrowLeft className="text-white" />
            </div>
          </Link>
        </div>
        <div className="text-center flex justify-center pt-5">
          <h1 className="text-[24px] font-semibold">Event Ticket</h1>
        </div>
        <div className="m-5">
          <div className="h-[580px] w-full bg-[#212121] rounded-3xl p-4 px-5">
            <div>
              <img
                src={eventData.eventImage}
                alt="Event"
                className="w-full h-[170px] rounded-xl"
              />
              <h1 className="text-white text-xl mt-2">{eventData.eventName}</h1>
            </div>
            <div className="mt-2 p-3 grid grid-cols-2 gap-x-20 gap-y-4">
              <div>
                <p className="text-[#757272] text-[12px]">Name</p>
                <p className="text-white text-[15px]">{session?.user.name}</p>
              </div>
              <div>
                <p className="text-[#757272] text-[12px]">Event Id</p>
                <p className="text-white text-[15px]">{eventData.eventId}</p>
              </div>
              <div>
                <p className="text-[#757272] text-[12px]">Date</p>
                <p className="text-white text-[15px]">{eventData.eventDate}</p>
              </div>
              <div>
                <p className="text-[#757272] text-[12px]">Time</p>
                <p className="text-white text-[15px]">{eventData.eventTime}</p>
              </div>
            </div>
            <div className="px-3">
              <p className="text-[#757272] text-[12px]">Location</p>
              <p className="text-white text-[14px]">{eventData.eventPlace}</p>
              <p className="text-white text-[14px]">{eventData.eventAddress}</p>
            </div>
            <div className="flex justify-center">
              <div className="rounded-md h-[100px] w-[100px] bg-white flex justify-center items-center mt-5">
                <Canvas
                  text={"https://github.com/bunlong/next-qrcode"}
                  options={{
                    errorCorrectionLevel: "M",
                    margin: 0,
                    scale: 4,
                    width: 90,
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-opacity-70 px-5 bg-custom-gradient py-2">
        <button
          type="submit"
          className="w-full text-white py-3 bg-[#5669FF] rounded-2xl font-semibold shadow-lg"
          onClick={handleRegister}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default RegisterEventForm;
