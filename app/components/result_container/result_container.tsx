import React, { useEffect, useState } from 'react'
import styles from './result_container.module.scss'
import { Question, userAnswersType } from '@/app/utils/types'
import { randomizeOption } from '@/app/utils/services'

interface ResultContainerProps {
    userAnswers: userAnswersType[],
    questionList: Question[],
    handleStartAgain: () => void
}

const ResultContainer = ({ userAnswers, questionList, handleStartAgain }: ResultContainerProps) => {


    const [scorePercentage, setScorePercentage] = useState<number>(0)
    const [correctAnswers, setCorrectAnswers] = useState<number>(0)

    useEffect(() => {
        handleScore()

    }, [])


    const handleScore = () => {
        let score = 0
        questionList.map((question: Question, index) => {
            if (question.correct_answer === userAnswers[index].userAnswer) {
                score = score + 1
            }
        })
        setCorrectAnswers(score)
        setScorePercentage((score / questionList.length) * 100)
    }


    return (
        <div className={styles.container}>
            <div className={styles.resultDetails}>
                <div>
                    <h4>Congrats</h4>
                    <h1>{scorePercentage}% Score</h1>
                    <p>Your {correctAnswers} answers correct out of {questionList.length}</p>
                </div>
                <div className={styles.startContainer}>
                    <button onClick={handleStartAgain}>Start Again</button>
                </div>
            </div>
            <div className={styles.questionListContainer}>

                {questionList.map((question: Question, index) => {
                    let options = question.incorrect_answers
                    options = [...options, question.correct_answer];

                    return (
                        <div key={question.id}>
                            <p className={styles.question}>{question.question}</p>
                            {options.map(option => {
                                if (userAnswers[index].userAnswer === option) {
                                    return <div key={option} className={`${styles.answer} ${question.correct_answer === option ? styles.correctAnswer : styles.wrongAnswer}`}><p>{option}</p></div>
                                } else {
                                    return <div key={option} className={`${styles.answer} ${question.correct_answer === option && styles.correctAnswer}`}><p>{option}</p></div>
                                }


                            })}
                        </div>
                    );
                })}
            </div>
        </div>
    )
}

export default ResultContainer