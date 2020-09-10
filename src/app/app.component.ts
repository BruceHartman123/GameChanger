import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  name = '';
  tempName = '';
  nameEdit = true;
  strength = 0;
  tempStrength = 0;
  strEdit = false;
  dex = 0;
  dexEdit = false;
  tempDex = 0;
  mind = 0;
  tempMind = 0;
  mindEdit = false;
  presence = 0;
  tempPresence = 0;
  presEdit = false;
  vitality = this.strength + 3;
  numDamaged = 0;
  evasion = this.dex + 10;
  armor = this.evasion;
  alacrity = this.dex + this.mind;
  tenacity = this.presence + 1;
  power = 0;
  skills = ["Fighting", "Thievery", "Stealth", "Archery", "Learned", "Survival",
    "Perception", "Apothecary", "Intimidation", "Performance", "Manipulation",
    "Insight", "Power"];
  skillLevel = new Array(13).fill(0);
  skillNames = ["Untrained", "Novice", "Apprentice", "Adept", "Expert", "Master"];
  storage = {};
  showLoad = false;

  constructor() {
    var store = localStorage.getItem('chars');
    if (store) {
      this.storage = JSON.parse(store);
    }
    else {
      this.storage = {};
    }
  }

  getStorageLength() {
    return Object.keys(this.storage).length;
  }

  getStorageKeys() {
    return Object.keys(this.storage);
  }

  updateName() {
    this.name = this.tempName;
    this.nameEdit = false;
  }

  updateStrength() {
    this.strength = this.tempStrength;
    this.strEdit = false;
    this.vitality = this.strength + 3;
  }

  updateDex() {
    this.dex = this.tempDex;
    this.dexEdit = false;
    this.evasion = this.dex + 10;
    this.armor = this.evasion;
    this.alacrity = this.dex + this.mind
  }

  updateMind() {
    this.mind = this.tempMind;
    this.mindEdit = false;
    this.alacrity = this.dex + this.mind
  }

  updatePresence() {
    this.presence = this.tempPresence;
    this.presEdit = false;
    this.tenacity = this.presence + 1;
  }

  takeDamage() {
    if (this.vitality > 0) {
      this.vitality--;
      this.numDamaged++;
    }
  }

  checkIfTrainable(i) {
    if (this.skillLevel[i] >= 5) {
      return false;
    }
    console.log("got here");

    switch (i) {
      case 0:
        if (this.skillLevel[i] >= this.strength || this.skillLevel[i] >= this.dex) {
          return false;
        }
        break;
      case 1:
      case 2:
      case 3:
        if (this.skillLevel[i] >= this.dex) {
          return false;
        }
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        if (this.skillLevel[i] >= this.mind) {
          return false;
        }
        break;
      case 8:
      case 9:
      case 10:
      case 11:
        if (this.skillLevel[i] >= this.presence) {
          return false;
        }
        break;
      default:
        if (this.skillLevel[i] >= this.mind || this.skillLevel[i] >= this.presence) {
          return false;
        }
    }
    return true;
  }

  train(i) {
    this.skillLevel[i]++;
  }

  saveChar() {
    if (this.name === '') {
      alert("Please enter a name for your character");
      return;
    }

    let savedObj = {
      name: this.name, strength: this.strength, dex: this.dex,
      mind: this.mind, presence: this.presence, vitality: this.vitality,
      numDamaged: this.numDamaged, skillLevel: this.skillLevel,
      tenacity: this.tenacity
    };

    this.storage[this.name] = savedObj;

    localStorage.setItem('chars', JSON.stringify(this.storage));
    alert("Saved Character name " + this.name);
  }

  loadChar(name) {
    let savedObj = this.storage[name];

    if (savedObj) {
      this.name = savedObj.name;
      this.nameEdit = false;
      this.strength = savedObj.strength;
      this.dex = savedObj.dex;
      this.mind = savedObj.mind;
      this.presence = savedObj.presence;
      this.vitality = savedObj.vitality;
      this.numDamaged = savedObj.numDamaged;
      this.skillLevel = savedObj.skillLevel;
      this.strEdit = false;
      this.vitality = this.strength + 3;
      this.dexEdit = false;
      this.evasion = this.dex + 10;
      this.armor = this.evasion;
      this.alacrity = this.dex + this.mind
      this.presEdit = false;
      this.tenacity = savedObj.tenacity;
    }

    this.showLoad = false;
  }
}
