var mysqlQuery = require('../../common/mqsqlHelper')

function login(req, res) {
    var param = req.body;
    if (!param.username && !param.password)
        return res.json({ error: true, message: "Please provide valid credentials" })

        var query = "SELECT * FROM user_master WHERE email_id='" + param.email + "' AND password='" + param.password + "'";
        mysqlQuery.excecuteQuery(query, function (error, result) {
            if (error)
                return res.json({ error: true, message: error })
            if (result.length > 0) {
                var payload = {
                    
                    id: result[0].id,
                    email: result[0].email,
                    first_name: result[0].first_name,
                    last_name: result[0].last_name
                }
                
                return res.json({ error: false, result: payload })
            }
            return res.json({ error: true, message: 'Username/ Password invalid' })
        })
}

function register(req, res) {
    var param = req.body;
    var query = "INSERT INTO `user_master`(`first_name`, `last_name`, `email_id`, `password`) VALUES ('" + param.firstname + "','" + param.lastname + "','" + param.email + "','" + param.password + "')";
    mysqlQuery.excecuteQuery(query, function (error, result) {
        if (error)
            return res.json({ error: true, message: error })
        else
            return res.json({ error: true, message: 'User Register' })
    })
}
module.exports = {
    login: login,
    register: register,
}