import { useRouter } from "next/router";

export default function SessionIndexPage() {
  const router = useRouter();
  const { sessionId } = router.query;

  if (!sessionId || typeof sessionId !== "string") {
    return <p>Loading...</p>;
  }

  // Redirect otomatis ke /questions
  if (sessionId) {
    router.replace(`/member/consultation/${sessionId}/questions`);
  }

  return <p>Loading...</p>;
}
