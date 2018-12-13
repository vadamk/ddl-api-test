const api = require('../services/api');
const auth = require('../services/auth');
const config = require('../config');
const fakeData = require('../services/fakeData');
const util = require('../services/util');
const spinner = require('../services/spinner');
const moment = require('moment');

let questionTypes = {
	MultipleChoice: null,
	Table: null,
	Dropdown: null,
	File: null,
	Text: null,
};

const flow = async (login) => {

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

  spinner.start('Get Question Types');
	questionTypes = await getQuestionTypes();
	if (questionTypes.Text) {
  	spinner.succeed();
	} else {
  	spinner.fail('Question types has not been received!');
	}


	createByTemplate(nodes, questionnaireId, null);


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
	}, questionTypes);
}

const nodes = [
	{
		type: 'section',
		children: [
			{
				type: 'section',
				children: [
					{
						type: 'question',
						questionType: 'Text'
					},
					{
						type: 'question',
						questionType: 'Dropdown'
					},
				]
			}
		]
	},
	{
		type: 'section',
		children: [
			{
				type: 'section',
				children: [
					{
						type: 'question',
						questionType: 'Text'
					},
					{
						type: 'question',
						questionType: 'Dropdown'
					},
				]
			}
		]
	},
	{
		type: 'section',
		children: [
			{
				type: 'section',
				children: [
					{
						type: 'question',
						questionType: 'Text'
					},
					{
						type: 'question',
						questionType: 'Dropdown'
					},
				]
			}
		]
	},
	
];

const createByTemplate = async (nodes, questionnaireId, parrentId) => {
	nodes.forEach(async (node) => {

		console.log(node.type);
		
		if (node.type === 'question') {
			await createQuestion(parrentId, node.questionType);
			return;
		}

		const createdSectionId = await createSection(questionnaireId, parrentId);

		if (node.children && node.children.length) {
			await createByTemplate(node.children, questionnaireId, createdSectionId);
		}
	});

}

const createSection = async (questionnaireId, parrentId) => {
  
  spinner.start('Create Questionnaire Section');
	
	const createdSectionId = await api.createQuestionnaireSection({
	  questionnaireId: questionnaireId,
	  ...fakeData.creationQuestionnaireSection(),
	  previousSectionOrder: 0,
	  parentSectionId: parrentId // or null
	});

	if (createdSectionId) {
  	spinner.succeed();
	} else {
  	spinner.fail('Section has not been created!');
	}

	return createdSectionId;
}

const createQuestion = async (sectionId, type) => {

  spinner.start('Create Questionnaire Question');

	const createdQuestionId = await api.createQuestionnaireQuestion({
	  ...fakeData.creationQuestionnaireQuestion(),
	  previousSectionOrder: 0,
	  questionnaireSectionId: sectionId, // or other sectionId
	  questionTypeId: questionTypes[type], // or other type see getQuestionTypes function
	});

	if (questionTypes.Text) {
  	spinner.succeed();
	} else {
  	spinner.fail('Question has not been created!');
	}

	return createdQuestionId;
}

module.exports = async (number = 1) => {
	for (let i = 0; i < number; i++) {
		await flow();
	}
}
