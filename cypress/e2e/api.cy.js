describe('Testy API dla https://httpbin.org', () => {

    it('GET - Sprawdzenie odpowiedzi podstawowego endpointu', () => {
        cy.request('GET', '/get').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('url', 'https://httpbin.org/get');
        });
    });

    it('POST - Wysyłanie danych w body', () => {
        cy.request({
            method: 'POST',
            url: '/post',
            body: { name: 'Test User', age: 30 },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.json).to.deep.equal({ name: 'Test User', age: 30 });
        });
    });

    it('PUT - Wysyłanie danych w body', () => {
        cy.request({
            method: 'PUT',
            url: '/put',
            body: { key: 'value' },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.json).to.have.property('key', 'value');
        });
    });

    it('DELETE - Usuwanie zasobu', () => {
        cy.request('DELETE', '/delete').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('url', 'https://httpbin.org/delete');
        });
    });

    it('Wysyłanie nagłówków standardowych i niestandardowych', () => {
        cy.request({
            method: 'GET',
            url: '/headers',
            headers: {
                'User-Agent': 'Cypress-Test',
                'Custom-Header': 'CustomValue',
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.headers).to.have.property('User-Agent', 'Cypress-Test');
            expect(response.body.headers).to.have.property('Custom-Header', 'CustomValue');
        });
    });

    it('GET - Wysyłanie parametrów zapytania', () => {
        cy.request({
            method: 'GET',
            url: '/get',
            qs: { query: 'test', random: Math.random() },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.args).to.have.property('query', 'test');
            expect(response.body.args).to.have.property('random');
        });
    });

    it('GET - Sprawdzenie czasu trwania wniosku', () => {
        const startTime = Date.now();
        cy.request('GET', '/delay/1').then((response) => {
            const duration = Date.now() - startTime;
            expect(duration).to.be.greaterThan(1000); // Minimalne opóźnienie 1s
            expect(response.status).to.eq(200);
        });
    });

    it('POST - Wysyłanie form-data', () => {
        cy.request({
            method: 'POST',
            url: '/post',
            form: true,
            body: { username: 'admin', password: '123456' },
        }).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.form).to.deep.equal({ username: 'admin', password: '123456' });
        });
    });

    it('GET - Sprawdzanie IP klienta', () => {
        cy.request('GET', '/ip').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('origin');
        });
    });

    it('GET - Sprawdzanie informacji o User-Agent', () => {
        cy.request('GET', '/user-agent').then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('user-agent');
        });
    });

});
