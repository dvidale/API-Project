
const descriptions = require('./airbnb-clone-spot-descriptions')


/*

ownerId
address
city
state
country
lat
lng
name
description
price

*/


const ownerNames = [
    "Jon", "Cersei", "Eddard", "Samwell", "Daenerys", "Stannis", "Catelyn", "Lysa", "Theon", "Margaery", "Archmaester", "Oberyn", "Ellaria", "Jaqen", "Daario", "Xaro", "Missandei", "Razdal", "Khal", "Arya"
  ]

const addresses = [
    "The North, Westeros", "Crownlands, Westeros", "Northern border of The North, Westeros", "The Wall, The North, Westeros", "Blackwater Bay, Crownlands, Westeros", "Stormlands, Westeros", "The Riverlands, Westeros", "The Vale, Westeros", "Iron Islands, Westeros", "The Reach, Westeros", "The Reach, Westeros", "Southern Westeros", "Dorne, Westeros", "Essos", "Slaver's Bay, Essos", "Southeast coast of Essos", "Slaver's Bay, Essos", "Slaver's Bay, Essos", "Central Essos", "The Riverlands, Westeros"
]

const cities = [
    "Winterfell", "King's Landing", "The Wall", "Castle Black", "Dragonstone", "Storm's End", "Riverrun", "The Eyrie", "Pyke", "Highgarden", "Oldtown", "Dorne", "Sunspear", "Braavos", "Meereen", "Qarth", "Astapor", "Yunkai", "Vaes Dothrak", "Harrenhal"
]


const states = [
    "The North", "Crownlands", "The North", "The North", "Crownlands", "Stormlands", "The Riverlands", "The Vale", "Iron Islands", "The Reach", "The Reach", "Dorne", "Dorne", "Essos", "Essos", "Essos", "Essos", "Essos", "Essos", "The Riverlands"
]

const countries = [
    "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Westeros", "Essos", "Essos", "Essos", "Essos", "Essos", "Essos", "Westeros"
]




const spotNames = [
    "Winterfell", "King's Landing", "The Wall", "Castle Black", "Dragonstone", "Storm's End", "Riverrun", "The Eyrie", "Pyke", "Highgarden", "Oldtown", "Dorne", "Sunspear", "Braavos", "Meereen", "Qarth", "Astapor", "Yunkai", "Vaes Dothrak", "Harrenhal"
]



module.exports = {
    ownerNames,
    addresses,
    cities,
    states,
    countries,
    spotNames,
    descriptions


}