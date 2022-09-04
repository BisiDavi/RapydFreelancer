import CryptoJS from "crypto-js";

type httpMethodType = "get" | "post" | "delete";

export default function dataRequest(
  urlPath: string,
  httpMethod: httpMethodType,
  data: string
) {
  const salt = CryptoJS.lib.WordArray.random(12); // Randomly generated for each request.
  const timestamp = (Math.floor(new Date().getTime() / 1000) - 10).toString(); // Current Unix time (seconds).
  const access_key = process.env.NEXT_PUBLIC_SANDBOX_RAPYD_ACCESS_KEY; // The access key from Client Portal.
  const secret_key = process.env.NEXT_PUBLIC_SANDBOX_RAPYD_SECRET_KEY; // Never transmit the secret key by itself.
  const getSignature = () => {
    const to_sign =
      httpMethod + urlPath + salt + timestamp + access_key + secret_key + data;
    let signature = CryptoJS.enc.Hex.stringify(
      CryptoJS.HmacSHA256(to_sign, secret_key)
    );

    signature = CryptoJS.enc.Base64.stringify(
      CryptoJS.enc.Utf8.parse(signature)
    );

    return signature;
  };
  const headers = {
    access_key,
    signature: getSignature(),
    salt,
    timestamp,
    "Content-Type": "application/json",
  };
  return {
    baseURL: "https://sandboxapi.rapyd.net",
    headers,
    url: urlPath,
    method: httpMethod,
    data,
  };
}

// You can use any HTTP request library to make the request. Example: Axios
// const response = await axios(request);
