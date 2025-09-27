import AuthorEdit from "@/modules/authors/pages/AuthorEdit";

export default async function EditAuthorPage({
  params,
}: {
  params: Promise<{ authorId: string }>;
}) {
  const { authorId } = await params;

  return <AuthorEdit authorId={authorId} />;
}