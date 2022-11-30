import { Results } from "../../components/results";

describe('Test results, fetch and render', () => {
    it("Should not have content without ccoordinates", () => {
        cy.mount(<Results />)
        cy.get('.results__wrapper').should('be.empty');
    })

    it('Should have isLoading class', () => {
        cy.mount(<Results />)
        cy.get('.isLoading').should('exist')
    })

    // To change according to filters
    it('Should have specific number of results', () => {
        cy.mount(<Results coordinates={['38.1', '23.625', 'Nowhere']} classes="resultsWrapper" />)
        const results = cy.get('.resultsWrapper');
        results.should('exist');
        results.should('have.descendants', 'article');
        cy.get('.results__wrapper > div').should(($child) => {
            expect($child, '3 items').to.have.length(2);
            expect($child.eq(0)).to.contain('It is currently');
        });
        cy.get('.results article').should(($card) => {
            expect($card, '8 items').to.have.length(8);
            expect($card, 'have date').to.contain('Date');
        })
    })
})

export { }