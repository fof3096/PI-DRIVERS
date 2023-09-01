function prepareString(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

function teamsToArray(teamsDriver) {
    return teamsDriver.split(",").map(team => team.trim());
}

module.exports = {
    prepareString,
    teamsToArray,
}