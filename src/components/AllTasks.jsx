import { useDispatch, useSelector } from 'react-redux'
import { deleteTask } from '../slices/tasksSlice';

function AllTasks() {
    const tasks = useSelector((state) => state.tasks)
    const activeTasks = tasks.filter((task) => task.isCompleted === false)
    const dispatch = useDispatch()

    let dates = Array.from(new Set(activeTasks.map((task) => task.date)))
    dates.sort((a, b) => new Date(a) - new Date(b));

    const handleTaskDelete = (e, id) => {
        e.preventDefault()
        dispatch(deleteTask(id))
    }

    return (
        <div className='alltasks'>
            {dates.length === 0 ? (
                <p className='no-tasks'>No active tasks yet</p>
            ) : (
                <div className="dates__wrapper">
                    {dates.map((date) => (
                        <div className="dates">
                            <h2 className="dates__title">{date}</h2>
                            <ul className="dates__list">
                                {activeTasks.filter((task) => task.date === date).map((task) => (
                                    <li className="dates__element" key={task.id}>
                                        <p>{task.title}</p>
                                        <button onClick={(e) => handleTaskDelete(e, task.id)}>delete</button>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    );
}

export default AllTasks;