/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import useCreateSkillMutation from "@/hooks/useCreateSkillMutation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateSelectedSkills, updateSkills } from "@/redux/form-slice";
import toSlug from "@/lib/toSlug";

function getSkills() {
  return axios.get("/api/skills");
}

export default function useSelectSkill() {
  const { data, status, isLoading } = useQuery(["skills"], getSkills);
  const { mutate, isLoading: mutateLoading } = useCreateSkillMutation();
  const dispatch = useAppDispatch();
  const { skills, selectedSkills } = useAppSelector((state) => state.form);

  console.log("status", status);

  function formatSkills() {
    if (status === "success") {
      const defaultOptions: { label: string; value: string }[] = [];
      data?.data.map((item: { label: string; value: string }) => {
        defaultOptions.push({ label: item.label, value: item.value });
      });
      dispatch(updateSkills(defaultOptions));
      return defaultOptions;
    }
    return [];
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
        onSuccess: () => {
          queryClient.invalidateQueries(["skills"]);
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
    isLoading,
    selectedSkills,
    mutateLoading,
  };
}
