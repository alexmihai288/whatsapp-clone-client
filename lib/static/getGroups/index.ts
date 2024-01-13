export default async function getGroups() {
  const groups = await fetch(
    "https://whatsapp-clone-client-alexmihai288.vercel.app/api/staticRoutes/getGroups",
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
