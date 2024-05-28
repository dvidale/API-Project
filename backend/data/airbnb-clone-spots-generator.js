
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

const lats = [
    -34.6037, 40.7128, 51.5074, 35.6895, 48.8566, 37.7749, -33.8688, 55.7558, 52.5200, 34.0522, 19.4326, -22.9068, 1.3521, -1.2864, -34.9285, 59.3293, 41.9028, 31.2304, -26.2041, 60.1695
]

const lngs = [
    -58.3816, -74.0060, -0.1276, 139.6917, 2.3522, -122.4194, 151.2093, 37.6173, 13.4050, -118.2437, -99.1332, -43.1729, 103.8198, 36.8219, 138.6007, 18.0686, 12.4964, 121.4737, 28.0473, 24.9410
]


const spotNames = [
    "Winterfell", "King's Landing", "The Wall", "Castle Black", "Dragonstone", "Storm's End", "Riverrun", "The Eyrie", "Pyke", "Highgarden", "Oldtown", "Dorne", "Sunspear", "Braavos", "Meereen", "Qarth", "Astapor", "Yunkai", "Vaes Dothrak", "Harrenhal"
]

const prices = [
    250, 300, 450, 400, 350, 500, 250, 200, 450, 300, 200, 400, 350, 250, 450, 500, 300, 350, 200, 400
]


module.exports = {
    ownerNames,
    addresses,
    cities,
    states,
    countries,
    lats,
    lngs,
    spotNames,
    prices,
    descriptions


}