var Message = api_message
const vehicleService = require('../services/vehicle.service');
const { onError } = require('./error');
exports.addVehicle = async(req, res) => {
    const { body } = req;
    try {
        const vehicleData = {...body };
        let vehicl_data = await vehicleService().createvehicle(vehicleData);
        if (!vehicl_data) {
            return res.status(400).json({ status: false, error: 'Vehicl ' + Message.notAdd });
        }
        return res.status(200).json({
            status: true,
            message: 'vehicle ' + Message.add,
            data: vehicl_data
        });
    } catch (err) {
        return onError(req, res, err);
    }
}

exports.getVehicle = async(req, res) => {
    try {
        let getvehicl_data = await vehicleService().getvehicle(req.query);
        if (!getvehicl_data) {
            return res.status(400).json({ status: false, error: 'Vehicl ' + Message.notFound });
        }
        let isQueryEmpty = Object.keys(req.query).length == 0 && req.query.constructor === Object;
        let newVehicl = !isQueryEmpty ? getvehicl_data.rows : getvehicl_data;
        return res.status(200).json({
            status: true,
            message: 'vehicl ' + Message.add,
            data: newVehicl,
            count: !isQueryEmpty ? getvehicl_data.count : null,
        });
    } catch (err) {
        return onError(req, res, err);
    }
}


exports.updateVehicle = async(req, res) => {
    const { body } = req;
    try {
        let vehiclData = {...body };
        let vehiclId = req.params.id;
        vehiclData.id = +vehiclId
        const vehicl = await vehicleService().updatevehicle(vehiclData)
        if (vehicl[0] === 0) {
            return res.status(404).send({
                status: false,
                error: 'Vehicl ' + Message.notFound,
            });
        }
        return res.status(200).json({
            status: true,
            message: 'Vehicl ' + Message.update,
        });
    } catch (err) {
        return onError(req, res, err);
    }
};


exports.deleteVehicleById = async(req, res) => {
    try {
        let vehiclId = req.params.id;
        let result
        if (vehiclId == "") {
            return res.status(404).json({ status: false, error: 'Studdent ' + Message.notExists });
        } else {
            result = await vehicleService().deletevehicle(+vehiclId)
        }
        if (!result) {
            return res.status(400).json({ status: false, error: 'Bad Request: Vehicl ' + Message.notFound });
        }
        if (result == 1) {
            return res.status(200).json({
                status: true,
                message: 'Vehicl ' + Message.delete
            });

        }
    } catch (err) {
        return onError(req, res, err);
    }
};