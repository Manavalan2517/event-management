import { NextResponse } from "next/server";
import Testimonial from "@/models/testimonial";
import { connectMongoDB } from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { name, body } = await req.json();

    // Ensure that name and body are provided
    if (!name || !body) {
      return NextResponse.json(
        { error: "Name and body are required." },
        { status: 400 }
      );
    }

    // Connect to MongoDB
    await connectMongoDB();

    console.log("Adding new testimonial:", { name, body });

    // Create a new testimonial document
    const newTestimonial = new Testimonial({ name, body });

    // Save it to MongoDB
    await newTestimonial.save();

    return NextResponse.json(
      {
        success: true,
        message: "Testimonial added successfully.",
        testimonial: newTestimonial,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error adding testimonial:", error.message);
    return NextResponse.json(
      {
        error: error.message || "Failed to add testimonial. Please try again.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Connect to MongoDB
    await connectMongoDB();

    // Fetch all testimonials from the database
    const testimonials = await Testimonial.find();

    return NextResponse.json(
      {
        success: true,
        testimonials, // Return the testimonials
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching testimonials:", error.message);
    return NextResponse.json(
      { error: error.message || "Failed to fetch testimonials." },
      { status: 500 }
    );
  }
}
