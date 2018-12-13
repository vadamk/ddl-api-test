const api = require('../services/api');
const auth = require('../services/auth');
const config = require('../config');
const fakeData = require('../services/fakeData');
const util = require('../services/util');
const spinner = require('../services/spinner');
const moment = require('moment');

const flow = async (login) => {

	console.log(auth.isLoginned());

	if (!auth.isLoginned()) {
	  spinner.start('Login');
		await auth.login(config.creds.investor);
	  spinner.succeed();
	}

  spinner.start('Get Some Asset Class Id');
	const assetClassId = (await api.getAssetClassList(1, 1)).items[0].id;
	if (assetClassId) {
  	spinner.succeed();
	} else {
  	spinner.fail('Asset Class has not been received!');
	}

  spinner.start('Create Questionnaire');
  const questionnaireFakeData = fakeData.creationQuestionnaire();
	const questionnaireId = await api.createQuestionnaire({
		...questionnaireFakeData,
		mandateStageId: null,
	  assetClassId: assetClassId,
	  deadlineDate: moment(new Date).add(1, 'day'),
	  userTimeZone: util.getCurrentTimezone()
	});
	if (questionnaireId) {
  	spinner.succeed();
	} else {
  	spinner.fail('Questionnaire has not been created!');
	}

  spinner.start('Get Root Section Id');
	const questionnaireTreeView = await api.getTreeView({
		questionnaireId: questionnaireId,
		questionnaireLayers: {
			includeSectionLayer: true, 
			includeQuestionLayer: true, 
			includeQuestionOptionLayer: true, 
			includeClarificationLayer: false, 
			includeAnswersLayer: false,
			includeWeightLayer: false, 
			includeScoreLayer: false, 
			includeCalculatedWaightedScoreLayer: false
		}, 
		questionnaireFilters: {},
		userTimeZone: util.getCurrentTimezone(),
	});
	if (
			questionnaireTreeView &&
			questionnaireTreeView.questionnaireSections &&
			questionnaireTreeView.questionnaireSections.length &&
			questionnaireTreeView.questionnaireSections[0].id
	) {
  	spinner.succeed();
	} else {
  	spinner.fail('Root section id has not been received!');
	}

	const rootSectionId = questionnaireTreeView.questionnaireSections[0].id;

  spinner.start('Create Questionnaire Section');
	const createdSectionId = await api.createQuestionnaireSection({
	  questionnaireId: questionnaireId,
	  ...fakeData.creationQuestionnaireSection(),
	  previousSectionOrder: 0,
	  parentSectionId: rootSectionId // or null
	});
	if (createdSectionId) {
  	spinner.succeed();
	} else {
  	spinner.fail('Section has not been created!');
	}


  spinner.start('Get Question Types');
	const questionTypes = await getQuestionTypes();
	if (questionTypes.Text) {
  	spinner.succeed();
	} else {
  	spinner.fail('Question types has not been received!');
	}

  spinner.start('Create Questionnaire Question');
	const createdQuestionId = await api.createQuestionnaireQuestion({
	  ...fakeData.creationQuestionnaireQuestion(),
	  previousSectionOrder: 0,
	  questionnaireSectionId: createdSectionId, // or other sectionId
	  questionTypeId: questionTypes.Text, // or other type see getQuestionTypes function
	});
	if (questionTypes.Text) {
  	spinner.succeed();
	} else {
  	spinner.fail('Question has not been created!');
	}

  spinner.stopAndPersist({
  	symbol: '🦄',
  	text: 'Questionnaire has been created!'
  });
  spinner.stopAndPersist({
  	symbol: '🦄',
  	text: `Title: ${questionnaireFakeData.questionnaireTitle}`
  });
  spinner.stopAndPersist({
  	symbol: '🦄',
  	text: `Id: ${questionnaireId}`
  });
}

const getQuestionTypes = async () => {
	return await (await api.getQuestionTypes()).reduce((acc, cur) => {
		acc[cur.optionName] = cur.id;
		return acc;
	}, {
		MultipleChoice: null,
		Table: null,
		Dropdown: null,
		File: null,
		Text: null,
	});
}

module.exports = flow;
