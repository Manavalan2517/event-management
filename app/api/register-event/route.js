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

    await connectMongoDB();

    // Find the user by email and update registeredEvents
    const updatedUser = await User.findOneAndUpdate(
      { email },
      {
        $push: {
          registeredEvents: { eventId, ticketStatus },
        },
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found." }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Event registered successfully.",
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error registering event:", error);
    return NextResponse.json(
      { error: "Failed to register event. Please try again." },
      { status: 500 }
    );
  }
}
