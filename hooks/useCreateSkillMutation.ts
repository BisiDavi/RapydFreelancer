import useRequestMutation from "@/hooks/useRequestMutation";
import axios from "axios";

export function createSkill(skill: string, id: string) {
  return axios.post("/api/skills", { skill, id });
}

export default function useCreateSkillMutation() {
  return useRequestMutation(({ skill, id }) => createSkill(skill, id), {
    mutationKey: ["useCreateSkillMutation"],
    success: "skill added",
    error: "unable to add skill",
  });
}
