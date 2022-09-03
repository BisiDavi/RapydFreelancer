/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import useCreateSkillMutation from "@/hooks/useCreateSkillMutation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateSkills } from "@/redux/form-slice";

function getSkills() {
  return axios.get("/api/skills");
}

export default function useSelectSkill() {
  const { data, status } = useQuery(["skills"], getSkills);
  const { mutate, isLoading } = useCreateSkillMutation();
  console.log("data", data);
  const dispatch = useAppDispatch();
  const { skills } = useAppSelector((state) => state.form);
  const [defaultOptions, setDefaultOptions] = useState<any>([]);

  const queryClient = useQueryClient();

  function formatSkills() {
    if (data?.data.length > 0) {
      const parsedData = JSON.parse(data?.data);
      console.log("parsedData", parsedData);
      let defaultOptionsArray: any[] = [];
      parsedData.map((itemData: any) => {
        console.log("itemData", itemData);
        defaultOptionsArray.push({
          label: itemData.skill,
          value: itemData.id,
        });
      });
      return defaultOptionsArray;
    }
    return [];
  }

  const filterSkills = (inputValue: string) => {
    return defaultOptions.filter((i: any) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  useMemo(() => {
    if (status === "success") {
      const defaultOptionsArray = formatSkills();
      setDefaultOptions(defaultOptionsArray);
    }
  }, [status]);

  function selectHandler(inputValue: any) {
    dispatch(updateSkills(inputValue));
  }

  function onCreateHandler(inputValue: any) {
    console.log("inputValue", inputValue);
    mutate(
      { skill: inputValue, skillId: uuidv4() },
      {
        onSuccess: (data: any) => {
          console.log("mutate-data", data);
          const parsedData = JSON.parse(data?.data);
          console.log("parsedData", parsedData);
          queryClient.invalidateQueries(["searchCatalogObject"]);
        },
      }
    );
  }

  const promiseOptions: any = (inputValue: string) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterSkills(inputValue));
      }, 1000);
    });

  return {
    onCreateHandler,
    selectHandler,
    promiseOptions,
    skills,
    isLoading,
    defaultOptions,
  };
}
