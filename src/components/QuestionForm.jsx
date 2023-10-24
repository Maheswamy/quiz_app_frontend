import React from "react";

const QuestionForm = () => {
  return (
    <div>
      <h2>Add question form</h2>
      <form>
        <label htmlFor="title">Enter the question here:</label>
        <br />
        <textarea name="title" id="title" cols="30" rows="10"></textarea>
        <br />

        <label htmlFor="single-choice">
          <input type="radio" name="asnwer-choice" id="single-choice" />
          Single Choice
        </label>

        <label htmlFor="mulitple-choice">
          <input type="radio" name="asnwer-choice" id="multiple-choice" />
          Multiple Choice
        </label>
        
      </form>
    </div>
  );
};

export default QuestionForm;
