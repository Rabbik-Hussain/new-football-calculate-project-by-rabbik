const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY;

const TABLE = "mc_shared_reports";

const headers = {
  "Content-Type": "application/json",
  "Cache-Control": "no-store"
};

function response(statusCode, data) {
  return {
    statusCode,
    headers,
    body: JSON.stringify(data)
  };
}

function getSupabaseConfig() {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Supabase environment variables are missing.");
  }

  return {
    url: SUPABASE_URL.replace(/\/+$/, ""),
    key: SUPABASE_SERVICE_ROLE_KEY
  };
}

function isValidReport(report) {
  return (
    report &&
    typeof report === "object" &&
    !Array.isArray(report) &&
    typeof report.tournamentId === "string" &&
    Array.isArray(report.tournaments) &&
    Array.isArray(report.teams) &&
    Array.isArray(report.players) &&
    Array.isArray(report.matches)
  );
}

export const handler = async function (event) {
  try {
    const method = event.httpMethod;

    if (method !== "GET" && method !== "POST") {
      return response(405, {
        error: "Method not allowed."
      });
    }

    const { url, key } = getSupabaseConfig();

    const supabaseHeaders = {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json"
    };

    // GET: Load a shared report using its ID.
    if (method === "GET") {
      const id = event.queryStringParameters?.id || "";

      // Accept UUIDs only.
      const uuidPattern =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

      if (!uuidPattern.test(id)) {
        return response(400, {
          error: "Invalid report ID."
        });
      }

      const query =
        `${url}/rest/v1/${TABLE}` +
        `?select=id,payload&id=eq.${encodeURIComponent(id)}` +
        "&limit=1";

      const result = await fetch(query, {
        method: "GET",
        headers: supabaseHeaders
      });

      if (!result.ok) {
        console.error("Supabase report read failed:", result.status);

        return response(502, {
          error: "অনলাইন রিপোর্ট লোড করা যায়নি।"
        });
      }

      const rows = await result.json();

      if (!Array.isArray(rows) || rows.length === 0) {
        return response(404, {
          error: "রিপোর্ট পাওয়া যায়নি।"
        });
      }

      return response(200, {
        report: rows[0].payload
      });
    }

    // POST: Save a report snapshot and return its short ID.
    let body;

    try {
      body = JSON.parse(event.body || "{}");
    } catch {
      return response(400, {
        error: "Invalid JSON request."
      });
    }

    const report = body.report || body.snapshot || body;

    if (!isValidReport(report)) {
      return response(400, {
        error: "রিপোর্টের ডেটা সঠিক নয়।"
      });
    }

    const reportSize = Buffer.byteLength(
      JSON.stringify(report),
      "utf8"
    );

    if (reportSize > 3 * 1024 * 1024) {
      return response(413, {
        error: "রিপোর্টটি অনেক বড়। ছবি ছোট করে আবার চেষ্টা করুন।"
      });
    }

    const insertUrl = `${url}/rest/v1/${TABLE}`;

    const result = await fetch(insertUrl, {
      method: "POST",
      headers: {
        ...supabaseHeaders,
        Prefer: "return=representation"
      },
      body: JSON.stringify({
        payload: report
      })
    });

    if (!result.ok) {
      const errorText = await result.text();

      console.error(
        "Supabase report save failed:",
        result.status,
        errorText
      );

      return response(502, {
        error: "অনলাইন রিপোর্ট সংরক্ষণ করা যায়নি।"
      });
    }

    const rows = await result.json();

    if (!Array.isArray(rows) || !rows[0]?.id) {
      return response(502, {
        error: "রিপোর্টের শেয়ার লিংক তৈরি করা যায়নি।"
      });
    }

    return response(201, {
      id: rows[0].id
    });
  } catch (error) {
    console.error("MATCHCRAFT reports function error:", error);

    return response(500, {
      error: "সার্ভারে সমস্যা হয়েছে। পরে আবার চেষ্টা করুন।"
    });
  }
};