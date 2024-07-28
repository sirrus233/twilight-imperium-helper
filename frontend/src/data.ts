import carrierImgPath from "./images/carrier.png";
import cruiserImgPath from "./images/cruiser.png";
import destroyerImgPath from "./images/destroyer.png";
import dreadnoughtImgPath from "./images/dreadnought.png";
import fighterImgPath from "./images/fighter.png";
import flagshipImgPath from "./images/flagship.png";
import infantryImgPath from "./images/infantry.png";
import mechImgPath from "./images/mech.png";
import warSunImgPath from "./images/war-sun.png";

export enum Unit {
    INFANTRY = "Infantry",
    FIGHTER = "Fighter",
    DESTROYER = "Destroyer",
    MECH = "Mech",
    CRUISER = "Cruiser",
    CARRIER = "Carrier",
    DREADNOUGHT = "Dreadnought",
    FLAGSHIP = "Flagship",
    WAR_SUN = "War Sun",
}

export enum Mode {
    CALCULATOR,
    BUDGET,
}

export function getUnitCost(unit: Unit): number {
    switch (unit) {
        case Unit.INFANTRY:
            return 0.5;
        case Unit.FIGHTER:
            return 0.5;
        case Unit.DESTROYER:
            return 1;
        case Unit.MECH:
            return 2;
        case Unit.CRUISER:
            return 2;
        case Unit.CARRIER:
            return 3;
        case Unit.DREADNOUGHT:
            return 4;
        case Unit.FLAGSHIP:
            return 8;
        case Unit.WAR_SUN:
            return 12;
    }
}

export function getImgPath(unit: Unit): string {
    switch (unit) {
        case Unit.INFANTRY:
            return infantryImgPath;
        case Unit.FIGHTER:
            return fighterImgPath;
        case Unit.DESTROYER:
            return destroyerImgPath;
        case Unit.MECH:
            return mechImgPath;
        case Unit.CRUISER:
            return cruiserImgPath;
        case Unit.CARRIER:
            return carrierImgPath;
        case Unit.DREADNOUGHT:
            return dreadnoughtImgPath;
        case Unit.FLAGSHIP:
            return flagshipImgPath;
        case Unit.WAR_SUN:
            return warSunImgPath;
    }
}

export type UnitCounts = Map<Unit, number>;

function getHalfCost(count: number): number {
    return Math.ceil(count / 2);
}

export function getTotalCost(unitCounts: UnitCounts): number {
    return Array.from(unitCounts).reduce(
        (acc, [a, b]) =>
            a === Unit.INFANTRY || a === Unit.FIGHTER
                ? acc + getHalfCost(b)
                : acc + getUnitCost(a) * b,
        0
    );
}

export function getTotalCapacity(unitCounts: UnitCounts): number {
    return Array.from(unitCounts).reduce((acc, [, b]) => acc + b, 0);
}

export function getFleetSupplyRemaining(
    currentFleetSupply: number,
    maxFleetSupply: number,
    unitCounts: UnitCounts
) {
    return Array.from(unitCounts).reduce(
        (acc, [a, b]) =>
            a === Unit.INFANTRY || a === Unit.FIGHTER || a === Unit.MECH
                ? acc
                : acc - b,
        maxFleetSupply - currentFleetSupply
    );
}
