1. Initialize npm setup `npm init`
2. Create react component
3. create index.ts file to import and export the react component
4. Install dependencies `npm install react typescript tslib --save-dev`
5. Install type module `npm i --save-dev @types/react`
5. Need to create tsconfig.json for compiler configuration `npx tsc --init`
6. To build this package we can use webpack but here we are using rollup
    1. To install rollup `npm install rollup`
    2. Apart from this we need more dependencies like `npm install @rollup/plugin-node-resolve @rollup/plugin-commonjs @rollup/plugin-typescript @rollup/plugin-terser rollup-plugin-peer-deps-external rollup-plugin-dts --save-dev`
    3. `npm install rollup-plugin-postcss`
    4. create rollup.config.json
    5. Set props in package.json  - "main": "dist/index.js",
                                    "module": "dist/index.mjs",
                                    "types": "dist/index.d.ts",
    6. in "scripts" add - "rollup": "rollup -c --bundleConfigAsCjs"