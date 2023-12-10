import { v4 as uuidv4 } from "uuid" // extract this out

// export const getErrorMsgId = (id: string) => `${id}-validation-error`

export const getRandomKey = () => {
  return uuidv4()
}
