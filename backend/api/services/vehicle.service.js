const Models = require('../models');
const Vehicle = Models.vehicle;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const vehicleService = () => {
    const createvehicle = async(data) => {
        const result = Vehicle.create(data);
        return result
    };
    const getvehicle = async(query = null) => {
        let q;
        if (Object.keys(query).length == 0 && query.constructor == Object) {
            query = null
        }
        if (!query) {
            const allResult = Vehicle.findAll();
            return allResult;
        } else {
            let offset = null;

            offset = +query.PageSize * (+query.PageNumber - 1);
            q = {
                limit: +query.PageSize,
                offset: offset,
            }
        }
        if (query.search && query.search != 'null') {
            q['where'] = {
                [Op.or]: [{
                        year: {
                            [Op.like]: `%${query.search}%`
                        }
                    },
                    {
                        model: {
                            [Op.like]: `%${query.search}%`
                        }
                    },
                    {
                        model: {
                            [Op.like]: `%${query.search}%`
                        }
                    },
                ]
            }
        }
        const allPageReview = Vehicle.findAndCountAll(q);
        return allPageReview;
    }
    const updatevehicle = (data) => {
        const id = data.id
        const updateResult = Vehicle.update(data, {
            where: { id: id }
        });
        return updateResult;
    };
    const deletevehicle = (userId) => {
        const result = Vehicle.destroy({
            where: { id: userId }
        });
        return result;
    };
    return {
        createvehicle,
        getvehicle,
        updatevehicle,
        deletevehicle
    };
};
module.exports = vehicleService;