import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import copy from "copy-to-clipboard";

import "./Questions.css"; // Ensure this imports your CSS file for styling
import Avatar from "../../components/avatar/Avatar";
import {
  deleteQuestion,
  postAnswer,
  voteQuestion,
} from "../../actions/Question.action";
import { TiArrowSortedUp, TiArrowSortedDown } from "react-icons/ti";
import DisplayAnswer from "./DisplayAnswer";

function QuestionDetail() {
  const [userAnswer, setUserAnswer] = useState("");
  const { id } = useParams();
  const questionsList = useSelector((state) => state.QuestionReducer);
  const User = useSelector((state) => state.CurrentUserReducer);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const url = "https://stackoverflow-clone-mralam.vercel.app";

  useEffect(() => {
    // Fetch or dispatch action to load question data based on `id`
    // Example: dispatch(fetchQuestion(id));
  }, [id, dispatch]);

  const question = questionsList?.data?.find((q) => q._id === id);

  const handlePostAnswer = (e, answerLength) => {
    e.preventDefault();

    if (User === null) {
      alert("Login or Signup to answer a question");
      navigate("/Auth");
    } else {
      if (userAnswer === "") {
        alert("Enter an answer before submitting");
      } else {
        dispatch(
          postAnswer({
            _id: id,
            noOfAnswers: answerLength + 1,
            answerBody: userAnswer,
            userAnswered: User?.result?.name,
            userId: User?.result?._id,
          }),
        );
        setUserAnswer("");
      }
    }
  };

  const handleShare = () => {
    copy(url + location?.pathname);
    alert("Copied URL: " + url + location?.pathname);
  };

  const handleDelete = () => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = () => {
    dispatch(voteQuestion(id, "upVote", User?.result?._id));
  };

  const handleDownVote = () => {
    dispatch(voteQuestion(id, "downVote", User?.result?._id));
  };

  const handleSimilarQuestions = () => {
    navigate(`/similar-questions/${id}`);
  };

  const getSimilarQuestions = () => {
    if (!question || !question.questionTags || question.questionTags.length === 0) return [];

    return questionsList?.data?.filter((q) => {
      if (q._id === id) return false;
      return q.questionTags.some((tag) => question.questionTags.includes(tag));
    });
  };

  const similarQuestions = getSimilarQuestions();

  return (
    <div className="question-details-page">
      {!question ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <div className="question-container">
            <h1>{question.questionTitle}</h1>
            <div className="question-meta">
              <p>Asked {moment(question.askedOn).fromNow()}</p>
              <Link to={`/Users/${question.userId}`} className="user-link">
                <Avatar backgroundColor="orange" px="8px" py="5px">
                  {question.userPosted.charAt(0).toUpperCase()}
                </Avatar>
                <div>{question.userPosted}</div>
              </Link>
            </div>
            <div className="question-details-container-2">
              <div className="question-votes">
                <TiArrowSortedUp className="votes-icon" onClick={handleUpVote} />
                <p>{question.upVote.length - question.downVote.length}</p>
                <TiArrowSortedDown className="votes-icon" onClick={handleDownVote} />
              </div>
              <div>
                <p className="question-body">{question.questionBody}</p>
                <div className="question-details-tags">
                  {question.questionTags.map((tag) => (
                    <p key={tag}>{tag}</p>
                  ))}
                </div>
                <div className="question-actions">
                  <button type="button" onClick={handleShare}>Share</button>
                  {User?.result?._id === question.userId && (
                    <button type="button" onClick={handleDelete}>Delete</button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {question.noOfAnswers > 0 && (
            <section>
              <h3>{question.noOfAnswers} Answers</h3>
              <DisplayAnswer key={question._id} question={question.answer} handleShare={handleShare} />
            </section>
          )}

          <section className="post-ans-container">
            <h3>Your Answer</h3>
            <form onSubmit={(e) => handlePostAnswer(e, question.answer.length)}>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
              ></textarea>
              <input
                type="submit"
                className="post-ans-btn"
                value="Post Your Answer"
              />
            </form>
          </section>

          <p>
            <button className="similar-questions-btn" onClick={handleSimilarQuestions}>
              Similar Questions
            </button>{" "}
            Browse other Question tagged.
            {question.questionTags?.map((tag) => (
              <Link to="/Tags" key={tag} className="ans-tags">
                {tag}
              </Link>
            ))}{" "}
            or{" "}
            <Link to="/AskQuestion" style={{ textDecoration: "none", color: "#009dff" }}>
              ask your own question.
            </Link>
          </p>

          {similarQuestions.length > 0 && (
            <section className="similar-questions-container">
              <h2>Similar Questions</h2>
              {similarQuestions.map((q) => (
                <div key={q._id} className="question-container">
                  <h3>{q.questionTitle}</h3>
                  <div className="question-details-container-2">
                    <p className="question-body">{q.questionBody}</p>
                    <p className="question-details-tags">
                      Tags: {q.questionTags.join(", ")}
                    </p>
                    <p>
                      Asked {moment(q.askedOn).fromNow()} by{" "}
                      <Link to={`/Users/${q.userId}`} style={{ color: "#0086d8" }}>
                        {q.userPosted}
                      </Link>
                    </p>
                  </div>
                </div>
              ))}
            </section>
          )}
        </>
      )}
    </div>
  );
}

export default QuestionDetail;
