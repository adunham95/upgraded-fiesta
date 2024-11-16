export async function setAPIChecked(id: string) {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/patch/${id}`, {
    method: "PATCH",
    headers: {
      "X-Api-Key": import.meta.env.VITE_POSTMAN_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ isComplete: true }),
  });
  return res.json();
}
