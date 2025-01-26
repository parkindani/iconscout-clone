import axios from "axios";

const DOWNLOAD_API_ENDPOINT = (uuid: string) =>
  `https://api.iconscout.com/v3/items/${uuid}/api-download`;

const get_download_url = async ({
  uuid,
  clientKey,
  secretKey,
}: {
  uuid: string;
  clientKey: string;
  secretKey: string;
}) => {
  try {
    const response = await axios.post(
      DOWNLOAD_API_ENDPOINT(uuid),
      {
        format: "json",
      },
      {
        headers: {
          "Client-ID": clientKey,
          "Client-Secret": secretKey,
          "Content-Type": "application/json",
        },
      }
    );
    const {
      data: {
        response: {
          download: { url },
        },
      },
    } = response;
    if (url) {
      return url;
    } else {
      throw new Error("No download url found");
    }
  } catch (error) {
    console.error(error);
  }
};

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig();

  const CLIENT_KEY = config.public.clientId;
  const SECRET_KEY = config.clientSecretKey;

  const { uuid } = await readBody(event);
  const res = await get_download_url({
    uuid,
    clientKey: CLIENT_KEY,
    secretKey: SECRET_KEY,
  });
  return res
});
