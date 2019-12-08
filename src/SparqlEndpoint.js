import $rdf from "ext-rdflib";
import fetch from "node-fetch"

export default class SparqlEndpoint {
    constructor(uri, logQueries = false) {
        this._uri = uri;
        this._logQueries = logQueries;
    }

    getSparqlResultSet(query) {
        if (this._logQueries) console.log(query);
        let encodedQuery = encodeURIComponent(query);
        return fetch(this._uri + "?query=" + encodedQuery, {
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
    
    getSparqlRDF(query) {
        if (this._logQueries) console.log(query);
        let encodedQuery = encodeURIComponent(query);
        return $rdf.rdfFetch(this._uri + "?query=" + encodedQuery, {
            headers: new Headers({
                accept: "text/turtle"
            })
        }).then(response =>
        {
            if (!response.ok) {
                throw response.status;
            } else {
                return response.graph();
            }
        });
    }
}

