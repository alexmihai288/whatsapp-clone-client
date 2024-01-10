
export default async function getConversations() {
  const res = await fetch("http://localhost:3000/api/staticRoutes/getConversations", {
    method: "GET",
  });
  if (!res.ok) throw new Error("failed");
  const data = await res.json()
  console.log(data)
  return data
}
