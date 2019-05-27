import { ForumService } from "@/common/api.service";
import {
  GET_ANSWER_FORUM,
  SUBMIT_ANSWER_FORUM,
  CREATE_QUESTION_FORUM,
  GET_QUESTIONS_FORUM,
  GET_QUESTIONS_BYSLUG_FORUM,
  GET_TEMES_FORUM
} from "./actions.type";
import { Utils } from "../utils/utils";

const initialState = {
  temesForum: [],
  questionsForum: [],
  answerQuestion: []
};

export const state = { ...initialState };

export const actions = {
  async [GET_TEMES_FORUM](context) {
    return await ForumService.get()
      .then(data => {
        state.temesForum = data.data;
      })
      .catch(({ response }) => {});
  },
  async [CREATE_QUESTION_FORUM](context, payload) {
    return await ForumService.postQuestion(payload)
      .then(data => {
        state.questionsForum = JSON.parse(data.data.result).questions;
      })
      .catch(({ response }) => {});
  },

  async [GET_QUESTIONS_FORUM](context, payload) {
    return await ForumService.getQuestions(payload)
      .then(data => {
        state.questionsForum = data.data.questions;
      })
      .catch(({ response }) => {});
  },

  async [SUBMIT_ANSWER_FORUM](context, payload) {
    return await ForumService.postAnswer(payload)
      .then(data => {
        state.answerQuestion = JSON.parse(data.data.result).answers;
      })
      .catch(({ response }) => {
        let message = JSON.parse(response.data.result).error;
        Utils.toasterError(message);
      });
  },

  async [GET_QUESTIONS_BYSLUG_FORUM](context, payload) {
    return await ForumService.getAllQuestions(payload)
      .then(data => {
        state.questionsForum = data.data.questions;
      })
      .catch(({ response }) => {});
  },

  async [GET_ANSWER_FORUM](context, payload) {
    return await ForumService.getAnswer(payload)
      .then(data => {
        state.answerQuestion = data.data.answers;
      })
      .catch(({ response }) => {});
  }
};

const getters = {
  temesForum(state) {
    return state.temesForum;
  },
  questionsForum(state) {
    return state.questionsForum;
  },
  answerQuestion(state) {
    return state.answerQuestion;
  }
};

export default {
  state,
  actions,
  getters
};
