import { TEST_PLAYERS, FRUIT } from '../constants/testPlayers';

export const getAllGroups = (allPlayers=FRUIT, groupSize=4) => {
    var fn = function(n, src, got, all) {
        if (n == 0) {
            if (got.length > 0) {
                all[all.length] = got;
            }
            return;
        }
        for (var j = 0; j < src.length; j++) {
            fn(n - 1, src.slice(j + 1), got.concat([src[j]]), all);
        }
        return;
    }
    var all = [];
    for (var i = groupSize; i < allPlayers.length; i++) {
        fn(i, allPlayers, [], all);
    }
    all.push(allPlayers);
    return all;
}