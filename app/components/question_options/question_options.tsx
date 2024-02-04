import React, { useState } from 'react'
import styles from './question_options.module.scss'
import { timerOptions } from '@/app/utils/constants';


interface QuestionOptionsProps{
    difficultyLevel: string,
    selectedTimerOption: number | null,
    handleDifficultyChange: (difficulty: string) => void,
    handleTimerOptionChange: (value: number | null) => void,
    handleQuestionLimit: (typeLimit: "INC" | "DEC") => void,
    questionLimit: number
}
const QuestionOptions = ({difficultyLevel, selectedTimerOption, handleDifficultyChange ,handleQuestionLimit, handleTimerOptionChange, questionLimit}:QuestionOptionsProps) => {


   

    return (
        <div className={styles.quizContainerLeft}>
            <div className={styles.difficultyContainer}>
                <p>Select Difficulty Level</p>
                <div className={styles.radioContainer}>
                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="easy"
                            checked={difficultyLevel === 'easy'}
                            onChange={() => handleDifficultyChange('easy')}
                        />
                        Easy
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="medium"
                            checked={difficultyLevel === 'medium'}
                            onChange={() => handleDifficultyChange('medium')}
                        />
                        Medium
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="difficulty"
                            value="hard"
                            checked={difficultyLevel === 'hard'}
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
    )
}

export default QuestionOptions