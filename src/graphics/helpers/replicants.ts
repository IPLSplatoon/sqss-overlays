import { DASHBOARD_BUNDLE_NAME } from './constants';
import { NodeCGBrowser } from 'nodecg/browser';
import { MusicShown, NowPlaying, Casters, ActiveRound, PredictionStore, ActiveBreakScene, MainFlavorText, NextRoundStartTime, ScoreboardData, NextRound } from 'schemas';

export const musicShown = nodecg.Replicant<MusicShown>('musicShown', DASHBOARD_BUNDLE_NAME);
export const nowPlaying = nodecg.Replicant<NowPlaying>('nowPlaying', DASHBOARD_BUNDLE_NAME);
export const casters = nodecg.Replicant<Casters>('casters', DASHBOARD_BUNDLE_NAME);
export const activeRound = nodecg.Replicant<ActiveRound>('activeRound', DASHBOARD_BUNDLE_NAME);
export const predictionStore = nodecg.Replicant<PredictionStore>('predictionStore', DASHBOARD_BUNDLE_NAME);
export const activeBreakScene = nodecg.Replicant<ActiveBreakScene>('activeBreakScene', DASHBOARD_BUNDLE_NAME);
export const mainFlavorText = nodecg.Replicant<MainFlavorText>('mainFlavorText', DASHBOARD_BUNDLE_NAME);
export const nextRoundTime = nodecg.Replicant<NextRoundStartTime>('nextRoundStartTime', DASHBOARD_BUNDLE_NAME);
export const scoreboardData = nodecg.Replicant<ScoreboardData>('scoreboardData', DASHBOARD_BUNDLE_NAME);
export const nextRound = nodecg.Replicant<NextRound>('nextRound', DASHBOARD_BUNDLE_NAME);
