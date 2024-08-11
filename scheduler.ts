import { CronJob } from "cron";

export function setup(callback: () => void) {
  const job = CronJob.from({
    cronTime: "1,*/5 * * * *",
    onTick: function () {
      callback();
    },
    start: true,
  });

  return job;
}
