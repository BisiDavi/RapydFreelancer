import { useState } from "react";

import type { ActionMeta } from "react-select";

interface Option {
  readonly label: string;
  readonly value: string;
}

type skillStateType = {
  isLoading: boolean;
  options: Option[];
  value: Option | undefined;
};

export default function useSelectSkill() {
  const [skillState, setSkillState] = useState<skillStateType>({
    isLoading: false,
    options: [],
    value: undefined,
  });

  const createOption = (skill: string) => ({
    label: skill,
    value: skill.toLowerCase().replace(/\W/g, ""),
  });

  function handleChange(newValue: any, actionMeta: ActionMeta<Option>) {
    console.group("Value Changed");
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    setSkillState({ ...skillState, value: newValue });
  }

  function handleCreate(inputValue: string) {
    setSkillState({ ...skillState, isLoading: true });
    console.group("Option created");
    console.log("Wait a moment...");
    setTimeout(() => {
      const { options } = skillState;
      const newOption = createOption(inputValue);
      console.log(newOption);
      console.groupEnd();
      setSkillState({
        isLoading: false,
        options: [...options, newOption],
        value: newOption,
      });
    }, 1000);
  }

  return {
    handleCreate,
    handleChange,
    skillState,
  };
}
