exports.handler = function(event, context, callback){
    callback(null, {
        statusCode: 200,
        body: "stuff and things"
    })
}