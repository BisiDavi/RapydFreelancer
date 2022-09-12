import displayCardIcon from "@/components/card/displayCardIcon";

interface Props {
  content: {
    title: string;
    icon: string;
    text: string;
  };
}

export default function InfoCard({ content }: Props) {
  return (
    <div className="bg-white my-3 lg:my-0 rounded-lg bg-gray-50 shadow p-4 mx-4 h-52">
      <div className="title flex items-center my-2">
        <div className="icon text-2xl mr-2">
          {displayCardIcon(content.icon)}
        </div>
        <h4 className="font-medium text-xl">{content.title}</h4>
      </div>
      <p className="font-light text-lg">{content.text}</p>
    </div>
  );
}
