import type { ArgValue } from '../../../types';
interface OptionsProps { [index: string]: ArgValue; };
import Vehicles from '../../../../../shared/vehicles.json';
import Weapons from '../../../../../shared/weapons.json';
import Teleports from '../../../../../shared/teleports.json';
import PedModels from '../../../../../shared/pedmodels.json';
import Timecycles from '../../../../../shared/timecycles.json';
import Weather from '../../../../../shared/weather.json';
import Items from '../../../../../shared/items.json';
import Jobs from '../../../../../shared/jobs.json';
import Gangs from '../../../../../shared/gangs.json';

const Options: OptionsProps = {
  Targets: [],
  Vehicles: Vehicles,
  Weapons: Weapons,
  Teleports: Teleports,
  PedModels: PedModels,
  Timecycles: Timecycles,
  Weather: Weather,
  Items: Items,
  Jobs: Jobs,
  Gangs: Gangs,
};

export const SetOptions = (index: string, value: ArgValue) => {
  Options[index as keyof typeof Options] = value;
};

export const GetOptions = (index: string) => {
  var options = Options[index as keyof typeof Options];
  if (!options) {
    options = [];
  } return options;
};
