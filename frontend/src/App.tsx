import Board from "./components/Board"

function App() {
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Real-Time Task Board
      </h1>

      <Board />
    </div>
  )
}

export default App