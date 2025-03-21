

const CronJob = require('cron').CronJob;
const notificationWorker = require('../workers/notificationWorker');

const scheduler = () =>{
  return {
    start: () => {
      new CronJob('00 * * * * *', () =>{
        console.log('Running notification worker...');
        notificationWorker.run();
      }, null, true, '');
    }
  };
}; 

module.exports = scheduler();