module.exports = function(sequelize, DataTypes) {
    const vehicle = sequelize.define('vehicle', {
        id: {
            type: DataTypes.INTEGER(10),
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        year: {
            type: DataTypes.INTEGER(10),
            allowNull: true,
            unique: false,
        },
        make: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        model: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },

    }, {
        tableName: 'vehicle',
        // hooks,
    });

    vehicle.prototype.toJSON = function() {
        const values = Object.assign({}, this.get());
        return values;
    };
    return vehicle;
};