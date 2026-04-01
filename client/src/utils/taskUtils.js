export const TASK_STORAGE_KEY = 'habit-tracker-tasks';

export function readStoredTasks() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(TASK_STORAGE_KEY);
    if (!raw) {
      return [];
    }

    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function writeStoredTasks(tasks) {
  if (typeof window === 'undefined') {
    return;
  }

  window.localStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
}

export function getTaskStatus(task) {
  if (task.completedAt) {
    return 'completed';
  }

  const now = Date.now();
  const deadline = new Date(task.deadline).getTime();

  if (Number.isNaN(deadline)) {
    return 'scheduled';
  }

  if (deadline < now) {
    return 'overdue';
  }

  const hoursUntilDeadline = (deadline - now) / (1000 * 60 * 60);

  if (hoursUntilDeadline <= 24) {
    return 'due-soon';
  }

  return 'scheduled';
}

export function formatDateTime(value) {
  if (!value) {
    return 'Not set';
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date';
  }

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

export function formatRelativeDeadline(value) {
  const deadline = new Date(value).getTime();

  if (Number.isNaN(deadline)) {
    return 'No deadline';
  }

  const diff = deadline - Date.now();
  const diffHours = Math.round(diff / (1000 * 60 * 60));
  const diffDays = Math.round(diff / (1000 * 60 * 60 * 24));

  if (Math.abs(diffHours) < 24) {
    if (diffHours === 0) {
      return 'Due this hour';
    }

    return diffHours > 0
      ? `Due in ${diffHours} hour${diffHours === 1 ? '' : 's'}`
      : `${Math.abs(diffHours)} hour${Math.abs(diffHours) === 1 ? '' : 's'} late`;
  }

  if (diffDays === 0) {
    return 'Due today';
  }

  return diffDays > 0
    ? `Due in ${diffDays} day${diffDays === 1 ? '' : 's'}`
    : `${Math.abs(diffDays)} day${Math.abs(diffDays) === 1 ? '' : 's'} late`;
}

export function sortTasks(tasks) {
  return [...tasks].sort((left, right) => {
    const leftStatus = getTaskStatus(left);
    const rightStatus = getTaskStatus(right);

    if (leftStatus === 'completed' && rightStatus !== 'completed') {
      return 1;
    }

    if (leftStatus !== 'completed' && rightStatus === 'completed') {
      return -1;
    }

    return new Date(left.deadline).getTime() - new Date(right.deadline).getTime();
  });
}

export function buildTaskStats(tasks) {
  return {
    total: tasks.length,
    completed: tasks.filter((task) => task.completedAt).length,
    overdue: tasks.filter((task) => getTaskStatus(task) === 'overdue').length,
    dueSoon: tasks.filter((task) => getTaskStatus(task) === 'due-soon').length,
  };
}