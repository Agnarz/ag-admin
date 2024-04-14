export interface PlayerProps {
  source: number;
  label: string;
  headshot: string;
  framework?: {
    id?: string;
    firstname?: string;
    lastname?: string;
    job?: string;
    jobGrade?: string;
    gang?: string;
    gangGrade?: string;
    cash?: number;
    bank?: number;
  };
}
