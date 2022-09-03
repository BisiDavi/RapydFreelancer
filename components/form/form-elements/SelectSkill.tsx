import useSelectSkill from "@/hooks/useSelectSkill";
import AsyncCreatableSelect from "react-select/async-creatable";

export default function SelectSkill() {
  const {
    promiseOptions,
    isLoading,
    value,
    defaultOptions,
    onCreateHandler,
    selectHandler,
  } = useSelectSkill();
  return (
    <div className="categorydropdown flex items-center">
      <label
        className="bg-gray-200 text-gray-900 px-3 py-4 border-b border-white font-bold items-center flex"
        htmlFor="categoryDropdown"
      >
        Category
      </label>
      <AsyncCreatableSelect
        id="categoryDropdown"
        className="w-3/4"
        classNamePrefix="categoryDropdown"
        placeholder="Select Category"
        cacheOptions
        value={value}
        isClearable
        isLoading={isLoading}
        onCreateOption={onCreateHandler}
        onChange={selectHandler}
        defaultOptions={defaultOptions}
        loadOptions={promiseOptions}
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
