var graphqlHTTP = require('express-graphql');
var QuestionType = require('../types/questionType.js')
var QuestionListType = require('../types/questionListType.js')
var QuestionCtr = require('../../database/questionsController');
var questionCtr = new QuestionCtr();
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
} = require("graphql");
var models={};
var schema={};
class GraphqlQuestionController
{
    constructor(){
        this.initGraphStuff();
    }    
    initGraphStuff()
    {
        schema = new GraphQLSchema({
            query: new GraphQLObjectType({
                name: "QuestionQuery",
                fields: {
                    one: {
                        type: QuestionType,
                        args: {
                            id: { type: GraphQLNonNull(GraphQLID) }
                        },
                        resolve: (root, args, context, info) => {
                            if(args.id)
                            {
                                return this.getQuestionById(args.id).then(x=>{
                                    return x;
                                });
                            }
                            else return null;
                        }
                    },
                    all:{
                        type: QuestionListType,
                        args:{},
                        resolve:(root,args,context,info)=>{
                            return this.getAllQuestions().then(x=>{
                                return x;
                            });
                        }
                    },
                }
            })
        });
    }
    getAllQuestions()
    {
        return new Promise((resolve,reject)=>{
            questionCtr.getQuestions((err,data)=>{
                if(err){
                    console.log('Error: ' + err);
                    reject(err);
                }
                else{
                    var questions = JSON.parse(data);
                    resolve(questions);
                }
            })
        })
    }
    getQuestionById(id)
    {
        return new Promise((resolve,reject)=>{
            questionCtr.getQuestionByID(id,(err,data)=>{
                if(err){
                    console.log('Error: ' + err);
                    reject(err);
                }
                else{
                    var question = JSON.parse(data);
                    resolve(question);
                }
            })
        })
    }
    initGraphQl(app)
    {
        return new Promise((resolve,reject)=>{
            app.use("/graphql/questions", graphqlHTTP({
                schema: schema,
                graphiql: true
            }));
            resolve()
        })
    }
}
module.exports = GraphqlQuestionController;