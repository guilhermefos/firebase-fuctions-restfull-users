"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesConfig = void 0;
const controller_1 = require("./controller");
const auth_1 = require("../auth");
function routesConfig(app) {
    app.post("/signin", controller_1.signin);
    app.post("/users", auth_1.isAuthenticated, auth_1.isAuthorized({ hasRole: ["admin", "manager"] }), controller_1.create);
    // lists all users
    app.get("/users", [
        auth_1.isAuthenticated,
        // isAuthorized({ hasRole: ["admin", "manager"] }),
        controller_1.all,
    ]);
    // get :id user
    app.get("/users/:id", [
        auth_1.isAuthenticated,
        auth_1.isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
        controller_1.get,
    ]);
    // updates :id user
    app.patch("/users/:id", [
        auth_1.isAuthenticated,
        auth_1.isAuthorized({ hasRole: ["admin", "manager"], allowSameUser: true }),
        controller_1.patch,
    ]);
    // deletes :id user
    app.delete("/users/:id", [
        auth_1.isAuthenticated,
        auth_1.isAuthorized({ hasRole: ["admin", "manager"] }),
        controller_1.remove,
    ]);
}
exports.routesConfig = routesConfig;
//# sourceMappingURL=routes-config.js.map