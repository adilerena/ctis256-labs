const task = new Promise( (resolve, reject) => {
    setTimeout( () => {
        resolve(500)
    }, 4000)
})


// register "then" handler
// when the task is completed, call this function
// and use its output (value)
task.then( (value) => {
    console.log("value is " + value)
})
.catch( (error) => {
    console.error("error " + error)
})