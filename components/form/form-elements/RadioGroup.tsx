import { useFormContext } from "react-hook-form";

interface Props {
  content: {
    radios: Array<{ text: string; value: string }>;
    name: string;
    label: string;
  };
}

export default function RadioGroup({ content }: Props) {
  const { register }: any = useFormContext();
  return (
    <div className="radio-group">
      <label htmlFor={content.name}>{content.label}</label>
      {content.radios.map((item, index) => (
        <div key={index}>
          <input
            type="radio"
            value={item.value}
            name={content.name}
            className="mr-1"
            {...register(content.name)}
          />
          {item.text}
        </div>
      ))}
    </div>
  );
}
