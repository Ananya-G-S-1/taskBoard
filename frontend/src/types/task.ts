export type Task = {

  id:string
  title:string
  description?:string
  column:"todo"|"doing"|"done"
  position:number
  updatedAt?:number

}