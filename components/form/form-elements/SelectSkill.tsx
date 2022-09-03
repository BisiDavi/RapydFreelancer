import AsyncCreatableSelect from "react-select/async-creatable";

import useSelectSkill from "@/hooks/useSelectSkill";
import type { elementType } from "@/types/form-types";

export default function SelectSkill({ content }: elementType) {
  const {
    onCreateHandler,
    selectHandler,
    promiseOptions,
    skills,
    defaultOptions,
    isLoading,
  } = useSelectSkill();
  return (
    <div className="flex flex-col">
      <label
        className="form flex flex-col relative my-2 font-bold my-1 text-lg"
        htmlFor={content.name}
      >
        {content.label}
      </label>
      <AsyncCreatableSelect
        cacheOptions
        isClearable
        classNamePrefix="selectSkill"
        id={content.name}
        placeholder={content.placeholder}
        isDisabled={isLoading}
        isLoading={isLoading}
        onChange={selectHandler}
        onCreateOption={onCreateHandler}
        defaultOptions={defaultOptions}
        loadOptions={promiseOptions}
        value={skills}
      />
    </div>
  );
}
