import toSlug from "@/lib/toSlug";

interface Props {
  setOpenTab: (tab: number) => void;
  openTab: number;
  index: number;
  text: string;
}

export default function TabItem({ setOpenTab, openTab, index, text }: Props) {
  const tabActiveClassName =
    openTab === index ? "bg-blue-600 text-white" : "text-blue-600";
  return (
    <li className="-mb-px mr-2 last:mr-0 flex-auto text-center">
      <a
        className={`text-xs font-bold uppercase px-5 py-3 ${tabActiveClassName} shadow-lg rounded block leading-normal`}
        onClick={() => setOpenTab(index)}
        data-toggle="tab"
        href={`#${toSlug(text)}`}
        role="tablist"
      >
        {text}
      </a>
    </li>
  );
}
