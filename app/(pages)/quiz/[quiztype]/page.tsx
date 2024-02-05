'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import styles from "./page.module.scss";
import QuestionOptions from '@/app/components/question_options/question_options';
import { api_backend } from '@/app/api/api';
import { Question, userAnswersType } from '@/app/utils/types';
import DOMPurify from 'dompurify';
import { randomizeOption } from '@/app/utils/services';
import ResultContainer from '@/app/components/result_container/result_container';




const QuizType = () => {

    const { quiztype } = useParams()
    const category = decodeURIComponent(quiztype.toString())

    const [difficultyLevel, setDifficultyLevel] = useState<string>('easy');
    const [selectedTimerOption, setSelectedTimerOption] = useState<number | null>(null);
    const [questionLimit, setquestionLimit] = useState<number>(2);
    const handleDifficultyChange = (difficulty: string) => {
        setDifficultyLevel(difficulty);
    };
    const handleQuestionLimit = (typeLimit: "INC" | "DEC") => {
        if (typeLimit === "DEC") {
            if (questionLimit > 1) {
                setquestionLimit(questionLimit - 1)
            }
        }
        else if (typeLimit === "INC") {
            if (questionLimit < 30) {
                setquestionLimit(questionLimit + 1)
            }

        }
    }
    const handleTimerOptionChange = (value: number | null) => {
        setSelectedTimerOption(value);
    };

    const [questionList, setQuestionList] = useState<Question[]>([])
    const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null)
    const [userAnswers, setUserAnswers] = useState<userAnswersType[]>([]);
    const [loading, setLoading] = useState<boolean>(false)
    const [userOptions, setUserOptions] = useState<string[]>([])
    const [currentQueIndex, setCurrentQueIndex] = useState<number>(0)
    const [generateResult, setGenerateResult] = useState<boolean>(false)
    const [timer, setTimer] = useState<number | null>(null);

    useEffect(() => {
        if (questionList.length > 0) {
            setLoading(true)
            setCurrentQuestion(questionList[currentQueIndex]);
            let optionList = questionList[currentQueIndex].incorrect_answers;
            optionList = [...optionList, questionList[currentQueIndex].correct_answer];
            setUserOptions(randomizeOption(optionList))
            setLoading(false)

        }
    }, [questionList])




    const handleStart = async () => {
        try {
            setLoading(true)
            const response = await api_backend.post(`quiz/questions`, {
                category: category,
                difficulty: difficultyLevel,
                numberOfQuestions: questionLimit
            });
            setQuestionList(response.data.questions)
            setLoading(false)
            setTimer(selectedTimerOption);
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    const handleNextQue = (selectedAns: string) => {
        if (currentQuestion) {
            if (currentQueIndex < questionList.length - 1) {
                setUserAnswers((prevUserAnswers) => [
                    ...prevUserAnswers,
                    { id: currentQuestion.id, userAnswer: selectedAns },
                ]);
                setCurrentQuestion(questionList[currentQueIndex + 1])
                let options = questionList[currentQueIndex + 1].incorrect_answers
                options = [...options, questionList[currentQueIndex + 1].correct_answer];
                setUserOptions(randomizeOption(options))
                setCurrentQueIndex(currentQueIndex + 1)
                setTimer(selectedTimerOption);

            }
            else {
                setUserAnswers((prevUserAnswers) => [
                    ...prevUserAnswers,
                    { id: currentQuestion.id, userAnswer: selectedAns },
                ]);
                setGenerateResult(true)

            }
        }
    };

    const handleStartAgain = () => {
        setLoading(true)
        setUserAnswers([])
        setQuestionList([])
        setCurrentQuestion(null)
        setGenerateResult(false)
        setCurrentQueIndex(0)
        handleStart()
        setLoading(false)
    }

    useEffect(() => {
        let timerId: NodeJS.Timeout;

        if (timer !== null && timer > 0) {
            timerId = setInterval(() => {
                setTimer((prevTime) => (prevTime !== null ? prevTime - 1 : null));
            }, 1000);
        } else if (timer === 0) {
            handleNextQue('---');
        }

        return () => clearInterval(timerId);
    }, [timer]);




    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{category}</h2>
            <div className={styles.quizContainer}>
                <QuestionOptions
                    difficultyLevel={difficultyLevel}
                    selectedTimerOption={selectedTimerOption}
                    questionLimit={questionLimit}
                    handleDifficultyChange={handleDifficultyChange}
                    handleTimerOptionChange={handleTimerOptionChange}
                    handleQuestionLimit={handleQuestionLimit} />

                <div className={styles.quizContainerRight}>
                    {
                        loading && <div className={styles.loading}>
                            <img width="100" height="100" src="https://img.icons8.com/ios-filled/50/loading.png" alt="loading" />
                        </div>
                    }

                    {
                        currentQuestion ? !generateResult ?
                            <div className={styles.questionStart}>
                                <div className={styles.heading}>
                                    <div> Question No: {currentQueIndex + 1}</div>
                                    <div>Time Remaining {timer !== null && <p>{timer} seconds</p>}</div>
                                    <div>Question Left {questionLimit - (currentQueIndex + 1)}</div>
                                </div>
                                <div className={styles.questionContainer}>
                                    <div className={styles.question}> <p>{DOMPurify.sanitize(currentQuestion.question)}</p></div>
                                    <div className={styles.answer}>
                                        {userOptions.map((data: string, index) => {
                                            return <button key={index} onClick={() => { handleNextQue(data) }}>{data}</button>
                                        })}
                                    </div>
                                </div>
                            </div> : <ResultContainer questionList={questionList} userAnswers={userAnswers} handleStartAgain={handleStartAgain} />
                            :
                            <div className={styles.startContainer}>
                                <button onClick={handleStart}>Start</button>
                            </div>
                    }





                </div>

            </div>
        </div>
    )
}

export default QuizType