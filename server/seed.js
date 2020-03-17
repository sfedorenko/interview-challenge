require('dotenv').config();
const mongoose = require('mongoose');
const Group = require('./models/Group');
const loadJsonFile = require('load-json-file');
const seeder = require('mongoose-seed');

// Connect to MongoDB via Mongoose
seeder.connect(process.env.DB_URI, function() {
    // Load Mongoose models
    seeder.loadModels([
        './models/Group.js',
        './models/Color.js',
    ]);

    // Clear specified collections
    seeder.clearModels(['Color', 'Group'], function(err) {
        // Callback to populate Groups once json file have been loaded
        loadJsonFile('./seeds/groups.json').then(groups => {
            seeder.populateModels([groups], function() {
                // Callback to populate Colors once json file have been loaded
                loadJsonFile('./seeds/colors.json').then(colors => {
                    Group.find({}).then((groups) => {
                        colors.documents.forEach(color => {
                            if (color.group) {
                                // Filter groups by group name
                                let group = groups.filter(obj => obj.name === color.group);
                                // Set group_id property to current color
                                color['group_id'] = mongoose.Types.ObjectId(group._id).toHexString();
                                // Delete temporary property 'group'
                                delete color.group;
                            }
                        });
                        seeder.populateModels([colors], function() {
                            seeder.disconnect();
                        });
                    });
                });
            });
        });
    });
});
