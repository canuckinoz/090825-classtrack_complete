export type User = {
  id?: string;
  username?: string;
  name?: string;
  role?: 'teacher' | 'admin' | 'student' | string;
};

export type Student = {
  id: number | string;
  name: string;
  recentActivity?: string;
  status?: string;
  positiveRatio?: number;
};

export type BehaviourLog = {
  id: number | string;
  studentId: Student['id'];
  behaviourId: number | string;
  note?: string;
  timestamp: Date | string;
};
