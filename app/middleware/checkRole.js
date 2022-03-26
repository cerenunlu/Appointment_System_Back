
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        /*JWT is send with request header! 
        Format of it: Authorization : Bearer <token>
        */

        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, 'secret_key');
        req.userData = decodedToken;
        console.log(Object.values(decodedToken));
        console.log(typeof(Object.values(decodedToken)));
       console.log(JSON.stringify(Object.values(decodedToken)));
       const test=((Object.values(decodedToken)))[2];
      
       if(test!=null){
           next();
       }else{
        return res.status(401).send({
            message: 'You do not have access!!'
        });
       }
    
    } catch (error) {
        return res.status(401).send({
            message: 'Auth failed'
        });
    }
}