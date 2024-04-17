function makeDefaultQueryInfo() {
    return {
        seen: false,
        observable: null,
    };
}
var RenderPromises = /** @class */ (function () {
    function RenderPromises() {
        // Map from Query component instances to pending fetchData promises.
        this.queryPromises = new Map();
        // Two-layered map from (query document, stringified variables) to QueryInfo
        // objects. These QueryInfo objects are intended to survive through the whole
        // getMarkupFromTree process, whereas specific Query instances do not survive
        // beyond a single call to renderToStaticMarkup.
        this.queryInfoTrie = new Map();
        this.stopped = false;
    }
    RenderPromises.prototype.stop = function () {
        if (!this.stopped) {
            this.queryPromises.clear();
            this.queryInfoTrie.clear();
            this.stopped = true;
        }
    };
    // Registers the server side rendered observable.
    RenderPromises.prototype.registerSSRObservable = function (observable) {
        if (this.stopped)
            return;
        this.lookupQueryInfo(observable.options).observable = observable;
    };
    // Get's the cached observable that matches the SSR Query instances query and variables.
    RenderPromises.prototype.getSSRObservable = function (props) {
        return this.lookupQueryInfo(props).observable;
    };
    RenderPromises.prototype.addQueryPromise = function (queryInstance, finish) {
        if (!this.stopped) {
            var info = this.lookupQueryInfo(queryInstance.getOptions());
            if (!info.seen) {
                this.queryPromises.set(queryInstance.getOptions(), new Promise(function (resolve) {
                    resolve(queryInstance.fetchData());
                }));
                // Render null to abandon this subtree for this rendering, so that we
                // can wait for the data to arrive.
                return null;
            }
        }
        return finish ? finish() : null;
    };
    RenderPromises.prototype.addObservableQueryPromise = function (obsQuery) {
        return this.addQueryPromise({
            // The only options which seem to actually be used by the
            // RenderPromises class are query and variables.
            getOptions: function () { return obsQuery.options; },
            fetchData: function () {
                return new Promise(function (resolve) {
                    var sub = obsQuery.subscribe({
                        next: function (result) {
                            if (!result.loading) {
                                resolve();
                                sub.unsubscribe();
                            }
                        },
                        error: function () {
                            resolve();
                            sub.unsubscribe();
                        },
                        complete: function () {
                            resolve();
                        },
                    });
                });
            },
        });
    };
    RenderPromises.prototype.hasPromises = function () {
        return this.queryPromises.size > 0;
    };
    RenderPromises.prototype.consumeAndAwaitPromises = function () {
        var _this = this;
        var promises = [];
        this.queryPromises.forEach(function (promise, queryInstance) {
            // Make sure we never try to call fetchData for this query document and
            // these variables again. Since the queryInstance objects change with
            // every rendering, deduplicating them by query and variables is the
            // best we can do. If a different Query component happens to have the
            // same query document and variables, it will be immediately rendered
            // by calling finish() in addQueryPromise, which could result in the
            // rendering of an unwanted loading state, but that's not nearly as bad
            // as getting stuck in an infinite rendering loop because we kept calling
            // queryInstance.fetchData for the same Query component indefinitely.
            _this.lookupQueryInfo(queryInstance).seen = true;
            promises.push(promise);
        });
        this.queryPromises.clear();
        return Promise.all(promises);
    };
    RenderPromises.prototype.lookupQueryInfo = function (props) {
        var queryInfoTrie = this.queryInfoTrie;
        var query = props.query, variables = props.variables;
        var varMap = queryInfoTrie.get(query) || new Map();
        if (!queryInfoTrie.has(query))
            queryInfoTrie.set(query, varMap);
        var variablesString = JSON.stringify(variables);
        var info = varMap.get(variablesString) || makeDefaultQueryInfo();
        if (!varMap.has(variablesString))
            varMap.set(variablesString, info);
        return info;
    };
    return RenderPromises;
}());
export { RenderPromises };
//# sourceMappingURL=RenderPromises.js.map