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
    case "bank_redirect":
      return "Bank Redirect";
    case "ewallet":
      return "E-wallet";
    case "rapyd_ewallet":
      return "Rapyd Ewallet";
    case "ewallet_redirect":
      return "Ewallet Redirect";
    default:
      return category;
  }
}

export function formatCategoryIntoKey(category: string) {
  switch (category) {
    case "Cash":
      return "cash";
    case "Bank Transfer":
      return "bank_transfer";
    case "Card":
      return "card";
    case "Bank Redirect":
      return "bank_redirect";
    case "E-wallet":
      return "ewallet";
    case "Rapyd Ewallet":
      return "rapyd_ewallet";
    case "Ewallet Redirect":
      return "ewallet_redirect";
    default:
      return category;
  }
}


export function getConnectQuantity(connectPrice: string) {
  if (connectPrice === "20") {
    return 10;
  } else if (connectPrice === "50") {
    return 50;
  } else if (connectPrice === "90") {
    return 100;
  }
}