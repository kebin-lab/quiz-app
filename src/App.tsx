import "./App.css";
import { ChangeEvent, useState, useEffect } from "react";
import { QuestionComponent } from "./components/Question";
import { useQuestion } from "./hooks/useQuestion";
import { CreateQuestion } from "./components/CreateQuestion";

function App() {
  const { getQuestions, isLoading, questions } = useQuestion();
  useEffect(() => {
    getQuestions();
  }, []);

  const [showQuestionIndex, setShowQuestionIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isOver, setIsOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setSelectedAnswer(e.target.value);
  };

  const addScore = () => {
    setScore((prev) => prev + 1);
  };

  const restart = () => {
    setScore(0);
    setIsOver(false);
    setShowQuestionIndex(0);
  };

  const changeQuestion = () => {
    //const index = Math.floor(Math.random() * questions.length);
    const nextIndex = showQuestionIndex + 1;
    if (nextIndex > questions.length - 1) {
      setIsOver(true);
      setShowQuestionIndex(0);
    } else {
      setShowQuestionIndex(nextIndex);
    }
    setSelectedAnswer("");
  };
  return (
    <div className="App">
      <div className="container">
        {isLoading ? (
          <>Loading...</>
        ) : (
          <>
            {isOver ? (
              <>
                <div>
                  <h3>Congraturation!!!</h3>
                  <p>
                    結果は{questions.length}問中{score}問正解でした。
                  </p>
                  <p>{Math.floor((score / questions.length) * 100)}点</p>
                  <button onClick={restart}>Restart</button>
                </div>
              </>
            ) : (
              <QuestionComponent
                question={questions[showQuestionIndex]}
                onChange={onChange}
                addScore={addScore}
                selectedAnswer={selectedAnswer}
                changeQuestion={changeQuestion}
              />
            )}
          </>
        )}
      </div>
      <CreateQuestion />
    </div>
  );
}

export default App;
