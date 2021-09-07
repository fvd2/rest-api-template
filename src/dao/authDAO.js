let sessions

module.exports = class AuthDAO {
    static injectDB = async(conn) => {
        if (sessions) {
            return
        }
        try {
            sessions = await conn.db(process.env.MONGO_DB_NAME).collection('sessions')
        } catch(err) {
            console.error(`Could not establish collection handle in authDAO: ${err}`)
            return { error: err }
        }
    }

    static login = async(email, refreshToken) => {
        try {
            await sessions.updateOne({ email }, { $set: { refreshToken } }, { upsert: true })
            return { success: true }
        } catch (err) {
            console.error(`Failed to login user: ${err}`)
            return { error: err }
        }
    }
    
    static logout = async(email) => {
        try {
            await sessions.deleteOne({ email })
            return { success: true }
        } catch (err) {
            console.error(`Failed to logout user: ${err}`)
            return { error: err }
        }
    }
}