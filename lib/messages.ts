import toSlug from "@/lib/toSlug";

type dataType = {
  name: string;
  role: string;
  email: string;
};

type bidMessageType = {
  title: string;
  freelancer: {
    displayName: string;
  };
};

export function bidMessageToRecruiter(data: bidMessageType) {
  return {
    id: `message-${toSlug(data.title)}`,
    title: `Hello, ${data.freelancer.displayName} just bidded on your job listing - ${data.title}`,
    message: [
      [
        `🎉 Congrats, your Job listing is getting attention, Get to read ${data.freelancer.displayName}'s proposal for your job listing`,
        `You can always chat up ${data.freelancer.displayName}, wishing you a successful business transaction.`,
      ],
    ],
    type: "recruiter",
    read: false,
  };
}

export function bidMessageToFreelancer(data: bidMessageType) {
  return {
    id: `message-${toSlug(data.title)}`,
    title: `Congrats ${data.freelancer.displayName}, you just bidded on this job listing - ${data.title}`,
    message: [
      [
        `🎉 Congrats, we care about each proposals you send and we are ready to help you win the job, by always notifying you as at when due.`,
        `Look forward to receiving a notification if hired for the job`,
      ],
    ],
    type: "freelancer",
    read: false,
  };
}

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
    id: "default-greetings",
    title: `Hello ${data.name}, Welcome to Rapydfreelancers`,
    message: [
      [
        `Glad to have you here as a ${userRole} on RapydFreelancers Platform, to get fully started visit your profile, update your profile so as to be verified.`,
      ],
      userMessage,
    ],
    type: "default",
    read: false,
  };

  return message;
}
