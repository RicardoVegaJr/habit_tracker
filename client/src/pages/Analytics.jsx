import React from 'react';
import { formatDateTime, getTaskStatus } from '../utils/taskUtils';

function Analytics({ tasks, stats }) {
  const completionRate = stats.total === 0 ? 0 : Math.round((stats.completed / stats.total) * 100);
  const highPriorityTasks = tasks.filter((task) => task.priority === 'high');
  const overdueTasks = tasks.filter((task) => getTaskStatus(task) === 'overdue');
  const latestCompleted = [...tasks]
    .filter((task) => task.completedAt)
    .sort((left, right) => new Date(right.completedAt).getTime() - new Date(left.completedAt).getTime())
    .slice(0, 3);

  return (
    <main className="page analytics">
      <section className="section-heading analytics-heading">
        <div>
          <span className="eyebrow">Analytics</span>
          <h1>See how your front-end tracker is performing.</h1>
        </div>
        <p>These metrics are generated entirely from the tasks saved in your browser.</p>
      </section>

      <section className="analytics-grid">
        <article className="analytics-card">
          <span>Completion rate</span>
          <strong>{completionRate}%</strong>
          <p>Percentage of tracked tasks marked complete.</p>
        </article>

        <article className="analytics-card">
          <span>High priority queue</span>
          <strong>{highPriorityTasks.length}</strong>
          <p>Tasks currently tagged as high priority.</p>
        </article>

        <article className="analytics-card">
          <span>Overdue workload</span>
          <strong>{overdueTasks.length}</strong>
          <p>Items that passed their deadline before completion.</p>
        </article>
      </section>

      <section className="analytics-panels">
        <article className="analytics-panel">
          <h2>Recently completed</h2>
          {latestCompleted.length === 0 ? (
            <p>No completed tasks yet.</p>
          ) : (
            <ul className="analytics-list">
              {latestCompleted.map((task) => (
                <li key={task.id}>
                  <strong>{task.title}</strong>
                  <span>{formatDateTime(task.completedAt)}</span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="analytics-panel">
          <h2>Deadline pressure</h2>
          {overdueTasks.length === 0 ? (
            <p>No missed deadlines. Keep the cadence.</p>
          ) : (
            <ul className="analytics-list">
              {overdueTasks.map((task) => (
                <li key={task.id}>
                  <strong>{task.title}</strong>
                  <span>{formatDateTime(task.deadline)}</span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </section>
    </main>
  );
}

export default Analytics;
