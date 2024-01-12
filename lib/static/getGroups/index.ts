export default async function getGroups() {
  const groups = await fetch(
    "http://localhost:3000/api/staticRoutes/getGroups",
    {
      next: {
        revalidate: 60,
      },
      method: "GET",
    }
  );
  const jsonGroups = await groups.json();
  return jsonGroups.allGroups;
}
