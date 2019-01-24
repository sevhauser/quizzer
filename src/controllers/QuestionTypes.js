const QuestionTypes = {
  MULTI_CHECKBOX: 'multicheckbox',
  MULTI_RADIO: 'multiradio',
  TEXT: 'text',
  TRUEFALSE: 'truefalse',
};

const QuestionTypeNames = {
  [QuestionTypes.TEXT]: 'Text',
  [QuestionTypes.MULTI_RADIO]: 'Multiple Options, One Correct Answer',
  [QuestionTypes.MULTI_CHECKBOX]: 'Multiple Options, Multiple Answers',
  [QuestionTypes.TRUEFALSE]: 'True or False',
};

export {
  QuestionTypes,
  QuestionTypeNames,
};
