/*
 * Copyright 2016 Amadeus s.a.s.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
"use strict";

const path = require("path");
const gulp = require("gulp");
const promisify = require("pify");
const rimraf = promisify(require("rimraf"));
const webpack = require("webpack");

const checkWebpackErrors = function (done) {
    return (inputErr, result) => {
        let outputErr = inputErr;
        if (!outputErr) {
            const stats = result.toJson();
            if (stats.errors.length > 0) {
                outputErr = stats.errors;
            }
        }
        if (Array.isArray(outputErr)) {
            outputErr = outputErr.join("\n\n");
        }
        done(outputErr);
    };
};

gulp.task("clean", function() {
    return Promise.all([
        rimraf(path.join(__dirname, "build")),
        rimraf(path.join(__dirname, "src", "**", "*.ngfactory.ts"))
    ]);
});

gulp.task("clean-doc", function() {
    return rimraf(path.join(__dirname, "doc-output"));
});

gulp.task("pre-ngc", function() {
    return gulp.src(["src/**/"], {
        base: "src",
        mark: true,
        read: false
    }).pipe(gulp.dest("build/ts"));
});

gulp.task("build", function(done) {
    webpack({
        entry: [path.join(__dirname, "src/ui/ngFromCDN.js"), path.join(__dirname, "src/ui/atdiff.ts")],
        output: {
            path: path.join(__dirname, "build/ui/browser"),
            filename: "at-diff.js"
        },
        resolve: {
            extensions: ["", ".ts", ".js"],
            packageMains: ["module", "main"]
        },
        module: {
            loaders: [{
                loader: "awesome-typescript-loader"
            }]
        },
        externals: function (context, request, callback) {
            const match = /^@angular\/([^/]+)\/?/.exec(request);
            if (match) {
                // "@angular/core/*": "var ng.core"
                // "@angular/common/*": "var ng.common"
                // "@angular/forms/*": "var ng.forms"
                // "@angular/platform-browser/*": "var ng.platformBrowser"
                callback(null, "var ng." + match[1].replace("platform-browser", "platformBrowser"));
                return;
            }
            callback();
        },
        plugins: [/*
            new webpack.optimize.UglifyJsPlugin({
                output: {
                    inline_script: true,
                    ascii_only: true
                }
            })*/
        ]
    }).run(checkWebpackErrors(done));
});

gulp.task("build-doc-copy", function() {
    return gulp.src(["doc/**/*", "!doc/*.md", "!doc/*.json", "!doc/*.html"]).pipe(gulp.dest("doc-output"));
});

gulp.task("build-doc", ["build-doc-copy"]);
