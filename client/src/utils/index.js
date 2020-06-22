const legendaries = ["fine", "legendary"];
const epics = ["epic", "quality"];
const rares = ["rare", "sturdy"];
const uncommons = ["uncommon", "handmade"];

function chooseBackground(string) {
    
  string = string.toLowerCase();

  if (legendaries.includes(string)) {
    return "legendary";
  }
  else if (epics.includes(string)) {
    return "epic";
  }
  else if (rares.includes(string)) {
    return "rare";
  }
  else if (uncommons.includes(string)) {
    return "uncommon";
  }
  return "common";
}

function normalizeRarity(string) {
  string = string.toLowerCase();

  if (legendaries.includes(string)) {
    return "Legendary";
  }
  else if (epics.includes(string)) {
    return "Epic";
  }
  else if (rares.includes(string)) {
    return "Rare";
  }
  else if (uncommons.includes(string)) {
    return "Uncommon";
  }
  return "Common";
}

function capFirst(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export {normalizeRarity, chooseBackground, capFirst};