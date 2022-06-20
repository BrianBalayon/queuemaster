export const alphabeticalPlayers = (players) => {
   return [...players].sort((prior, after) =>
      prior.name.localeCompare(after.name)
   );
};
