import { joinURL } from "ufo";
import { API_BASE } from "./consts";
import { onMount } from "svelte";

export interface Member {
  id: string;
  name: string;
  url: string;
  buttonUrl: string;
}

export type EmbedResponse = {
  current: Member;
  prev: Member;
  next: Member;
  members: Member[];
};
export async function getEmbed() {
  const res = await fetch(joinURL(API_BASE, "/embed"), {
    headers: {
      "Content-Type": "application/json",
    },
    // credentials: "include",
  });
  if (!res.ok) {
    throw new Error(`Failed to fetch /embed: ${res.status}`);
  }
  const data = await res.json();
  return data as EmbedResponse;
}

export default function useEmbed() {
  let data = $state.raw<EmbedResponse | null>(null);

  onMount(async () => {
    const res = await fetch(joinURL(API_BASE, "/embed"), {
      headers: {
        "Content-Type": "application/json",
      },
      // credentials: "include",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch /embed: ${res.status}`);
    }
    data = await res.json();
  });

  return {
    get data() {
      return data;
    },
  };
}
