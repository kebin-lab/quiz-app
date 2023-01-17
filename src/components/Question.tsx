import { ChangeEvent } from "react";
import { Question } from "../types/type";
import shiba01 from "../assets/shiba_01.jpeg";
import shiba02 from "../assets/shiba_02.png";
import shiba03 from "../assets/shiba_03.jpeg";

type Props = {
  question: Question;
  selectedAnswer: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  addScore: () => void;
  changeQuestion: () => void;
};

export const QuestionComponent: React.FC<Props> = (props: Props) => {
  const { question, selectedAnswer, onChange, addScore, changeQuestion } =
    props;

  const imgList = [shiba01, shiba02, shiba03];
  //console.log(question);
  const checkAnswer = () => {
    //const selectedIndex = questions[0].choises.indexOf(selectedAnswer);
    if (selectedAnswer === "") {
      alert("回答せえ");
      return;
    }
    if (selectedAnswer === question.answer) {
      addScore();
      alert("正解");
    } else {
      alert("残念はずれ。。。");
    }
    changeQuestion();
  };
  return (
    <>
      <p>{question.qustion}</p>
      <div>
        {question.choises.map((choise, index) => {
          return (
            <label key={choise}>
              <input
                type="checkbox"
                value={choise}
                onChange={onChange}
                checked={selectedAnswer === choise}
              />
              {choise}
            </label>
          );
        })}
      </div>
      <button onClick={checkAnswer}>正解を確認する</button>
    </>
  );
};
