import { NextResponse } from "next/server";
import axios from "axios";
import { routes } from "@/api/routes";

export async function POST(request) {
  try {
    const authHeader = request.headers.get("Authorization");
    const payloadData = await request.json();

    // Optionally, you can make a POST request to an external API
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASEURL}/${routes.getEmployeeBankDetails}`,
      payloadData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    // Respond with the data from the external API
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json(
      { error: "Failed to process POST request" },
      { status: 500 }
    );
  }
}
