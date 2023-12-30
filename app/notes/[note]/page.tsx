import Card from "../../components/note/Card";

export default function SingleNote({ params }: { params: { note: string } }) {

  return <Card note={Number(params.note)} />;
}
