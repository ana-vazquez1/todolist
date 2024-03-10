import React from "react";
import styles from "../styles/TaskList.module.css";

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
    return (
        <ul className={styles.taskList}>
            {tasks.map((task, index) => (
                <li key={index} className={styles.taskItem}>
                    <input
                        className={styles.taskCheckbox}
                        type="checkbox"
                        checked={task.checked}
                        onChange={() => onToggleTask(index)}
                    />
                    <label className={styles.taskLabel}>{task.name}</label>
                    <div className={styles.taskDetails}>
                        <p>Fecha de inicio: {task.startDate || "Sin fecha"}</p>
                        <p>Fecha de finalización: {task.endDate || "Sin fecha"}</p>
                        <p>Hora de inicio: {task.startTime || "Sin hora"}</p>
                        <p>Hora de finalización: {task.endTime || "Sin hora"}</p>
                        <p>Descripción: {task.description || "Sin descripción"}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default TaskList;