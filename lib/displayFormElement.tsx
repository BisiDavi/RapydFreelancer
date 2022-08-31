import Input from "@/components/form/Input";
import Media from "@/components/form/Media";
import Textarea from "@/components/form/Textarea";

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
