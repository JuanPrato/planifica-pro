import axios from "axios";
import { CONFIG } from "../config/config";

export const API_ROUTES = {
  DAYS: "day",
} as const;

const HOST = CONFIG.BACK_HOST;

export async function GET<T extends any>(
  path: string,
  auth?: string,
  params?: any,
  transform?: (r: T) => T
) {
  const resp = await axios.get(`${HOST}/${path}`, {
    headers: { Authorization: auth ? `Bearer ${auth}` : undefined },
    params: {
      ...params,
    },
  });

  if (transform) {
    return transform(resp.data as T);
  }

  return resp.data as T;
}
