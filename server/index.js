require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const app = express();

const mongoose = require('mongoose');

mongoose.connect(process.env.DB_URI);

mongoose.connection.once('open', () => {
    console.log('Conneted to database');
});

//This route will be used as an endpoint to interact with Graphql,
//All queries will go through this route.
app.use('/', graphqlHTTP({
    //Directing express-graphql to use this schema to map out the graph
    schema,
    //Directing express-graphql to use graphiql when goto '/graphql' address in the browser
    //which provides an interface to make GraphQl queries
    graphiql: true
}));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('Node server listening on port ' + PORT);
});
