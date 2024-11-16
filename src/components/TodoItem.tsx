import dayjs from "dayjs";
import "./TodoItem.css";

interface IProps {
  todo: TODO;
  setChecked: (id: string) => void;
}

const TodoItem = ({ todo, setChecked }: IProps) => {
  const { id, isComplete, description } = todo;
  const dueDate = dayjs(todo.dueDate);
  const today = dayjs();

  const isOverdue = dueDate.diff(today) < 0;

  return (
    <label
      className={`todo-item ${isOverdue && !isComplete && "overDue"} ${
        isComplete && "complete"
      }`}
    >
      <div>
        <input
          type="checkbox"
          checked={isComplete}
          onChange={() => setChecked(id)}
        />
        <span style={{ paddingRight: "2px" }}>{description}</span>
      </div>
      {todo.dueDate && <span>{dueDate.format("MM/DD/YYYY")}</span>}
    </label>
  );
};

export default TodoItem;
