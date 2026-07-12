export function getRelativeDueDate(date: Date): string {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const due = new Date(date);
  due.setHours(0, 0, 0, 0);

  const diffTime = due.getTime() - today.getTime();
  
  // convert the difference in milliseconds to days
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  switch (diffDays) {
    case 0:
      return 'Today';

    case 1:
      return 'Tomorrow';

    case -1:
      return 'Yesterday';

    default:
      if (diffDays > 1 && diffDays <= 7) {
        return `In ${diffDays} days`;
      }

      if (diffDays < -1) {
        return `${Math.abs(diffDays)} days overdue`;
      }

      return due.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      });
  }
}