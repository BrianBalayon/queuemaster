import { TEST_PLAYERS, FRUIT } from '../constants/testPlayers';


const DOUBLES_PLAYER_COUNT = 4;

const areTheSameLevel = (group=[]) => {
    const level = group[0].level;
    for (let index=1; index<group.length; index+=1) {
        const playerLevel = group[index].level;
        if (level !== playerLevel) return false;
    }
    return true;
}

const isBalanced = (group=[]) => {
    group.sort((higher, lower) => higher.level - lower.level);
    const pairA = group[0].level + group[3].level;
    const pairB = group[1].level + group[2].level;
    return Math.abs(pairA - pairB) < 4;
}

const formGroups = (playersNeeded, allPlayers, currentGroup, allGroups) => {
    if (playersNeeded === 0) {
        if (areTheSameLevel(currentGroup) || isBalanced(currentGroup)) {
            allGroups.push(currentGroup);
        }
        return;
    }
    if (currentGroup.length === DOUBLES_PLAYER_COUNT) return;
    for (let index=0; index<allPlayers.length; index+=1) {
        const nextPlayer = allPlayers[index];
        formGroups(playersNeeded - 1, allPlayers.slice(index + 1), [...currentGroup, nextPlayer], allGroups);
    }
    return;
}

const shuffleGroups = (allGroups) => {
    for (let index=allGroups.length-1; index>0; index-=1) {
        const randIndex = Math.floor(Math.random() * (index + 1));
        [allGroups[index], allGroups[randIndex]] = [allGroups[randIndex], allGroups[index]];
    }
}

export const getAllGroups = (allPlayers=TEST_PLAYERS, groupSize=DOUBLES_PLAYER_COUNT) => {
    var allGroups = [];
    for (let index=groupSize; index<allPlayers.length; index+=1) {
        formGroups(index, allPlayers, [], allGroups);
    }
    shuffleGroups(allGroups);
    return allGroups;
}