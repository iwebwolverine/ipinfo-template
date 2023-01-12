import { Sequelize } from 'sequelize-typescript'
import databaseConfigs from '../../config/config.json';
import { ProxyEntity } from '../api/proxies/proxy.entity';

const isProduction = process.env.NODE_ENV === 'production';

const config = databaseConfigs[isProduction ? 'production' : 'development'];

const sequelize = new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    dialect: 'postgres',
})

sequelize.addModels([
    ProxyEntity
])

sequelize
export {
    ProxyEntity,
    sequelize
};
