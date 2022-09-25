import { signup, signin } from "./auth.controller.js";
import { allAccess, userBoard, adminBoard, moderatorBoard } from "./user.controller.js";
import { comicList, comics, search, characters } from './apiMarvel.controller.js';
import {
    getQuestion,
    getQuestionFindByComicAndCharacter,
    postQuestion,
    putQuestion,
    deleteQuestion,
    getQuestionFinByComicAndCharacterDinamic,
    postQuestionPoints,
    getQuestionPoints,
    getQuestionPointsByUser
} from "./question.controller.js";

const controllers = {
    auth: {
        signup,
        signin
    },
    user: {
        allAccess,
        userBoard,
        adminBoard,
        moderatorBoard
    },
    apiMarvel: {
        comics,
        comicList,
        search,
        characters
    },
    question: {
        getQuestion,
        getQuestionFindByComicAndCharacter,
        postQuestion,
        putQuestion,
        deleteQuestion,
        getQuestionFinByComicAndCharacterDinamic,
        postQuestionPoints,
        getQuestionPoints,
        getQuestionPointsByUser
    }
}

export default controllers