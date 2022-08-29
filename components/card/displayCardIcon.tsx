import { BsFillBriefcaseFill, BsFillCreditCardFill, BsPersonCheckFill } from "react-icons/bs";

export default function displayCardIcon(icon: string) {
  switch (icon) {
    case "postJob":
      return <BsFillBriefcaseFill />;
    case "chooseFreelancer":
      return <BsPersonCheckFill />;
    case "paySafely":
      return <BsFillCreditCardFill />;
  }
}

