/* eslint-disable react-hooks/exhaustive-deps */
import { useMemo, useState } from "react";

export default function useSelectSkill() {
  const [defaultOptions, setDefaultOptions] = useState([
    { label: "None", value: "NONE" },
  ]);

  const filterCategories = (inputValue: string) => {
    return defaultOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const promiseOptions: any = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterCategories(inputValue));
      }, 1000);
    });

  function selectHandler(inputValue: any) {}

  function onCreateHandler(inputValue: any) {}

  return {
    promiseOptions,
    defaultOptions,
    selectHandler,
    onCreateHandler,
  };
}
