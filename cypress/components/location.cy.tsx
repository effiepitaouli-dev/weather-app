import { Location } from "../../components/location";

function handlePlace() {
    return 'function';
}

describe('Current Location', () => {
    it("Has button", () => {
        cy.mount(<Location handlePlace={handlePlace} />)
        cy.get('button').should('have.id', 'geolocation-button')
    })

    // it("request on input", () => {
    //     cy.mount(<Location handlePlace={handlePlace} />)
    //     cy.get('input').type('Athens');
    // })
})

export { }