import axios from "axios";
import { $fetch } from "ofetch";

export const downloadJson = async (uuid: string) => {
  const GET_DOWNLOAD_API_URL = `/api/getDownloadUrl`;

  const url = await $fetch(GET_DOWNLOAD_API_URL, {
    method: "POST",
    body: JSON.stringify({ uuid }),
  });

  const response = await axios.get(url);
  return response.data || {};
};
