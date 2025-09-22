import AuthorEditPage from "@/modules/authors/pages/AuthorEditPage";

export default async function EditAuthorPage({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { authorId } = await params;

  return <AuthorEditPage authorId={authorId} />;
}