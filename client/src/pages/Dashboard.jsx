import React from 'react';
import HabitForm from '../components/HabitForm';
import HabitCard from '../components/HabitCard';
import { sortTasks } from '../utils/taskUtils';

function Dashboard({ tasks, stats, onAddTask, onDeleteTask, onToggleTaskCompletion }) {
  const sortedTasks = sortTasks(tasks);

  return (
    <main className="page dashboard">
      <section className="hero-panel">
        <div>
          <span className="eyebrow">Habit dashboard</span>
          <h1>Track daily work with a real timestamp and a visible deadline.</h1>
          <p>
            This front end gives you a clean queue of active habits, flags overdue work,
            and keeps completed items in the same flow so you can see momentum build.
          </p>
        </div>
        <div className="hero-metrics">
          <div className="metric-card">
            <strong>{stats.total}</strong>
            <span>Total tasks</span>
          </div>
          <div className="metric-card">
            <strong>{stats.dueSoon}</strong>
            <span>Due soon</span>
          </div>
          <div className="metric-card">
            <strong>{stats.completed}</strong>
            <span>Completed</span>
          </div>
        </div>
      </section>

      <HabitForm onAddHabit={onAddTask} />

      <section className="section-heading">
        <div>
          <span className="eyebrow">Task board</span>
          <h2>Everything you have in motion</h2>
        </div>
        <p>{stats.overdue > 0 ? `${stats.overdue} tasks need attention now.` : 'No overdue tasks right now.'}</p>
      </section>

      <section className="habit-list">
        {sortedTasks.length === 0 ? (
          <div className="empty-state">
            <h3>No habits tracked yet</h3>
            <p>Create your first task above to start timestamping your routine.</p>
          </div>
        ) : (
          sortedTasks.map((habit) => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onDeleteHabit={onDeleteTask}
              onToggleHabitCompletion={onToggleTaskCompletion}
            />
          ))
        )}
      </section>
    </main>
  );
}

export default Dashboard;
