require('dotenv').config()
const Sequelize = require('sequelize')
const {DATABASE_URL} = process.env
const bcrypt = require('bcrypt')
const saltRounds = 10

const sequelize = new Sequelize(DATABASE_URL, {
    dialect: 'postgres',
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false
        }
    }
})

module.exports = {
    
   addUser:(req,res) => {

    let {username, password} = req.body
    bcrypt.hash(password, saltRounds, (err, hash) => {

        if(err){
            console.log(err)
        }

    sequelize.query(`
    INSERT INTO users(username, password)
    VALUES('${username}','${hash}');
    `)
    .then(dbRes => {
        res.status(200).send(dbRes[0])
        
    })

    }
    )

   },

   userLogin:(req,res) => {

    let {username, password} = req.body

    sequelize.query(`
    SELECT * FROM users WHERE username = '${username}' ;
    `).then((dbRes)=>{
        // console.log(dbRes)
        if(dbRes[0].length > 0){ 
            const foundUser = dbRes[0][0]
            const encryptedPassword = foundUser.password
            const {user_id, username} = foundUser

            bcrypt.compare(password, encryptedPassword, (err,response)=>{
                if(response){ 
                    const userRes = {
                        user_id,
                        username
                    }

                    req.session.user = userRes
                    // console.log(req.session.user)
                    res.send({loggedIn: true, user: userRes}
                        )
                    // res.send(dbRes[0][0])
                } else {
                    res.send({message: "wrong username/password"})
                }
            })
            
        } else {
            res.send({message: 'user doesnt exist'})
        }
    })
   
    

   },

   checkLogin:(req,res) => {
    if(req.session.user){
        console.log(req.session.user)
        res.send({loggedIn: true, user: req.session.user})
    } else {
        res.send({loggedIn: false})
    }
   },

   addAnime:(req,res) => {
    const {user_id, anime_name} = req.body
    sequelize.query(`
    INSERT INTO animelist VALUES('${user_id}', '${anime_name}');
    `).then(dbRes => {
        res.status(200).send(dbRes[0])
        
    })

   },

   getAnime:(req,res) => {
    const{user_id} = req.body
    console.log(req.body)
if (user_id){


    sequelize.query(`
    SELECT * FROM animeList WHERE user_id = '${user_id}';
    `).then(dbRes => {
    
        console.log(dbRes)
        res.status(200).send(dbRes[0])
    }
    )
}
   }
}