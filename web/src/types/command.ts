import { IconProp } from '@fortawesome/fontawesome-svg-core';
export type CommandProps = ButtonCommandProps | FormCommandProps;
type BaseCommand<T> = {
  id: number;
  type: T;
  label: string;
  command: string;
  filter: string;
  fav: boolean;
  close?: boolean;
  setFav(id: number): void;
};

export interface ButtonCommandProps extends BaseCommand<'button'> {
  active?: boolean;
}

export type ArgsProps = Array<ArgInput | ArgCheckbox | ArgSelect | ArgNumber | ArgSlider | ArgAutoComplete>;
type ExtraButtonProps = Array<{label: string; command: string; color: string;}>;
export interface FormCommandProps extends BaseCommand<'form'> {
  args: ArgsProps;
  buttons?: {
    execute?: string;
    extra?: ExtraButtonProps;
  };
}

export type FormValues = {
  test: {
    value: unknown;
  }[];
}

type BaseArg<T, U> = {
  type: T;
  label: string;
  description?: string;
  placeholder?: string;
  default?: U;
  icon?: IconProp;
  disabled?: boolean;
  required?: boolean;
};

export interface ArgCheckbox {
  type: 'checkbox';
  label: string;
  checked?: boolean;
  disabled?: boolean;
  required?: boolean;
}

export interface ArgInput extends BaseArg<'input', string> {
  password?: boolean;
  min?: number;
  max?: number;
}

export interface ArgNumber extends BaseArg<'number', number> {
  precision?: number;
  min?: number;
  max?: number;
  step?: number;
}

export type ArgValue = Array<{ value: string; label?: string }> | Array<string>;
export interface ArgSelect extends BaseArg<'select' | 'multi-select', string | string[]> {
  options?: ArgValue;
  optionsKey?: string;
  getOptions?: string;
  setOptions?: string;
  clearable?: boolean;
  searchable?: boolean;
}

export interface ArgAutoComplete extends BaseArg<'autocomplete', string | string[]> {
  options: ArgValue;
  optionsKey?: string;
}

export interface ArgSlider extends BaseArg<'slider', number> {
  min?: number;
  max?: number;
  step?: number;
}
