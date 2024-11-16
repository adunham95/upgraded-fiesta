import dayjs from "dayjs";

export function sortData(items: TODO[]) {
  const sortedItems = items.sort((a, b) => {
    if (a.isComplete) return 1;
    if (b.isComplete) return -1;
    if (a.dueDate && !b.dueDate) {
      const dueDate = dayjs(a.dueDate);
      const today = dayjs();
      const isOverdue = dueDate.diff(today) < 0;
      if (isOverdue) return -1;
    }
    if (!a.dueDate && b.dueDate) {
      const dueDate = dayjs(b.dueDate);
      const today = dayjs();
      const isOverdue = dueDate.diff(today) < 0;
      if (isOverdue) return 1;
    }
    if (!a.dueDate) return 1;
    if (!b.dueDate) return -1;
    if (a.dueDate && b.dueDate) {
      const aDate = dayjs(a.dueDate);
      const bDate = dayjs(b.dueDate);
      const diff = aDate.diff(bDate);
      return diff;
    }
    return 0;
  });
  return sortedItems;
}
