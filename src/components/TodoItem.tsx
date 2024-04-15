import { ITodo } from "../types/data";
interface ITodoItem extends ITodo {
    handleRemoveTodo: (id: number) => void;
    toggleTodo: (id: number) => void;
}

const TodoItem: React.FC<ITodoItem> = (props) => {
    const {id, title, complite, handleRemoveTodo, toggleTodo} = props;

    return (
        <>
            <div className="flex items-center py-3 px-5 justify-between max-w-[600px] mx-auto border-b-[1px] border-solid border-gray-300">
                <div className="flex">
                    <input className="mr-3" type="checkbox" checked={complite} onChange={() => toggleTodo(id)}/>
                    <span className={`dark:text-white transition-colors duration-400 text-justify ${!complite ? 'text-black' : 'text-gray-500 dark:text-gray-500 line-through'}`} >{title}</span>
                </div>
                <button className=" ml-3" onClick={() => handleRemoveTodo(id)}>
                    <svg className="transition-all duration-500 fill-white dark:fill-gray-300 dark:hover:fill-red-500  hover:fill-red-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                </button>
            </div>
        </>
    )
}

export default TodoItem