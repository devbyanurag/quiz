'use client'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import styles from "./page.module.scss";
import QuestionOptions from '@/app/components/question_options/question_options';
import { api_backend } from '@/app/api/api';
import { Question } from '@/app/utils/types';
import DOMPurify from 'dompurify';


interface userAnswersType {
    id: number;
    userAnswer: string | null
}


const QuizType = () => {

    const { quiztype } = useParams()
    const category = decodeURIComponent(quiztype.toString())

    const [difficultyLevel, setDifficultyLevel] = useState<string>('easy');
    const [selectedTimerOption, setSelectedTimerOption] = useState<number | null>(null);
    const [questionLimit, setquestionLimit] = useState<number>(10);
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

    const [userAnswers, setUserAnswers] = useState<userAnswersType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [userOptions, setUserOptions] = useState<string[]>([])
    const [currentQueIndex, setCurrentQueIndex] = useState<number>(0)

    useEffect(() => {
        if (questionList.length > 0) {
            console.log("first")
            setCurrentQuestion(questionList[currentQueIndex]);
            const optionList = questionList[currentQueIndex].incorrect_answers;
            optionList.push(questionList[currentQueIndex].correct_answer);
            const options = randomizeOption(optionList)
            setUserOptions(options)
        }
    }, [questionList])

    const randomizeOption = (optionList: string[]): string[] => {
        for (let i = optionList.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionList[i], optionList[j]] = [optionList[j], optionList[i]];
        }
        return optionList;
    };


    const handleStart = async () => {
        console.log(difficultyLevel, selectedTimerOption, questionLimit)
        try {
            const response = await api_backend.post(`quiz/questions`, {
                category: category,
                difficulty: difficultyLevel,
                numberOfQuestions: questionLimit

            });
            setQuestionList(response.data.questions)
        } catch (error) {
            console.error('Error fetching weather data:', error);
        }
    }

    const handleNextQue = (selectedAns: string) => {

        if (currentQuestion) {
            if (currentQueIndex < questionList.length - 1) {
                setUserAnswers((prevUserAnswers) => {
                    const updatedUserAnswers = [...prevUserAnswers];
                    updatedUserAnswers[currentQueIndex - 1] = {
                        id: currentQuestion?.id,
                        userAnswer: selectedAns,
                    };
                    return updatedUserAnswers;
                });
                setCurrentQuestion(questionList[currentQueIndex + 1])
                const options = questionList[currentQueIndex + 1].incorrect_answers
                options.push(questionList[currentQueIndex + 1].correct_answer)
                setUserOptions(randomizeOption(options))

                setCurrentQueIndex(currentQueIndex + 1)
            }
            else {
                console.log("fininsh")
                console.log(userAnswers)
            }
        }
    };






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
                        (currentQuestion) ?
                            <div className={styles.questionStart}>
                                <div className={styles.heading}>
                                    <div> Question No: {currentQueIndex + 1}</div>
                                    <div>Time Remaining</div>
                                    <div>Question Left {userAnswers.length}</div>
                                </div>
                                <div className={styles.questionContainer}>
                                    <div className={styles.question}> <p>{DOMPurify.sanitize(currentQuestion.question)}</p></div>
                                    <div className={styles.answer}>
                                        {userOptions.map((data: string, index) => {
                                            return <button key={index} onClick={() => { handleNextQue(data) }}>{data}</button>
                                        })}
                                    </div>
                                </div>
                            </div>
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