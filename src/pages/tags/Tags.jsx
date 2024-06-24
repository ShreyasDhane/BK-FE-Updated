import LeftSidebar from "../../components/leftsidebar/LeftSidebar";
import TagsList from "./TagsList";
import "./Tags.css";

function Tags() {
  const tagsList = [
    {
      id: 1,
      tagName: "javascript",
      tagDesc:
        "For questions related to programming in ECMAScript (JavaScript/JS) and its various dialects/implementations. Covers both frontend and backend development.",
    },
    {
      id: 2,
      tagName: "python",
      tagDesc:
        "For questions related to programming in the Python programming language. Widely used in web development, data science, artificial intelligence, and more.",
    },
    {
      id: 3,
      tagName: "java",
      tagDesc:
        "For questions related to the Java programming language and platform. Commonly used for building enterprise-level applications, mobile apps (Android), and web development.",
    },
    {
      id: 4,
      tagName: "cs#",
      tagDesc:
        "For questions related to programming in the C# language (C-Sharp). Used for developing Windows applications, web applications, and games using the Unity game engine.",
    },
    {
      id: 5,
      tagName: "ruby",
      tagDesc:
        "For questions related to programming in the Ruby programming language. Known for its simplicity and productivity, often used in web development, especially with the Ruby on Rails framework.",
    },
    {
      id: 6,
      tagName: "swift",
      tagDesc:
        "For questions related to programming in the Swift programming language. Developed by Apple, it is used for building iOS, macOS, watchOS, and tvOS applications.",
    },
    {
      id: 7,
      tagName: "php",
      tagDesc:
        "For questions related to programming in PHP (Hypertext Preprocessor). Widely used for server-side scripting and building dynamic web pages.",
    },
    {
      id: 8,
      tagName: "typescript",
      tagDesc:
        "For questions related to programming in TypeScript, a superset of JavaScript. Adds static typing to JavaScript and is often used in large-scale applications.",
    },
    {
      id: 9,
      tagName: "go",
      tagDesc:
        "For questions related to programming in the Go programming language (Golang). Known for its simplicity, efficiency, and strong support for concurrent programming.",
    },
    {
      id: 10,
      tagName: "rust",
      tagDesc:
        "For questions related to programming in the Rust programming language. Known for its focus on safety and performance, often used in systems programming.",
    },
  ];

  return (
    <div className="home-container-1">
      <LeftSidebar />
      <div className="home-container-2">
        <h1 className="tags-h1">Tags</h1>
        <p className="tags-p">
          A tag is a keyword or label that categoriexes your question with
          other, similar quesions.
        </p>
        <p className="tags-p">
          Using the right tags makes it easier for others to find and answer
          your question.
        </p>
        <div className="tags-list-container">
          {tagsList.map((tags) => {
            return <TagsList tag={tags} key={tags.id} />;
          })}
        </div>
      </div>
    </div>
  );
}

export default Tags;
