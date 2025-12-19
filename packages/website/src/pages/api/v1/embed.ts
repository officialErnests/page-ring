import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import { toMember } from "~/lib/member";

const getHostname = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
};

export async function GET({ url, request }: APIContext) {
  const origin = request.headers.get("origin");
  const originHostname = getHostname(origin || "");
  if (!origin || !originHostname) {
    return new Response("Origin header missing or invalid", { status: 400 });
  }

  const members = await getCollection("members").then((members) =>
    members.map((member) => toMember(member, { url })),
  );
  let entryIdx = members.findIndex(
    (member) => getHostname(member.url) === originHostname,
  );
  if (entryIdx === -1) {
    if (import.meta.env.DEV && originHostname === "localhost") {
      entryIdx = 0;
    } else {
      return new Response("Member not found", { status: 404 });
    }
  }

  const current = members[entryIdx];
  const prev = members[entryIdx - 1] || members[members.length - 1];
  const next = members[entryIdx + 1] || members[0];

  console.log(members);
  return Response.json({
    current,
    prev,
    next,
    members,
  });
}
