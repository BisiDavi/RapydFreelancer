/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

export default function useSelectSkill() {
    
  const { getInputValue, onChangeHandler } = useReduxForm();
  const value = getInputValue("service-category");
  const { mutate, isLoading } = useCreateCategoryMutation();
  const [defaultOptions, setDefaultOptions] = useState([
    { label: "None", value: "NONE" },
  ]);
  const { data, status } = useQuery(["searchCatalogObject"], () =>
    searchCatalogObject({ objectTypes: ["CATEGORY"] })
  );
  const queryClient = useQueryClient();

  const filterCategories = (inputValue: string) => {
    return defaultOptions.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  function getCategories() {
    const parsedData = JSON.parse(data.data);
    let defaultOptionsArray = [{ label: "None", value: "NONE" }];
    parsedData.objects.map((itemData: any) => {
      defaultOptionsArray.push({
        label: itemData?.categoryData?.name,
        value: itemData?.id,
      });
    });
    return defaultOptionsArray;
  }

  useMemo(() => {
    if (status === "success") {
      const defaultOptionsArray = getCategories();
      setDefaultOptions(defaultOptionsArray);
    }
  }, [status]);

  const promiseOptions: any = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterCategories(inputValue));
      }, 1000);
    });

  function selectHandler(inputValue: any) {
    onChangeHandler(inputValue, "service-category", true);
  }

  function onCreateHandler(inputValue: any) {
    mutate(inputValue, {
      onSuccess: (data: any) => {
        const parsedData = JSON.parse(data?.data).catalogObject;
        onChangeHandler(
          { label: parsedData.categoryData.name, value: parsedData.id },
          "service-category",
          true
        );
        queryClient.invalidateQueries(["searchCatalogObject"]);
      },
    });
  }

  return {
    promiseOptions,
    isLoading,
    mutate,
    value,
    defaultOptions,
    selectHandler,
    onCreateHandler,
  };
}
