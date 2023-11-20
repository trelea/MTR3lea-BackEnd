module.exports = (req, res) => {
    return res.status(404).json({
        msg: '404 invalid route'
    })
}