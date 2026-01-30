import React, { useState, useEffect } from 'react';
import { useEditorStore } from '../stores/editorStore';
import './WritingGoals.css';

export const WritingGoals: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(() => {
    const saved = localStorage.getItem('dailyWordGoal');
    return saved ? parseInt(saved, 10) : 500;
  });
  const [sessionStart] = useState(() => useEditorStore.getState().wordCount);

  const { wordCount } = useEditorStore();
  const sessionWords = Math.max(0, wordCount - sessionStart);
  const dailyProgress = Math.min(100, (sessionWords / dailyGoal) * 100);

  useEffect(() => {
    localStorage.setItem('dailyWordGoal', dailyGoal.toString());
  }, [dailyGoal]);

  const handleGoalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (value > 0 && value <= 10000) {
      setDailyGoal(value);
    }
  };

  return (
    <div className={`writing-goals ${isVisible ? 'expanded' : 'collapsed'}`}>
      <button
        className="goals-toggle"
        onClick={() => setIsVisible(!isVisible)}
        aria-label={isVisible ? 'Hide writing goals' : 'Show writing goals'}
      >
        🎯 {isVisible ? '' : `${sessionWords}/${dailyGoal}`}
      </button>

      {isVisible && (
        <div className="goals-content">
          <div className="goals-header">
            <h3 className="goals-title">Writing Goal</h3>
            <button
              className="goals-close"
              onClick={() => setIsVisible(false)}
              aria-label="Close"
            >
              ✕
            </button>
          </div>

          <div className="goal-input-group">
            <label htmlFor="daily-goal" className="goal-label">
              Daily Target
            </label>
            <div className="goal-input-wrapper">
              <input
                id="daily-goal"
                type="number"
                min="100"
                max="10000"
                step="100"
                value={dailyGoal}
                onChange={handleGoalChange}
                className="goal-input"
              />
              <span className="goal-unit">words</span>
            </div>
          </div>

          <div className="goal-progress">
            <div className="progress-header">
              <span className="progress-label">Session Progress</span>
              <span className="progress-value">
                {sessionWords} / {dailyGoal}
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${dailyProgress}%` }}
              />
            </div>
            <div className="progress-percentage">
              {Math.round(dailyProgress)}%
            </div>
          </div>

          {dailyProgress >= 100 && (
            <div className="goal-achievement">
              <span className="achievement-icon">🎉</span>
              <span className="achievement-text">Goal achieved!</span>
            </div>
          )}

          <div className="goal-stats">
            <div className="stat-row">
              <span className="stat-label">Session</span>
              <span className="stat-value">{sessionWords} words</span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Remaining</span>
              <span className="stat-value">
                {Math.max(0, dailyGoal - sessionWords)} words
              </span>
            </div>
            <div className="stat-row">
              <span className="stat-label">Estimated time</span>
              <span className="stat-value">
                {Math.ceil(Math.max(0, dailyGoal - sessionWords) / 40)} min
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
