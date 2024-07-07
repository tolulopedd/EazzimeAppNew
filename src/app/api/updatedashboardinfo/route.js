import { NextResponse } from "next/server";
import axios from "axios";
import { routes } from "@/api/routes";

export async function PUT(request) {
  try {
    const payloadData = await request.json();
    const authHeader = request.headers.get("Authorization");


    const apiUrl = `${process.env.NEXT_PUBLIC_BASEURL}/${routes.updateDashboardInfo}`;

    const response = await axios.put(apiUrl, payloadData, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": authHeader,
      },
    });


    // Respond with the data from the external API
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error processing PUT request:", error.message);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
