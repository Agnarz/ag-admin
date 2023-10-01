import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { CommandProps } from '../types';

const commandsAtom = atom<CommandProps[]>([]);

export const useCommands = () => useAtom(commandsAtom);
export const useCommandsValue = () => useAtomValue(commandsAtom);
export const useSetCommands = () => useSetAtom(commandsAtom);
