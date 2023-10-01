import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';
import type { PlayerProps } from '../types';

const playersAtom = atom<PlayerProps[]>([]);

export const usePlayers = () => useAtom(playersAtom);
export const usePlayersValue = () => useAtomValue(playersAtom);
export const useSetPlayers = () => useSetAtom(playersAtom);

