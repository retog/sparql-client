import SparqlEndpoint from "../lib/SparqlEndpoint"
import assert from "assert"

describe("SparqlEndpoint", function() {
    let sparqlEndpoint = new SparqlEndpoint("https://query.wikidata.org/sparql")
    describe("getSparqlResultSet", function() {
        it("should get result with head nad bindings", async function() {
            const res = await sparqlEndpoint.getSparqlResultSet("SELECT ?height WHERE { wd:Q243 wdt:P2048 ?height . }");
            assert.ok(res.head.vars.length)
            assert.ok(res.results.bindings.length)
        });
    });
  });