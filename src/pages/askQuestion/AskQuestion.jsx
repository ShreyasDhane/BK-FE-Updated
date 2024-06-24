import { useState } from "react";
import "./AskQuestion.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { askQuestion } from "../../actions/Question.action";

function AskQuestion() {
  const [questionData, setQuestionData] = useState({
    questionTitle: "",
    questionBody: "",
    questionTags: "",
  });

  const dispatch = useDispatch();
  const User = useSelector((state) => state.CurrentUserReducer);
  const navigate = useNavigate();

  const handleQuestionInput = (e) => {
    const { name, value } = e.target;
    const newValue =
      name === "questionTags"
        ? value.split(",").map((tag) => tag.trim())
        : value;
    setQuestionData({
      ...questionData,
      [name]: newValue,
    });
  };

  const handleQuestionSubmit = (e) => {
    e.preventDefault();
    dispatch(
      askQuestion(
        {
          ...questionData,
          userPosted: User.result.name,
          userId: User?.result?._id,
        },
        navigate
      )
    );
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setQuestionData({
        ...questionData,
        questionBody: questionData.questionBody + "\n",
      });
    }
  };

  return (
    <>
      <div className="ask-question">
        <div className="ask-ques-container">
          <h1>Ask a public Question</h1>
          <form onSubmit={handleQuestionSubmit}>
            <div className="ask-form-container">
              <label htmlFor="ask-ques-title">
                <h4>Title</h4>
                <p>
                  Be specific and imagine you&apos;re asking a question to
                  another person.{" "}
                </p>
                <input
                  type="text"
                  id="ask-ques-title"
                  name="questionTitle"
                  value={questionData?.questionTitle}
                  onChange={handleQuestionInput}
                  placeholder="e.g ask question here about finding an element "
                />
              </label>
              <label htmlFor="ask-ques-body">
                <h4>Body</h4>
                <p>
                  Include all information someone would need to answer your
                  question.{" "}
                </p>
                <textarea
                  id="ask-ques-body"
                  cols="30"
                  name="questionBody"
                  value={questionData?.questionBody}
                  onChange={handleQuestionInput}
                  onKeyDown={handleEnter}
                ></textarea>
              </label>
              <label htmlFor="ask-ques-tags">
                <h4>Tags</h4>
                <p>Add upto 5 tags to describe what your question is about. </p>
                <input
                  type="text"
                  id="ask-ques-title"
                  name="questionTags"
                  value={questionData?.questionTags}
                  onChange={handleQuestionInput}
                  placeholder="e.g (java, html, css, js)"
                />
              </label>
            </div>
            <input
              type="submit"
              value="Review your question"
              className="review-btn"
            />
          </form>
        </div>
      </div>
    </>
  );
}

export default AskQuestion;
