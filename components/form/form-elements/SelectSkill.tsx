import CreatableSelect from "react-select/async-creatable";

import useSelectSkill from "@/hooks/useSelectSkill";
import type { elementType } from "@/types/form-types";

export default function SelectSkill({ content }: elementType) {
  const { handleCreate, handleChange, skillState } = useSelectSkill();
  const { value, isLoading, options } = skillState;
  return (
    <div className="flex flex-col">
      <label
        className="form flex flex-col relative my-2 font-bold my-1 text-lg"
        htmlFor={content.name}
      >
        {content.label}
      </label>
      <CreatableSelect
        id={content.name}
        classNamePrefix="selectSkill"
        placeholder={content.placeholder}
        cacheOptions
        isClearable
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={options}
        value={value}
      />
      <style jsx>
        {`
          .categorydropdown {
            width: 100%;
            height: 50px;
          }
          .categorydropdown label {
            width: 227px;
            height: 50px;
          }
          .categorydropdown select {
            width: 100%;
          }
        `}
      </style>
    </div>
  );
}
