type dataType = {
  name: string;
  role: string;
  email: string;
};

export function defaultMessage(data: dataType) {
  const userRole = data.role === "FREELANCER" ? "freelancer" : "Recruiter";
  const userMessage =
    data.role === "FREELANCER"
      ? [
          "Earn by freelancing remotely on RapydFreelancer and get paid instantly.",
          "We offer the best payment methods, your can choose to be paid in your local currency or USD.",
          "You can also apply for virtual card, this enables you to spend your earnings easily.",
          "We only deduct 5% on your earning per job as commission, while the remain 95% is yours.",
        ]
      : [
          "You can fund your wallet in your local currency, we offer seamless payment method, complete your KYC and fund your wallet to get started.",
        ];
  const message = {
    id: "default",
    title: `Hello ${data.name}, Welcome to Rapydfreelancers`,
    message: [
      [
        `Glad to have you here as a ${userRole} on RapydFreelancers Platform, to get fully started visit your profile, update your profile so as to be verified.`,
      ],
      userMessage,
    ],
    read: false,
  };

  return message;
}
