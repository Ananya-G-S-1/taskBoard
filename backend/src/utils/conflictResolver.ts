export function resolveMoveConflict(serverTask, incomingTask) {

  if (incomingTask.updatedAt < serverTask.updatedAt) {

    return {
      accepted: false,
      serverTask
    }

  }

  return {
    accepted: true,
    task: incomingTask
  }

}