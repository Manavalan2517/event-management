import { events } from "@/data/data";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
  try {
    // Extract eventId from the URL parameters
    const { eventId } = params;
    // Validate if eventId exists
    if (!eventId) {
      return NextResponse.json(
        { error: "The 'eventId' parameter is required." },
        { status: 400 }
      );
    }

    // Find the event from the data array
    const event = events.find((e) => e.eventId === eventId);

    // If no event matches, return 404
    if (!event) {
      return NextResponse.json({ error: "Event not found." }, { status: 404 });
    }

    // Return the event details
    return NextResponse.json({ event });
  } catch (error) {
    // Handle unexpected errors
    console.error("Error fetching event:", error);
    return NextResponse.json(
      { error: "Failed to fetch event. Please try again later." },
      { status: 500 }
    );
  }
}
