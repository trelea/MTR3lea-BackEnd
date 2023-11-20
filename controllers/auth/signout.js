module.exports = (req, res) => {
    res.clearCookie('SecretToken');
    res.clearCookie('User');
    return res.status(200).json({
        msg: `Logout.`,
    }).end();
}