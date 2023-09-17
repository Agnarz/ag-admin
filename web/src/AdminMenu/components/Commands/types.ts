export type CommandProps = ButtonCommandProps;
type BaseCommand<T> = {
  id: number;
  type: T;
  label: string;
  command: string;
};

export interface ButtonCommandProps extends BaseCommand<'button'> {
  active?: boolean;
};
