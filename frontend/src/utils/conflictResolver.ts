export function resolveMoveConflict(serverTask:any, incomingTask:any) {

  if(incomingTask.updatedAt > serverTask.updatedAt) {

    return incomingTask

  }

  return serverTask

}