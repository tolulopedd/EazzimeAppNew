import { NextResponse } from "next/server";
import axios from "axios";
import { routes } from "@/api/routes";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountId = searchParams.get("accountid");
    const authHeader = request.headers.get("Authorization");
    if (!accountId) {
      return NextResponse.json({ error: "Account ID is required" }, { status: 400 });
    }
    // Optionally, you can make a POST request to an external API
    const response = await axios.get(
      `${
        process.env.NEXT_PUBLIC_BASEURL
      }/${`${routes.getTransactionDetails}/${accountId}`}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: authHeader,
        },
      }
    );

    console.log("response", response);

    // Respond with the data from the external API
    return NextResponse.json(response.data);
  } catch (error) {
    console.error("Error processing request:", error);
    return NextResponse.json(
      { error: "Failed to process request" },
      { status: 500 }
    );
  }
}
