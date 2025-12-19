import { getCollection } from "astro:content";
import type { APIContext } from "astro";
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
    return new Response("Origin header missing or invalid", {
      status: 400,
    });
  }

  const members = await getCollection("members").then((members) =>
    members.map((member) => toMember(member, { url })),
  );
  const member = members.find(
    (member) => getHostname(member.url) === originHostname,
  );

  if (!member) {
    if (import.meta.env.DEV && originHostname === "localhost") {
      return Response.json(members[0]);
    }

    return new Response("Member not found", { status: 404 });
  }

  return Response.json(member);
}
