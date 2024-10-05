const express=require('express')
const cors=require('cors')
const db=require('./database')
const app=express()
const router=require('./router')
const bodyparser = require('body-parser')


app.use(express.json());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
app.use(cors())

app.use("/", router)

app.listen(4004, () => {
    console.log('server running')
})