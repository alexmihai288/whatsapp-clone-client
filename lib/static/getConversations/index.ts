export default async function getConversations() {
  const conversations = await fetch(
    "https://whatsapp-clone-client-alexmihai288.vercel.app/api/staticRoutes/getConversations",
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
