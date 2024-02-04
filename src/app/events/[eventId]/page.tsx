export default function Page({ params }: { params: { eventId: string } }) {
  return <div>My Post: {params.eventId}</div>;
}
