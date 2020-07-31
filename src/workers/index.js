/* eslint-disable linebreak-style */
import workerFarm from 'worker-farm';

const workers = {};

workers.queueEmailWorker = workerFarm(require.resolve('./queueMails'));
workers.sendMailsWorker = workerFarm(require.resolve('./sendMails'));
workers.sendMailWorker = workerFarm(require.resolve('./sendMail'));
export default workers;
