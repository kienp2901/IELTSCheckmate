export interface IDigitalLevel {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface IContest {
  id: number;
  title: string;
  slug: string;
  course_digitaltwin: number;
  event_type: string;
  image_url: string;
  updated_at: string;
  start_date: string;
  end_date: string;
  publish_date: string;
  description: string;
  excerpt: string;
  level: string;
  level_id: number;
  participation_status: number;
  messageRegister: string;
  enable: number;
  publish: number;
}

export interface ILevelProgress {
  totalActivity: number;
  numberActivityCompletion: number;
  completionPercentage: number;
  latestTimeCompleted: string;
}

export interface IContestResponse {
  level_id_data: {
    [key: string]: ILevelProgress;
  };
  contest: {
    status: boolean;
    count: number;
    total: number;
    data: IContest[];
    digitalLevel: IDigitalLevel[];
  };
  message: string;
  errorType: string;
  orgid: number;
  progessBeginner: number;
  progessIntermediate: number;
}

export interface ISection {
  sectionId: number;
  sectionName: string;
}

export interface IActivity {
  id: number;
  parentId: number;
  cmid: number;
  activityName: string;
  desc: string;
  stateComplete: string;
  timeCompleted: string;
  max_score: number;
  min_score: number;
}

export interface IContestDetail {
  section: ISection[];
  activity: IActivity[];
  contest: {
    data: IContest[];
  };
  my_score: {
    effort_score: number;
    performance_score: number;
    challenge_score: number;
    total_score: number;
  };
}

export interface IMissionHistory {
  id: number;
  performance_score: number;
  effort_score: number;
  challenge_score: number;
  total_score: number;
  created_at_format: string;
  mission_run_id: string;
}

export interface IMissionDetail {
  code: number;
  status: string;
  message: string;
  data: {
    history: IMissionHistory[];
    min_score: number;
    max_score: number;
  };
}

export interface IRegisterContestResponse {
  success: boolean;
  message: string;
} 