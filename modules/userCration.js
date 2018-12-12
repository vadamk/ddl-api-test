const api = require('../services/api');
const auth = require('../services/auth');
const config = require('../config');
const fakeData = require('../services/fakeData');
const spinner = require('../services/spinner');

const registration = async () => {
  const reqData = fakeData.registration();
  await api.registration(reqData);
  return reqData;
}

const getRegistrationRequestsId = async (expectedEmail) => {
  const data = await api.registrationRequestsList({
    pageNumber: 1,
    pageSize: 1,
    filterString: '',
    orderString: ''
  });

  if (data.items[0].email !== expectedEmail) {
    console.error('Wrong list');
    return;
  }

  return data.items[0].id;
}

const acceptRegRequest = async id => {
  await api.registrationRequestChangeStatus({
    id: id,
    isApproved: true,
    declineReason: ''
  });
}

const accountCreate = async (regReqData, regRequestId) => {

  const model = {
    ...fakeData.сreateAccountMissing(),
    email: regReqData.email,
    firstName: regReqData.firstName,
    lastName: regReqData.lastName,
    jobTitle: regReqData.jobTitle,
    jobTitle: regReqData.jobTitle,
    registrationRequestId: regRequestId
  };

  await api.accountCreate(model);
}

const flow = async () => {

  spinner.start();
  const regReqData = await registration();
  spinner.stop();

  spinner.start();
  await auth.login(config.creds.superadmin);
  spinner.stop();

  spinner.start();
  const regRequestId = await getRegistrationRequestsId(regReqData.email);
  spinner.stop();

  spinner.start();
  await acceptRegRequest(regRequestId);
  spinner.stop();

  spinner.start();
  await accountCreate(regReqData, regRequestId);
  spinner.stop();
}

module.exports = flow