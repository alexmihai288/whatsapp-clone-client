import axios from "axios";
import { Profile } from "@prisma/client";

export const fetchUsers = async ({ name }: { name: string }) => {
  const { data } = await axios.get(`/api/queryFns/users/${name}`);
  return data as Profile[];
};
