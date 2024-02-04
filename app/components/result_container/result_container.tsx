import React, { useEffect } from 'react'
import styles from './result_container.module.scss'
import { Question, userAnswersType } from '@/app/utils/types'
import { randomizeOption } from '@/app/utils/services'

interface ResultContainerProps {
    userAnswers: userAnswersType[],
    questionList: Question[]
}

const ResultContainer = ({ userAnswers, questionList }: ResultContainerProps) => {


    return (
        <div className={styles.container}>
            <div className={styles.resultDetails}>
                <div><h4>Congrats</h4>
                    <h1>90% Score</h1>
                    <p>Your 9 answers correct out of 10</p></div>
                <button>Start Again</button>
            </div>
            <div className={styles.questionListContainer}>

                {questionList.map((question: Question,index) => {
                    let options = question.incorrect_answers
                    options = [...options, question.correct_answer];
    
                    return (
                        <div key={question.id}>
                            <p className={styles.question}>{question.question}</p>
                            {options.map(option => {
                                if(userAnswers[index].userAnswer===option){
                                    return <div key={option} className={`${styles.answer} ${question.correct_answer===option ? styles.correctAnswer : styles.wrongAnswer}`}><p>{option}</p></div>
                                }else{
                                    return <div key={option} className={`${styles.answer} ${question.correct_answer===option && styles.correctAnswer}`}><p>{option}</p></div>
                                }

                                
                            })}
                        </div>
                    );
                })}
                {/* <div className={`${styles.answer} ${styles.correctAnswer}`}><p>cksamlsam</p></div>
                <div className={`${styles.answer}  ${styles.wrongAnswer}`}><p>cksamlsam</p></div>
                <div className={`${styles.answer}`}><p>cksamlsam</p></div>
                <div className={`${styles.answer}`}><p>cksamlsam</p></div> */}
            </div>
        </div>
    )
}

export default ResultContainer