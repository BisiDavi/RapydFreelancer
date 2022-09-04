import useRequestMutation from "@/hooks/useRequestMutation";
import axios from "axios";

export function createSkill(skill: string, skillId: string) {
  return axios.post("/api/skills", { skill, skillId });
}

export default function useCreateSkillMutation() {
  return useRequestMutation(
    ({ skill, skillId }) => createSkill(skill, skillId),
    {
      mutationKey: ["useCreateSkillMutation"],
      success: "skill added",
      error: "unable to add skill",
    }
  );
}
