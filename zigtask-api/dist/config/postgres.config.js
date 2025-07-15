"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postgresConfig = void 0;
const task_entity_1 = require("../entities/tasks/task.entity");
const user_entity_1 = require("../entities/users/user.entity");
const postgresConfig = (config) => {
    return {
        type: 'postgres',
        host: config.get('DB_HOST'),
        port: Number(config.get('DB_PORT')) || 5432,
        username: config.get('DB_USERNAME') || 'postgres',
        password: config.get('DB_PASSWORD'),
        database: config.get('DB_NAME'),
        entities: [user_entity_1.User, task_entity_1.Task],
        synchronize: config.get('NODE_ENV') === 'production' ? false : true,
    };
};
exports.postgresConfig = postgresConfig;
//# sourceMappingURL=postgres.config.js.map