import { DateTime } from "./DateTime.interface"

export interface BiorythmData {
  key: string,
  targetDate: DateTime,
  emotional: number,
  intellectual: number,
  physical: number
}
