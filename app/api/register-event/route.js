import { NextResponse } from "next/server";
import User from "@/models/user";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { email, eventId, ticketStatus = "pending" } = await req.json();

    if (!email || !eventId) {
      return NextResponse.json(
        { error: "Email and Event ID are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    console.log("Registering event for:", { email, eventId, ticketStatus });

    // Update the user's registered events
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { $push: { registeredEvents: { eventId, ticketStatus } } },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      console.error("No user found with email:", email);
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    console.log("Updated user:", updatedUser);

    return NextResponse.json({
      success: true,
      message: "Event registered successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error registering event:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to register event. Please try again." },
      { status: 500 }
    );
  }
}
