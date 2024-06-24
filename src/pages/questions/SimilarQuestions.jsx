// SimilarQuestions.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';
import styled from 'styled-components';

import Avatar from '../../components/avatar/Avatar';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

const SimilarQuestionsPage = styled.div`
  width: calc(100% - 300px - 24px);
  float: left;
  margin: 25px 0;
  padding: 0;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const HeaderH1 = styled.h1`
  font-weight: 400;
`;

const AskBtn = styled(Link)`
  padding: 10px 15px;
  border-radius: 4px;
  background-color: #009dff;
  color: white;
  border: none;
  text-decoration: none;
  transition: 0.3s;

  &:hover {
    background-color: #0086d8;
  }
`;

const DisplayQuestionContainer = styled.div`
  min-height: 80px;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: #fdf7e2;
  border-bottom: solid 1px #edeff0;
`;

const DisplayVotesAns = styled.div`
  padding: 20px;

  p {
    margin: 0;
    text-align: center;
  }
`;

const DisplayQuestionDetails = styled.div`
  flex-grow: 1;
  padding: 0 20px;

  p {
    padding: 4px;
    margin: 0;
  }
`;

const QuestionTitleLink = styled(Link)`
  text-decoration: none;
  color: #037ecb;
  transition: 0.3s;

  &:hover {
    color: #009dff;
  }
`;

const DisplayTagsTime = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  div {
    display: flex;

    p {
      margin: 2px;
      padding: 4px;
      font-size: 13px;
      background-color: #edeff0;
      color: #39739d;
    }
  }

  p {
    font-size: 13px;
  }
`;

const QuestionMeta = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const QuestionVotes = styled.div`
  padding: 5px 20px 5px 10px;

  p {
    margin: 0;
    font-size: 25px;
    text-align: center;
  }

  .votes-icon {
    font-size: 48px;
    cursor: pointer;
    color: rgba(0, 0, 0, 0.9);

    &:active {
      color: #ef8236;
    }
  }
`;

const UserLink = styled(Link)`
  display: flex;
  align-items: center;
  color: #0086d8;

  div {
    padding-left: 10px;
  }
`;

function SimilarQuestions() {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.QuestionReducer);

  const [similarQuestions, setSimilarQuestions] = useState([]);

  useEffect(() => {
    if (questionsList.data) {
      const currentQuestion = questionsList.data.find((question) => question._id === id);
      const similarQuestions = findSimilarQuestions(currentQuestion);
      setSimilarQuestions(similarQuestions);
    }
  }, [id, questionsList.data]);

  const findSimilarQuestions = (currentQuestion) => {
    if (currentQuestion) {
      const similarTag = currentQuestion.questionTags[0];
      return questionsList.data.filter(
        (question) => question.questionTags.includes(similarTag) && question._id !== currentQuestion._id
      );
    } else {
      return [];
    }
  };

  return (
    <SimilarQuestionsPage>
      <Header>
        <HeaderH1>Similar Questions</HeaderH1>
        <AskBtn to="/ask-question">Ask Question</AskBtn>
      </Header>
      {similarQuestions.length === 0 ? (
        <p>No similar questions found.</p>
      ) : (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {similarQuestions.map((question) => (
            <li key={question._id}>
              <DisplayQuestionContainer>
                <DisplayVotesAns>
                  <TiArrowSortedUp className="votes-icon" />
                  <p>{question.upVote.length - question.downVote.length}</p>
                  <TiArrowSortedDown className="votes-icon" />
                </DisplayVotesAns>
                <DisplayQuestionDetails>
                  <QuestionTitleLink to={`/Questions/${question._id}`}>
                    <h2>{question.questionTitle}</h2>
                  </QuestionTitleLink>
                  <p>{question.questionBody}</p>
                  <DisplayTagsTime>
                    <div>
                      {question.questionTags.map((tag, index) => (
                        <p key={index}>{tag}</p>
                      ))}
                    </div>
                    <p>asked {moment(question.askedOn).fromNow()}</p>
                    <UserLink to={`/Users/${question.userId}`}>
                      <Avatar backgroundColor="orange" px="8px" py="5px">
                        {question.userPosted.charAt(0).toUpperCase()}
                      </Avatar>
                      <div>{question.userPosted}</div>
                    </UserLink>
                  </DisplayTagsTime>
                </DisplayQuestionDetails>
              </DisplayQuestionContainer>
            </li>
          ))}
        </ul>
      )}
    </SimilarQuestionsPage>
  );
}

export default SimilarQuestions;
