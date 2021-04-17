import { ADDRESS } from "../constants";
export function changeAddress(payload) {
  return {
    type: ADDRESS,
    payload: payload,
  };
}
