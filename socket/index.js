const io = require('socket.io')(8900,{
    cors:{
        origin:"http://127.0.0.1:5173"
    }
}
)

let users = []

const addUser = (userId,socketId) => {
    const isExistUser = users.some((user)=>user.userId === userId)
    console.log(isExistUser)
    if(!isExistUser){
        users.push({userId,socketId})
    }
}

const findUser = (userId) => {
    return users.find((user)=>user.userId === userId)
}

const removeUser = (socketId) => {
    users = users.filter((user)=>user.socketId !== socketId)
}

io.on("connection",(socket)=>{
    console.log("user Connected")
    // Online Users
    socket.on("addUser",(userId)=>{
        addUser(userId,socket.id)
        io.emit("onlineUsers",users)
    })

    // get and send Message 
    socket.on("SendMessage",({senderId,receiverId,text})=>{
        console.log(senderId,receiverId,text)
        const receiver = findUser(receiverId)
        io.to(receiver.socketId).emit("getMessage",{
            senderId,text
        })
    })
    // Disconnection :
    socket.on("disconnect",()=>{
        console.log("user disconnected !")
        removeUser(socket.id)
    })
    
})