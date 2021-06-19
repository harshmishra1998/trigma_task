let vehicleCntrl = require(_pathconst.ControllersPath.vehicleController);

module.exports = function(app) {
    /*User Route Start */
    app.post(
        "/api/vehicleCreate",
        vehicleCntrl.addVehicle
    );
    app.get(
        "/api/get_vehicle_data",
        vehicleCntrl.getVehicle
    );
    app.put(
        "/api/updatevehicle/:id",
        vehicleCntrl.updateVehicle
    )
    app.delete(
        "/api/vehicleDelete/:id",
        vehicleCntrl.deleteVehicleById
    );
}