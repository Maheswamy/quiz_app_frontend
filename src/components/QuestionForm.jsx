import React, { useEffect, useState } from "react";

const QuestionForm = () => {
  const [title, setTitle] = useState("");
  const [type, setType] = useState("single-choice");
  const [options, setOptions] = useState([
    { optionText: "", isCorrect: false },
  ]);
  const [tags, setTags] = useState("");
  const [score, setScore] = useState(0);

  const handleOption = (e, index) => {
    const updated = options.map((ele, i) => {
      console.log(e.target.value);
      if (index === i) {
        return { ...ele, optionText: e.target.value };
      } else {
        return { ...ele };
      }
    });
    setOptions(updated);
  };

  const addOption = () => {
    setOptions([...options, { optionText: "", isCorrect: false }]);
  };

  const handleCorrectOption = (e, i) => {
    const correct = options.map((ele, index) => {
      if (index === i) {
        return { ...ele, isCorrect: !ele.isCorrect };
      } else {
        return type === "single-choice"
          ? { ...ele, isCorrect: false }
          : { ...ele };
      }
    });
    setOptions(correct);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      title,
      tags,
      type,
      options,
      score,
    };
    console.log(body);
  };

  useEffect(() => {
    console.log(options, type, title, tags, score);
  }, [options, type, title, tags, score]);
  return (
    <div>
      <h2>Add question form</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Enter the question here:</label>
        <br />
        <textarea
          name="title"
          id="title"
          cols="30"
          rows="10"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></textarea>
        <br />

        <label htmlFor="single-choice">
          <input
            type="radio"
            name="asnwer-choice"
            id="single-choice"
            value="single-choice"
            checked={type === "single-choice"}
            onChange={(e) => setType(e.target.value)}
          />
          Single Choice
        </label>

        <label htmlFor="mulitple-choice">
          <input
            type="radio"
            name="asnwer-choice"
            id="multiple-choice"
            value="multiple-choice"
            checked={type === "multiple-choice"}
            onChange={(e) => setType(e.target.value)}
          />
          Multiple Choice
        </label>

        {options.map((ele, i) => {
          return (
            <div key={i}>
              <label>Option {i + 1}</label>
              <input
                type="text"
                name="options"
                id={`options-${i}`}
                value={ele.optionText}
                onChange={(e) => {
                  handleOption(e, i);
                }}
              />
              {type === "single-choice" ? (
                <input
                  type="radio"
                  name="correctOption"
                  id={`correctOption-${i}`}
                  value={i}
                  checked={ele.isCorrect}
                  onChange={(e) => handleCorrectOption(e, i)}
                />
              ) : (
                <input
                  type="checkbox"
                  name={`correctOption-${i}`}
                  id={`correctOption-${i}`}
                  value={i}
                  checked={ele.isCorrect}
                  onChange={(e) => handleCorrectOption(e, i)}
                />
              )}
            </div>
          );
        })}
        <input type="button" value="Add" onClick={addOption} />
        <br />
        <label htmlFor="tags">Tags:</label>
        <br />
        <input
          type="text"
          name="tags"
          id="tags"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <br />
        <label htmlFor="score">Score:</label>
        <br />
        <input
          type="number"
          name="score"
          id="score"
          value={score}
          onChange={(e) => setScore(+e.target.value)}
        />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default QuestionForm;
