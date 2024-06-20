import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { config } from "../config";

export const storage = new ThirdwebStorage({
  secretKey: config.thirdweb.apiKey,
});
