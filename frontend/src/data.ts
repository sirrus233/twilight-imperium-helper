import carrierImgPath from "./assets/carrier.png";
import cruiserImgPath from "./assets/cruiser.png";
import destroyerImgPath from "./assets/destroyer.png";
import dreadnoughtImgPath from "./assets/dreadnought.png";
import fighterImgPath from "./assets/fighter.png";
import flagshipImgPath from "./assets/flagship.png";
import infantryImgPath from "./assets/infantry.png";
import mechImgPath from "./assets/mech.png";
import warSunImgPath from "./assets/war-sun.png";

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

export function sumUnitCounts(
    unitCounts: UnitCounts,
    unitFilter: (unit: Unit) => boolean = () => true
): number {
    return Array.from(unitCounts)
        .filter(([unit]) => unitFilter(unit))
        .reduce((sum, [, count]) => sum + count, 0);
}

export function getFighterCount(unitCounts: UnitCounts): number {
    return sumUnitCounts(unitCounts, (unit) => unit === Unit.FIGHTER);
}

export function getFleetSupplyRemaining(
    currentFleetSupply: number,
    maxFleetSupply: number,
    unitCounts: UnitCounts,
    airborneFighterCount: number
) {
    const shipCount = sumUnitCounts(
        unitCounts,
        (unit) =>
            unit !== Unit.INFANTRY &&
            unit !== Unit.FIGHTER &&
            unit !== Unit.MECH
    );

    return (
        maxFleetSupply - currentFleetSupply - shipCount - airborneFighterCount
    );
}
