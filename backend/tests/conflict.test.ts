import { resolveMoveConflict } from "../src/utils/conflictResolver"

test("move conflict resolution", () => {

  const serverTask = { updatedAt: 200 }

  const incoming = { updatedAt: 100 }

  const result = resolveMoveConflict(serverTask, incoming)

  expect(result.accepted).toBe(false)

})