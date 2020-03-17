const graphql = require('graphql');
const Color = require('../models/Color');
const Group = require('../models/Group');

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLFloat, GraphQLSchema,
    GraphQLList, GraphQLNonNull
} = graphql;

//Schema defines data on the Graph like object types, relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data

const ColorType = new GraphQLObjectType({
    name: 'Color',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        hex: {type: GraphQLString},
        hue: {type: GraphQLFloat},
        saturation: {type: GraphQLFloat},
        lightness: {type: GraphQLFloat},
        group: {
            type: GroupType,
            resolve(parent, args) {
                return Group.findById(parent.group_id);
            }
        }
    })
});

const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString},
        color: {
            type: new GraphQLList(ColorType),
            resolve(parent, args) {
                return Color.find({group_id: parent.id});
            }
        }
    })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all colors, get all groups, get a particular
//color or get a particular group.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        color: {
            type: ColorType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Color.findById(args.id);
            }
        },
        colors: {
            type: new GraphQLList(ColorType),
            resolve(parent, args) {
                return Color.find({});
            }
        },
        group: {
            type: GroupType,
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                return Group.findById(args.id);
            }
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve(parent, args) {
                return Group.find({});
            }
        },
    }
});

//Very similar to RootQuery helps user to add/update to the database.
const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addGroup: {
            type: GroupType,
            args: {
                //GraphQLNonNull make these field required
                name: {type: new GraphQLNonNull(GraphQLString)}
            },
            resolve(parent, args) {
                let group = new Group({
                    name: args.name
                });
                return group.save();
            }
        },
        addColor: {
            type: ColorType,
            args: {
                name: {type: new GraphQLNonNull(GraphQLString)},
                hex: {type: new GraphQLNonNull(GraphQLString)},
                hue: {type: new GraphQLNonNull(GraphQLFloat)},
                saturation: {type: new GraphQLNonNull(GraphQLFloat)},
                lightness: {type: new GraphQLNonNull(GraphQLFloat)},
                group_id: {type: GraphQLID}
            },
            resolve(parent, args) {
                let color = new Color({
                    name: args.name,
                    hex: args.hex,
                    hue: args.hue,
                    saturation: args.hue,
                    lightness: args.hue,
                    group_id: args.group_id
                });
                return color.save();
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
