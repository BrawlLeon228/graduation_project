import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, toggleTask } from '../slices/tasksSlice';

function CurrentTasksList() {
    const tasks = useSelector((state) => state.tasks.tasks)
    const dispatch = useDispatch()
    const [text, setText] = useState('');
    const completedTasks = tasks.filter((task) => task.isCompleted === true)
    const activeTasks = tasks.filter((task) => task.isCompleted === false)

    // console.log(completedTasks, activeTasks);
    const handleTextChange = (text) => {
        setText(text)
    }

    const handleAddTask = (e) => {
        e.preventDefault()
        if (text.trim() === '') return
        dispatch(addTask({ id: Date.now(), title: text, isCompleted: false }))
        setText('')
    }

    const handleTaskChange = (e, id) => {
        e.preventDefault()
        dispatch(toggleTask(id))
    }

    const handleTaskDelete = (e, id) => {
        e.preventDefault()
        dispatch(deleteTask(id))
    }

    return (
        <div className="today">
            <form action="submit" className="add-task" onSubmit={handleAddTask}>
                <input
                    type="text"
                    className="add-task__text"
                    value={text}
                    onChange={(e) => handleTextChange(e.target.value)}
                    placeholder='Task content'
                />
                <button className="add-task__submit-button" type='submit'>Add Task</button>
            </form>

            <div className="tasks">
                <ul className="tasks__list tasks__list_active">
                    {activeTasks.length === 0 ? (
                        <p>No active tasks yet.</p>
                    ) : (
                        activeTasks.map((task) => (
                            <li className={`tasks__task tasks__task_active'`} key={task.id}>
                                <input type="checkbox" id={task.id} onChange={(e) => handleTaskChange(e, task.id)} />
                                <label htmlFor={task.id}>{task.title}</label>
                                <button onClick={(e) => handleTaskDelete(e, task.id)}>delete</button>
                            </li>
                        ))
                    )}
                </ul>
                <ul className="tasks__list tasks__list_completed">
                    {completedTasks.length === 0 ? (
                        <p>No completed tasks yet.</p>
                    ) : (
                        completedTasks.map((task) => (
                            <li className={`tasks__task tasks__task_completed`} key={task.id}>
                                <input type="checkbox" id={task.id} checked onChange={(e) => handleTaskChange(e, task.id)} />
                                <label htmlFor={task.id}>{task.title}</label>
                                <button onClick={(e) => handleTaskDelete(e, task.id)}>delete</button>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
}

export default CurrentTasksList;