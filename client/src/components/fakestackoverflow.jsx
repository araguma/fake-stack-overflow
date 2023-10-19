import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Welcome from "./routes/welcome.jsx";
import Questions from "./routes/questions.jsx";
import Answers from "./routes/answers.jsx";
import Tags from "./routes/tags.jsx";
import Profile from "./routes/profile.jsx";
import AnswerForm from "./routes/answerForm.jsx";
import QuestionForm from "./routes/questionForm.jsx";

export default class FakeStackOverflow extends React.Component {
    render() {
        return (
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = {<Welcome/>}/>
                    <Route path = "questions" element = {<Questions/>}/>
                    <Route path = "questions/:search" element = {<Questions/>}/>
                    <Route path = "answers/:qid" element = {<Answers/>}/>
                    <Route path = "tags" element = {<Tags/>}/>
                    <Route path = "profile" element = {<Profile/>}/>
                    <Route path = "answerForm/:qid" element = {<AnswerForm/>}/>
                    <Route path = "questionForm" element = {<QuestionForm/>}/>
                </Routes>
            </BrowserRouter>
        );
    }
}
