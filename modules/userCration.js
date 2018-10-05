const api = require('../services/api');
const auth = require('../services/auth');
const config = require('../config');
const fakeData = require('../services/fakeData');
const Spinner = require('cli-spinner').Spinner;

const registration = async () => {
  const reqData = fakeData.registration();
  await api.registration(reqData);
  return reqData;
}

const getRegistrationRequestsId = async (filterString, expectedEmail) => {
  const data = await api.registrationRequestsList({
    pageNumber: 1,
    pageSize: 1,
    filterString,
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
    id,
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

  console.log('accountCreate: ', model);

  await api.accountCreate(model);
}

const flow = async () => {

  var spinner = new Spinner('processing.. %s')

  console.log('start');

  console.log('\n registration:\n');
  spinner.start();
  const regReqData = await registration();
  spinner.stop();

  console.log('\n regReqData: ', regReqData, '\n');

  console.log('\n Login:\n');
  await auth.login(config.creds.superadmin);

  console.log('\n Get registration requests ID:\n');
  const regRequestId = await getRegistrationRequestsId('', regReqData.email);

  console.log('\n regRequestId: ', regRequestId, '\n');

  console.log('\n Accept reg request:\n');
  await acceptRegRequest(regRequestId);

  console.log('\n Create account:\n');
  await accountCreate(regReqData, regRequestId);

}

module.exports = flow