import { Label } from './label'
import { Head } from './head'
import { User } from './user'

export interface Pr {
  number: number;
  head: Head;
  labels: Label[];
  user: User;
}
