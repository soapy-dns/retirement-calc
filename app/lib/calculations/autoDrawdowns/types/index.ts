export interface AutomatedDrawdown {
  id: string
  from: string // TODO: maybe from and to should be enums
  year: number
  to: string
  migrateAll: false
  value: number
}

// export interface AutomatedDrawdowns {
//   [year: number]: AutomatedDrawdown[]
// }
