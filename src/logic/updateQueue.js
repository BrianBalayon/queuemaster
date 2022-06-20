export const increasePriority = (allPlayers = []) => {
   const increased = [...allPlayers];
   increased.map((entry) => entry.priority++);
   return increased;
};

export const sortByPriority = (allGroups = [[]]) => {
   const sorted = [...allGroups];
   sorted.sort((higher, lower) => {
      const higherPriority = higher.reduce((total, currentPlayer) => {
         return total + currentPlayer.priority;
      }, 0);
      const lowerPriority = lower.reduce((total, currentPlayer) => {
         return total + currentPlayer.priority;
      }, 0);
      return lowerPriority - higherPriority;
   });
   return sorted;
};

export const resetPriority = (allPlayers = [], name = "") => {
   const player = allPlayers.find((player) => player.name === name);
   player.priority = 0;
   player.gamesPlayed++;
};

export const isPlayerMidgame = (currentMatches = [[]], name = "") => {
    let isMidGame = false;
    currentMatches.forEach((match) => {
        if (match.filter((player) => player.name === name).length > 0) {
            isMidGame = true;
        }
    });
    return isMidGame
}
