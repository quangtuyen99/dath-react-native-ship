import { ADDRESS } from "../constants";
const initialState = {
  address: "",
};
const changeAddress = (state = initialState, action) => {
  switch (action.type) {
    case ADDRESS:
      return {
        ...state,
        address: action.payload,
      };
    default:
      return state;
  }
};
export default changeAddress;
