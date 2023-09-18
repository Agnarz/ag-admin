const CommandOptions = {
  Players: [],
  Targets: [],
  Vehicles: [],
  Weapons: [],
  Teleports: [],
  PedModels: [],
  Timecycles: [],
  Weather: [],
};

export function SetOptions(index: string, value: any) {
  CommandOptions[index as keyof typeof CommandOptions] = value;
};

export function GetOptions(index: string) {
  var options = CommandOptions[index as keyof typeof CommandOptions];
  if (!options) {
    options = [];
  } return options;
};
