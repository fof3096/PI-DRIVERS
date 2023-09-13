function prepareString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function teamsToArray(teamsDriver) {
    let antiCopy = new Set(teamsDriver.split(",").map(team => team.trim()));
    return [...antiCopy];
}

module.exports = {
    prepareString,
    teamsToArray,
}