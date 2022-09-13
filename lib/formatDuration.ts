export function formatJobDuration(duration: string) {
  switch (duration) {
    case "HOURLY":
      return "Hour";
    case "DAYS":
      return "Day";
    case "WEEKS":
      return "Week";
    case "MONTHLY":
      return "Month";
    case "YEARLY":
      return "Year";
  }
}
