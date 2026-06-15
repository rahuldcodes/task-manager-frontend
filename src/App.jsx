import { useState, useEffect } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);

  // Requirement: Fetch live Render API URL from .env configurations
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchTasks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks`);
      const data = await res.json();
      setTasks(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching full stack tasks:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!taskTitle.trim()) return;

    try {
      const res = await fetch(`${API_BASE_URL}/api/tasks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: taskTitle })
      });
      if (res.ok) {
        const newTask = await res.json();
        setTasks([newTask, ...tasks]);
        setTaskTitle("");
      }
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const styles = {
    box: { maxWidth: "500px", margin: "60px auto", padding: "30px", backgroundColor: "white", borderRadius: "12px", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" },
    form: { display: "flex", gap: "10px", marginBottom: "25px" },
    input: { flex: 1, padding: "12px", borderRadius: "6px", border: "1px solid #ddd", outline: "none" },
    btn: { backgroundColor: "#2ecc71", color: "white", border: "none", padding: "12px 20px", borderRadius: "6px", fontWeight: "bold", cursor: "pointer" },
    item: { padding: "12px", borderBottom: "1px solid #eee", display: "flex", justifyContent: "space-between", alignItems: "center" }
  };

  return (
    <div style={styles.box}>
      <h2 style={{ textAlign: "center", color: "#2c3e50" }}>📝 Full-Stack Task Manager</h2>
      <p style={{ textAlign: "center", fontSize: "12px", color: "#7f8c8d" }}>Connected to Render Node.js Ecosystem</p>
      
      <form onSubmit={handleAddTask} style={styles.form}>
        <input 
          type="text" 
          placeholder="Enter a production task..." 
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.btn}>Add Task</button>
      </form>

      {loading ? (
        <p style={{ textAlign: "center", color: "#7f8c8d" }}>⏳ Loading server array tasks...</p>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task.id} style={styles.styles}>
              <div style={styles.item}>
                <span>{task.title}</span>
                <span>{task.completed ? "✅" : "⏳"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
