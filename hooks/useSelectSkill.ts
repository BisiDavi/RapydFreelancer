/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useMemo, useState } from "react";

import useCreateSkillMutation from "@/hooks/useCreateSkillMutation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateSkills } from "@/redux/form-slice";
import toSlug from "@/lib/toSlug";

function getSkills() {
  return axios.get("/api/skills");
}

export default function useSelectSkill() {
  const {
    data,
    status,
    isLoading: fetchingSkillsLoading,
  } = useQuery(["skills"], getSkills);
  console.log("data", data);
  const { mutate, isLoading } = useCreateSkillMutation();
  const dispatch = useAppDispatch();
  const { skills } = useAppSelector((state) => state.form);
  const [defaultOptions, setDefaultOptions] = useState<any>([]);

  const queryClient = useQueryClient();

  function formatSkills(dataArray: any) {
    if (dataArray.length > 0) {
      let defaultOptionsArray: any[] = [];
      dataArray.map((itemData: any) => {
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
      const defaultOptionsArray = formatSkills(data?.data);
      setDefaultOptions(defaultOptionsArray);
    }
  }, [status]);

  function selectHandler(inputValue: any) {
    dispatch(updateSkills(inputValue));
  }

  function onCreateHandler(inputValue: any) {
    mutate(
      { skill: inputValue, id: toSlug(inputValue) },
      {
        onSuccess: (data: any) => {
          console.log("onSuccess-data", data);
          const defaultOptionsArray = formatSkills(data?.data);
          setDefaultOptions(defaultOptionsArray);
          queryClient.invalidateQueries(["searchCatalogObject"]);
        },
        onError: (err) => console.log("mutate-err", err),
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
    fetchingSkillsLoading,
  };
}
