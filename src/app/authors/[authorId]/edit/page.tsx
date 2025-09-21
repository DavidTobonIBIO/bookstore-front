export default async function EditAuthorPage({
  params,
}: {
  params: { authorId: string };
}) {
  const { authorId } = await params;

  return (
    <main className="container mx-auto p-8">
      <h1 className="text-3xl font-bold">
        Edición de Autor con ID: {authorId}
      </h1>
      {/* Form here */}
    </main>
  );
}