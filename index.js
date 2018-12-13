const userCration = require('./modules/userCration');
const createQuestionnare = require('./modules/createQuestionnare');

const doit = async () => {
	for (let i = 0; i < 5; i++) {
		await createQuestionnare();
	}
}

doit();