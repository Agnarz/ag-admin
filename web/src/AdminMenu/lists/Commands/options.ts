import type { ArgValue } from '../../../types';
interface OptionsProps { [index: string]: ArgValue; }

const Options: OptionsProps = {
  Targets: [],
  Vehicles: [],
  Weapons: [],
  Teleports: [],
  PedModels: [],
  Timecycles: [],
  Weather: [],
  Items: [],
  Jobs: [],
  Gangs: [],
};

export const SetOptions = (index: string, value: ArgValue) => {
  Options[index as keyof typeof Options] = value;
};

export const GetOptions = (index: string) => {
  let options = Options[index as keyof typeof Options];
  if (!options) {
    options = [];
  } return options;
};
