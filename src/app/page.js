"use client";
import React, { useState, useEffect } from "react";
import TaskList from "./components/TaskList.js";
import styles from "./page.module.css";

export default function Home() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const task = {
      name: formData.get("taskName"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      startTime: formData.get("startTime"),
      endTime: formData.get("endTime"),
      description: formData.get("description"),
      checked: false,
    };
    setTasks([...tasks, task]);
    event.target.reset();
    setIsFormVisible(false);
  };

  const toggleTask = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, checked: !task.checked } : task
      )
    );
  };

  return (
    <div>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <h2 className={styles.titulo}>To Do List</h2>
          <ul className={styles.navlist}>
            <li className={styles.navitem}>
              <button
                className={styles.button}
                onClick={() => setIsFormVisible(!isFormVisible)}
              >
                Agregar Tarea
              </button>
              {isFormVisible && (
                <form className={styles.form} onSubmit={handleSubmit}>
                  <h3>Agregar Tarea</h3>
                  <button type="button" className={styles.closeButton} onClick={() => setIsFormVisible(false)}> x </button>
                  <label htmlFor="taskName">Nombre de la tarea:</label>
                  <input type="text" id="taskName" name="taskName" className={styles.input} required />

                  <label htmlFor="startDate">Fecha de inicio:</label>
                  <input type="date" id="startDate" name="startDate" className={styles.input} required />

                  <label htmlFor="endDate">Fecha de finalización:</label>
                  <input type="date" id="endDate" name="endDate" className={styles.input} />

                  <label htmlFor="startTime">Hora de inicio:</label>
                  <input type="time" id="startTime" name="startTime" className={styles.input} />

                  <label htmlFor="endTime">Hora de finalización:</label>
                  <input type="time" id="endTime" name="endTime" className={styles.input} />

                  <label htmlFor="description">Descripción:</label>
                  <textarea id="description" name="description" className={styles.input} />

                  <button type="submit" className={styles.button}>
                    Agregar
                  </button>
                </form>
              )}
            </li>
          </ul>
        </nav>
      </header>
      <main className={styles.main}>
        <TaskList tasks={tasks} onToggleTask={toggleTask} />
      </main>
    </div>
  );
}