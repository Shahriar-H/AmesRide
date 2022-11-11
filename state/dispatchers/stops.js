import { currentStopState, stopsState, upcomingArrivalsState } from '../atoms';
import getFromLocalStorage from '../utilities/localforage/getFromLocalStorage';
import getArrivals from '../utilities/request/getArrivals';

export const clearCurrentStop =
  ({ set }) =>
  () => {
    set(currentStopState, null);
  };

export const setCurrentStop =
  ({ set }) =>
  (stop) => {
    set(currentStopState, { ...stop });
  };

export const fetchUpcomingArrivals =
  ({ set }) =>
  async (stop) => {
    if (stop.ID < 0) return;
    const arrivals = await getArrivals(stop.ID);
    set(upcomingArrivalsState, arrivals);
  };

export const fetchStops =
  ({ set }) =>
  async () => {
    const stops = await getFromLocalStorage('stops-state');
    set(stopsState, stops || {});
  };
