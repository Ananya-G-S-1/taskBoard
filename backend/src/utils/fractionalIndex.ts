export function calculatePosition(prev, next) {

  if (!prev && !next) return 1

  if (!prev) return next / 2

  if (!next) return prev + 1

  return (prev + next) / 2
}
export function generatePosition(prev?: number, next?: number) {
  if (!prev && !next) return 1
  if (!prev) return next! / 2
  if (!next) return prev + 1
  return (prev + next) / 2
}