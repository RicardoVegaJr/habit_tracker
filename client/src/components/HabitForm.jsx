import React, { useState } from 'react';

function HabitForm({ onAddHabit }) {
  const [formValues, setFormValues] = useState({
    title: '',
    deadline: '',
    priority: 'medium',
    notes: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!formValues.title.trim() || !formValues.deadline) {
      return;
    }

    onAddHabit?.({
      title: formValues.title.trim(),
      deadline: formValues.deadline,
      priority: formValues.priority,
      notes: formValues.notes.trim(),
    });

    setFormValues({
      title: '',
      deadline: '',
      priority: 'medium',
      notes: '',
    });
  };

  const updateField = (event) => {
    const { name, value } = event.target;

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
  };

  return (
    <form className="habit-form" onSubmit={handleSubmit}>
      <div className="form-copy">
        <span className="eyebrow">Add a tracked habit</span>
        <h2>Log the task now, lock in the deadline, keep the streak visible.</h2>
        <p>
          Each task is timestamped the moment you add it. Deadlines stay on the
          front end and persist in your browser.
        </p>
      </div>

      <div className="form-grid">
        <label className="field field-wide">
          <span>Task</span>
          <input
            type="text"
            name="title"
            placeholder="Read for 20 minutes"
            value={formValues.title}
            onChange={updateField}
          />
        </label>

        <label className="field">
          <span>Deadline</span>
          <input
            type="datetime-local"
            name="deadline"
            value={formValues.deadline}
            onChange={updateField}
          />
        </label>

        <label className="field">
          <span>Priority</span>
          <select name="priority" value={formValues.priority} onChange={updateField}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
        </label>

        <label className="field field-wide">
          <span>Notes</span>
          <textarea
            name="notes"
            rows="4"
            placeholder="Why this habit matters, how long it takes, or what done looks like"
            value={formValues.notes}
            onChange={updateField}
          />
        </label>
      </div>

      <div className="form-actions">
        <button type="submit">Create task</button>
        <span className="helper-text">No backend yet. Your tasks stay in local storage.</span>
      </div>
    </form>
  );
}

export default HabitForm;
