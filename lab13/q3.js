setTimeout( () => {
    let r1 = Math.floor(Math.random() * 100)
    console.log(r1)

    setTimeout( () => {
        let r2 = Math.floor(Math.random() * 100)
        console.log(r2)
        setTimeout( () => {
            let r3 = Math.floor(Math.random() * 100)
            console.log(r3)
            
            setTimeout( () => {
                console.log(r1 + r2 + r3)
                
            }, 1000)
        }, 1000)
    }, 1000)
}, 1000)