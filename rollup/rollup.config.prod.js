import base from './rollup.config.base'
import { uglify } from "rollup-plugin-uglify";

module.exports = function (env) {
    const config = base(env)
    config.plugins.push(uglify())

    return config
}
