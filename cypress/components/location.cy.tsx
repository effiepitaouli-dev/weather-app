import {Location} from "../../components/location";
import {Results} from "../../components/results";

function handlePlace() {
    return 'function';
}

describe('Current Location', () => {
    it("Has buttom", () => {
        cy.mount(<Location handlePlace={handlePlace} />)
        cy.get('button').should('have.id', 'geolocation-button')
    })

    it("Check cookie", () => {
        cy.mount(<Location handlePlace={handlePlace} />)
        cy.mount(<Results/>)
        if ( !cy.getCookie('coords') ) {
            cy.get('div.results__wrapper').should('have.text', 'Waiting for location input or use of geolocation')
        } else {
            cy.get('div.results__wrapper').should('have.length.greaterThan', '30')
        }
    })

    it("request on input", () => {
        cy.mount(<Location handlePlace={handlePlace} />)
        cy.get('input').type('Athens')
    })
})

export {}