import { NextResponse } from "next/server";
import { getBookingsCollection } from "@/lib/mongodb";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // basic validation
    const required = [
      "service",
      "date",
      "time",
      "firstName",
      "lastName",
      "email",
      "phone",
      "deviceModel",
    ];
    for (const key of required) {
      if (!body[key]) {
        return NextResponse.json(
          { error: `${key} is required` },
          { status: 400 }
        );
      }
    }

    const collection = await getBookingsCollection();

    const booking = {
      service: body.service,
      date: new Date(body.date),
      time: body.time,
      customer: {
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
      },
      device: {
        model: body.deviceModel,
        condition: body.deviceCondition || null,
        notes: body.notes || null,
      },
      createdAt: new Date(),
      status: "pending",
    };

    const result = await collection.insertOne(booking);

    return NextResponse.json(
      { success: true, id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (err: any) {
    console.error("/api/bookings error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const collection = await getBookingsCollection();

    // simple query: return most recent 100 bookings
    const cursor = collection.find().sort({ createdAt: -1 }).limit(100);
    const bookings = await cursor.toArray();

    // convert _id and dates to strings
    const data = bookings.map((b: any) => ({
      id: b._id?.toString(),
      service: b.service,
      date: b.date ? new Date(b.date).toISOString() : null,
      time: b.time || null,
      customer: b.customer || null,
      device: b.device || null,
      status: b.status || null,
      createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : null,
    }));

    return new NextResponse(JSON.stringify({ success: true, bookings: data }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("/api/bookings GET error:", err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
