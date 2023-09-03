export interface Task {
  id?: number;
  title: string;
  description: string;
  status?: TaskStatus;
}

export interface TaskStatus {
  id: number;
  completed: boolean;
  task: number;
  effective_date: Date;
}
