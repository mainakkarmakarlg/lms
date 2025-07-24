interface LOS {
  id: number;
  name: string;
}

interface Lecture {
  lectureId: number;
  name: string;
  remarks: string;
  contentCovered: string;
  duration: number;
  videoId: string;
  type: string;
  los: LOS[];
  seen: boolean;
  feedback: boolean;
  UserFlag?: {
    lectureId: number;
  };
}

interface Chapter {
  id: number;
  name: string;
  order: number | null;
  type: string;
  subjectId: number;
  chapterLectures: Lecture[];
}

interface Subject {
  id: number;
  name: string;
  order: number;
  type: string;
  subjectId: null;
  FallNumber: any[];
  Subjects: Chapter[];
  subjectLectures: any[];
}