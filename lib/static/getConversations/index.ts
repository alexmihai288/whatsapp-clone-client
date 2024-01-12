export default async function getConversations() {
  const conversations = await fetch(
    "http://localhost:3000/api/staticRoutes/getConversations",
    {
      next: {
        revalidate: 60,
      },
      method: "GET",
    }
  );
  const jsonConversations = await conversations.json();
  return jsonConversations.allConversations;
}
