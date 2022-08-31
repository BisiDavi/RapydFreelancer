import Input from "@/components/form/form-elements/Input";
import Media from "@/components/form/form-elements/Media";
import Textarea from "@/components/form/form-elements/Textarea";

import type { elementType } from "@/types/form-types";

export default function displayFormElement(content: elementType["content"]) {
  switch (content.type) {
    case "input":
      return <Input content={content} />;
    case "textarea":
      return <Textarea content={content} />;
    case "media":
      return <Media content={content} />;
  }
}
