// This function is used to remove whitespaces and convert the Name in LowerCase

function formatText(Name) {
    Name = Name.replace(/\s+/g, '').toLowerCase();
    return Name;
}

module.exports = {formatText};