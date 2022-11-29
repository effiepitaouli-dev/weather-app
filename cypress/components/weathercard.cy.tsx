import { WeatherCard, weatherObj } from "../../components/weatherCard";

describe('Test type, properties, function calls', () => {
    const obj: weatherObj = {
        time: '02:10',
        sunrise: '07:00',
        sunset: '18:00',
        winddirection: 333,
        windspeed: 92,
        date: '2022-10-18'
    }

    it('If current card, should have additional info', () => {

        cy.mount(<WeatherCard temperature="8" type="current" weatherObj={obj} classes="card" />)
        cy.get('article').then(card => {
            expect(card.children()).to.have.length(4);
            expect(card.first().text()).to.contain('Date');
            const classText = card.attr('class');
            if (classText) expect(classText, 'to include current').to.contain('night');
        })
    })
})

export { }