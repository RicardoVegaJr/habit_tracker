import React from 'react';
import {
  formatDateTime,
  formatRelativeDeadline,
  getTaskStatus,
} from '../utils/taskUtils';

function HabitCard({ habit, onDeleteHabit, onToggleHabitCompletion }) {
  const status = getTaskStatus(habit);

  return (
    <article className={`habit-card status-${status}`}>
      <div className="habit-card-topline">
        <span className={`status-pill status-pill-${status}`}>{status.replace('-', ' ')}</span>
        <span className={`priority-pill priority-${habit.priority}`}>{habit.priority} priority</span>
      </div>

      <div className="habit-card-main">
        <div>
          <h3>{habit.title}</h3>
          <p className="card-deadline">{formatRelativeDeadline(habit.deadline)}</p>
        </div>
        <div className="habit-card-actions">
          <button
            className="ghost-button"
            type="button"
            onClick={() => onToggleHabitCompletion(habit.id)}
          >
            {habit.completedAt ? 'Reopen' : 'Complete'}
          </button>
          <button className="ghost-button danger-button" type="button" onClick={() => onDeleteHabit(habit.id)}>
            Delete
          </button>
        </div>
      </div>

      <dl className="habit-meta">
        <div>
          <dt>Created</dt>
          <dd>{formatDateTime(habit.createdAt)}</dd>
        </div>
        <div>
          <dt>Deadline</dt>
          <dd>{formatDateTime(habit.deadline)}</dd>
        </div>
        <div>
          <dt>Completed</dt>
          <dd>{habit.completedAt ? formatDateTime(habit.completedAt) : 'Still active'}</dd>
        </div>
      </dl>

      {habit.notes ? <p className="habit-notes">{habit.notes}</p> : null}
    </article>
  );
}

export default HabitCard;
