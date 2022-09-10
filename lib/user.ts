type dataType = {
  name: string;
  role: string;
  email: string;
};

export function defaultMessage(data: dataType) {
  const userRole = data.role === "FREELANCER" ? "freelancer" : "Recruiter";
  const message = {
    id: "default",
    title: `Hello, ${data.name}, Welcome to Rapydfreelancers`,
    message: `Glad to have you here aas a ${userRole} `,
  };

  return message;
}
