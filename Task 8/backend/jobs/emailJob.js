import Queue from "bull";

const emailQueue = new Queue("email-queue", process.env.REDIS_URL);

emailQueue.process(async (job) => {
  console.log(`📧 Sending welcome email to ${job.data.email}`);
});

export const sendWelcomeEmail = (email) => {
  emailQueue.add({ email });
};
