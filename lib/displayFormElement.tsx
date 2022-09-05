import Input from "@/components/form/form-elements/Input";
import InputSelect from "@/components/form/form-elements/InputSelect";
import Media from "@/components/form/form-elements/Media";
import PriceRange from "@/components/form/form-elements/PriceRange";
import Select from "@/components/form/form-elements/Select";
import SelectSkill from "@/components/form/form-elements/SelectSkill";
import Textarea from "@/components/form/form-elements/Textarea";

import type { elementType } from "@/types/form-types";

export default function displayFormElement(content: elementType["content"]) {
  switch (content.type) {
    case "input":
      return <Input content={content} />;
    case "textarea":
      return <Textarea content={content} />;
    case "select":
      return <Select content={content} />;
    case "select-skills":
      return <SelectSkill content={content} />;
    case "price-range":
      return <PriceRange content={content} />;
    case "input-select":
      return <InputSelect content={content} />;
    case "media":
      return <Media content={content} />;
  }
}
