// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add(
	"mapsBlockSaveSettings",
	(
		key = Cypress.env("MAPS_PRIVATE_KEY"),
		key_id = Cypress.env("MAPS_KEY_ID"),
		team_id = Cypress.env("MAPS_TEAM_ID")
	) => {
		cy.visit(`/wp-admin/options-general.php?page=block-for-apple-maps`);
		cy.get("#token-gen-authkey").click().clear();
		if (key) {
			cy.get("#token-gen-authkey").type(key, { delay: 0 });
		}

		cy.get("#token-gen-kid").click().clear();
		if (key_id) {
			cy.get("#token-gen-kid").click().clear().type(key_id);
		}

		cy.get("#token-gen-iss").click().clear();
		if (team_id) {
			cy.get("#token-gen-iss").click().clear().type(team_id);
		}

		cy.get("#submit").click();
	}
);
