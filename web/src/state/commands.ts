import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { CommandProps } from '../types';

const commandsAtom = atom<CommandProps[]>([]);
export const useCommands = () => useAtom(commandsAtom);
export const useCommandsValue = () => useAtomValue(commandsAtom);
export const useSetCommands = () => useSetAtom(commandsAtom);

const favorites = atom<string[]>([]);
export const useFavorites = () => useAtom(favorites);
export const useFavoritesValue = () => useAtomValue(favorites);
export const useSetFavorites = () => useSetAtom(favorites);
