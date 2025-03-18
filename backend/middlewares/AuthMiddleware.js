import jwt from 'jsonwebtoken'

export const verifyToken = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).send("You are not authorized");
        }

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if(err){
                return res.status(403).send("Token is not valid");
            }
            req.userId = decoded.userId;
            next();
        });
    } catch(error){
        return res.status(500).send("Internal Server Error");
    }
}