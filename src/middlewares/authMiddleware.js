import jwt from "jsonwebtoken"

export const authenticatUser = (req, res, next) => {
    const token = req.header("Authorization")
    if (!token) {
        return res.status(401).json({ message: "Authentication failed.Token not provided" })
    }
    try {
        const decoded = jwt.verify(token, "respecttaelo")
        req.user = decoded
        console.log("decoded user",decoded);
        next()  // Move on to the next middleware or route handler
    }
    catch(error) {
        return res.status(401).json({ message: 'Authentication failed. Invalid token.' })

    }

}