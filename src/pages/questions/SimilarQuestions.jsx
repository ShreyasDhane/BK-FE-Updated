// SimilarQuestions.js

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import moment from 'moment';

import Avatar from '../../components/avatar/Avatar';
import { TiArrowSortedUp, TiArrowSortedDown } from 'react-icons/ti';

function SimilarQuestions() {
  const { id } = useParams();
  const questionsList = useSelector((state) => state.QuestionReducer);

  const [similarQuestions, setSimilarQuestions] = useState([]);

  useEffect(() => {
    if (questionsList.data) {
      // Assuming you have a function to find similar questions based on tags
      const currentQuestion = questionsList.data.find((question) => question._id === id);
      const similarQuestions = findSimilarQuestions(currentQuestion); // Implement this function
      setSimilarQuestions(similarQuestions);
    }
  }, [id, questionsList.data]);

  // Function to find similar questions based on tags
  const findSimilarQuestions = (currentQuestion) => {
    // Implement your logic to find questions with similar tags
    // For simplicity, let's assume we filter by one of the tags from the current question
    if (currentQuestion) {
      const similarTag = currentQuestion.questionTags[0]; // Example: Using the first tag
      return questionsList.data.filter(question => question.questionTags.includes(similarTag) && question._id !== currentQuestion._id);
    } else {
      return [];
    }
  };

  return (
    <div className="similar-questions-page">
      <h1>Similar Questions</h1>
      {similarQuestions.length === 0 ? (
        <p>No similar questions found.</p>
      ) : (
        <ul className="similar-questions-list">
          {similarQuestions.map((question) => (
            <li key={question._id}>
              <div className="similar-question">
                <h2>{question.questionTitle}</h2>
                <p>{question.questionBody}</p>
                <div className="question-meta">
                  <div className="question-votes">
                    <TiArrowSortedUp className="votes-icon" />
                    <p>{question.upVote.length - question.downVote.length}</p>
                    <TiArrowSortedDown className="votes-icon" />
                  </div>
                  <div>
                    <p>asked {moment(question.askedOn).fromNow()} </p>
                    <Link to={`/Users/${question.userId}`} className="user-link" style={{ color: '#0086d8' }}>
                      <Avatar backgroundColor="orange" px="8px" py="5px">
                        {question.userPosted.charAt(0).toUpperCase()}
                      </Avatar>
                      <div>{question.userPosted}</div>
                    </Link>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SimilarQuestions;
