import { MY_SERVER } from "../../env";
import axios from "axios";
import Iuser from "../../models/user";

export const userLogin = async (usr: Iuser) => {
  const res = await axios.post(`${MY_SERVER}login/`, {"username":usr.username,"password":usr.password})
  return res.data
}