/* eslint-disable react-hooks/exhaustive-deps */
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import useCreateSkillMutation from "@/hooks/useCreateSkillMutation";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateSkills } from "@/redux/form-slice";
import toSlug from "@/lib/toSlug";

function getSkills() {
  return axios.get("/api/skills");
}

export default function useSelectSkill() {
  const { data, status, isLoading } = useQuery(["skills"], getSkills);
  console.log("getSkills-data", data);
  const { mutate } = useCreateSkillMutation();
  const dispatch = useAppDispatch();
  const { skills } = useAppSelector((state) => state.form);

  const defaultOptions = status === "success" ? data?.data : [];

  const queryClient = useQueryClient();

  const filterSkills = (inputValue: string) => {
    return defaultOptions.filter((i: any) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  function selectHandler(inputValue: any) {
    dispatch(updateSkills(inputValue));
  }

  function onCreateHandler(inputValue: any) {
    mutate(
      { skill: inputValue, id: toSlug(inputValue) },
      {
        onSuccess: (data: any) => {
          console.log("onSuccess-data", data);
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
    defaultOptions,
    isLoading,
  };
}
