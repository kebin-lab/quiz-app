import { useCallback, useState } from "react";
import { Question, Questions } from "../types/type";

export const useQuestion = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [questions, setQuestions] = useState<Questions>([]);

  const shuffleArray = (array: Array<any>): Array<any> => {
    const cloneArray = [...array];

    for (let i = cloneArray.length - 1; i >= 0; i--) {
      let rand = Math.floor(Math.random() * (i + 1));
      // 配列の要素の順番を入れ替える
      let tmpStorage = cloneArray[i];
      cloneArray[i] = cloneArray[rand];
      cloneArray[rand] = tmpStorage;
    }
    return cloneArray;
  };

  const getQuestions = useCallback(async () => {
    fetch("http://localhost:3001/questions")
      .then((response) => response.json())
      .then((data) => {
        //console.log(data[0]);
        setQuestions(shuffleArray(data));
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const createQuestion = useCallback(async (data: Question) => {
    const newData = { ...data };
    console.log(newData);
    //const formData = new FormData(newData);
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newData),
    };
    fetch("http://localhost:3001/questions", options)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return { getQuestions, createQuestion, isLoading, questions };
};
