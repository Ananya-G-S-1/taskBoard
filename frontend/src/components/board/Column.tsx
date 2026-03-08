import TaskCard from "../TaskCard"

export default function Column({ column, tasks }: any) {

  return (
    <div className="column">

      <h3>{column.toUpperCase()}</h3>

      {tasks.map((task: any) => (
        <TaskCard key={task.id} task={task} />
      ))}

    </div>
  )

}