import TodoItem from "./TodoItem";
import { ITodo } from "../types/data";


interface ITodoListProps {
    items: ITodo[];
    handleRemoveTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const TodoList: React.FC<ITodoListProps> = (props) => {
    const {items, handleRemoveTodo, toggleTodo} = props;

    return (
        <div className="mt-3">
            {props.items.map(el => (
                <TodoItem 
                    key={el.id} 
                    handleRemoveTodo={handleRemoveTodo}
                    toggleTodo={toggleTodo}
                    {...el}/>
            ))}
        </div>
    )
}

export default TodoList