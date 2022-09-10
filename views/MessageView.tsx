import { useAppSelector } from "@/hooks/useRedux";

export default function MessageView() {
  const { messages } = useAppSelector((state) => state.user);
  return (
    <div>
      <ul>
        {messages.map((item, index) => {
            console.log('item',item)
          return <li key={index}></li>;
        })}
      </ul>
    </div>
  );
}
