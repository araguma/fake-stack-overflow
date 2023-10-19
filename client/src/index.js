import React from 'react';
import ReactDOM from 'react-dom';
import FakeStackOverflow from './components/fakestackoverflow.jsx';

import './css/index.css';
import './css/welcome.css';
import './css/navbar.css';
import './css/header.css';
import './css/questions.css';
import './css/tags.css';
import './css/answers.css';
import './css/profile.css';

ReactDOM.render(
    <FakeStackOverflow />,
    document.getElementById('root')
);
