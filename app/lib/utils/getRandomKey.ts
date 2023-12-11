import { v4 as uuidv4 } from "uuid" // extract this out

export const getRandomKey = () => {
  return uuidv4()
}
