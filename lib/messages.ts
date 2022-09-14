import toSlug from "@/lib/toSlug";

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
