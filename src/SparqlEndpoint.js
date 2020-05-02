import * as N3 from "n3";
import fetch from "node-fetch"

export default class SparqlEndpoint {
    constructor(uri, logQueries = false) {
        this._uri = uri;
        this._logQueries = logQueries;
    }

    getSparqlResultSet(query, fetchOptions = {}) {
        if (this._logQueries) console.log(query);
        let encodedQuery = encodeURIComponent(query);
        return fetch(this._uri + "?query=" + encodedQuery, {
            ...fetchOptions,
            headers: {
                accept: "application/sparql-results+json"
            }
        }).then(response =>
        {
            if (!response.ok) {
                throw response.status;
            } else {
                return response.json();
            }
        });
    }
    
    getSparqlRDF(query, fetchOptions = {}) {
        const parser = new N3.Parser();
        if (this._logQueries) console.log(query);
        let encodedQuery = encodeURIComponent(query);
        return fetch(this._uri + "?query=" + encodedQuery, {
            ...fetchOptions,
            headers: {
                accept: "text/turtle"
            }
        }).then(response =>
        {
            if (!response.ok) {
                throw response.status;
            } else {
                return response.text();
            }
        }).then(text => {
            return parser.parse(text);
        })
    }
}

