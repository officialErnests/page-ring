import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { toMember } from "~/lib/member";

export async function GET({ url }: APIContext) {
  const members = await getCollection("members").then((members) =>
    members.map((member) => toMember(member, { url })),
  );

  return Response.json(members);
}
