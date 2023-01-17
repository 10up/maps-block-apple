describe("Settings", () => {
	before(() => {
		cy.login();
	});

	it("Should save correct settings", () => {
		cy.mapsBlockSaveSettings();

		cy.get("#mapkit-credentials-status").should("have.text", "Authorized!");
	});

	it("Should display invalid private key error", () => {
		cy.mapsBlockSaveSettings("INVALID");

		cy.get("#mapkit-credentials-status").should(
			"have.text",
			"Invalid Private Key"
		);
	});

	it("Should display missing key ID error", () => {
		cy.mapsBlockSaveSettings(Cypress.env("MAPS_PRIVATE_KEY"), "");

		cy.get("#mapkit-credentials-status").should("have.text", "Missing Key ID");
	});

	it("Should display invalid key ID error", () => {
		cy.mapsBlockSaveSettings(Cypress.env("MAPS_PRIVATE_KEY"), "INVALID");

		cy.get("#mapkit-credentials-status").should("have.text", "Invalid Key ID");
	});

	it("Should display missing team ID error", () => {
		cy.mapsBlockSaveSettings(
			Cypress.env("MAPS_PRIVATE_KEY"),
			Cypress.env("MAPS_KEY_ID"),
			""
		);

		cy.get("#mapkit-credentials-status").should("have.text", "Missing Team ID");
	});

	it("Should display invalid team ID error", () => {
		cy.mapsBlockSaveSettings(
			Cypress.env("MAPS_PRIVATE_KEY"),
			Cypress.env("MAPS_KEY_ID"),
			"INCORRECT"
		);

		cy.get("#mapkit-credentials-status").should("have.text", "Invalid Team ID");
	});
});
