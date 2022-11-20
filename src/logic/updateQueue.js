export const increasePriority = (allPlayers = [], except = []) => {
   const exceptNames = except.map((player) => player.name);
   const increased = [...allPlayers];
   increased.forEach((entry) => {
      if (!exceptNames.find((name) => entry.name === name)) entry.priority++;
   });
   return increased;
};

const getAverageGames = (players) => {
   const totalCount = players.reduce((total, currentPlayer) => {
      return total + currentPlayer.gamesPlayed;
   }, 0);
   return totalCount / players.length
}

export const sortByPriority = (allGroups = [[]], players = []) => {
   const sorted = [...allGroups];
   const averageGames = getAverageGames(players);
   sorted.sort((higher, lower) => {
      const higherPriority = higher.reduce((total, currentPlayer) => {
         return total + (currentPlayer.priority - (currentPlayer.gamesPlayed - averageGames));
      }, 0);
      const lowerPriority = lower.reduce((total, currentPlayer) => {
         return total + (currentPlayer.priority - (currentPlayer.gamesPlayed - averageGames));
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
   return isMidGame;
};
