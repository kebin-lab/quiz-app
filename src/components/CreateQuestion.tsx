import { ChangeEvent, useState } from "react";
import { useQuestion } from "../hooks/useQuestion";
import { Question } from "../types/type";

export const CreateQuestion = () => {
  const { createQuestion } = useQuestion();
  const [questionText, setQuestionText] = useState<string>("");
  const [choises, setChoises] = useState<Array<string>>(["", "", ""]);
  const [answer, setAnswer] = useState<string>("");

  const onChangeQuestion = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestionText(e.target.value);
  };

  const onChangeAnswer = (e: ChangeEvent<HTMLInputElement>) => {
    setAnswer(e.target.value);
  };

  const onChangeChoise = (e: ChangeEvent<HTMLInputElement>) => {
    const id = parseInt(e.target.id);
    const newChoises = [...choises];
    newChoises[id] = e.target.value;
    setChoises(newChoises);
  };

  const onClick = () => {
    if (!choises.includes(answer)) {
      alert("選択肢に回答が含まれていません");
      return;
    }
    const newQuestion: Question = {
      qustion: questionText,
      choises: choises,
      answer: answer,
      hasImage: false,
    };
    createQuestion(newQuestion);
    setQuestionText("");
    setChoises(["", "", ""]);
    setAnswer("");
    alert("問題を登録しました");
  };
  return (
    <>
      <h3>新しい問題を作成する</h3>

      <div>
        <label htmlFor="">問題文</label>
        <input
          type="text"
          name=""
          id=""
          onChange={onChangeQuestion}
          value={questionText}
        />
      </div>
      <div>
        <label htmlFor="">選択肢</label>
        {choises.map((choise, index) => (
          <div>
            <label htmlFor="">{index + 1}</label>
            <input
              type="text"
              id={index.toString()}
              onChange={onChangeChoise}
              value={choises[index]}
            />
          </div>
        ))}
      </div>
      <div>
        <label htmlFor="">回答</label>
        <input
          type="text"
          name=""
          id=""
          onChange={onChangeAnswer}
          value={answer}
        />
      </div>
      <button onClick={onClick}>登録する</button>
    </>
  );
};
