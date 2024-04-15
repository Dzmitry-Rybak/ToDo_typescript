import { useState, useEffect, useRef } from "react";
import TodoList from "./TodoList";
import { ITodo } from "../types/data";

const App:React.FC = () => {
    const [value, setValue] = useState('');
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [isEmptyField, setIsEmptyField] = useState(false);
    const [theme, setTheme] = useState('light');

    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        if(inputRef.current) inputRef.current.focus();
    }, []);

    const handleThemeToggle = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }


    const handleAddTodo = () => {
        if(value){
            setTodos([...todos, {
                id: Date.now(),
                title: value,
                complite: false
            }]);
            setIsEmptyField(false);
        } else {
            setIsEmptyField(true);
            setTimeout(() => {
                setIsEmptyField(false);
            }, 3000);
        }

        setValue('');
    }

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setValue(e.target.value);
    }

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if(e.key === 'Enter') handleAddTodo();
    }

    const handleRemoveTodo = (id: number): void => {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    const toggleTodo = (id: number): void => {
        setTodos(todos.map(todo => {
            if(todo.id !== id) return todo;

            return {
                ...todo,
                complite: !todo.complite
            }
        }))
    }

    return (
        <div className="bg-bgLight dark:bg-bgDark w-full text-center h-screen">
            <h1 className="dark:text-gray-300 pt-4">ToDo LIST</h1>
            <div className="flex justify-between relative mt-1 max-w-[700px] mx-auto px-[10px]">
                <input className="w-[70%] p-1 pl-8 border-[1px] border-solid border-black rounded-lg 576:w-[50%]" value={value} onChange={handleChange} onKeyDown={handleKeyDown} ref={inputRef}/>
                <svg className=" absolute top-1/2 transform -translate-y-1/2 left-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                <button className="px-[6px] transition-all duration-500 hover:bg-orange-400 hover:scale-90 bg-orange-300 rounded-lg dark:bg-white dark:hover:bg-slate-400 md:text-xs 576:w-20" onClick={handleAddTodo}>Create new task</button>
                <div>
                    <label className="w-11 h-11  grid cursor-pointer place-items-center" htmlFor="switch">
                        <input onClick={handleThemeToggle} id="switch" className="hidden peer/switch" type="checkbox"/>
                        <div className="col-span-full row-span-full transition-all duration-300 peer-checked/switch:rotate-[360deg] peer-checked/switch:scale-0">
                            <svg height="26" width="26" fill="yellow" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"></path>
                            </svg>
                        </div>
                        <div className="col-span-full row-span-full transition-all duration-300 scale-0 peer-checked/switch:rotate-[360deg] peer-checked/switch:scale-100 peer-checked/switch:delay-100">
                            <svg height="26" width="26" fill="#5e757d" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path clip-rule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" fill-rule="evenodd"></path>
                            </svg>
                        </div>
                    </label>
                </div>
            </div>
            {isEmptyField ? <Warning/> : null}
            <TodoList items={todos} handleRemoveTodo={handleRemoveTodo} toggleTodo={toggleTodo}/>
        </div>
    )

}

const Warning: React.FC = () => {
    return <div className="w-72 mt-2 p-2 border-[1px] border-solid border-black rounded-lg absolute bottom-28 transform -translate-x-1/2 left-1/2 bg-teal-900" >
        <h2 className="text-lg text-yellow-500 dark:text-white p-3">You can't add empty task</h2>
    </div>
}

export default App;