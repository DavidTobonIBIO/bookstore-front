import AuthorEditPage from "@/modules/authors/pages/AuthorEditPage";

export default async function EditAuthorPage({
  params,
}: {
  params: { authorId: string };
}) {
  const { authorId } = params;

  return <AuthorEditPage authorId={authorId} />;
}