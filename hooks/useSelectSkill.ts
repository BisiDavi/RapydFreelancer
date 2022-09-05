/* eslint-disable react-hooks/exhaustive-deps */
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import useCreateSkillMutation from "@/hooks/useCreateSkillMutation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateSelectedSkills, updateSkills } from "@/redux/form-slice";
import toSlug from "@/lib/toSlug";

function getSkills() {
  return axios.get("/api/skills");
}

type dataType = { label: string; value: string };

export default function useSelectSkill() {
  const { mutate, isLoading: mutateLoading } = useCreateSkillMutation();
  const dispatch = useAppDispatch();
  const { skills, selectedSkills } = useAppSelector((state) => state.form);

  function formatSkills(dataArray: any[]) {
    const defaultOptions: dataType[] = [];
    dataArray.map((item: dataType) => {
      defaultOptions.push({ label: item.label, value: item.value });
    });
    dispatch(updateSkills(defaultOptions));
    return defaultOptions;
  }

  const queryClient = useQueryClient();

  const filterSkills = (inputValue: string) => {
    return skills.filter((i: any) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  function selectHandler(inputValue: any) {
    dispatch(updateSelectedSkills(inputValue));
  }

  function onCreateHandler(inputValue: any) {
    mutate(
      { skill: inputValue, id: toSlug(inputValue) },
      {
        onSuccess: async () => {
          const refetchedData = await queryClient.fetchQuery(
            ["skills"],
            getSkills
          );
          const data = formatSkills(refetchedData.data);
          console.log("data-refetchQueries", refetchedData);
          console.log("data-data", data);
          dispatch(updateSkills(data));
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
    defaultOptions: skills,
    selectedSkills,
    mutateLoading,
  };
}
