'use client'
import React, { useState } from 'react'
import { useParams } from 'next/navigation'
import styles from "./page.module.scss";
import { timerOptions } from '@/app/utils/constants';



const QuizType = () => {

    const { quiztype } = useParams()
    const category = decodeURIComponent(quiztype.toString())

    const [selectedDifficulty, setSelectedDifficulty] = useState<string>('easy');

    const [selectedTimerOption, setSelectedTimerOption] = useState<number | null>(null);

    const [questionLimit, setquestionLimit] = useState<number>(10);


    const handleDifficultyChange = (difficulty: string) => {
        setSelectedDifficulty(difficulty);
        // Perform any other logic or actions based on the selected difficulty
    };
    const handleTimerOptionChange = (value: number | null) => {
        setSelectedTimerOption(value);
        // Perform any other logic or actions based on the selected timer option
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

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>{category}</h2>
            <div className={styles.quizContainer}>
                <div className={styles.quizContainerLeft}>
                    <div className={styles.difficultyContainer}>
                        <p>Select Difficulty Level</p>
                        <div className={styles.radioContainer}>
                            <label>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value="easy"
                                    checked={selectedDifficulty === 'easy'}
                                    onChange={() => handleDifficultyChange('easy')}
                                />
                                Easy
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value="medium"
                                    checked={selectedDifficulty === 'medium'}
                                    onChange={() => handleDifficultyChange('medium')}
                                />
                                Medium
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value="hard"
                                    checked={selectedDifficulty === 'hard'}
                                    onChange={() => handleDifficultyChange('hard')}
                                />
                                Hard
                            </label>
                        </div>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.queLimitContainer}>
                        <p>Set Number of Questions</p>
                        <div className={styles.queLimit}>
                            <p>{questionLimit}</p>
                            <div className={styles.in_dec}>
                                <button onClick={() => {
                                    handleQuestionLimit('INC')
                                }}>+</button>

                                <button onClick={() => {
                                    handleQuestionLimit('DEC')
                                }}>-</button>
                            </div>
                        </div>

                    </div>
                    <div className={styles.divider}></div>

                    <div className={styles.timerContainer}>
                        <p>Set Timer <span>(Per question)</span></p>
                        <select
                            className={styles.timerDropdown}
                            value={selectedTimerOption || ''}
                            onChange={(e) => handleTimerOptionChange(e.target.value !== '' ? Number(e.target.value) : null)}
                        >
                            {timerOptions.map((option) => (
                                <option key={option.value} value={option.value || ''}>
                                    {option.label}
                                </option>
                            ))}
                        </select>



                    </div>
                </div>
                <div className={styles.quizContainerRight}>
                    aaa
                </div>

            </div>
        </div>
    )
}

export default QuizType