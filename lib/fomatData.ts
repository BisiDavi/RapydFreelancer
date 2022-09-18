import countries from "@/json/countries.json";

export function getDays(seconds: number) {
  if (seconds > 86400) {
    const dayPeriod = seconds / 86400;
    const dayPeriodValue = dayPeriod > 1 ? "days" : "day";
    return `${dayPeriod} ${dayPeriodValue}`;
  } else {
    const minPeriod = seconds / 3600;
    const minPeriodValue = minPeriod > 1 ? "mins" : "min";
    return `${minPeriod} ${minPeriodValue}`;
  }
}

export function getCountry(countryCode: string) {
  console.log("countryCode", countryCode);
  return countries.filter((item) => item.Iso2 === countryCode.toUpperCase())[0]
    .name;
}

export function formatCategory(category: string) {
  switch (category) {
    case "cash":
      return "Cash";
    case "bank_transfer":
      return "Bank Transfer";
    case "card":
      return "Card";
    default:
      return category;
  }
}
