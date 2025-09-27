import BookDetails from "@/modules/books/pages/BookDetails"

export default async function BookDetailsPage({
    params,
}: {
    params: Promise<{ bookId: string }>;
}) {
    const { bookId } = await params;

    return <BookDetails bookId={bookId} />;
}

