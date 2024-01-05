import { Group } from "@prisma/client";
import axios from "axios";

export const fetchGroups = async () => {
  const { data } = await axios.get("/api/queryFns/groups");
  return data as Group[];
};
