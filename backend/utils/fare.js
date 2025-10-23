import { getDistanceInKm } from "./distance.js";

const FARE_BASE = Number(process.env.FARE_BASE) || 30;
const FARE_PER_KM = Number(process.env.FARE_PER_KM) || 12;
const FARE_MINIMUM = Number(process.env.FARE_MINIMUM) || 50;

export async function calculateFare(origin, destination, passengers = 1) {
  const distance = await getDistanceInKm(origin, destination);
  if (distance === null) return FARE_MINIMUM;

  let fare = FARE_BASE + distance * FARE_PER_KM;
  fare = fare * passengers;

  if (fare < FARE_MINIMUM) fare = FARE_MINIMUM;
  return Math.round(fare); // round to nearest integer
}
