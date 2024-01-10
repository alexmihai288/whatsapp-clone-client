export default async function getGroups() {
  const res = await fetch("http://localhost:3000/api/staticRoutes/getGroups", {
    method: "GET",
  });
  if (!res.ok) throw new Error("failed");
  const data = await res.json();
  return data;
}
