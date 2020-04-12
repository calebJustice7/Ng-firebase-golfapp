import { TeeBox } from './teebox';

export interface Hole {
    hole: number,
    courseHoleId: number,
    courseId: number,
    greenLat: number,
    greenLng: number,
    frontLat: number,
    frontLng: number,
    backLat: number,
    backLng: number,
    pinLat?: any,
    pinLng?: any,
    pinExpires?: any,
    teeBoxes: TeeBox[]
}