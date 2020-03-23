const graphql = require('graphql');
const Color = require('../models/Color');
const Group = require('../models/Group');

const {
    GraphQLObjectType, GraphQLString,
    GraphQLID, GraphQLInt, GraphQLFloat, GraphQLSchema,
    GraphQLList, GraphQLNonNull
} = graphql;

//Schema defines data on the Graph like object types(color type), relation between
//these object types and describes how it can reach into the graph to interact with
//the data to retrieve or mutate the data
const ColorType = new GraphQLObjectType({
    name: 'Color',
    fields: () => ({
        id: {type: GraphQLID},
        hex: {type: GraphQLString},
        hue: {type: GraphQLFloat},
        saturation: {type: GraphQLFloat},
        lightness: {type: GraphQLFloat}
    })
});

const ColorDetailType = new GraphQLObjectType({
    name: 'ColorDetail',
    fields: () => ({
        id: {type: GraphQLID},
        hex: {type: GraphQLString},
        hue: {type: GraphQLFloat},
        saturation: {type: GraphQLFloat},
        lightness: {type: GraphQLFloat},
        group: {
            type: GroupType,
            resolve(parent, args) {
                return Group.findById(parent.groupId);
            }
        },
        similar: {
            type: new GraphQLList(ColorType),
            resolve(parent, args) {
                return Color.find({hue: parent.hue, saturation: parent.saturation});
            }
        }
    })
});

const GroupType = new GraphQLObjectType({
    name: 'Group',
    fields: () => ({
        id: {type: GraphQLID},
        name: {type: GraphQLString}
    })
});

//RootQuery describe how users can use the graph and grab data.
//E.g Root query to get all groups, get all colors, get a particular
//color or get a particular group.
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        colorDetail: {
            type: ColorDetailType,
            //argument passed by the user while making the query
            args: {id: {type: GraphQLID}},
            resolve(parent, args) {
                //Here we define how to get data from database source
                //this will return the book with id passed in argument
                //by the user
                return Color.findById(args.id);
            }
        },
        colors: {
            type: new GraphQLList(ColorType),
            args: {
                groupId: {type: GraphQLID},
                limit: {type: GraphQLInt},
                skip: {type: GraphQLInt}
            },
            resolve(parent, args) {
                let query = {},
                    limit = args.limit || 12,
                    skip = args.skip || 0;
                if(args.groupId) query.groupId = args.groupId;
                return Color.find(query).limit(limit).skip(skip);
            }
        },
        colorsTotal: {
            type: GraphQLInt,
            args: {
                groupId: {type: GraphQLID}
            },
            resolve(parent, args) {
                let query = {};
                if(args.groupId) query.groupId = args.groupId;
                return Color.find(query).count();
            }
        },
        colorRandom: {
            type: ColorType,
            async resolve(parent, args) {
                let count = await Color.count();
                let random = Math.floor(Math.random() * count);
                return await Color.findOne().skip(random);
            }
        },
        groups: {
            type: new GraphQLList(GroupType),
            resolve(parent, args) {
                return Group.find({});
            }
        }
    }
});

//Creating a new GraphQL Schema, with options query which defines query
//we will allow users to use when they are making request.
module.exports = new GraphQLSchema({
    query: RootQuery
});
