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
	}
}
```
