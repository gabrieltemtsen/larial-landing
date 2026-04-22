import { readFile } from "fs/promises";
import path from "path";

export type Settings = {
  name: string;
  tagline: string;
  description: string;
  address: string;
  hours: string;
  whatsappE164: string;
  email: string;
};

export type Service = {
  title: string;
  description: string;
  startingFromNgn?: number;
};

export type Job = {
  id: string;
  title: string;
  location: string;
  type: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
};

async function readJson<T>(file: string): Promise<T> {
  const p = path.join(process.cwd(), file);
  const raw = await readFile(p, "utf8");
  return JSON.parse(raw) as T;
}

export async function getSettings(): Promise<Settings> {
  return readJson<Settings>("content/settings.json");
}

export async function getServices(): Promise<Service[]> {
  const res = await readJson<{ items: Service[] }>("content/services.json");
  return res.items;
}

export async function getJobs(): Promise<Job[]> {
  const res = await readJson<{ items: Job[] }>("content/jobs.json");
  return res.items;
}
