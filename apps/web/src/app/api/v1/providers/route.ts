import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { searchProviders } from "@/lib/providers";

const searchSchema = z.object({
  address: z.string().optional(),
  lat: z.coerce.number().optional(),
  lng: z.coerce.number().optional(),
  radius: z.coerce.number().min(1).max(100).optional(),
  type: z.enum(["sa", "mh", "both"]).optional(),
  state: z.string().length(2).optional(),
  taxonomyCodes: z
    .string()
    .transform((s) => s.split(",").filter(Boolean))
    .optional(),
  sources: z
    .string()
    .transform((s) =>
      s.split(",").filter((v): v is "findtreatment" | "npi" =>
        ["findtreatment", "npi"].includes(v)
      )
    )
    .optional(),
  page: z.coerce.number().int().min(1).optional(),
  pageSize: z.coerce.number().int().min(1).max(100).optional(),
});

export async function GET(request: NextRequest) {
  const params = Object.fromEntries(request.nextUrl.searchParams);

  const parsed = searchSchema.safeParse(params);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid parameters", details: parsed.error.flatten() },
      { status: 400 }
    );
  }

  const { address, lat, lng, ...rest } = parsed.data;

  if (!address && (lat == null || lng == null)) {
    // Allow NPI-only searches without location
    if (rest.sources?.length === 1 && rest.sources[0] === "npi" && rest.state) {
      // OK — NPI can search by state alone
    } else {
      return NextResponse.json(
        {
          error:
            "Either 'address' or both 'lat' and 'lng' are required (unless searching NPI by state only)",
        },
        { status: 400 }
      );
    }
  }

  try {
    const result = await searchProviders({
      address,
      lat,
      lng,
      ...rest,
    });

    return NextResponse.json(result);
  } catch (err) {
    console.error("Provider search error:", err);
    return NextResponse.json(
      { error: "Provider search failed" },
      { status: 502 }
    );
  }
}
