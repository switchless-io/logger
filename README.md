# Logger Middleware for sailsjs

This is the logger middleware that we use accross all projects. 



## Reference
### getRequestLogger(options)

This returns a function. You can pass in options that will modify the behaviour of the function that is returned. 

```
options = {
	eventQueue:{
		optional,
		When defined, it will be used to send the log to the queue. This object defines the queue. 
	},
	pg_connection_string:'connection string', 
}
```


`pg_connection_string` - this when defined will push server logs to that database. This expects the database to be of a certain structure. 

Refer to `ServerLog.model.js` for the database structure. 