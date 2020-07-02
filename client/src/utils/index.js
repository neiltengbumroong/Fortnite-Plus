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

function chooseNameSize(string) {
  if (string.length < 10) {
    return "large"
  }
  else if (string.length < 12) {
    return "medium";
  }
  else {
    return "small";
  }
}

function selectImage(type) {
  if (type === "misc" || type === "banner") {
    return false;
  }
  return true;
}

function pictureFiller(name) {
  if (name.includes("upgrade")) {
    return true;
  }
  return false;
}

function nameFiller(name) {
  if (name === "") {
    return "N/A";
  }

  if (name === "Bannertoken") {
    return "Banner"
  }

  return name;
}

export {normalizeRarity, chooseBackground, capFirst, chooseNameSize, selectImage, pictureFiller, nameFiller};