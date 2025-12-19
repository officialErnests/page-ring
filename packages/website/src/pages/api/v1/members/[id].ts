import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { toMember } from "~/lib/member";

export async function GET({ params, url }: APIContext) {
  const members = await getCollection("members").then((members) =>
    members.map((member) => toMember(member, { url })),
  );

  const entryIdx = members.findIndex((member) => member.id === params.id);
  if (entryIdx === -1) {
    return new Response("Member not found", { status: 404 });
  }

  const current = members[entryIdx];
  const prev = members[entryIdx - 1] || members[members.length - 1];
  const next = members[entryIdx + 1] || members[0];

  return Response.json({
    current,
    prev,
    next,
  });
}
