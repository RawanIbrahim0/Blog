import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import userRouter from './routers/userRouter.js'
import postRouter from './routers/postRouter.js'
import commentRouter from './routers/commentRouter.js'
import cors from 'cors'


dotenv.config()

connectDB();

const app=express()

app.use(express.json())

app.use(cors({ origin: "http://localhost:5173" }));


app.use('/api/users',userRouter)
app.use('/api/posts',postRouter)
app.use('/api/comments',commentRouter)


const PORT=process.env.PORT || 3000;
app.listen(PORT,()=>{
    console.log(`server is Ready to http://localhost:${PORT}`)
})