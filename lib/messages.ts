import toSlug from "@/lib/toSlug";

type bidMessageType = {
  title: string;
  displayName: string;
};

export function bidMessageToRecruiter(data: bidMessageType) {
  const messages = {
    id: `message-${toSlug(data.title)}`,
    title: `Hello, ${data.displayName} just bidded on your job listing - ${data.title}`,
    message: [
      [
        `🎉 Congrats, your Job listing is getting attention, Get to read ${data?.displayName}'s proposal for your job listing`,
        `You can always chat up ${data.displayName}, wishing you a successful business transaction.`,
      ],
    ],
    read: false,
  };
}

export function bidMessageToFreelancer(data: bidMessageType) {
  const messages = {
    id: `message-${toSlug(data.title)}`,
    title: `Congrats ${data.displayName}, you just bidded on this job listing - ${data.title}`,
    message: [
      [
        `🎉 Congrats, we care about each proposals you send and we are ready to help you win the job, by always notifying you as at when due.`,
        `Look forward to receiving a notification if hired for the job`,
      ],
    ],
    read: false,
  };
}
