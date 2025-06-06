import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addTask, deleteTask, toggleTask } from '../slices/tasksSlice';

function CurrentTasksList() {
    let currentDate = new Date()
    let month = currentDate.getMonth() + 1
    if (parseInt(month) < 10) {
        month = `0${month}`
    }
    let date_ = currentDate.getDate()
    if (parseInt(date_) < 10) {
        date_ = `0${date_}`
    }
    currentDate = `${currentDate.getFullYear()}-${month}-${date_}`

    const tasks = useSelector((state) => state.tasks)
    const currentTasks = tasks.filter((task) => task.date === currentDate)
    const dispatch = useDispatch()

    console.log()

    const [text, setText] = useState(localStorage.getItem('text'));
    const [date, setDate] = useState(currentDate);

    const completedTasks = currentTasks.filter((task) => task.isCompleted === true)
    const activeTasks = currentTasks.filter((task) => task.isCompleted === false)


    const handleTextChange = (text) => {
        setText(text)
        localStorage.setItem('text', text)
    }

    const handleAddTask = (e) => {
        e.preventDefault()
        if (text.trim() === '') return
        dispatch(addTask({ id: Date.now(), title: text, isCompleted: false, date: date }))
        setText('')
        setDate(currentDate)
        localStorage.setItem('text', '')
    }

    const handleTaskChange = (e, id) => {
        e.preventDefault()
        dispatch(toggleTask(id))
    }

    const handleTaskDelete = (e, id) => {
        e.preventDefault()
        dispatch(deleteTask(id))
    }
    
    const handleDateChange = (e) => {
        const newDate = e.target.value.split('-')
        let flag = true
        for (let index = 0; index < newDate.length; index++) {
            if (parseInt(newDate[index]) < currentDate.split('-')[index]) {
                flag = false
                break
            }
        }
        if (flag) {
            setDate(e.target.value)
        }
        else {
            setDate(currentDate)
        }
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
                <input className='add-task__date' type="date" onChange={(e) => handleDateChange(e)} value={date} />
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