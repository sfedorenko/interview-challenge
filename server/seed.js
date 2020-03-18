require('dotenv').config();
const SeededShuffle = require('seededshuffle');
const mongoose = require('mongoose');
const Group = require('./models/Group');
const Color = require('./models/Color');

mongoose.connect(process.env.DB_URI);

mongoose.connection.once('open', () => {
    console.log('Conneted to database');
    runMigration();
});

const groupNames = ['Blacks', 'Whites', 'Grays', 'Reds', 'Yellows', 'Greens', 'Cyans', 'Blues', 'Magentas'];

/**
 * Converts an HSL color value to name of color group.
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {string}          The name of color group
 */
function colorClassify(h, s, l) {
    if (l < 20)   return 'Blacks';
    if (l > 80)   return 'Whites';
    if (s < 25)   return 'Grays';
    if (h < 30)   return 'Reds';
    if (h < 90)   return 'Yellows';
    if (h < 150)  return 'Greens';
    if (h < 210)  return 'Cyans';
    if (h < 270)  return 'Blues';
    if (h < 330)  return 'Magentas';
    return 'Reds';
}

/**
 * Converts an HSL color value to HEX.
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {string}          The HEX representation
 */
function hslToHex(h, s, l) {
    s /= 100;
    l /= 100;

    let c = (1 - Math.abs(2 * l - 1)) * s,
        x = c * (1 - Math.abs((h / 60) % 2 - 1)),
        m = l - c/2,
        r = 0,
        g = 0,
        b = 0;

    if (0 <= h && h < 60) {
        r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
        r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
        r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
        r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
        r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
        r = c; g = 0; b = x;
    }
    // Having obtained RGB, convert channels to hex
    r = Math.round((r + m) * 255).toString(16);
    g = Math.round((g + m) * 255).toString(16);
    b = Math.round((b + m) * 255).toString(16);

    // Prepend 0s, if necessary
    if (r.length === 1) r = "0" + r;
    if (g.length === 1) g = "0" + g;
    if (b.length === 1) b = "0" + b;

    return "#" + r + g + b;
}

/**
 * Create a group collection.
 *
 * @param   {array}  names    The array of group names
 * @return  {array}           The array of objects of groups
 */
async function createGroups(names) {
    try {
        // Clear group collection
        await Group.deleteMany();
        let groupsArr = [];
        names.forEach(name => {
            groupsArr.push({ name: name });
        });
        // Create groups in the collection
        const groups = await Group.create(groupsArr);
        console.log('Successfully added ' + groups.length + ' groups to collection');
        return groups;
    } catch (error) {
        console.error('Could not create groups.');
        console.error(error.message);
    }
}

/**
 * Create a shuffled color collection.
 *
 */
async function createColors() {
    try {
        // Clear color collection
        await Color.deleteMany();
        // Get groups after create
        const groups = await createGroups(groupNames);
        let colorsArr = [];
        // Generate array of colors objects
        for (let h = 0; h <= 360; h += 10) {
            for (let s = 0; s <= 100; s += 10) {
                for (let l = 0; l <= 100; l += 10) {
                    let hex = hslToHex(h, s, l),
                        group = groups.filter(obj => obj.name === colorClassify(h, s, l)),
                        groupId = group[0]._id;

                    colorsArr.push({
                        hex: hex,
                        hue: h,
                        saturation: s,
                        lightness: l,
                        groupId: groupId,
                    });
                }
            }
        }
        // Shuffle an array by key
        const colorsShuffledArr = SeededShuffle.shuffle(colorsArr, Math.PI, true);
        // Create colors in the collection
        const colors = await Color.create(colorsShuffledArr);
        console.log('Successfully added ' + colors.length + ' colors to collection');
    } catch (error) {
        console.error('Could not create colors.');
        console.error(error.message);
    }
}

/**
 * Run migration for Group and Color collections.
 *
 */
async function runMigration() {
    try {
        console.log('Migration started.');
        await createColors();
        console.log('Migration completed.');
    } catch (error) {
        console.error('Migration failed.');
        console.error(error.message);
    }
}
