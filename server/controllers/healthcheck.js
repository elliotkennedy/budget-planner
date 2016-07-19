exports.healthcheck = (req, res) => {
    //TODO db healthcheck
    res.json({ status: 'UP' });
};
