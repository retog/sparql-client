import SparqlEndpoint from "../lib/SparqlEndpoint"
import assert from "assert"

describe("SparqlEndpoint", function() {
    let sparqlEndpoint = new SparqlEndpoint("https://query.wikidata.org/sparql")
    describe("getSparqlResultSet", function() {
        it("should get result with head and bindings", async function() {
            const res = await sparqlEndpoint.getSparqlResultSet("SELECT ?height WHERE { wd:Q243 wdt:P2048 ?height . }");
            assert.ok(res.head.vars.length)
            assert.ok(res.results.bindings.length)
        }).timeout(15000);
    });
    describe("getSparqlRDF", function() {
        it("graph returned in describe query should have triples", async function() {
            const quads = await sparqlEndpoint.getSparqlRDF(
                "DESCRIBE wd:Q243");
            assert.ok(quads.length > 1)
        }).timeout(15000);
    });
  });