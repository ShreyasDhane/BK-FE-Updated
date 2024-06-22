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

  const res = questionsList?.data?.filter((question) => question?._id === id);

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

  const handleDelete = (id) => {
    dispatch(deleteQuestion(id, navigate));
  };

  const handleUpVote = (id) => {
    dispatch(voteQuestion(id, "upVote", User?.result?._id));
  };

  const handleDownVote = (id) => {
    dispatch(voteQuestion(id, "downVote", User?.result?._id));
  };

  const handleSimilarQuestions = () => {
    navigate(`/similar-questions/${id}`);
  };

  // Function to filter and get similar questions based on tags
  const getSimilarQuestions = () => {
    if (!res || !res[0]) return [];

    const currentQuestionTags = res[0].questionTags;
    if (!currentQuestionTags || currentQuestionTags.length === 0) return [];

    return questionsList?.data?.filter((question) => {
      // Check if the question has at least one common tag with the current question
      return (
        question._id !== id &&
        question.questionTags.some((tag) => currentQuestionTags.includes(tag))
      );
    });
  };

  const similarQuestions = getSimilarQuestions();

  return (
    <div className="question-details-page">
      {!questionsList?.data ? (
        <h1>Loading...</h1>
      ) : (
        <>
          {res?.map((data) => {
            const {
              _id,
              upVote,
              downVote,
              questionTitle,
              questionBody,
              questionTags,
              askedOn,
              userId,
              userPosted,
              noOfAnswers,
              answer,
            } = data;

            return (
              <div key={_id}>
                <section className="question-details-container">
                  <h1>{questionTitle}</h1>
                  <div className="question-details-container-2">
                    <div className="question-votes">
                      <TiArrowSortedUp
                        className="votes-icon"
                        onClick={() => handleUpVote(_id)}
                      />
                      <p> {upVote.length - downVote.length} </p>
                      <TiArrowSortedDown
                        className="votes-icon"
                        onClick={() => handleDownVote(_id)}
                      />
                    </div>
                    <div style={{ width: "100%" }}>
                      <p className="question-body"> {questionBody} </p>
                      <div className="question-details-tags">
                        {questionTags.map((tag) => (
                          <p key={tag}>{tag}</p>
                        ))}
                      </div>
                      <div className="question-actions-user">
                        <div>
                          <button type="button" onClick={handleShare}>
                            Share
                          </button>
                          {User?.result?._id === userId && (
                            <button
                              type="button"
                              onClick={() => handleDelete(_id)}
                            >
                              Delete
                            </button>
                          )}
                        </div>
                        <div>
                          <p>asked {moment(askedOn).fromNow()} </p>
                          <Link
                            to={`/Users/${userId}`}
                            className="user-link"
                            style={{ color: "#0086d8" }}
                          >
                            <Avatar backgroundColor="orange" px="8px" py="5px">
                              {" "}
                              {userPosted.charAt(0).toUpperCase()}{" "}
                            </Avatar>
                            <div>{userPosted}</div>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                {noOfAnswers !== 0 && (
                  <section>
                    <h3>{noOfAnswers} Answers</h3>
                    <DisplayAnswer
                      key={_id}
                      question={answer}
                      handleShare={handleShare}
                    />
                  </section>
                )}
                <section className="post-ans-container">
                  <h3> Your Answer </h3>
                  <form onSubmit={(e) => handlePostAnswer(e, answer.length)}>
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
                  <button
                    onClick={handleSimilarQuestions}
                    className="similar-questions-btn"
                  >
                    Similar Questions
                  </button>{" "}
                  Browse other Question tagged.
                  {questionTags?.map((tag) => (
                    <Link to="/Tags" key={tag} className="ans-tags">
                      {tag}
                    </Link>
                  ))}{" "}
                  or{" "}
                  <Link
                    to="/AskQuestion"
                    style={{
                      textDecoration: "none",
                      color: "#009dff",
                    }}
                  >
                    ask your own question.
                  </Link>
                </p>
              </div>
            );
          })}

          {/* Render similar questions */}
          {similarQuestions.length > 0 && (
            <section className="similar-questions-container">
              <h2>Similar Questions</h2>
              {similarQuestions.map((question) => (
                <div key={question._id} className="similar-question">
                  <h3>{question.questionTitle}</h3>
                  <div style={{ width: "100%" }}>
                    <p className="question-body"> {question.questionBody}</p>
                    <p className="question-details-tags">
                      Tags: {question.questionTags.join(", ")}
                    </p>
                    <p>
                      Asked {moment(question.askedOn).fromNow()} by{" "}
                      <Link
                        to={`/Users/${question.userId}`}
                        style={{ color: "#0086d8" }}
                      >
                        {question.userPosted}
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
