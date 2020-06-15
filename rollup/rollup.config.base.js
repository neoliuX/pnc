import typescript from 'rollup-plugin-typescript';
import scss from 'rollup-plugin-scss'
import ejs from 'rollup-plugin-ejs';
import resolve from "rollup-plugin-node-resolve";

const path = require('path')

export default function (env) {
    return {
        input: path.join('./src', env.env.path, 'ts/main.ts'),
        output: {
            file: path.join('./src', env.env.path, 'js/main.bundle.js'),
            format: 'iife'
        },
        plugins: [
            typescript({lib: ["es5", "es6", "dom"], target: "es3"}),
            scss({  output: path.join('./src', env.env.path, 'css/main.bundle.css') }),
            ejs(),
            resolve()
        ]
    }
}
